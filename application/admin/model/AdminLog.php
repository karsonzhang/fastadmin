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

    public static function record($title = '')
    {
        $admin = \think\Session::get('admin');
        $admin_id = $admin ? $admin->id : 0;
        $username = $admin ? $admin->username : __('Unknown');
        $content = request()->param();
        foreach ($content as $k => $v)
        {
            if (is_string($v) && strlen($v) > 200 || stripos($k, 'password') !== false)
            {
                unset($content[$k]);
            }
        }
        $title = [];
        $breadcrumb = \app\admin\library\Auth::instance()->getBreadcrumb();
        foreach ($breadcrumb as $k => $v)
        {
            $title[] = $v['title'];
        }
        self::create([
            'title'     => implode(' ', $title),
            'content'   => json_encode($content),
            'url'       => request()->url(),
            'admin_id'  => $admin_id,
            'username'  => $username,
            'useragent' => request()->server('HTTP_USER_AGENT'),
            'ip'        => request()->ip()
        ]);
    }

    public function admin()
    {
        return $this->belongsTo('Admin', 'admin_id')->setEagerlyType(0);
    }

}
