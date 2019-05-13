<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 控制器间跳转
 *
 * @icon fa fa-table
 * @remark FastAdmin支持在控制器间跳转,点击后将切换到另外一个TAB中,无需刷新当前页面
 */
class Controllerjump extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('AdminLog');
    }

}
