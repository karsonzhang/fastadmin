<?php

//支付配置

return [
    // 阿里大鱼短信配置
    'alisms'  => [
        'key'    => '',
        'secret' => ''
    ],
    // 环信配置
    'easemob' => [
        'org_name'      => '',
        'app_name'      => '',
        'client_id'     => '',
        'client_secret' => '',
    ],
    // 七牛上传配置
    'qiniu'   => [
        'secretkey' => '',
        'accesskey' => '',
        //超时时间
        'expire'    => 86400,
        //bucket配置
        'file'      => 'uploadbucket',
        'task'      => 'taskbucket',
        'share'     => 'sharebucket',
        //bucket对应域名
        'domain'    => [
            'uploadbucket' => 'http://1.qiniudn.com/',
            'taskbucket'   => 'http://1.qiniudn.com/',
            'sharebucket'  => 'http://1.qiniudn.com/',
        ]
    ],
    // 又拍云配置
    'upyun'   => [
        'bucketname' => '',
        'username'   => '',
        'password'   => '',
        'endpoint'   => 'v0.api.upyun.com',
    ]
];
