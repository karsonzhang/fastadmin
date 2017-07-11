<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use app\common\library\Email;
use app\common\library\Sms as Smslib;
use app\common\model\User;
use think\Session;

/**
 * 短信控制器
 */
class Sms extends Frontend
{

    /**
     * 发送验证码
     *
     * 必选参数:mobile,type<br>
     * 可选参数:无
     */
    public function send()
    {
        $this->code = -1;
        $mobile = $this->request->post("mobile");
        $type = $this->request->post("type");
        $type = $type ? $type : 'register';

        $last = Smslib::get($mobile, $type);
        if ($last && time() - $last['createtime'] < 60)
        {
            //发送频繁
            $this->msg = __('SMS sent frequently');
            return;
        }
        if ($type)
        {
            $userinfo = User::getByMobile($mobile);
            if ($type == 'register' && $userinfo)
            {
                //注册账号
                $this->msg = __('The phone number already exists');
                return;
            }
            else if ($type == 'changepwd' && !$userinfo)
            {
                //修改密码
                $this->msg = __('The phone number not exists');
                return;
            }
            else if (in_array($type, ['changemobile', 'bindmobile']) && $userinfo)
            {
                //修改手机号
                $this->msg = __('The phone number already exists');
                return;
            }
        }
        $ret = Smslib::send($mobile, '', $type);
        if ($ret)
        {
            $this->code = 1;
            $this->msg = "发送成功";
        }
        else
        {
            $this->msg = __('Send failed, please try again later');
        }
        return;
    }

    /**
     * 检测验证码
     *
     * 必选参数:mobile,type,captchacode<br>
     * 可选参数:无
     */
    public function check()
    {
        $this->code = -1;
        $mobile = $this->request->post("mobile");
        $type = $this->request->post("type");
        $type = $type ? $type : 'register';
        $captchacode = $this->request->post("captchacode");

        if ($type)
        {
            $userinfo = User::getByMobile($mobile);
            if ($type == 'register' && $userinfo)
            {
                //注册账号
                $this->msg = __('The phone number already exists');
                return;
            }
            else if ($type == 'changepwd' && !$userinfo)
            {
                //修改密码
                $this->msg = __('The phone number note exists');
                return;
            }
            else if (in_array($type, ['changemobile', 'bindmobile']) && $userinfo)
            {
                //修改手机号
                $this->msg = __('The phone number already exists');
                return;
            }
        }
        $ret = Smslib::check($mobile, $captchacode, $type);
        if ($ret)
        {
            $this->code = 1;
        }
        else
        {
            $this->msg = __('The captcha code not correct');
        }
        return;
    }

    public function sendemail()
    {
        $this->code = -1;
        $email = $this->request->post("email");
        $type = $this->request->post("type");
        $type = $type ? $type : 'register';

        $name = "email{$type}";
        $session = session($name);

        if (!$session)
        {
            if (time() - $session['time'] < 120)
            {
                $this->msg = "发送邮箱验证码过于频繁";
                return;
            }
        }

        if (Smslib::sendemail($email, '', $type))
        {
            $this->code = 1;
            $this->msg = "发送成功";
        }
        else
        {
            $this->msg = "发送邮件失败！请稍后重试！";
        }
    }

    public function checkemail()
    {
        $this->code = -1;
        $email = $this->request->post("email");
        $type = $this->request->post("type");
        $type = $type ? $type : 'register';

        $ret = Smslib::checkemail($email, $captchacode, $type);
        if ($ret)
        {
            $this->code = 1;
        }
        else
        {
            $this->msg = __('The captcha code not correct');
        }
    }

}
