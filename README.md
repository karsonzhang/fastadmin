#Fastadmin
Fastadmin是一个基于Yaf(PHP框架)+Bootstrap(UI框架)的极速通用后台管理系统

##功能特性

* 完善的`RBAC`权限管理系统
    *  支持无限级父子级继承权限
    *  根据目录和控制器结构`全自动生成`权限节点
* Bootstrap响应式操作,支持手机平板
* PJAX无刷新操作
* 支持数据库表一键生成控制器和模板
* 支持多语言

##编译YAF
```
$/path/to/phpize
$./configure --with-php-config=/path/to/php-config
$make && make install
```

##YAF文档
http://www.php.net/manual/en/book.yaf.php

##伪静态规则

###Apache
```
#.htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule .* index.php
```

###Nginx
```
location / {
    root   /var/www/yoursitepath;
    index  index.php index.html index.htm;
    if (!-e $request_filename){
        rewrite ^/(.*)$ /index.php/$1 last;
    }
}
请注意在Nginx下需要增加额外的配置,避免相关隐私信息暴露
location ~ /(application|conf|data|system) {
    deny all;
    return 403;
}
```

##Bootstrap组件
http://demo.fastadmin.net/demo.php

##问题反馈
> 在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流
* Email: (karsonzhang#163.com, 把#换成@)
* weibo: [@karsonzhang](http://weibo.com/karsonzhang)
* Github: https://github.com/karsonzhang/fastadmin
* Git@OSC: https://git.oschina.com/karson/fastadmin

##捐助
[Paypal](https://www.paypal.com/) 
[支付宝](https://www.alipay.com/) 

##感激
感谢以下的项目,排名不分先后

* [YAF](https://github.com/laruence/yaf) 
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](http://jquery.com)
* [Datatables](http://datatables.net)
