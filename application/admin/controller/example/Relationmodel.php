<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 关联模型
 *
 * @icon fa fa-table
 * @remark 当使用到关联模型时需要重载index方法
 */
class Relationmodel extends Backend
{

    protected $model = null;

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
        $this->relationSearch = true;
        $this->searchFields = "admin.username,id";
        if ($this->request->isAjax())
        {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->with("admin")
                    ->where($where)
                    ->order($sort, $order)
                    ->count();
            $list = $this->model
                    ->with("admin")
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

}
