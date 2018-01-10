<?php

namespace app\admin\controller;

<<<<<<< HEAD
use app\admin\model\AdminLog;
use app\common\controller\Backend;
use think\Config;
use think\Hook;
=======
use app\common\controller\Backend;
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
use think\Validate;

/**
 * 后台首页
 * @internal
 */
class Index extends Backend
{

    protected $noNeedLogin = ['login'];
    protected $noNeedRight = ['index', 'logout'];
    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 后台首页
     */
    public function index()
    {
        //
        $menulist = $this->auth->getSidebar([
<<<<<<< HEAD
            'dashboard' => 'hot',
            'addon'     => ['new', 'red', 'badge'],
            'auth/rule' => 'side',
            'general'   => ['new', 'purple'],
=======
            'dashboard'  => 'hot',
            'addon'       => ['new', 'red', 'badge'],
            'auth/rule'  => 'side',
            'general'    => ['18', 'purple'],
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
                ], $this->view->site['fixedpage']);
        $this->view->assign('menulist', $menulist);
        $this->view->assign('title', __('Home'));
        return $this->view->fetch();
    }

    /**
     * 管理员登录
     */
    public function login()
    {
        $url = $this->request->get('url', 'index/index');
        if ($this->auth->isLogin())
        {
            $this->error(__("You've logged in, do not login again"), $url);
        }
        if ($this->request->isPost())
        {
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $keeplogin = $this->request->post('keeplogin');
            $token = $this->request->post('__token__');
            $rule = [
                'username'  => 'require|length:3,30',
                'password'  => 'require|length:3,30',
                '__token__' => 'token',
            ];
            $data = [
                'username'  => $username,
                'password'  => $password,
                '__token__' => $token,
            ];
<<<<<<< HEAD
            if (Config::get('fastadmin.login_captcha'))
            {
                $rule['captcha'] = 'require|captcha';
                $data['captcha'] = $this->request->post('captcha');
            }
            $validate = new Validate($rule, [], ['username' => __('Username'), 'password' => __('Password'), 'captcha' => __('Captcha')]);
=======
            $validate = new Validate($rule);
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
            $result = $validate->check($data);
            if (!$result)
            {
                $this->error($validate->getError(), $url, ['token' => $this->request->token()]);
            }
<<<<<<< HEAD
            AdminLog::setTitle(__('Login'));
=======
            \app\admin\model\AdminLog::setTitle(__('Login'));
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
            $result = $this->auth->login($username, $password, $keeplogin ? 86400 : 0);
            if ($result === true)
            {
                $this->success(__('Login successful'), $url, ['url' => $url, 'id' => $this->auth->id, 'username' => $username, 'avatar' => $this->auth->avatar]);
            }
            else
            {
                $this->error(__('Username or password is incorrect'), $url, ['token' => $this->request->token()]);
            }
        }

        // 根据客户端的cookie,判断是否可以自动登录
        if ($this->auth->autologin())
        {
            $this->redirect($url);
        }
<<<<<<< HEAD
        $background = cdnurl(Config::get('fastadmin.login_background'));
        $this->view->assign('background', $background);
        Hook::listen("login_init", $this->request);
=======
        $background = cdnurl("/assets/img/loginbg.jpg");
        $this->view->assign('background', $background);
        \think\Hook::listen("login_init", $this->request);
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
        return $this->view->fetch();
    }

    /**
     * 注销登录
     */
    public function logout()
    {
        $this->auth->logout();
        $this->success(__('Logout successful'), 'index/login');
    }

}
