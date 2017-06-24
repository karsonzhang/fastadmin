<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\Validate;

/**
 * 后台首页
 * @internal
 */
class Index extends Backend
{

    protected $noNeedLogin = ['login', 'logout'];
    protected $noNeedRight = ['index'];
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
            'dashboard'  => 'hot',
            'auth'       => ['new', 'red', 'badge'],
            'auth/admin' => 12,
            'auth/rule'  => 4,
            'general'    => ['18', 'purple'],
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
            return;
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
            $validate = new Validate($rule);
            $result = $validate->check($data);
            if (!$result)
            {
                $this->error($validate->getError(), $url, ['token' => $this->request->token()]);
                return;
            }
            \app\admin\model\AdminLog::setTitle(__('Login'));
            $result = $this->auth->login($username, $password, $keeplogin ? 86400 : 0);
            if ($result === true)
            {
                $this->success(__('Login successful'), $url, ['url' => $url, 'id' => $this->auth->id, 'username' => $username, 'avatar' => $this->auth->avatar]);
                return;
            }
            else
            {
                $this->error(__('Username or password is incorrect'), $url, ['token' => $this->request->token()]);
            }
            return;
        }

        // 根据客户端的cookie,判断是否可以自动登录
        if ($this->auth->autologin())
        {
            $this->redirect($url);
        }
        $this->view->assign('title', __('Login'));
        return $this->view->fetch();
    }

    /**
     * 注销登录
     */
    public function logout()
    {
        $this->auth->logout();
        $this->success(__('Logout successful'), 'index/login');
        return;
    }

}
