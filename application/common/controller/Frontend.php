<?php

namespace app\common\controller;

use app\common\library\Auth;
use think\Controller;

class Frontend extends Controller
{

    /**
     *
     * @var \app\common\library\Auth
     */
    protected $user = null;

    /**
     * 布局模板
     * @var string
     */
    protected $layout = '';

    public function _initialize()
    {
        $modulename = $this->request->module();
        $controllername = strtolower($this->request->controller());
        $actionname = strtolower($this->request->action());

        $path = '/' . $modulename . '/' . str_replace('.', '/', $controllername) . '/' . $actionname;

        $this->user = Auth::instance();

        // 设置当前请求的URI
        $this->user->setRequestUri($path);

        // 检测当前是否登录并进行初始化
        $this->user->init();

        // 将auth对象渲染至视图
        $this->view->assign("user", $this->user);

        // 如果有使用模板布局
        if ($this->layout)
        {
            $this->view->engine->layout('layout/' . $this->layout);
        }
    }

}
