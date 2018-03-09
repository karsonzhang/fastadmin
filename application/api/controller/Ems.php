<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\library\Ems as Emslib;
use app\common\model\User;

/**
 * 邮箱验证码接口
 */
class Ems extends Api
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';

    public function _initialize()
    {
        parent::_initialize();
        \think\Hook::add('ems_send', function($params) {
            $obj = \app\common\library\Email::instance();
            $result = $obj
                    ->to($params->email)
                    ->subject('验证码')
                    ->message("你的验证码是：" . $params->code)
                    ->send();
            return $result;
        });
    }

    /**
     * 发送验证码
     *
     * @param string    $email      邮箱
     * @param string    $event      事件名称
     */
    public function send()
    {
        $email = $this->request->request("email");
        $event = $this->request->request("event");
        $event = $event ? $event : 'register';

        $last = Emslib::get($email, $event);
        if ($last && time() - $last['createtime'] < 60)
        {
            $this->error(__('发送频繁'));
        }
        if ($event)
        {
            $userinfo = User::getByEmail($email);
            if ($event == 'register' && $userinfo)
            {
                //已被注册
                $this->error(__('已被注册'));
            }
            else if (in_array($event, ['changeemail']) && $userinfo)
            {
                //被占用
                $this->error(__('已被占用'));
            }
            else if (in_array($event, ['changepwd', 'resetpwd']) && !$userinfo)
            {
                //未注册
                $this->error(__('未注册'));
            }
        }
        $ret = Emslib::send($email, NULL, $event);
        if ($ret)
        {
            $this->success(__('发送成功'));
        }
        else
        {
            $this->error(__('发送失败'));
        }
    }

    /**
     * 检测验证码
     *
     * @param string    $email      邮箱
     * @param string    $event      事件名称
     * @param string    $captcha    验证码
     */
    public function check()
    {
        $email = $this->request->request("email");
        $event = $this->request->request("event");
        $event = $event ? $event : 'register';
        $captcha = $this->request->request("captcha");

        if ($event)
        {
            $userinfo = User::getByEmail($email);
            if ($event == 'register' && $userinfo)
            {
                //已被注册
                $this->error(__('已被注册'));
            }
            else if (in_array($event, ['changeemail']) && $userinfo)
            {
                //被占用
                $this->error(__('已被占用'));
            }
            else if (in_array($event, ['changepwd', 'resetpwd']) && !$userinfo)
            {
                //未注册
                $this->error(__('未注册'));
            }
        }
        $ret = Emslib::check($email, $captcha, $event);
        if ($ret)
        {
            $this->success(__('成功'));
        }
        else
        {
            $this->error(__('验证码不正确'));
        }
    }

}
