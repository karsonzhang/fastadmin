<?php

namespace fast\service;

use app\common\model\Page;
use app\common\model\User;
use app\common\model\UserSignin;
use app\common\model\UserThird;
use app\common\model\WechatConfig;
use EasyWeChat\Message\News;
use EasyWeChat\Message\Transfer;
use fast\Date;
use think\Config;

/**
 * Wechat服务类
 */
class Wechat
{

    public function __construct()
    {
        
    }

    public static function appConfig()
    {
        return array(
            'signin'  => array(
                'name'   => '签到送积分',
                'config' => array(
                )
            ),
            'article' => array(
                'name'   => '关联文章',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '文章ID',
                        'field'   => 'id',
                        'options' => ''
                    )
                )
            ),
            'page'    => array(
                'name'   => '关联单页',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '单页ID',
                        'field'   => 'id',
                        'options' => ''
                    )
                )
            ),
            'service' => array(
                'name'   => '在线客服',
                'config' => array(
                )
            ),
        );
    }

    // 微信输入交互内容指令
    public function command($obj, $openid, $content, $context)
    {
        $response = FALSE;
        if (isset($content['app']))
        {
            switch ($content['app'])
            {
                case 'signin':
                case 'article':
                case 'page':
                    break;
                case 'service':
                    $service = (array) json_decode(WechatConfig::value('service'), true);
                    list($begintime, $endtime) = explode('-', $service['onlinetime']);
                    $session = $obj->app->staff_session;
                    $staff = $obj->app->staff;

                    $kf_account = $session->get($openid)->kf_account;
                    $time = time();
                    if (!$kf_account && ($time < strtotime(date("Y-m-d {$begintime}")) || $time > strtotime(date("Y-m-d {$endtime}"))))
                    {
                        return $service['offlinemsg'];
                    }
                    if (!$kf_account)
                    {
                        $kf_list = $staff->onlines()->kf_online_list;
                        if ($kf_list)
                        {
                            $kfarr = [];
                            foreach ($kf_list as $k => $v)
                            {
                                $kfarr[$v['kf_account']] = $v['accepted_case'];
                            }
                            $kfkeys = array_keys($kfarr, min($kfarr));
                            $kf_account = reset($kfkeys);
                            $session->create($kf_account, $openid);
                            $response = $service['waitformsg'];
                        }
                        else
                        {
                            $response = $service['nosessionmsg'];
                        }
                    }
                    else
                    {
                        $server = $obj->app->server;
                        $server->setMessageHandler(function($message) {
                            return new Transfer();
                        });
                        $response = $server->serve();
                        $response->send();
                        exit;
                    }

                    break;
                default:
                    break;
            }
        }
        else
        {
            $response = isset($content['content']) ? $content['content'] : $response;
        }
        return $response;
    }

    // 微信点击菜单event指令
    public function response($obj, $openid, $content, $context)
    {
        $upload = Config::get('upload');
        $response = FALSE;
        if (isset($content['app']))
        {
            switch ($content['app'])
            {
                case 'signin':
                    $thirdinfo = UserThird::get(['platform' => 'wechat', 'openid' => $openid]);
                    if (!$thirdinfo)
                    {
                        $response = '您还没有<a href="' . url('index/user/third', 'action=redirect&platform=wechat', true, true) . '">绑定用户</a>还不能签到!';
                    }
                    else
                    {
                        $user_id = $thirdinfo->user_id;
                        $usersign = new UserSignin;
                        $signdata = $usersign->where('user_id', '=', $user_id)->where('createtime', '>=', Date::unixtime())->find();
                        if ($signdata)
                        {
                            $response = '今天已签到,请明天再来!';
                        }
                        else
                        {
                            $signdata = (array) json_decode(WechatConfig::value('signin'), TRUE);

                            $lastdata = $usersign->where('user_id', $user_id)->order('id', 'desc')->limit(1)->find();
                            $successions = $lastdata && $lastdata['createtime'] > Date::unixtime('day', -1) ? $lastdata['successions'] + 1 : 1;
                            $usersign->save(['user_id' => $thirdinfo['user_id'], 'successions' => $successions, 'createtime' => time()]);
                            $score = isset($signdata['s' . $successions]) ? $signdata['s' . $successions] : $signdata['sn'];
                            User::where(['id' => $user_id])->setInc('score', $score);
                            $response = '签到成功!连续签到' . $successions . '天!获得' . $score . '积分';
                        }
                    }

                    break;
                case 'article':
                    $id = explode(',', $content['id']);
                    $pagelist = Page::all($id);
                    $response = [];
                    foreach ($pagelist as $k => $pageinfo)
                    {
                        if ($pageinfo)
                        {
                            $news = new News();
                            $news->title = $pageinfo['title'];
                            $news->url = $pageinfo['url'] ? $pageinfo['url'] : url('index/page/show', ['id' => $pageinfo['id']], true, true);
                            $news->image = $upload['cdnurl'] . $pageinfo['image'];
                            $news->description = $pageinfo['description'];
                            $response[] = $news;
                        }
                    }

                case 'page':
                    $id = isset($content['id']) ? $content['id'] : 0;
                    $pageinfo = Page::get($id);
                    if ($pageinfo)
                    {
                        $news = new News();
                        $news->title = $pageinfo['title'];
                        $news->url = $pageinfo['url'] ? $pageinfo['url'] : url('index/page/show', ['id' => $pageinfo['id']], true, true);
                        $news->image = $upload['cdnurl'] . $pageinfo['image'];
                        $news->description = $pageinfo['description'];
                        return $news;
                    }
                    break;
                case 'service':
                    $response = $this->command($obj, $openid, $content, $context);
                    break;
                default:
                    break;
            }
        }
        else
        {
            $response = isset($content['content']) ? $content['content'] : $response;
        }
        return $response;
    }

}
