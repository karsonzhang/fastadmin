<?php

namespace fast\ucenter\client;

use Exception;
use think\Loader;

class Client
{

    public function __construct()
    {
        $this->initConfig();
        Loader::import('client', dirname(__FILE__) . "/uc_client/"); //加载uc客户端主脚本
    }

    //加载配置
    public function initConfig()
    {
        if (!defined('UC_API'))
        {
            new Exception('未发现uc常量配置信息');
        }
    }

    function __call($method, $params)
    {
        return call_user_func_array($method, $params);
    }

}
