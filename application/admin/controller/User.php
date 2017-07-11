<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 * 会员管理
 *
 * @icon fa fa-circle-o
 * @internal
 */
class User extends Backend
{
    
    /**
     * User模型对象
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('User');
    }

}
