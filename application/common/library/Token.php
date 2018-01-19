<?php

namespace app\common\library;

/**
 * Token操作类
 */
class Token
{

    /**
     * 存储Token
     * @param   string    $token      Token
     * @param   int       $user_id    会员ID
     * @param   int       $expire     过期时长,0表示无限,单位秒
     */
    public static function set($token, $user_id, $expire = 0)
    {
        $expiretime = $expire ? time() + $expire : 0;
        \app\common\model\Token::create(['token' => $token, 'user_id' => $user_id, 'expiretime' => $expiretime]);
        return TRUE;
    }

    /**
     * 获取Token内的信息
     * @param   string  $token 
     * @return  array
     */
    public static function get($token)
    {
        $data = \app\common\model\Token::get($token);
        if ($data)
        {
            if (!$data['expiretime'] || $data['expiretime'] > time())
            {
                return $data;
            }
            else
            {
                self::delete($token);
            }
        }
        return [];
    }

    /**
     * 判断Token是否可用
     * @param   string    $token      Token
     * @param   int       $user_id    会员ID
     * @return  boolean
     */
    public static function check($token, $user_id)
    {
        $data = self::get($token);
        return $data && $data['user_id'] == $user_id ? true : false;
    }

    /**
     * 删除Token
     * @param   string  $token
     * @return  boolean
     */
    public static function delete($token)
    {
        $data = \app\common\model\Token::get($token);
        if ($data)
        {
            $data->delete();
            return true;
        }
        return false;
    }

    /**
     * 删除指定用户的所有Token
     * @param   int     $user_id
     * @return  boolean
     */
    public static function clear($user_id)
    {
        \app\common\model\Token::where('user_id', $user_id)->delete();
        return true;
    }

}
