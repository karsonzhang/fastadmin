<?php

namespace app\common\library;

use app\admin\model\AuthRule;
use fast\Tree;
use think\exception\PDOException;

class Menu
{

    /**
     * 创建菜单
     * @param array $menu
     * @param mixed $parent 父类的name或pid
     */
    public static function create($menu, $parent = 0)
    {
        if (!is_numeric($parent))
        {
            $parentRule = AuthRule::getByName($parent);
            $pid = $parentRule ? $parentRule['id'] : 0;
        }
        else
        {
            $pid = $parent;
        }
        $allow = array_flip(['file', 'name', 'title', 'icon', 'condition', 'remark', 'ismenu']);
        foreach ($menu as $k => $v)
        {
            $hasChild = isset($v['sublist']) && $v['sublist'] ? true : false;

            $data = array_intersect_key($v, $allow);

            $data['ismenu'] = isset($data['ismenu']) ? $data['ismenu'] : ($hasChild ? 1 : 0);
            $data['icon'] = isset($data['icon']) ? $data['icon'] : ($hasChild ? 'fa fa-list' : 'fa fa-circle-o');
            $data['pid'] = $pid;
            $data['status'] = 'normal';
            try
            {
                $menu = AuthRule::create($data);
                if ($hasChild)
                {
                    self::create($v['sublist'], $menu->id);
                }
            }
            catch (PDOException $e)
            {
                print_r($e);
            }
        }
    }

    /**
     * 删除菜单
     * @param string $name 规则name 
     * @return boolean
     */
    public static function delete($name)
    {
        $menu = AuthRule::getByName($name);
        if ($menu)
        {
            // 必须将结果集转换为数组
            $ruleList = collection(model('AuthRule')->order('weigh', 'desc')->field('id,pid,name')->select())->toArray();
            // 构造菜单数据
            $ids = Tree::instance()->init($ruleList)->getChildrenIds($menu['id'], true);
            if ($ids)
            {
                AuthRule::destroy($ids);
            }
            return true;
        }
        return false;
    }

}
