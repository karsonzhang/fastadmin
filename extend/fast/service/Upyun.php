<?php

namespace fast\service;

use Exception;
use think\Config;

/**
 * 又拍云上传管理
 */
class Upyun
{

    const VERSION = '2.0';

    /* {{{ */
    const ED_AUTO = 'v0.api.upyun.com';
    const ED_TELECOM = 'v1.api.upyun.com';
    const ED_CNC = 'v2.api.upyun.com';
    const ED_CTT = 'v3.api.upyun.com';
    const CONTENT_TYPE = 'Content-Type';
    const CONTENT_MD5 = 'Content-MD5';
    const CONTENT_SECRET = 'Content-Secret';
    // 缩略图
    const X_GMKERL_THUMBNAIL = 'x-gmkerl-thumbnail';
    const X_GMKERL_TYPE = 'x-gmkerl-type';
    const X_GMKERL_VALUE = 'x-gmkerl-value';
    const X_GMKERL_QUALITY = 'x­gmkerl-quality';
    const X_GMKERL_UNSHARP = 'x­gmkerl-unsharp';

    private static $_instance;

    /* }}} */

    /**
     * @deprecated
     */
    private $_content_md5 = NULL;

    /**
     * @deprecated
     */
    private $_file_secret = NULL;

    /**
     * @deprecated
     */
    private $_file_infos = NULL;

    /**
     * @var string: UPYUN 请求唯一id, 出现错误时, 可以将该id报告给 UPYUN,进行调试
     */
    private $x_request_id;

    /**
     * 初始化 UpYun 存储接口
     */
    public function __construct($options = [])
    {
        if ($config = Config::get('service.upyun'))
        {
            $this->config = array_merge($this->config, $config);
        }
        $this->config = array_merge($this->config, is_array($options) ? $options : []);
    }

    /* }}} */

    /**
     * 获取当前SDK版本号
     */
    public function version()
    {
        return self::VERSION;
    }

    /**
     * 创建目录
     * @param $path 路径
     * @param $auto_mkdir 是否自动创建父级目录，最多10层次
     *
     * @return void
     */
    public function makeDir($path, $auto_mkdir = false)
    {/* {{{ */
        $headers = array('Folder' => 'true');
        if ($auto_mkdir)
            $headers['Mkdir'] = 'true';
        return $this->_do_request('PUT', $path, $headers);
    }

    /* }}} */

    /**
     * 删除目录和文件
     * @param string $path 路径
     *
     * @return boolean
     */
    public function delete($path)
    {/* {{{ */
        return $this->_do_request('DELETE', $path);
    }

    /* }}} */

    /**
     * 上传文件
     * @param string $path 存储路径或文件
     * @param mixed $file 需要上传的文件，可以是文件流或者文件内容
     * @param boolean $auto_mkdir 自动创建目录
     * @param array $opts 可选参数
     */
    public function upload($path, $file = NULL, $auto_mkdir = True, $opts = NULL)
    {
        return $this->writeFile($path, $file, $auto_mkdir, $opts);
    }

    public function writeFile($path, $file = NULL, $auto_mkdir = True, $opts = NULL)
    {/* {{{ */
        if (is_null($file))
            $file = ROOT_PATH . 'public/' . $path;
        if (is_null($opts))
            $opts = array();
        if (!is_null($this->_content_md5) || !is_null($this->_file_secret))
        {
            //if (!is_null($this->_content_md5)) array_push($opts, self::CONTENT_MD5 . ": {$this->_content_md5}");
            //if (!is_null($this->_file_secret)) array_push($opts, self::CONTENT_SECRET . ": {$this->_file_secret}");
            if (!is_null($this->_content_md5))
                $opts[self::CONTENT_MD5] = $this->_content_md5;
            if (!is_null($this->_file_secret))
                $opts[self::CONTENT_SECRET] = $this->_file_secret;
        }

        // 如果设置了缩略版本或者缩略图类型，则添加默认压缩质量和锐化参数
        //if (isset($opts[self::X_GMKERL_THUMBNAIL]) || isset($opts[self::X_GMKERL_TYPE])) {
        //    if (!isset($opts[self::X_GMKERL_QUALITY])) $opts[self::X_GMKERL_QUALITY] = 95;
        //    if (!isset($opts[self::X_GMKERL_UNSHARP])) $opts[self::X_GMKERL_UNSHARP] = 'true';
        //}

        if ($auto_mkdir === True)
            $opts['Mkdir'] = 'true';

        $this->_file_infos = $this->_do_request('PUT', $path, $opts, $file);

        return $this->_file_infos;
    }

    /* }}} */

    /**
     * 下载文件
     * @param string $path 文件路径
     * @param mixed $file_handle
     *
     * @return mixed
     */
    public function readFile($path, $file_handle = NULL)
    {/* {{{ */
        return $this->_do_request('GET', $path, NULL, NULL, $file_handle);
    }

    /* }}} */

