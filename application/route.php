<?php

// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\Route;
//Route::rule('hello/:name', 'api/test/save','get');
// 路由分组
Route::group('api',function (){
    Route::rule('hello', 'api/:v1.:test/save','get');
    Route::resource('blogs','api/test');
});

//Route::group('admin',function (){
//    Route::get('good','admin/test/goods');
//});


return [
    //别名配置,别名只能是映射到控制器且访问时必须加上请求的方法
    '__alias__'   => [
    ],
    //变量规则
    '__pattern__' => [
    ],
//        域名绑定到模块
        '__domain__'  => [
//            'admin' => 'admin',
            'api'   => 'api',
        ],

//    'hello/:name' => 'api/test/save', // 添加到 api/test/save 方法
];

Route::get('tests','api/test')->where(['id',[0-9]]);
Route::post('tests','api/test');

