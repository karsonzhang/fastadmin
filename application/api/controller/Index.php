<?php

namespace app\api\controller;

use app\common\controller\Api;

/**
 * 首页接口
 */
class Index extends Api
{

    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    /**
     * 首页
     * 
     * 必选参数:无<br>
     * 可选参数:lng,lat
     */
    public function index()
    {
        $this->success('请求成功');
    }

}
