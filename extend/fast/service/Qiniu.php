<?php

namespace fast\service;

use think\Config;
use think\Log;

/**
 * 七牛上传文件管理
 */
class Qiniu
{

    const QINIU_RS = 'http://rs.qbox.me';

    static $_config = null;

    /**
     * 获取文件
     *
     * @param string $domain   域名
     * @param string $name     文件名
     * @param string $param    附加参数
     * @return string
     */
    public static function download($domain, $name, $param = [])
    {
        $url = $domain . $name . '?' . http_build_query($param);
        $token = self::sign($url);
        return $url . '&token=' . $token;
    }

    /**
     * 重命名【移动】
     *
     * @param string $from 来源位置
     * @param string $to   目标位置
     * return bool
     */
    public static function move($from, $to)
    {
        // $bucket = $this->_config['bucket'];
        $op = '/move/' . self::qiniuEncode($from) . '/' . self::qiniuEncode($to);
        return self::opration($op);
    }

    /**
     * 复制文件
     *
     * @param string $from      来源文件
     * @param string $saveas    目标文件
     * @return bool
     */
    public static function copy($from, $saveas)
    {
        // $bucket = $this->_config['bucket'];
        $op = '/copy/' . self::qiniuEncode($from) . '/' . self::qiniuEncode($saveas);
        return self::opration($op);
    }

    /**
     * 获取token
     *
     * @param string $bucket    空间名
     * @param string $key       密钥
     * @param int    $max       文件大小限制
     * @param int    $timeout   超时时间
     * @return string
     */
    public static function getToken($bucket, $key, $max = 10485760, $timeout = 600)
    {
        $setting = array(
            'scope'      => $bucket,
            'saveKey'    => $key,
            'deadline'   => $timeout + $_SERVER['REQUEST_TIME'],
            'fsizeLimit' => intval($max),
        );
        $setting = self::qiniuEncode(json_encode($setting));
        return self::sign($setting) . ':' . $setting;
    }

    /**
     * 删除
     *
     * @param string $uri   文件路径
     * @return boolean
     */
    public static function delete($uri)
    {
        $file = self::qiniuEncode($uri);
        return self::opration('/delete/' . $file);
    }

    /**
     * 判断文件是否存在
     *
     * @param string $uri
     * @return boolean
     */
    public static function has($uri)
    {
        $op = '/stat/' . self::qiniuEncode($uri);
        return self::opration($op);
    }

    /**
     * 转pdf
     *
     * @param string $bucket
     * @param string $key
     * @param string $saveas
     * @return boolean
     */
    public static function toPdf($bucket, $key, $saveas)
    {
        $API = 'http://api.qiniu.com';
        $op = '/pfop/';
        $data = 'bucket=' . $bucket . '&key=' . $key . '&fops=yifangyun_preview|saveas/' . self::qiniuEncode($saveas);
        return self::opration($op, $data, $API);
    }

    /**
     * 七牛操作
     *
     * @param string $op 操作命令
     * @param string $data 操作结果
     * @param string $host
     * @return boolean
     */
    private static function opration($op, $data = null, $host = self::QINIU_RS)
    {
        $token = self::sign(is_string($data) ? $op . "\n" . $data : $op . "\n");
        $url = $host . $op;
        $header = array('Authorization: QBox ' . $token);

        if ($ch = curl_init($url))
        {
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            if ($data)
            {
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }
            curl_setopt($ch, CURLOPT_HEADER, 1);
            $response = curl_exec($ch);
            $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($status == 200)
            {
                return true;
            }
            // elseif (\Config::get('debug'))
            // {
            // 	/*操作出错*/
            // 	\Log::debug($response, '七牛请求出错');
            // }
        }
        Log::error('[QINIU]七牛错误' . $url . ':' . ($response ? : '请求失败'), 'ERROR');
        return false;
    }

    /**
     * 获取url签名
     *
     * @param string $url
     * @return string
     */
    private static function sign($url)
    {
        $config = self::$_config ? : (self::$_config = Config::get('service.qiniu'));
        $sign = hash_hmac('sha1', $url, $config['secretkey'], true);
        $ak = $config['accesskey'];
        return $ak . ':' . self::qiniuEncode($sign);
    }

    /**
     * 七牛安全编码
     */
    private static function qiniuEncode($str)
    {
        return strtr(base64_encode($str), ['+' => '-', '/' => '_']);
    }

}
