<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\common\model\WechatAutoreply;
use app\common\model\WechatContext;
use app\common\model\WechatResponse;
use EasyWeChat\Foundation\Application;
use EasyWeChat\Payment\Order;
use fast\service\Wechat as WechatService;
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
        $this->app = new Application(Config::get('wechat'));
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

                    $response = $WechatResponse->where(["eventkey" => $eventkey, 'status' => 'normal'])->find();
                    if ($response)
                    {
                        $content = (array) json_decode($response['content'], TRUE);
                        $context = $WechatContext->where(['openid' => $openid])->find();
                        $data = ['eventkey' => $eventkey, 'command' => '', 'refreshtime' => time(), 'openid' => $openid];
                        if ($context)
                        {
                            $WechatContext->data($data)->where('id', $context['id'])->update();
                            $data['id'] = $context['id'];
                        }
                        else
                        {
                            $id = $WechatContext->data($data)->save();
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
                    $context = $WechatContext->where(['openid' => ['=', $openid], 'refreshtime' => ['>=', time() - 1800]])->find();
                    if ($context && $context['eventkey'])
                    {
                        $response = $WechatResponse->where(['eventkey' => $context['eventkey'], 'status' => 'normal'])->find();
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
                        $wechat_autoreply = new WechatAutoreply();
                        $autoreply = $wechat_autoreply->where(['text' => $message->Content, 'status' => 'normal'])->find();
                        if ($autoreply)
                        {
                            $response = $WechatResponse->where(["eventkey" => $autoreply['eventkey'], 'status' => 'normal'])->find();
                            if ($response)
                            {
                                $content = (array) json_decode($response['content'], TRUE);
                                $context = $WechatContext->where(['openid' => $openid])->find();
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
    }

    /**
     * 登录回调
     */
    public function callback()
    {

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
                // 请在这里编写处理成功的处理逻辑

                return true; // 返回处理完成
            }
            else
            { // 用户支付失败
                return true;
            }
        });

        $response->send();
    }

}
