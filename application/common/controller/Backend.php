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

        // 非选项卡时重定向
        if (!IS_AJAX && !IS_ADDTABS && $controllername != 'index' && $actionname == 'index')
        {
            $url = $this->request->baseUrl();
            $start = stripos($url, 'index.php');
            $start = $start !== false ? $start : 0;
            $url = substr($url, 0, $start + 9) . str_replace('.', '/', substr($url, $start + 9));
            // 如果是域名部署则加上前缀
            if (Config::get('url_domain_deploy'))
            {
                $url = rtrim(url('/'), '/') . $url;
            }
            header("location:" . url('index/index#!' . urlencode($url), '', false));
            exit;
        }

        $this->auth = Auth::instance();

        // 设置当前请求的URI
        $this->auth->setRequestUri($path);

        // 检测是否需要验证登录
        if (!$this->auth->match($this->noNeedLogin))
        {
            //检测是否登录
            if (!$this->auth->isLogin())
            {
                $this->error(__('Please login first'), url('index/login', ['url' => $this->request->url()]));
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
            'jsname'         => 'backend/' . str_replace('.', '/', $controllername),
            'moduleurl'      => url("/{$modulename}", '', false),
            'language'       => $lang
        ];
        Lang::load(APP_PATH . $modulename . '/lang/' . $lang . '/' . str_replace('.', '/', $controllername) . '.php');

        $this->assign('site', Config::get("site"));
        $this->assign('config', $config);

        $this->assign('admin', Session::get('admin'));
    }

    /**
     * 生成查询所需要的条件,排序方式
     * @param mixed $searchfields 查询条件
     * @return array
     */
    protected function buildparams($searchfields = NULL)
    {
        $searchfields = is_null($searchfields) ? 'id' : $searchfields;
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
        if ($search)
        {
            $searcharr = is_array($searchfields) ? $searchfields : explode(',', $searchfields);
            $searchlist = [];
            foreach ($searcharr as $k => $v)
            {
                $searchlist[] = "`{$v}` LIKE '%{$search}%'";
            }
            $where[] = "(" . implode(' OR ', $searchlist) . ")";
        }
        foreach ($filter as $k => $v)
        {
            $sym = isset($op[$k]) ? $op[$k] : '=';
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
