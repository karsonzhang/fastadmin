<?php

namespace app\common\controller;

use app\admin\library\Auth;
use app\common\model\Configvalue;
use think\Config;
use think\Controller;
use think\Lang;
use think\Session;

load_trait('library/traits/Backend');

/**
 * 后台控制器基类
 */
class Backend extends Controller
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
     * 无需登录的方法,同时也就不需要鉴权了
     * @var array
     */
    protected $noNeedLogin = [];

    /**
     * 无需鉴权的方法,但需要登录
     * @var array
     */
    protected $noNeedRight = [];

    /**
     * 布局模板
     * @var string
     */
    protected $layout = 'default';

    /**
     * 权限控制类
     * @var Auth
     */
    protected $auth = null;

    /**
     * 快速搜索时执行查找的字段
     */
    protected $searchFields = 'id';

    /**
     * 是否是关联查询
     */
    protected $relationSearch = false;

    /**
     * 是否开启Validate验证
     */
    protected $modelValidate = false;

    /**
     * 是否开启模型场景验证
     */
    protected $modelSceneValidate = false;
    
    /**
     * Multi方法可批量修改的字段
     */
    protected $multiFields = 'status';

    /**
     * 引入后台控制器的traits
     */
    use \app\admin\library\traits\Backend;

    public function _initialize()
    {
        $modulename = $this->request->module();
        $controllername = strtolower($this->request->controller());
        $actionname = strtolower($this->request->action());

        $path = '/' . $modulename . '/' . str_replace('.', '/', $controllername) . '/' . $actionname;

        // 定义是否Addtabs请求
        !defined('IS_ADDTABS') && define('IS_ADDTABS', input("addtabs") ? TRUE : FALSE);

        // 定义是否Dialog请求
        !defined('IS_DIALOG') && define('IS_DIALOG', input("dialog") ? TRUE : FALSE);

        // 定义是否AJAX请求
        !defined('IS_AJAX') && define('IS_AJAX', $this->request->isAjax());

        $this->auth = Auth::instance();

        // 设置当前请求的URI
        $this->auth->setRequestUri($path);
        // 检测是否需要验证登录
        if (!$this->auth->match($this->noNeedLogin))
        {
            //检测是否登录
            if (!$this->auth->isLogin())
            {
                $url = Session::get('referer');
                $url = $url ? $url : $this->request->url();
                $this->error(__('Please login first'), url('index/login', ['url' => $url]));
            }
            // 判断是否需要验证权限
            if (!$this->auth->match($this->noNeedRight))
            {
                // 判断控制器和方法判断是否有对应权限
                if (!$this->auth->check($path))
                {
                    $this->error(__('You have no permission'), NULL);
                }
            }
        }

        // 非选项卡时重定向
        if (!$this->request->isPost() && !IS_AJAX && !IS_ADDTABS && !IS_DIALOG && input("ref") == 'addtabs')
        {
            $url = preg_replace_callback("/([\?|&]+)ref=addtabs(&?)/i", function($matches) {
                return $matches[2] == '&' ? $matches[1] : '';
            }, $this->request->url());
            $this->redirect('index/index', [], 302, ['referer' => $url]);
            exit;
        }

        // 设置面包屑导航数据
        $breadcrumb = $this->auth->getBreadCrumb($path);
        array_pop($breadcrumb);
        $this->view->breadcrumb = $breadcrumb;

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
            'jsname'         => 'backend/' . str_replace('.', '/', $controllername),
            'moduleurl'      => url("/{$modulename}", '', false),
            'language'       => $lang,
            'referer'        => Session::get("referer")
        ];

        $this->loadlang($controllername);

        $this->assign('site', $site);
        $this->assign('config', $config);

        $this->assign('admin', Session::get('admin'));
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
     * 生成查询所需要的条件,排序方式
     * @param mixed $searchfields 查询条件
     * @param boolean $relationSearch 是否关联查询
     * @return array
     */
    protected function buildparams($searchfields = null, $relationSearch = null)
    {
        $searchfields = is_null($searchfields) ? $this->searchFields : $searchfields;
        $relationSearch = is_null($relationSearch) ? $this->relationSearch : $relationSearch;
        $search = $this->request->get("search", '');
        $filter = $this->request->get("filter", '');
        $op = $this->request->get("op", '');
        $sort = $this->request->get("sort", "id");
        $order = $this->request->get("order", "DESC");
        $offset = $this->request->get("offset", 0);
        $limit = $this->request->get("limit", 0);
        $filter = json_decode($filter, TRUE);
        $op = json_decode($op, TRUE);
        $filter = $filter ? $filter : [];
        $where = [];
        $modelName = '';
        if ($relationSearch)
        {
            if (!empty($this->model))
            {
                $class = get_class($this->model);
                $name = basename(str_replace('\\', '/', $class));
                $name = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $name));
                $modelName = $name . ".";
            }
            if (stripos($sort, ".") === false)
            {
                $sort = $modelName . $sort;
            }
        }
        if ($search)
        {
            $searcharr = is_array($searchfields) ? $searchfields : explode(',', $searchfields);
            $searchlist = [];
            foreach ($searcharr as $k => $v)
            {
                $searchlist[] = (stripos($v, ".") !== false ? $v : "{$modelName}`{$v}`") . " LIKE '%{$search}%'";
            }
            $where[] = "(" . implode(' OR ', $searchlist) . ")";
        }
        foreach ($filter as $k => $v)
        {
            $sym = isset($op[$k]) ? $op[$k] : '=';
            if (stripos($k, ".") === false)
            {
                $k = $modelName . $k;
            }
            $sym = isset($op[$k]) ? $op[$k] : $sym;
            switch ($sym)
            {
                case '=':
                case '!=':
                case 'LIKE':
                case 'NOT LIKE':
                    $where[] = [$k, $sym, $v];
                    break;
                case '>':
                case '>=':
                case '<':
                case '<=':
                    $where[] = [$k, $sym, intval($v)];
                    break;
                case 'IN(...)':
                case 'NOT IN(...)':
                    $where[] = [$k, str_replace('(...)', '', $sym), explode(',', $v)];
                    break;
                case 'BETWEEN':
                case 'NOT BETWEEN':
                    $where[] = [$k, $sym, array_slice(explode(',', $v), 0, 2)];
                    break;
                case 'LIKE %...%':
                    $where[] = [$k, 'LIKE', "%{$v}%"];
                    break;
                case 'IS NULL':
                case 'IS NOT NULL':
                    $where[] = [$k, strtolower(str_replace('IS ', '', $sym))];
                    break;
                default:
                    break;
            }
        }
        $where = function($query) use ($where) {
            foreach ($where as $k => $v)
            {
                if (is_array($v))
                {
                    call_user_func_array([$query, 'where'], $v);
                }
                else
                {
                    $query->where($v);
                }
            }
        };
        return [$where, $sort, $order, $offset, $limit];
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
