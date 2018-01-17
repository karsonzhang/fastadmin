<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\library\Sms as Smslib;
use app\common\model\User;

/**
 * 短信接口
 */
class Sms extends Api
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 发送验证码
     *
     * 必选参数:mobile,type<br>
     * 可选参数:无
     */
    public function send()
    {
        $mobile = $this->request->request("mobile");
        $type = $this->request->request("type");
        $type = $type ? $type : 'register';

        $last = Smslib::get($mobile, $type);
        if ($last && time() - $last['createtime'] < 60)
        {
            $this->error(__('发送频繁'));
        }
        if ($type)
        {
            $userinfo = User::getByMobile($mobile);
            if ($type == 'register' && $userinfo)
            {
                //已被注册
                $this->error(__('已被注册'));
            }
            else if (in_array($type, ['changepwd', 'resetpwd']) && !$userinfo)
            {
                //未注册
                $this->error(__('未注册'));
            }
        }
        $ret = Smslib::send($mobile, '', $type);
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
     * 必选参数:mobile,type,captcha<br>
     * 可选参数:无
     */
    public function check()
    {
        $mobile = $this->request->request("mobile");
        $type = $this->request->request("type");
        $type = $type ? $type : 'register';
        $captcha = $this->request->request("captcha");

        if ($type)
        {
            $userinfo = User::getByMobile($mobile);
            if ($type == 'register' && $userinfo)
            {
                //已被注册
                $this->error(__('已被注册'));
            }
            else if (in_array($type, ['changepwd', 'resetpwd']) && !$userinfo)
            {
                //未注册
                $this->error(__('未注册'));
            }
        }
        $ret = Smslib::check($mobile, $captcha, $type);
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
