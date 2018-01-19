<?php

namespace app\common\library;

use think\Hook;

/**
 * 验证码类
 */
class Sms
{

    /**
     * 验证码有效时长
     * @var int 
     */
    protected static $expire = 120;

    /**
     * 最大允许检测的次数
     * @var int 
     */
    protected static $maxCheckNums = 10;

    /**
     * 获取最后一次手机发送的数据
     *
     * @param   int       $mobile   手机号
     * @param   string    $event    事件
     * @return  Sms
     */
    public static function get($mobile, $event = 'default')
    {
        $sms = \app\common\model\Sms::
                where(['mobile' => $mobile, 'event' => $event])
                ->order('id', 'DESC')
                ->find();
        $result = Hook::listen('sms_get', $sms);
        return $result ? $result : NULL;
    }

    /**
     * 发送验证码
     *
     * @param   int       $mobile   手机号
     * @param   int       $code     验证码,为空时将自动生成4位数字
     * @param   string    $event    事件
     * @return  boolean
     */
    public static function send($mobile, $code = NULL, $event = 'default')
    {
        $code = is_null($code) ? mt_rand(1000, 9999) : $code;
        $time = time();
        $sms = \app\common\model\Sms::create(['event' => $event, 'mobile' => $mobile, 'code' => $code, 'createtime' => $time]);
        $result = Hook::listen('sms_send', $sms);
        if (!$result)
        {
            $sms->delete();
            return FALSE;
        }
        return TRUE;
    }

    /**
     * 发送通知
     * 
     * @param   array     $params     参数
     * @return  boolean
     */
    public static function notice($params = [])
    {
        $result = Hook::listen('sms_notice', $params);
        return $result ? TRUE : FALSE;
    }

    /**
     * 校验验证码
     *
     * @param   int       $mobile     手机号
     * @param   int       $code       验证码
     * @param   string    $event      事件
     * @return  boolean
     */
    public static function check($mobile, $code, $event = 'default')
    {
        $time = time() - self::$expire;
        $sms = \app\common\model\Sms::where(['mobile' => $mobile, 'event' => $event])
                ->order('id', 'DESC')
                ->find();
        if ($sms)
        {
            if ($sms['createtime'] > $time && $sms['times'] <= self::$maxCheckNums)
            {
                $correct = $code == $sms['code'];
                if (!$correct)
                {
                    $sms->times = $sms->times + 1;
                    $sms->save();
                    return FALSE;
                }
                else
                {
                    $result = Hook::listen('sms_check', $sms);
                    return $result;
                }
            }
            else
            {
                // 过期则清空该手机验证码
                self::flush($mobile, $event);
                return FALSE;
            }
        }
        else
        {
            return FALSE;
        }
    }

    /**
     * 清空指定手机号验证码
     *
     * @param   int       $mobile     手机号
     * @param   string    $event      事件
     * @return  boolean
     */
    public static function flush($mobile, $event = 'default')
    {
        \app\common\model\Sms::
                where(['mobile' => $mobile, 'event' => $event])
                ->delete();
        Hook::listen('sms_flush');
        return TRUE;
    }

}
