<?php

namespace app\common\library;

use think\Cache;

/**
 * Token类
 */
class Token
{

    /**
     *  缓存用户的Token及UID
     *
     * @param string $token
     * @param int $uid
     * @param int $expire
     */
    public static function set($token, $uid, $expire)
    {
        Cache::set($token, $uid, $expire);
    }

    /**
     *  通过Token获取用户的身份标识
     *
     * @param string $token
     * @return string
     */
    public static function identity($token)
    {
        $uid = Cache::get($token);
        return $uid;
    }

    /**
     * 验证Token是否可用
     * @param string $token
     */
    public static function check($token)
    {
        return Cache::has($token);
    }

    /**
     *  延长Token的有效期
     *  key   用户的Token(随机Hash)
     */
    public static function refresh($token)
    {
        $uid = Cache::get($token);
        Cache::set($token, $uid);
    }

    /**
     *  删除用户的Token缓存
     *
     * @param string $token
     */
    public static function delete($token)
    {
        Cache::rm($token);
    }

}
