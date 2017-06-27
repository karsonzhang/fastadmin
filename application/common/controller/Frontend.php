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

        $site = Config::get("site");

        // 配置信息
        $config = [
            'site'           => array_intersect_key($site, array_flip(['name', 'cdnurl', 'version', 'timezone', 'languages'])),
            'upload'         => Configvalue::upload(),
            'modulename'     => $modulename,
            'controllername' => $controllername,
            'actionname'     => $actionname,
            'jsname'         => 'frontend/' . str_replace('.', '/', $controllername),
            'moduleurl'      => url("/{$modulename}", '', false),
            'language'       => $lang
        ];
        $this->loadlang($controllername);
        $this->assign('site', $site);
        $this->assign('config', $config);
    }
    
    /**
     * 加载语言文件
     * @param string $name
     */
    protected function loadlang($name)
    {
        Lang::load(APP_PATH . $this->request->module() . '/lang/' . Lang::detect() . '/' . str_replace('.', '/', $name) . '.php');
    }

}
