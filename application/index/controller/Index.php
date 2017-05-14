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

    public function news()
    {
        $newslist = \app\common\model\Page::where('category_id', 1)->order('weigh', 'desc')->select();
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }

}
