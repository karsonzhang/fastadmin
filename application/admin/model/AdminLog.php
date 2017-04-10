<?php

namespace app\admin\model;

use think\Model;

class AdminLog extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = '';

    public static function record($title, $content = '', $username = '')
    {
        $admin = \think\Session::get('admin');
        $admin_id = $admin ? $admin->id : 0;
        $username = $username ? $username : ($admin ? $admin->username : __(''));
        self::create([
            'title'    => $title,
            'content'  => $content,
            'url'      => request()->url(),
            'admin_id' => $admin_id,
            'username' => $username
        ]);
    }

}
