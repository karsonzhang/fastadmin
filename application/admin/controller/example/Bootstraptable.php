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
    protected $noNeedRight = ['change', 'detail', 'searchlist'];

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
        if ($this->request->isAjax())
        {
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
            $result = array("total" => $total, "rows" => $list);

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
        $this->view->assign("row", $row->toArray());
        return $this->view->fetch();
    }

    /**
     * 变更
     * @internal
     */
    public function change()
    {
        $this->success();
    }

    /**
     * 搜索下拉列表
     */
    public function searchlist()
    {
        $result = $this->model->limit(10)->select();
        $searchlist = [];
        foreach ($result as $key => $value)
        {
            $searchlist[] = ['id' => $value['url'], 'name' => $value['url']];
        }
        $data = ['searchlist' => $searchlist];
        $this->success('', null, $data);
    }

}
