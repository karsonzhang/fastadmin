<?php

namespace addons\tablemake;

use app\common\library\Menu;
use think\Addons;

/**
 * 在线命令插件
 */
class Tablemake extends Addons
{

    /**
     * 插件安装方法
     * @return bool
     */
    public function install()
    {
        $menu = [
            [
                'name'    => 'tablemake',
                'title'   => '自建表管理',
                'icon'    => 'fa fa-cubes',
                'sublist' => [
                    ['name' => 'tablemake/index', 'title' => '查看列表'],
                    ['name' => 'tablemake/add', 'title' => '添加模块'],
                    ['name' => 'tablemake/edit', 'title' => '编辑模块'],
					['name' => 'tablemake/del', 'title' => '删除模块'],
                    ['name' => 'tablemake/fields', 'title' => '字段管理'],
                    ['name' => 'tablemake/field_add', 'title' => '添加字段'],
                    ['name' => 'tablemake/field_del', 'title' => '删除字段'],
                ]
            ]
        ];
        Menu::create($menu);
        return true;
    }

    /**
     * 插件卸载方法
     * @return bool
     */
    public function uninstall()
    {
        Menu::delete('tablemake');
        return true;
    }

    /**
     * 插件启用方法
     * @return bool
     */
    public function enable()
    {
        Menu::enable('tablemake');
        return true;
    }

    /**
     * 插件禁用方法
     * @return bool
     */
    public function disable()
    {
        Menu::disable('tablemake');
        return true;
    }

}
