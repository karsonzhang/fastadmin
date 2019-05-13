<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 表格完整示例
 *
 * @icon fa fa-table
 * @remark 在使用Bootstrap-table中的常用方式,更多使用方式可查看:http://bootstrap-table.wenzhixin.net.cn/zh-cn/
 */
class Bootstraptable extends Backend
{

    protected $model = null;
    protected $noNeedRight = ['start', 'pause', 'change', 'detail', 'cxselect', 'searchlist'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('AdminLog');
    }

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax()) {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams(NULL);
            $total = $this->model
                ->where($where)
                ->order($sort, $order)
                ->count();
            $list = $this->model
                ->where($where)
                ->order($sort, $order)
                ->limit($offset, $limit)
                ->select();
            $result = array("total" => $total, "rows" => $list, "extend" => ['money' => mt_rand(100000,999999), 'price' => 200]);

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 详情
     */
    public function detail($ids)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isAjax()) {
            $this->success("Ajax请求成功", null, ['id' => $ids]);
        }
        $this->view->assign("row", $row->toArray());
        return $this->view->fetch();
    }

    /**
     * 启用
     */
    public function start($ids = '')
    {
        $this->success("模拟启动成功");
    }

    /**
     * 暂停
     */
    public function pause($ids = '')
    {
        $this->success("模拟暂停成功");
    }

    /**
     * 切换
     */
    public function change($ids = '')
    {
        $this->success("模拟切换成功");
    }

    /**
     * 联动搜索
     */
    public function cxselect()
    {
        $type = $this->request->get('type');
        $group_id = $this->request->get('group_id');
        $list = null;
        if ($group_id !== '') {
            if ($type == 'group') {
                $groupIds = $this->auth->getChildrenGroupIds(true);
                $list = \app\admin\model\AuthGroup::where('id', 'in', $groupIds)->field('id as value, name')->select();
            } else {
                $adminIds = \app\admin\model\AuthGroupAccess::where('group_id', 'in', $group_id)->column('uid');
                $list = \app\admin\model\Admin::where('id', 'in', $adminIds)->field('id as value, username AS name')->select();
            }
        }
        $this->success('', null, $list);
    }

    /**
     * 搜索下拉列表
     */
    public function searchlist()
    {
        $result = $this->model->limit(10)->select();
        $searchlist = [];
        foreach ($result as $key => $value) {
            $searchlist[] = ['id' => $value['url'], 'name' => $value['url']];
        }
        $data = ['searchlist' => $searchlist];
        $this->success('', null, $data);
    }

}
