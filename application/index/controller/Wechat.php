<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\common\model\WechatContext;
use app\common\model\WechatResponse;
use EasyWeChat\Message\Text;
use EasyWeChat\Payment\Order;
use fast\service\Wechat as WechatService;
use fast\third\Application;
use think\Config;
use think\Log;

/**
 * 微信接口
 */
class Wechat extends Frontend
{

    public $app = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->app = new Application(Config::getSecret('wechat')->toArray());
    }

    /**
     * 微信API对接接口
     */
    public function api()
    {
        $this->app->server->setMessageHandler(function ($message)
        {
            $content = configvalue('wechat');
            //微信配置信息
            $wechat_config = [];
            foreach ($content['config'] as $k => $v)
            {
                $wechat_config[$v['id']] = $v['value'];
            }

            $WechatService = new WechatService;
            $WechatContext = new WechatContext;
            $WechatResponse = new WechatResponse;

            $openid = $message->FromUserName;
            $to_openid = $message->ToUserName;
            $event = $message->Event;
            $eventkey = $message->EventKey ? $message->EventKey : $message->Event;

            $unknownmessage = isset($wechat_config['default.unknown.message']) ? $wechat_config['default.unknown.message'] : "对找到对应指令!";

            switch ($message->MsgType)
            {
                case 'event': //事件消息
                    switch ($event)
                    {
                        case 'subscribe'://添加关注
                            return isset($wechat_config['default.subscribe.message']) ? $wechat_config['default.subscribe.message'] : "欢迎关注我们!";
                        case 'unsubscribe'://取消关注
                            return '';
                        case 'LOCATION'://获取地理位置
                            return '';
                        case 'VIEW': //跳转链接,eventkey为链接
                            return '';
                        default:
                            break;
                    }

                    $response = $WechatResponse->where(["eventkey" => $eventkey, 'status' => FA_STATUS_NORMAL])->get();
                    if ($response)
                    {
                        $content = (array) json_decode($response['content'], TRUE);
                        $context = $WechatContext->where(['openid' => $openid])->get();
                        $data = ['eventkey' => $eventkey, 'command' => '', 'refreshtime' => time(), 'openid' => $openid];
                        if ($context)
                        {
                            $WechatContext->data($data)->where('id', $context['id'])->update();
                            $data['id'] = $context['id'];
                        }
                        else
                        {
                            $id = $WechatContext->data($data)->insert();
                            $data['id'] = $id;
                        }
                        $result = $WechatService->response($this, $openid, $content, $data);
                        if ($result)
                        {
                            return $result;
                        }
                    }
                    return $unknownmessage;
                case 'text': //文字消息
                case 'image': //图片消息
                case 'voice': //语音消息
                case 'video': //视频消息
                case 'location': //坐标消息
                case 'link': //链接消息
                default: //其它消息
                    //上下文事件处理
                    $context = $WechatContext->where([['openid', $openid], ['refreshtime', '>=', time() - 1800]])->get();
                    if ($context && $context['eventkey'])
                    {
                        $response = $WechatResponse->where(['eventkey' => $context['eventkey'], 'status' => FA_STATUS_NORMAL])->get();
                        if ($response)
                        {
                            $WechatContext->data(array('refreshtime' => time()))->where('id', $context['id'])->update();
                            $content = (array) json_decode($response['content'], TRUE);
                            $result = $WechatService->command($this, $openid, $content, $context);
                            if ($result)
                            {
                                return $result;
                            }
                        }
                    }
                    //自动回复处理
                    if ($message->MsgType == 'text')
                    {
                        $wechat_autoreply = new Orm('wechat_autoreply');
                        $autoreply = $wechat_autoreply->where(['text' => $message->Content, 'status' => FA_STATUS_NORMAL])->get();
                        if ($autoreply)
                        {
                            $response = $WechatResponse->where(["eventkey" => $autoreply['eventkey'], 'status' => FA_STATUS_NORMAL])->get();
                            if ($response)
                            {
                                $content = (array) json_decode($response['content'], TRUE);
                                $context = $WechatContext->where(['openid' => $openid])->get();
                                $result = $WechatService->response($this, $openid, $content, $context);
                                if ($result)
                                {
                                    return $result;
                                }
                            }
                        }
                    }
                    return $unknownmessage;
            }
            return ""; //SUCCESS
        });
        $response = $this->app->server->serve();
        // 将响应输出
        $response->send();
        return FALSE;
    }

    /**
     * 登录回调
     */
    public function callback()
    {

    }

    /**
     * 主动推送消息给用户
     */
    public function push()
    {
        $openid = $this->request->request("openid");
        $message = $this->request->request("message");
        if (!$openid || !$message)
        {
            $this->code = 1000;
            return;
        }
        $message = new Text(['content' => $message]);
        $result = $this->app->staff->message($message)->to($openid)->send();
        $this->code = 0;
        echo json_encode(['code' => $this->code]);
        return FALSE;
    }

    /**
     * 支付回调
     */
    public function notify()
    {
        Log::record(file_get_contents('php://input'), "notify");
        $response = $this->app->payment->handleNotify(function($notify, $successful)
        {
            // 使用通知里的 "微信支付订单号" 或者 "商户订单号" 去自己的数据库找到订单
            $orderinfo = Order::findByTransactionId($notify->transaction_id);
            if ($orderinfo)
            {
                //订单已处理
                return true;
            }
            $orderinfo = Order::get($notify->out_trade_no);
            if (!$orderinfo)
            { // 如果订单不存在
                return 'Order not exist.'; // 告诉微信，我已经处理完了，订单没找到，别再通知我了
            }
            // 如果订单存在
            // 检查订单是否已经更新过支付状态,已经支付成功了就不再更新了
            if ($orderinfo['paytime'])
            {
                return true;
            }
            // 用户是否支付成功
            if ($successful)
            {
                // 不是已经支付状态则修改为已经支付状态
                Order::update(['paytime' => time(), 'paytype' => 'wechat', 'transaction_id' => $notify->transaction_id, 'status' => FA_STATUS_PAID], $orderinfo['id']);
                $userinfo = User::get($orderinfo['user_id']);
                if ($userinfo)
                {
                    $data = [
                        'first'            => '你好!' . $userinfo['nickname'] . '，我们已收到您的货款，开始为您印刷书本，请耐心等待: )',
                        'orderMoneySum'    => $orderinfo['saleamount'],
                        'orderProductName' => $orderinfo['title'],
                        'Remark'           => '如有问题请直接在微信留言，我们将第一时间为您服务！',
                    ];
                    notice($userinfo['id'], $data, url('order/info/' . $orderinfo['id'], 1), 'lABqvSfOD1nJ6mrVVY1vSBpKr8NpQf1MzqgdN0M_Ifo');
                }
                return true; // 返回处理完成
            }
            else
            { // 用户支付失败
                return true;
            }
        });

        $response->send();
        return FALSE;
    }

}
