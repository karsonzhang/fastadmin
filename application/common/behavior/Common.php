<?php

namespace app\common\behavior;

use think\Config;

class Common
{

    public function run(&$request)
    {
        // 设置mbstring字符编码
        mb_internal_encoding("UTF-8");

        // 如果修改了index.php入口地址，则需要手动修改cdnurl的值
        $cdnurl = preg_replace("/\/(\w+)\.php$/i", '', $request->root());
        // 如果未设置__CDN__则自动匹配得出
        if (!Config::get('view_replace_str.__CDN__'))
        {
            Config::set('view_replace_str.__CDN__', $cdnurl);
        }
        // 如果未设置cdnurl则自动匹配得出
        if (!Config::get('site.cdnurl'))
        {
            Config::set('site.cdnurl', $cdnurl);
        }
        // 如果未设置cdnurl则自动匹配得出
        if (!Config::get('upload.cdnurl'))
        {
            Config::set('upload.cdnurl', $cdnurl);
        }
        if (Config::get('app_debug'))
        {
            // 如果是调试模式将version置为当前的时间戳可避免缓存
            Config::set('site.version', time());
            // 如果是开发模式那么将异常模板修改成官方的
            Config::set('exception_tmpl', THINK_PATH . 'tpl' . DS . 'think_exception.tpl');
        }
        // 如果是trace模式且Ajax的情况下关闭trace
        if (Config::get('app_trace') && $request->isAjax())
        {
            Config::set('app_trace', false);
        }
    }

}
