<?php

//支付配置

return [
    'alipay' => [
        // 即时到账方式
        'payment_type'     => 1,
        // 传输协议
        'transport'        => 'http',
        // 编码方式
        'input_charset'    => 'utf-8',
        // 签名方法
        'sign_type'        => 'MD5',
        // 证书路径
        'cacert'           => './cacert.pem',
        //验签公钥地址
        'public_key_path'  => './alipay_public_key.pem',
        'private_key_path' => '',
        // 支付完成异步通知调用地址
        'notify_url'       => '/order/callback_alipay/notify',
        // 支付完成同步返回地址
        'return_url'       => '/order/callback_alipay/return',
        // 支付宝商家 ID
        'partner'          => '2088xxxxxxxx',
        // // 支付宝商家 KEY
        'key'              => 'xxxxxxxxxxxx',
        // // 支付宝商家注册邮箱
        'seller_email'     => 'email@domain.com'
    ],
    'wechat' => [
        //微信支付配置数组
        // 公众账号appid
        'appid'       => '',
        // 商户号
        'mch_id'      => '',
        // 加密key
        'apikey'      => '',
        // 公众号appsecret
        'appsecret'   => '',
        // 证书路径(apiclient_cert.pem)
        'sslcertPath' => '',
        // 密钥路径(apiclient_key.pem)
        'sslkeyPath'  => '',
        // 支付完成异步通知调用地址
        'notify_url'  => ''
    ]
];
