<?php

namespace app\admin\behavior;

class AdminLog
{
    public function run(&$response)
    {
        //只记录POST请求的日志
        if (request()->isPost() && config('fastadmin.auto_record_log')) {
            \app\admin\model\AdminLog::record();
        }
    }
}
