<?php

namespace app\common\behavior;

use think\Config;

class Common
{

    public function run(&$params)
    {
        // 如果修改了index.php入口地址，则需要手动修改cdnurl的值
<<<<<<< HEAD
        $cdnurl = preg_replace("/\/(\w+)\.php$/i", '', $params->root());
=======
        $url = preg_replace("/\/(\w+)\.php$/i", '', $request->root());
>>>>>>> master
        // 如果未设置__CDN__则自动匹配得出
        if (!Config::get('view_replace_str.__CDN__'))
        {
            Config::set('view_replace_str.__CDN__', $url);
        }
        // 如果未设置__PUBLIC__则自动匹配得出
        if (!Config::get('view_replace_str.__PUBLIC__'))
        {
            Config::set('view_replace_str.__PUBLIC__', $url . '/');
        }
        // 如果未设置__ROOT__则自动匹配得出
        if (!Config::get('view_replace_str.__ROOT__'))
        {
            Config::set('view_replace_str.__ROOT__', preg_replace("/\/public\/$/", '', $url . '/'));
        }
        // 如果未设置cdnurl则自动匹配得出
        if (!Config::get('site.cdnurl'))
        {
            Config::set('site.cdnurl', $url);
        }
        // 如果未设置cdnurl则自动匹配得出
        if (!Config::get('upload.cdnurl'))
        {
            Config::set('upload.cdnurl', $url);
        }
        if (Config::get('app_debug'))
        {
            // 如果是调试模式将version置为当前的时间戳可避免缓存
            Config::set('site.version', time());
        }
        else
        {
            // 如果是开发模式修改异常页的模板
            Config::set('exception_tmpl', APP_PATH . 'common' . DS . 'view' . DS . 'tpl' . DS . 'think_exception.tpl');
        }
    }

}
