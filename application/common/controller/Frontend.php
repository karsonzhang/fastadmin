<?php

namespace app\common\controller;

use app\common\library\Auth;
use app\common\model\Configvalue;
use think\Config;
use think\Controller;
use think\Lang;

class Frontend extends Controller
{

    /**
     *
     * @var Auth
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

        // 语言检测
        $lang = Lang::detect();

        // 配置信息
        $config = [
            'site'           => Config::get("site"),
            'upload'         => Configvalue::upload(),
            'modulename'     => $modulename,
            'controllername' => $controllername,
            'actionname'     => $actionname,
            'jsname'         => 'frontend/' . str_replace('.', '/', $controllername),
            'subdomain'      => 0,
            'language'       => $lang
        ];
        Lang::load(APP_PATH . $modulename . '/lang/' . $lang . '/' . str_replace('.', '/', $controllername) . '.php');

        $this->assign('site', Config::get("site"));
        $this->assign('config', $config);
    }

}
