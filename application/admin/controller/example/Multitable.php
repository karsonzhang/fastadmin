<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 多表格示例
 *
 * @icon fa fa-table
 * @remark 当一个页面上存在多个Bootstrap-table时该如何控制按钮和表格
 */
class Multitable extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 查看
     */
    public function index()
    {
        $this->loadlang('general/attachment');
        $this->loadlang('general/crontab');
        return $this->view->fetch();
    }

}
