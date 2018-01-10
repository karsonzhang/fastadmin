<?php

namespace app\admin\behavior;

use think\Config;

class AdminLog
{

    public function run(&$params)
    {
        if (request()->isPost())
        {
            \app\admin\model\AdminLog::record();
        }
    }

}
