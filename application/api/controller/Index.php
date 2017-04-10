<?php

namespace app\api\controller;

use app\common\controller\Api;

class Index extends Api
{

    public function index()
    {
        return json(['code' => 0]);
    }

}
