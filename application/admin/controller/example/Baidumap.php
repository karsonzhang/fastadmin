<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 百度地图
 *
 * @icon fa fa-table
 * @remark 百度地图
 */
class Baidumap extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('AdminLog');
    }

    public function map()
    {
        return $this->view->fetch();
    }

}
