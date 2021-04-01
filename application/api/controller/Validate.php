<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\model\User;

/**
 * 验证接口
 */
class Validate extends Api
{
    protected $noNeedLogin = '*';
    protected $layout = '';
    protected $error = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 检测邮箱
     *
     * @param string $email 邮箱
     * @param string $id    排除会员ID
     */
    public function check_email_available()
    {
        $email = $this->request->post('email');
        $id = (int)$this->request->post('id');
        $count = User::where('email', '=', $email)->where('id', '<>', $id)->count();
        if ($count > 0) {
            $this->error(__('邮箱已经被占用'));
        }
        $this->success();
    }

    /**
     * 检测用户名
     *
     * @param string $username 用户名
     * @param string $id       排除会员ID
     */
    public function check_username_available()
    {
        $username = $this->request->post('username');
        $id = (int)$this->request->post('id');
        $count = User::where('username', '=', $username)->where('id', '<>', $id)->count();
        if ($count > 0) {
            $this->error(__('用户名已经被占用'));
        }
        $this->success();
    }

    /**
     * 检测昵称
     *
     * @param string $nickname 昵称
     * @param string $id       排除会员ID
     */
    public function check_nickname_available()
    {
        $nickname = $this->request->post('nickname');
        $id = (int)$this->request->post('id');
        $count = User::where('nickname', '=', $nickname)->where('id', '<>', $id)->count();
        if ($count > 0) {
            $this->error(__('昵称已经被占用'));
        }
        $this->success();
    }

    /**
     * 检测手机
     *
     * @param string $mobile 手机号
     * @param string $id     排除会员ID
     */
    public function check_mobile_available()
    {
        $mobile = $this->request->post('mobile');
        $id = (int)$this->request->post('id');
        $count = User::where('mobile', '=', $mobile)->where('id', '<>', $id)->count();
        if ($count > 0) {
            $this->error(__('该手机号已经占用'));
        }
        $this->success();
    }

    /**
     * 检测手机
     *
     * @param string $mobile 手机号
     */
    public function check_mobile_exist()
    {
        $mobile = $this->request->post('mobile');
        $count = User::where('mobile', '=', $mobile)->count();
        if (!$count) {
            $this->error(__('手机号不存在'));
        }
        $this->success();
    }

    /**
     * 检测邮箱
     *
     * @param string $mobile 邮箱
     */
    public function check_email_exist()
    {
        $email = $this->request->post('email');
        $count = User::where('email', '=', $email)->count();
        if (!$count) {
            $this->error(__('邮箱不存在'));
        }
        $this->success();
    }

    /**
     * 检测手机验证码
     *
     * @param string $mobile  手机号
     * @param string $captcha 验证码
     * @param string $event   事件
     */
    public function check_sms_correct()
    {
        $mobile = $this->request->post('mobile');
        $captcha = $this->request->post('captcha');
        $event = $this->request->post('event');
        if (!\app\common\library\Sms::check($mobile, $captcha, $event)) {
            $this->error(__('验证码不正确'));
        }
        $this->success();
    }

    /**
     * 检测邮箱验证码
     *
     * @param string $email   邮箱
     * @param string $captcha 验证码
     * @param string $event   事件
     */
    public function check_ems_correct()
    {
        $email = $this->request->post('email');
        $captcha = $this->request->post('captcha');
        $event = $this->request->post('event');
        if (!\app\common\library\Ems::check($email, $captcha, $event)) {
            $this->error(__('验证码不正确'));
        }
        $this->success();
    }
}
