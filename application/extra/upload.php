<?php

//上传配置
return [
    /**
     * 上传地址,如果不使用又拍云,则可以使用/ajax/upload
     */
    'uploadurl' => 'http://v0.api.upyun.com/yourbucketname',
    /**
     * 又拍云或本机的CDN地址
     */
    'cdnurl'    => 'http://yourbucketname.b0.upaiyun.com',
    /**
     * 上传成功后的通知地址
     */
    'notifyurl' => 'http://www.yoursite.com/upyun/notify',
    /**
     * 又拍云Bucket
     */
    'bucket'    => 'yourbucketname',
    /**
     * 生成的policy有效时间
     */
    'expire'    => '86400',
    /**
     * 又拍云formkey
     */
    'formkey'   => '',
    /**
     * 文件保存格式
     */
    'savekey'   => '/uploads/media/{year}{mon}{day}/{filemd5}{.suffix}',
    /**
     * 最大可上传大小
     */
    'maxsize'   => '10mb',
    /**
     * 可上传的文件类型
     */
    'mimetype'  => '*',
    /**
     * 又拍云操作员用户名
     */
    'username'  => '',
    /**
     * 又拍云操作员密码
     */
    'password'  => '',
];
