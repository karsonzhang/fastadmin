<?php

namespace fast\service;

use think\Config;

/**
 * 阿里大于SMS短信发送
 */
class Alisms
{

    private $_params = [];
    public $error = [];
    protected $config = [];

    public function __construct($options = [])
    {
        if ($config = Config::get('service.alisms'))
        {
            $this->config = array_merge($this->config, $config);
        }
        $this->config = array_merge($this->config, is_array($options) ? $options : []);
    }

    /**
     * 单例
     * @param array $options 参数
     * @return Alisms
     */
    public static function instance($options = [])
    {
        if (is_null(self::$instance))
        {
            self::$instance = new static($options);
        }

        return self::$instance;
    }

    /**
     * 设置签名
     * @param string $sign
     * @return Alisms
     */
    public function sign($sign = '')
    {
        $this->_params['sms_free_sign_name'] = $sign;
        return $this;
    }

    /**
     * 设置参数
     * @param array $param
     * @return Alisms
     */
    public function param(array $param = [])
    {
        foreach ($param as $k => &$v)
        {
            $v = (string) $v;
        }
        unset($v);
        $this->_params['sms_param'] = json_encode($param);
        return $this;
    }

    /**
     * 设置模板
     * @param string $code 短信模板
     * @return Alisms
     */
    public function template($code = '')
    {
        $this->_params['sms_template_code'] = $code;
        return $this;
    }

    /**
     * 接收手机
     * @param string $mobile 手机号码
     * @return Alisms
     */
    public function mobile($mobile = '')
    {
        $this->_params['rec_num'] = $mobile;
        return $this;
    }

    /**
     * 立即发送
     * @return boolean
     */
    public function send()
    {
        $this->error = [];
        $params = $this->_params();
        $params['sign'] = $this->_signed($params);
        $reponse = $this->_curl($params);
        if ($reponse !== FALSE)
        {
            $res = json_decode($reponse, TRUE);
            $res = array_pop($res);
            if (isset($res['result']))
                return TRUE;
            $this->error = $res;
        }
        else
        {
            $this->error = array('code' => 0, 'msg' => 'HTTP_RESPONSE_NOT_WELL_FORMED');
        }
        return FALSE;
    }

    /**
     * 获取错误信息
     * @return array
     */
    public function getError()
    {
        return $this->error;
    }

    private function _params()
    {
        return array_merge([
            'app_key'     => $this->config['key'],
            'format'      => 'json',
            'method'      => 'alibaba.aliqin.fc.sms.num.send',
            'v'           => '2.0',
            'timestamp'   => date('Y-m-d H:i:s'),
            'sign_method' => 'md5',
            'sms_type'    => 'normal'
                ], $this->_params);
    }

    private function _signed($params)
    {
        ksort($params);
        $sign = $this->config['secret'];
        foreach ($params as $k => $v)
        {
            if (is_string($v) && '@' != substr($v, 0, 1))
                $sign .= $k . $v;
        }
        $sign .= $this->config['secret'];
        return strtoupper(md5($sign));
    }

    private function _curl($params)
    {
        $uri = 'https://eco.taobao.com/router/rest?' . http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_URL, $uri);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.98 Safari/537.36");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $reponse = curl_exec($ch);
        curl_close($ch);
        return $reponse;
    }

}
