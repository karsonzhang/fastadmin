<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use fast\Random;
use fast\third\Application;
use fast\ucenter\client\Client;
use think\Config;
use think\Cookie;
use think\Loader;

/**
 * 会员中心
 */
class User extends Frontend
{

    // 使用布局
    protected $layout = 'bootstrap';

    public function _initialize()
    {
        parent::_initialize();
        //导入UC常量
        Loader::import('uc', APP_PATH);
    }

    public function index()
    {
        return $this->view->fetch();
    }

    /**
     * 注册会员
     */
    public function register()
    {
        $url = $this->request->get('url', '/');
        if ($this->user->check())
            $this->error(__('You are already logged in'), $url);
        if ($this->request->isPost())
        {
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $repassword = $password;
            $email = $this->request->post('email');
            $captcha = $this->request->post('captcha');
            if (!captcha_check($captcha))
            {
                $this->error(__('Captcha is incorrect'));
            }
            if ($this->user->register($username, $password, $email))
            {
                $synchtml = '';
                ////////////////同步到Ucenter////////////////
                if (defined('UC_STATUS') && UC_STATUS)
                {
                    $uc = new Client();
                    $synchtml = $uc->uc_user_synregister($this->user->id, $password);
                }
                $referer = Cookie::get('referer_url');
                $this->success(__('Sign up successful') . $synchtml, $url);
            }
            else
            {
                $this->error($this->user->getError());
            }
        }
        return $this->view->fetch();
    }

    /**
     * 会员登录
     */
    public function login()
    {
        $url = $this->request->get('url', '/');
        if ($this->user->check())
            $this->error(__('You are already logged in'), $url);
        if ($this->request->isPost())
        {
            $account = $this->request->post('account');
            $password = $this->request->post('password');
//            $captcha = $this->request->post('captcha');
//            if (!captcha_check($captcha))
//            {
//                $this->error(__('Captcha is incorrect'));
//            }
            if ($this->user->login($account, $password))
            {
                $synchtml = '';
                ////////////////同步到Ucenter////////////////
                if (defined('UC_STATUS') && UC_STATUS)
                {
                    $uc = new Client();
                    $synchtml = $uc->uc_user_synlogin($this->user->id);
                }
                $this->success(__('Logged in successful') . $synchtml, $url);
            }
            else
            {
                $this->error($this->user->getError());
            }
        }
        return $this->view->fetch();
    }

    /**
     * 注销登录
     */
    function logout()
    {
        //注销本站
        $this->user->logout();
        $synchtml = '';
        ////////////////同步到Ucenter////////////////
        if (defined('UC_STATUS') && UC_STATUS)
        {
            $uc = new Client();
            $synchtml = $uc->uc_user_synlogout();
        }
        $this->success(__('Logout successful') . $synchtml, '/');
    }

    /**
     * 第三方登录跳转和回调处理
     */
    public function third()
    {
        $action = $this->request->param('action');
        $platform = $this->request->param('platform');
        $config = Config::get('third');
        if (!isset($config[$platform]))
        {
            $this->error(__('Invalid parameters'));
            return;
        }
        $thirdapp = new Application();
        if ($action == 'redirect')
        {
            // 跳转到登录授权页面
            $this->redirect($thirdapp->{$platform}->getAuthorizeUrl());
        }
        else if ($action == 'callback')
        {
            // 授权成功后的回调
            $result = $thirdapp->{$platform}->getUserInfo();
            if ($result)
            {
                $loginret = $this->user->connect($platform, $result);
                if ($loginret)
                {
                    $synchtml = '';
                    ////////////////同步到Ucenter////////////////
                    if (defined('UC_STATUS') && UC_STATUS)
                    {
                        $uc = new Client();
                        $synchtml = $uc->uc_user_synlogin($this->user->id);
                    }
                    $this->success(__('Logged in successful') . $synchtml, '/');
                    return;
                }
            }
            $this->error(__('Operation failed'), 'user/login');
        }
        else
        {
            $this->error(__('Invalid parameters'));
        }

        return;
    }

    /**
     * 修改密码
     */
    public function changepwd()
    {
        if ($this->request->isPost())
        {
            $oldpassword = $this->request->post("oldpassword");
            $newpassword = $this->request->post("newpassword");
            //判断旧密码是否正确
            if ($this->user->password == $this->user->getEncryptPassword($oldpassword, $this->user->salt))
            {
                ////////////////同步到Ucenter////////////////
                if (defined('UC_STATUS') && UC_STATUS)
                {
                    $uc = new Client();
                    $ret = $uc->uc_user_edit($this->user->id, $this->user->username, $newpassword, $this->user->email, $this->user->mobile);
                    // 如果小于0则说明发生错误
                    if ($ret < 0)
                    {
                        $this->error(__('Change password failure'));
                    }
                }

                $salt = Random::alnum();
                $newpassword = $this->user->getEncryptPassword($newpassword, $salt);
                $this->user->save(['password' => $newpassword, 'salt' => $salt]);
                $this->user->logout();
                $synchtml = '';
                ////////////////同步到Ucenter////////////////
                if (defined('UC_STATUS') && UC_STATUS)
                {
                    $uc = new Client();
                    $synchtml = $uc->uc_user_synlogout();
                }
                $this->success(__('Change password successful') . $synchtml, "user/login");
            }
            else
            {
                //旧密码不正确
                $this->error(__('Password is incorrect'));
            }
        }
        return $this->view->fetch();
    }

}
