<?php

namespace app\common\controller;

use app\common\library\Auth;
use app\common\model\Configvalue;
use think\Config;
use think\Controller;
use think\Lang;
use think\Session;

class Frontend extends Controller
{

    /**
     * 返回码,默认为null,当设置了该值后将输出json数据
     * @var int
     */
    protected $code = null;

    /**
     * 返回内容,默认为null,当设置了该值后将输出json数据
     * @var mixed
     */
    protected $data = null;

    /**
     * 返回文本,默认为空
     * @var mixed
     */
    protected $msg = '';

    /**
     *
     * @var Auth
     */
    protected $user = null;

    /**
     * 无需登录的方法，默认全部都无需登录
     * @var array
     */
    protected $noNeedLogin = ['*'];

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
        
        // 检测是否需要验证登录
        if (!$this->user->match($this->noNeedLogin))
        {
            //检测是否登录
            if (!$this->user->isLogin())
            {
                $url = Session::get('referer');
                $url = $url ? $url : $this->request->url();
                $this->error(__('Please login first'), url('/user/login', ['url' => $url]));
            }
        }
        
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

    /**
     * 析构方法
     *
     */
    public function __destruct()
    {
        //判断是否设置code值,如果有则变动response对象的正文
        if (!is_null($this->code))
        {
            $this->result($this->data, $this->code, $this->msg, 'json');
        }
    }

}
