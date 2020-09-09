<?php

// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
// [ 安装文件 ]
// 建议安装完成后移除此文件
// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');

// 加载框架引导文件
require __DIR__ . '/../thinkphp/base.php';

// 绑定到安装控制器
\think\Route::bind('\app\admin\command\Install', 'controller');

// 开启路由
\think\App::route(true);

// 设置根url
\think\Url::root('');

// 执行应用
\think\App::run()->send();
