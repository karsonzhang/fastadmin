<?php

namespace app\admin\controller\example;

use app\common\controller\Backend;

/**
 * 百度地图
 *
 * @icon fa fa-map
 * @remark 可以搜索百度位置，调用百度地图的相关API
 */
class Baidumap extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('AdminLog');
    }

    /**
     * 查找地图
     */
    public function map()
    {
        return $this->view->fetch();
    }

    /**
     * 搜索列表
     */
    public function selectpage()
    {
        $this->model = model('Area');
        return parent::selectpage();
    }

}
