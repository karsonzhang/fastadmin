<?php

namespace app\admin\validate;

use think\Validate;

class User extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'username' => 'require|regex:\w{3,12}|unique:user',
        'nickname' => 'require|unique:user',
        'password' => 'regex:\S{6,32}',
        'email'    => 'require|email|unique:user',
        'mobile'   => 'require|unique:user'
    ];
    
    /**
    ];
    /**
     * 提示消息
     */
    protected $message = [
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => [],
        'edit' => ['username', 'email', 'nickname', 'password', 'email', 'mobile'],
    ];

}
