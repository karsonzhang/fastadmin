<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: misc.php 1182 2014-11-17 08:57:52Z andyzheng $
 */
!defined('IN_UC') && exit('Access Denied');

define('UC_ARRAY_SEP_1', 'UC_ARRAY_SEP_1');
define('UC_ARRAY_SEP_2', 'UC_ARRAY_SEP_2');

class miscmodel
{

    var $db;
    var $base;

    function __construct(&$base)
    {
        $this->miscmodel($base);
    }

    function miscmodel(&$base)
    {
        $this->base = $base;
        $this->db = $base->db;
    }

    function get_apps($col = '*', $where = '')
    {
        $arr = $this->db->fetch_all("SELECT $col FROM " . UC_DBTABLEPRE . "applications" . ($where ? ' WHERE ' . $where : ''));
        return $arr;
    }

    function delete_apps($appids)
    {

    }

    function update_app($appid, $name, $url, $authkey, $charset, $dbcharset)
    {

    }

    function alter_app_table($appid, $operation = 'ADD')
    {

    }

    function get_host_by_url($url)
    {

    }

    function check_url($url)
    {

    }

    function check_ip($url)
    {

    }

    function test_api($url, $ip = '')
    {

    }

    function dfopen2($url, $limit = 0, $post = '', $cookie = '', $bysocket = FALSE, $ip = '', $timeout = 15, $block = TRUE, $encodetype = 'URLENCODE')
    {
        $__times__ = isset($_GET['__times__']) ? intval($_GET['__times__']) + 1 : 1;
        if ($__times__ > 2)
        {
            return '';
        }
        $url .= (strpos($url, '?') === FALSE ? '?' : '&') . "__times__=$__times__";
        return $this->dfopen($url, $limit, $post, $cookie, $bysocket, $ip, $timeout, $block, $encodetype);
    }

    function dfopen($url, $limit = 0, $post = '', $cookie = '', $bysocket = FALSE, $ip = '', $timeout = 15, $block = TRUE, $encodetype = 'URLENCODE')
    {
        $return = '';
        $matches = parse_url($url);
        $scheme = $matches['scheme'];
        $host = $matches['host'];
        $path = $matches['path'] ? $matches['path'] . ($matches['query'] ? '?' . $matches['query'] : '') : '/';
        $port = !empty($matches['port']) ? $matches['port'] : 80;

        if ($post)
        {
            $out = "POST $path HTTP/1.0\r\n";
            $header = "Accept: */*\r\n";
            $header .= "Accept-Language: zh-cn\r\n";
            $boundary = $encodetype == 'URLENCODE' ? '' : ';' . substr($post, 0, trim(strpos($post, "\n")));
            $header .= $encodetype == 'URLENCODE' ? "Content-Type: application/x-www-form-urlencoded\r\n" : "Content-Type: multipart/form-data$boundary\r\n";
            $header .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
            $header .= "Host: $host:$port\r\n";
            $header .= 'Content-Length: ' . strlen($post) . "\r\n";
            $header .= "Connection: Close\r\n";
            $header .= "Cache-Control: no-cache\r\n";
            $header .= "Cookie: $cookie\r\n\r\n";
            $out .= $header . $post;
        }
        else
        {
            $out = "GET $path HTTP/1.0\r\n";
            $header = "Accept: */*\r\n";
            $header .= "Accept-Language: zh-cn\r\n";
            $header .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
            $header .= "Host: $host:$port\r\n";
            $header .= "Connection: Close\r\n";
            $header .= "Cookie: $cookie\r\n\r\n";
            $out .= $header;
        }

        $fpflag = 0;
        if (!$fp = @fsocketopen(($ip ? $ip : $host), $port, $errno, $errstr, $timeout))
        {
            $context = array(
                'http' => array(
                    'method'  => $post ? 'POST' : 'GET',
                    'header'  => $header,
                    'content' => $post,
                    'timeout' => $timeout,
                ),
            );
            $context = stream_context_create($context);
            $fp = @fopen($scheme . '://' . ($ip ? $ip : $host) . ':' . $port . $path, 'b', false, $context);
            $fpflag = 1;
        }

        if (!$fp)
        {
            return '';
        }
        else
        {
            stream_set_blocking($fp, $block);
            stream_set_timeout($fp, $timeout);
            @fwrite($fp, $out);
            $status = stream_get_meta_data($fp);
            if (!$status['timed_out'])
            {
                while (!feof($fp) && !$fpflag)
                {
                    if (($header = @fgets($fp)) && ($header == "\r\n" || $header == "\n"))
                    {
                        break;
                    }
                }

                $stop = false;
                while (!feof($fp) && !$stop)
                {
                    $data = fread($fp, ($limit == 0 || $limit > 8192 ? 8192 : $limit));
                    $return .= $data;
                    if ($limit)
                    {
                        $limit -= strlen($data);
                        $stop = $limit <= 0;
                    }
                }
            }
            @fclose($fp);
            return $return;
        }
    }

    function array2string($arr)
    {
        $s = $sep = '';
        if ($arr && is_array($arr))
        {
            foreach ($arr as $k => $v)
            {
                $s .= $sep . addslashes($k) . UC_ARRAY_SEP_1 . $v;
                $sep = UC_ARRAY_SEP_2;
            }
        }
        return $s;
    }

    function string2array($s)
    {
        $arr = explode(UC_ARRAY_SEP_2, $s);
        $arr2 = array();
        foreach ($arr as $k => $v)
        {
            list($key, $val) = explode(UC_ARRAY_SEP_1, $v);
            $arr2[$key] = $val;
        }
        return $arr2;
    }

}
