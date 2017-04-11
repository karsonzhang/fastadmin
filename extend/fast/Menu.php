<?php

namespace fast;

use app\admin\library\Auth;
use fast\Tree;
use think\Config;
use think\Db;

/**
 * 菜单
 */
class Menu
{

    protected static $instance;
    //默认配置
    protected $config = [];

    public function __construct($options = [])
    {
        if ($config = Config::get('menu'))
        {
            $this->config = array_merge($this->config, $config);
        }
        $this->config = array_merge($this->config, is_array($options) ? $options : []);
    }

    /**
     * 单例
     * @param array $options 参数
     * @return Menu
     */
    public static function instance($options = [])
    {
        if (is_null(self::$instance))
        {
            self::$instance = new static($options);
        }

        return self::$instance;
    }

    /**
     * 导入节点数据
     * @param array $treearr
     * @param int $pid
     * @param string $module
     */
    public function import($treearr, $pid = 0, $module = NULL)
    {
        $module = is_null($module) ? Config::user('request.modulename') : $module;
        foreach ($treearr as $key => & $v)
        {
            $controller = strtolower($v['controller']) . ($v['childlist'] ? "_folder" : '');
            $icon = isset($v['icon']) ? $v['icon'] : (stripos($v['name'], '_') !== FALSE ? $v['childlist'] ? 'folder' : 'circle-o' : strtolower($v['name']));
            $actionkeys = array_keys($v['actionlist']);
            $action = '-' . ($v['actionlist'] ? reset($actionkeys) : '');
            $values = array(
                'name'       => $v['name'],
                'weigh'      => $key,
                'pid'        => $pid,
                'module'     => $module,
                'controller' => $controller,
                'action'     => $action,
                'icon'       => $icon,
                'type'       => 'menu',
                'status'     => 'normal'
            );
            $id = Db::table("node")->data($values)->insert();
            $v['id'] = $id;
        }
        unset($v);
        foreach ($treearr as $k => $v)
        {
            if ($v['childlist'])
            {
                $this->import($v['childlist'], $v['id'], $module);
            }
            else
            {
                $i = 0;
                foreach ($v['actionlist'] as $m => $n)
                {
                    $values = array(
                        'name'       => $n ? $n : $m,
                        'weigh'      => $i,
                        'pid'        => $v['id'],
                        'module'     => $module,
                        'controller' => strtolower($v['controller']),
                        'action'     => $m,
                        'icon'       => 'circle-o',
                        'type'       => 'file',
                        'status'     => 'normal'
                    );
                    Db::table("node")->data($values)->insert();
                    $i++;
                }
            }
        }
    }

    /**
     * 获取左侧菜单栏
     *
     * @param array $params URL对应的badge数据
     * @return string
     */
    public function sidebar($params = [])
    {
        $colorArr = ['red', 'green', 'yellow', 'blue', 'teal', 'orange', 'purple'];
        $colorNums = count($colorArr);
        $badgeList = [];
        // 生成菜单的badge
        foreach ($params as $k => $v)
        {
            if (stripos($k, '/') === false)
            {
                $url = '/admin/' . $k;
            }
            else
            {
                $url = url($k);
            }

            if (is_array($v))
            {
                $nums = isset($v[0]) ? $v[0] : 0;
                $color = isset($v[1]) ? $v[1] : $colorArr[(is_numeric($nums) ? $nums : strlen($nums)) % $colorNums];
                $class = isset($v[2]) ? $v[2] : 'label';
            }
            else
            {
                $nums = $v;
                $color = $colorArr[(is_numeric($nums) ? $nums : strlen($nums)) % $colorNums];
                $class = 'label';
            }
            //必须nums大于0才显示
            if ($nums)
            {
                $badgeList[$url] = '<small class="' . $class . ' pull-right bg-' . $color . '">' . $nums . '</small>';
            }
        }

        // 读取管理员当前拥有的权限节点
        $userRule = Auth::instance()->getRuleList();

        $select_id = 0;
        $dashboard = rtrim(url('dashboard/'), '/');
        // 必须将结果集转换为数组
        $ruleList = collection(model('AuthRule')->where('ismenu', 1)->order('weigh', 'desc')->cache("__menu__")->select())->toArray();
        foreach ($ruleList as $k => &$v)
        {
            if (!in_array($v['name'], $userRule))
                continue;
            $select_id = $v['name'] == $dashboard ? $v['id'] : $select_id;
            $v['url'] = $v['name'];
            $v['badge'] = isset($badgeList[$v['name']]) ? $badgeList[$v['name']] : '';
        }
        // 构造菜单数据
        Tree::instance()->init($ruleList);
        $menu = Tree::instance()->getTreeMenu(0, '<li class="@class"><a href="@url" addtabs="@id" url="@url"><i class="@icon"></i> <span>@title</span> <span class="pull-right-container">@caret @badge</span></a> @childlist</li>', $select_id, '', 'ul', 'class="treeview-menu"');
        return $menu;
    }

}
