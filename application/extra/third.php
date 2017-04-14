<?php

// 第三方登录配置
return [
    // 微博配置
    // 申请请到http://open.weibo.com
    'weibo'  => [
        'app_id'     => '',
        'app_secret' => '',
        'callback'   => '',
    ],
    // 微信
    // 申请请到https://open.weixin.qq.com
    'wechat' => [
        'app_id'     => '',
        'app_secret' => '',
        'callback'   => '',
        'scope'      => 'snsapi_userinfo',
    ],
    // QQ
    // 申请请到https://connect.qq.com
    'qq'     => [
        'app_id'     => '',
        'app_secret' => '',
        'scope'      => 'get_user_info',
        'callback'   => '',
    ],
];