    /**
     * 获取目录文件列表
     *
     * @param string $path 查询路径
     *
     * @return mixed
     */
    public function getList($path = '/')
    {/* {{{ */
        $rsp = $this->_do_request('GET', $path);

        $list = array();
        if ($rsp)
        {
            $rsp = explode("\n", $rsp);
            foreach ($rsp as $item)
            {
                @list($name, $type, $size, $time) = explode("\t", trim($item));
                if (!empty($time))
                {
                    $type = $type == 'N' ? 'file' : 'folder';
                }

                $item = array(
                    'name' => $name,
                    'type' => $type,
                    'size' => intval($size),
                    'time' => intval($time),
                );
                array_push($list, $item);
            }
        }

        return $list;
    }

    /* }}} */

    /**
     * @deprecated
     * @param string $path 目录路径
     * @return mixed
     */
    public function getFolderUsage($path = '/')
    {/* {{{ */
        $rsp = $this->_do_request('GET', '/?usage');
        return floatval($rsp);
    }

    /* }}} */

    /**
     * 获取文件、目录信息
     *
     * @param string $path 路径
     *
     * @return mixed
     */
    public function getFileInfo($path)
    {/* {{{ */
        $rsp = $this->_do_request('HEAD', $path);

        return $rsp;
    }

    /* }}} */

    /**
     * 连接签名方法
     * @param $method 请求方式 {GET, POST, PUT, DELETE}
     * return 签名字符串
     */
    private function sign($method, $uri, $date, $length)
    {/* {{{ */
        //$uri = urlencode($uri);
        $sign = "{$method}&{$uri}&{$date}&{$length}&{$this->config['password']}";
        return 'UpYun ' . $this->config['username'] . ':' . md5($sign);
    }

    /* }}} */

    /**
     * HTTP REQUEST 封装
     * @param string $method HTTP REQUEST方法，包括PUT、POST、GET、OPTIONS、DELETE
     * @param string $path 除Bucketname之外的请求路径，包括get参数
     * @param array $headers 请求需要的特殊HTTP HEADERS
     * @param array $body 需要POST发送的数据
     *
     * @return mixed
     */
    protected function _do_request($method, $path, $headers = NULL, $body = NULL, $file_handle = NULL)
    {/* {{{ */
        $uri = "/{$this->config['bucket']}{$path}";
        $ch = curl_init("http://{$this->config['endpoint']}{$uri}");

        $_headers = array('Expect:');
        if (!is_null($headers) && is_array($headers))
        {
            foreach ($headers as $k => $v)
            {
                array_push($_headers, "{$k}: {$v}");
            }
        }

        $length = 0;
        $date = gmdate('D, d M Y H:i:s \G\M\T');

        if (!is_null($body))
        {
            if (!is_resource($body) && file_exists($body))
            {
                $body = fopen($body, "rb");
            }
            if (is_resource($body))
            {
                fseek($body, 0, SEEK_END);
                $length = ftell($body);
                fseek($body, 0);

                array_push($_headers, "Content-Length: {$length}");
                curl_setopt($ch, CURLOPT_INFILE, $body);
                curl_setopt($ch, CURLOPT_INFILESIZE, $length);
            }
            else
            {
                $length = @strlen($body);
                array_push($_headers, "Content-Length: {$length}");
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
            }
        }
        else
        {
            array_push($_headers, "Content-Length: {$length}");
        }

        array_push($_headers, "Authorization: {$this->sign($method, $uri, $date, $length)}");
        array_push($_headers, "Date: {$date}");

        curl_setopt($ch, CURLOPT_HTTPHEADER, $_headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->config['timeout']);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

        if ($method == 'PUT' || $method == 'POST')
        {
            curl_setopt($ch, CURLOPT_POST, 1);
        }
        else
        {
            curl_setopt($ch, CURLOPT_POST, 0);
        }

        if ($method == 'GET' && is_resource($file_handle))
        {
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_FILE, $file_handle);
        }

        if ($method == 'HEAD')
        {
            curl_setopt($ch, CURLOPT_NOBODY, true);
        }
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($http_code == 0)
            throw new Exception('Connection Failed', $http_code);

        curl_close($ch);

        $header_string = '';
        $body = '';

