<?php

namespace app\admin\controller\auth;

use app\common\controller\Backend;
use fast\Random;
use fast\Tree;

/**
 * 管理员管理
 *
 * @icon fa fa-users
 * @remark 一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成
 */
class Admin extends Backend
{

    protected $model = null;
    //当前登录管理员所有子节点组别
    protected $childrenIds = [];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Admin');

        $groups = $this->auth->getGroups();

        // 取出所有分组
        $grouplist = model('AuthGroup')->all(['status' => 'normal']);
        $objlist = [];
        foreach ($groups as $K => $v)
        {
            // 取出包含自己的所有子节点
            $childrenlist = Tree::instance()->init($grouplist)->getChildren($v['id'], TRUE);
            $obj = Tree::instance()->init($childrenlist)->getTreeArray($v['pid']);
            $objlist = array_merge($objlist, Tree::instance()->getTreeList($obj));
        }
        $groupdata = [];
        foreach ($objlist as $k => $v)
        {
            $groupdata[$v['id']] = $v['name'];
        }
        $this->childrenIds = array_keys($groupdata);
        $this->view->assign('groupdata', $groupdata);
    }

    /**
     * 添加
     */
    public function add()
    {
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                $params['salt'] = Random::basic(4);
                $params['password'] = md5(md5($params['password']) . $params['salt']);

                $admin = $this->model->create($params);
                $group = $this->request->post("group/a");

                //过滤不允许的组别,避免越权
                $group = array_intersect($this->childrenIds, $group);
                $dataset = [];
                foreach ($group as $value)
                {
                    $dataset[] = ['uid' => $admin->id, 'group_id' => $value];
                }
                model('AuthGroupAccess')->saveAll($dataset);
                $this->code = 1;
            }

            return;
        }
        return $this->view->fetch();
    }

    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                if ($params['password'])
                {
                    $params['salt'] = Random::basic(4);
                    $params['password'] = md5(md5($params['password']) . $params['salt']);
                }
                $row->save($params);

                // 先移除所有权限
                model('AuthGroupAccess')->where('uid', $row->id)->delete();

                $group = $this->request->post("group/a");

                // 过滤不允许的组别,避免越权
                $group = array_intersect($this->childrenIds, $group);

                $dataset = [];
                foreach ($group as $value)
                {
                    $dataset[] = ['uid' => $row->id, 'group_id' => $value];
                }
                model('AuthGroupAccess')->saveAll($dataset);
                $this->code = 1;
            }

            return;
        }
        $grouplist = $this->auth->getGroups($row['id']);
        $groupids = [];
        foreach ($grouplist as $k => $v)
        {
            $groupids[] = $v['id'];
        }
        $this->view->assign("row", $row);
        $this->view->assign("groupids", $groupids);
        return $this->view->fetch();
    }

    /**
     * 删除
     */
    public function del($ids = "")
    {
        $this->code = -1;
        if ($ids)
        {
            $count = $this->model->where('id', 'in', $ids)->delete();
            if ($count)
            {
                model('AuthGroupAccess')->where('uid', 'in', $ids)->delete();
                $this->code = 1;
            }
        }

        return;
    }

}
