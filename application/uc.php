<?php

//UC配置
// Ucenter配置配置
define('UC_STATUS', false);  //是否开启Ucenter同步

define('UC_CONNECT', 'mysql');

// 数据库相关 (mysql 连接时, 并且没有设置 UC_DBLINK 时, 需要配置以下变量)
define('UC_DBHOST', 'localhost');   // UCenter 数据库主机
define('UC_DBUSER', 'root');    //
define('UC_DBPW', '');     //
define('UC_DBNAME', 'ucenter');    //
define('UC_DBCHARSET', 'utf8');    //
define('UC_DBTABLEPRE', 'ucenter.uc_');   // UCenter 数据库表前缀
define('UC_DBCONNECT', '0');       //是否持久链接
//
// 通信相关
define('UC_KEY', '123456789');    // 与 UCenter 的通信密钥, 要与 UCenter 保持一致
define('UC_API', 'http://www.ucenter.com'); // UCenter 的 URL 地址, 在调用头像时依赖此常量
define('UC_CHARSET', 'utf-8');    // UCenter 的字符集
define('UC_IP', '');     // UCenter 的 IP, 当 UC_CONNECT 为非 mysql 方式时, 并且当前应用服务器解析域名有问题时, 请设置此值
define('UC_APPID', 1);     // 当前应用的 ID
define('UC_PPP', '20');     //在线默认分页大小