        if ($method == 'GET' && is_resource($file_handle))
        {
            $header_string = '';
            $body = $response;
        }
        else
        {
            list($header_string, $body) = explode("\r\n\r\n", $response, 2);
        }
        $this->setXRequestId($header_string);
        if ($http_code == 200)
        {
            if ($method == 'GET' && is_null($file_handle))
            {
                return $body;
            }
            else
            {
                $data = $this->_getHeadersData($header_string);
                return count($data) > 0 ? $data : true;
            }
        }
        else
        {
            $message = $this->_getErrorMessage($header_string);
            if (is_null($message) && $method == 'GET' && is_resource($file_handle))
            {
                $message = 'File Not Found';
            }
            switch ($http_code)
            {
                case 401:
                    throw new Exception($message, $http_code);
                    break;
                case 403:
                    throw new Exception($message, $http_code);
                    break;
                case 404:
                    throw new Exception($message, $http_code);
                    break;
                case 406:
                    throw new Exception($message, $http_code);
                    break;
                case 503:
                    throw new Exception($message, $http_code);
                    break;
                default:
                    throw new Exception($message, $http_code);
            }
        }
    }

    /* }}} */

    /**
     * 处理HTTP HEADERS中返回的自定义数据
     *
     * @param string $text header字符串
     *
     * @return array
     */
    private function _getHeadersData($text)
    {/* {{{ */
        $headers = explode("\r\n", $text);
        $items = array();
        foreach ($headers as $header)
        {
            $header = trim($header);
            if (stripos($header, 'x-upyun') !== False)
            {
                list($k, $v) = explode(':', $header);
                $items[trim($k)] = in_array(substr($k, 8, 5), array('width', 'heigh', 'frame')) ? intval($v) : trim($v);
            }
        }
        return $items;
    }

    /* }}} */

    /**
     * 获取返回的错误信息
     *
     * @param string $header_string
     *
     * @return mixed
     */
    private function _getErrorMessage($header_string)
    {
        list($status, $stash) = explode("\r\n", $header_string, 2);
        list($v, $code, $message) = explode(" ", $status, 3);
        return $message . " X-Request-Id: " . $this->getXRequestId();
    }

    private function setXRequestId($header_string)
    {
        preg_match('~^X-Request-Id: ([0-9a-zA-Z]{32})~ism', $header_string, $result);
        $this->x_request_id = isset($result[1]) ? $result[1] : '';
    }

    public function getXRequestId()
    {
        return $this->x_request_id;
    }

    /**
     * 删除目录
     * @deprecated
     * @param $path 路径
     *
     * @return void
     */
    public function rmDir($path)
    {/* {{{ */
        $this->_do_request('DELETE', $path);
    }

    /* }}} */

    /**
     * 删除文件
     *
     * @deprecated
     * @param string $path 要删除的文件路径
     *
     * @return boolean
     */
    public function deleteFile($path)
    {/* {{{ */
        $rsp = $this->_do_request('DELETE', $path);
    }

    /* }}} */

    /**
     * 获取目录文件列表
     * @deprecated
     *
     * @param string $path 要获取列表的目录
     *
     * @return array
     */
    public function readDir($path)
    {/* {{{ */
        return $this->getList($path);
    }

    /* }}} */

    /**
     * 获取空间使用情况
     *
     * @deprecated 推荐直接使用 getFolderUsage('/')来获取
     * @return mixed
     */
    public function getBucketUsage()
    {/* {{{ */
        return $this->getFolderUsage('/');
    }

    /* }}} */

    /**
     * 获取文件信息
     *
     * #deprecated
     * @param $file 文件路径（包含文件名）
     * return array('type'=> file | folder, 'size'=> file size, 'date'=> unix time) 或 null
     */
    //public function getFileInfo($file){/*{{{*/
    //    $result = $this->head($file);
    //	if(is_null($r))return null;
    //	return array('type'=> $this->tmp_infos['x-upyun-file-type'], 'size'=> @intval($this->tmp_infos['x-upyun-file-size']), 'date'=> @intval($this->tmp_infos['x-upyun-file-date']));
    //}/*}}}*/

    /**
     * 切换 API 接口的域名
     *
     * @deprecated
     * @param $domain {默然 v0.api.upyun.com 自动识别, v1.api.upyun.com 电信, v2.api.upyun.com 联通, v3.api.upyun.com 移动}
     * return null;
     */
    public function setApiDomain($domain)
    {/* {{{ */
        $this->config['endpoint'] = $domain;
    }

    /* }}} */

    /**
     * 设置待上传文件的 Content-MD5 值（如又拍云服务端收到的文件MD5值与用户设置的不一致，将回报 406 Not Acceptable 错误）
     *
     * @deprecated
     * @param $str （文件 MD5 校验码）
     * return null;
     */
    public function setContentMD5($str)
    {/* {{{ */
        $this->_content_md5 = $str;
    }

    /* }}} */

    /**
     * 设置待上传文件的 访问密钥（注意：仅支持图片空！，设置密钥后，无法根据原文件URL直接访问，需带 URL 后面加上 （缩略图间隔标志符+密钥） 进行访问）
     * 如缩略图间隔标志符为 ! ，密钥为 bac，上传文件路径为 /folder/test.jpg ，那么该图片的对外访问地址为： http://空间域名/folder/test.jpg!bac
     *
     * @deprecated
     * @param $str （文件 MD5 校验码）
     * return null;
     */
    public function setFileSecret($str)
    {/* {{{ */
        $this->_file_secret = $str;
    }

    /* }}} */

    /**
     * @deprecated
     * 获取上传文件后的信息（仅图片空间有返回数据）
     * @param $key 信息字段名（x-upyun-width、x-upyun-height、x-upyun-frames、x-upyun-file-type）
     * return value or NULL
     */
    public function getWritedFileInfo($key)
    {/* {{{ */
        if (!isset($this->_file_infos))
            return NULL;
        return $this->_file_infos[$key];
    }

    /* }}} */
}
