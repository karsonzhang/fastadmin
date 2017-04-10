<?php

namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{

    protected $layout = 'bootstrap';

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        return $this->view->fetch();
    }

}
