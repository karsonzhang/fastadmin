<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 单页管理
 *
 * @icon fa fa-circle-o
 * @remark 用于管理普通的单页面,通常用于关于我们、联系我们、商务合作等单一页面
 */
class Page extends Backend
{

    protected $model = null;
    protected $relationSearch = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Page');
    }

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax())
        {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->with("category")
                    ->where($where)
                    ->order($sort, $order)
                    ->count();
            $list = $this->model
                    ->with("category")
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
