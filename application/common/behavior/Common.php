<?php

namespace app\common\behavior;

use think\Config;

class Common
{

    public function run(&$params)
    {
        $cdnurl = str_replace('/index.php', '', $params->root());
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
    }

}
