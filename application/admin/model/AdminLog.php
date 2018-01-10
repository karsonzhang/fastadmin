<?php

namespace app\admin\model;

<<<<<<< HEAD
use app\admin\library\Auth;
=======
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
use think\Model;

class AdminLog extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = '';
    //自定义日志标题
    protected static $title = '';
    //自定义日志内容
    protected static $content = '';

    public static function setTitle($title)
    {
        self::$title = $title;
    }

    public static function setContent($content)
    {
        self::$content = $content;
    }

    public static function record($title = '')
    {
<<<<<<< HEAD
        $auth = Auth::instance();
        $admin_id = $auth->isLogin() ? $auth->id : 0;
        $username = $auth->isLogin() ? $auth->username : __('Unknown');
=======
        $admin = \think\Session::get('admin');
        $admin_id = $admin ? $admin->id : 0;
        $username = $admin ? $admin->username : __('Unknown');
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
        $content = self::$content;
        if (!$content)
        {
            $content = request()->param();
            foreach ($content as $k => $v)
            {
                if (is_string($v) && strlen($v) > 200 || stripos($k, 'password') !== false)
                {
                    unset($content[$k]);
                }
            }
        }
        $title = self::$title;
        if (!$title)
        {
            $title = [];
<<<<<<< HEAD
            $breadcrumb = Auth::instance()->getBreadcrumb();
=======
            $breadcrumb = \app\admin\library\Auth::instance()->getBreadcrumb();
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
            foreach ($breadcrumb as $k => $v)
            {
                $title[] = $v['title'];
            }
            $title = implode(' ', $title);
        }
        self::create([
            'title'     => $title,
            'content'   => !is_scalar($content) ? json_encode($content) : $content,
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
