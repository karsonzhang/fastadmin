<?php

namespace app\common\library;

use addons\alisms\library\Alisms;
use app\common\model\MobileCode;

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
     * @param   int       $mobile 手机号
     * @param   string    $type   类型
     * @return  array
     */
    public static function get($mobile, $type = 'default')
    {
        return MobileCode::
                        where(['mobile' => $mobile, 'type' => $type])
                        ->order('id', 'DESC')
                        ->find();
    }

    /**
     * 发送验证码
     *
     * @param   int       $mobile 手机号
     * @param   int       $code   验证码
     * @param   string    $type   类型
     * @return  array
     */
    public static function send($mobile, $code = '', $type = 'default')
    {
        $config = get_addon_config('alisms');
        $code = !$code ? mt_rand(1000, 9999) : $code;
        $alisms = new Alisms();
        $ret = $alisms->mobile($mobile)
                ->template($config['template'][$type])
                ->param(['code' => $code])
                ->send();
        if ($ret)
        {
            $time = time();
            MobileCode::create(['type' => $type, 'mobile' => $mobile, 'code' => $code, 'createtime' => $time]);
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    /**
     * 发送通知
     * @param   int       $mobile     手机号
     * @param   string    $template   模板ID
     * @param   array     $params     参数
     * @return  boolean
     */
    public static function notice($mobile, $template, $params = [])
    {
        $alisms = Alisms::instance();
        $ret = $alisms->mobile($mobile)
                ->template($template)
                ->param($params)
                ->send();
        return $ret ? TRUE : FALSE;
    }

    /**
     * 校验验证码
     *
     * @param int       $mobile 手机号
     * @param int       $code   验证码
     * @param string    $type   类型
     * @return boolean
     */
    public static function check($mobile, $code, $type = 'default')
    {
        $time = time() - self::$expire;
        $obj = MobileCode::where(['mobile' => $mobile, 'type' => $type])
                ->order('id', 'DESC')
                ->find();
        if ($obj)
        {
            if ($obj['createtime'] > $time && $obj['times'] <= self::$maxCheckNums)
            {
                $correct = $code == $obj['code'];
                if (!$correct)
                {
                    $obj->times = $obj->times + 1;
                    $obj->save();
                }
                return $correct;
            }
            else
            {
                // 过期则清空该手机验证码
                self::flush($mobile, $type);
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
     * @param int       $mobile 手机号
     * @param string    $type   类型
     * @return boolean
     */
    public static function flush($mobile, $type = 'default')
    {
        MobileCode::
                where(['mobile' => $mobile, 'type' => $type])
                ->delete();
        return TRUE;
    }

}
