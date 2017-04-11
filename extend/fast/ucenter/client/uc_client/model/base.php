<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: base.php 1167 2014-11-03 03:06:21Z hypowang $
 */
!defined('IN_UC') && exit('Access Denied');

if (!function_exists('getgpc'))
{

    function getgpc($k, $var = 'G')
    {
        switch ($var)
        {
            case 'G': $var = &$_GET;
                break;
            case 'P': $var = &$_POST;
                break;
            case 'C': $var = &$_COOKIE;
                break;
            case 'R': $var = &$_REQUEST;
                break;
        }
        return isset($var[$k]) ? $var[$k] : NULL;
    }

}

class base
{

    var $sid;
    var $time;
    var $onlineip;
    var $db;
    var $key;
    var $settings = array();
    var $cache = array();
    var $app = array();
    var $user = array();
    var $input = array();

    function __construct()
    {
        $this->base();
    }

    function base()
    {
        $this->init_var();
        $this->init_db();
        $this->init_cache();
        $this->init_note();
        $this->init_mail();
    }

    function init_var()
    {
        $this->time = time();
        $cip = getenv('HTTP_CLIENT_IP');
        $xip = getenv('HTTP_X_FORWARDED_FOR');
        $rip = getenv('REMOTE_ADDR');
        $srip = $_SERVER['REMOTE_ADDR'];
        if ($cip && strcasecmp($cip, 'unknown'))
        {
            $this->onlineip = $cip;
        }
        elseif ($xip && strcasecmp($xip, 'unknown'))
        {
            $this->onlineip = $xip;
        }
        elseif ($rip && strcasecmp($rip, 'unknown'))
        {
            $this->onlineip = $rip;
        }
        elseif ($srip && strcasecmp($srip, 'unknown'))
        {
            $this->onlineip = $srip;
        }
        preg_match("/[\d\.]{7,15}/", $this->onlineip, $match);
        $this->onlineip = $match[0] ? $match[0] : 'unknown';
        $this->app['appid'] = UC_APPID;
    }

    function init_input()
    {

    }

    function init_db()
    {
        if (function_exists("mysqli_connect"))
        {
            require_once UC_ROOT . 'lib/dbi.class.php';
        }
        else
        {
            require_once UC_ROOT . 'lib/db.class.php';
        }
        $this->db = new ucclient_db();
        $this->db->connect(UC_DBHOST, UC_DBUSER, UC_DBPW, '', UC_DBCHARSET, UC_DBCONNECT, UC_DBTABLEPRE);
    }

    function load($model, $base = NULL)
    {
        $base = $base ? $base : $this;
        if (empty($_ENV[$model]))
        {
            require_once UC_ROOT . "./model/{$model}.php";
            $classname = $model . 'model';
            $_ENV[$model] = new $classname($base);
        }
        return $_ENV[$model];
    }

    function date($time, $type = 3)
    {
        if (!$this->settings)
        {
            $this->settings = $this->cache('settings');
        }
        $format[] = $type & 2 ? (!empty($this->settings['dateformat']) ? $this->settings['dateformat'] : 'Y-n-j') : '';
        $format[] = $type & 1 ? (!empty($this->settings['timeformat']) ? $this->settings['timeformat'] : 'H:i') : '';
        return gmdate(implode(' ', $format), $time + $this->settings['timeoffset']);
    }

    function page_get_start($page, $ppp, $totalnum)
    {
        $totalpage = ceil($totalnum / $ppp);
        $page = max(1, min($totalpage, intval($page)));
        return ($page - 1) * $ppp;
    }

    function implode($arr)
    {
        return "'" . implode("','", (array) $arr) . "'";
    }

    function &cache($cachefile)
    {
        static $_CACHE = array();
        if (!isset($_CACHE[$cachefile]))
        {
            $cachepath = UC_DATADIR . './cache/' . $cachefile . '.php';
            if (!file_exists($cachepath))
            {
                $this->load('cache');
                $_ENV['cache']->updatedata($cachefile);
            }
            else
            {
                include_once $cachepath;
            }
        }
        return $_CACHE[$cachefile];
    }

    function get_setting($k = array(), $decode = FALSE)
    {
        $return = array();
        $sqladd = $k ? "WHERE k IN (" . $this->implode($k) . ")" : '';
        $settings = $this->db->fetch_all("SELECT * FROM " . UC_DBTABLEPRE . "settings $sqladd");
        if (is_array($settings))
        {
            foreach ($settings as $arr)
            {
                $return[$arr['k']] = $decode ? unserialize($arr['v']) : $arr['v'];
            }
        }
        return $return;
    }

    function init_cache()
    {
        $this->settings = $this->cache('settings');
        $this->cache['apps'] = $this->cache('apps');

        if (PHP_VERSION > '5.1')
        {
            $timeoffset = intval($this->settings['timeoffset'] / 3600);
            @date_default_timezone_set('Etc/GMT' . ($timeoffset > 0 ? '-' : '+') . (abs($timeoffset)));
        }
    }

    function cutstr($string, $length, $dot = ' ...')
    {
        if (strlen($string) <= $length)
        {
            return $string;
        }

        $string = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array('&', '"', '<', '>'), $string);

        $strcut = '';
        if (strtolower(UC_CHARSET) == 'utf-8')
        {

            $n = $tn = $noc = 0;
            while ($n < strlen($string))
            {

                $t = ord($string[$n]);
                if ($t == 9 || $t == 10 || (32 <= $t && $t <= 126))
                {
                    $tn = 1;
                    $n++;
                    $noc++;
                }
                elseif (194 <= $t && $t <= 223)
                {
                    $tn = 2;
                    $n += 2;
                    $noc += 2;
                }
                elseif (224 <= $t && $t < 239)
                {
                    $tn = 3;
                    $n += 3;
                    $noc += 2;
                }
                elseif (240 <= $t && $t <= 247)
                {
                    $tn = 4;
                    $n += 4;
                    $noc += 2;
                }
                elseif (248 <= $t && $t <= 251)
                {
                    $tn = 5;
                    $n += 5;
                    $noc += 2;
                }
                elseif ($t == 252 || $t == 253)
                {
                    $tn = 6;
                    $n += 6;
                    $noc += 2;
                }
                else
                {
                    $n++;
                }

                if ($noc >= $length)
                {
                    break;
                }
            }
            if ($noc > $length)
            {
                $n -= $tn;
            }

            $strcut = substr($string, 0, $n);
        }
        else
        {
            for ($i = 0; $i < $length; $i++)
            {
                $strcut .= ord($string[$i]) > 127 ? $string[$i] . $string[++$i] : $string[$i];
            }
        }

        $strcut = str_replace(array('&', '"', '<', '>'), array('&amp;', '&quot;', '&lt;', '&gt;'), $strcut);

        return $strcut . $dot;
    }

    function init_note()
    {
        if ($this->note_exists())
        {
            $this->load('note');
            $_ENV['note']->send();
        }
    }

    function note_exists()
    {
        $noteexists = $this->db->result_first("SELECT value FROM " . UC_DBTABLEPRE . "vars WHERE name='noteexists" . UC_APPID . "'");
        if (empty($noteexists))
        {
            return FALSE;
        }
        else
        {
            return TRUE;
        }
    }

    function init_mail()
    {
        if ($this->mail_exists() && !getgpc('inajax'))
        {
            $this->load('mail');
            $_ENV['mail']->send();
        }
    }

    function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
    {
        return uc_authcode($string, $operation, $key, $expiry);
    }

    function unserialize($s)
    {
        return uc_unserialize($s);
    }

    function input($k)
    {
        return isset($this->input[$k]) ? (is_array($this->input[$k]) ? $this->input[$k] : trim($this->input[$k])) : NULL;
    }

    function mail_exists()
    {
        $mailexists = $this->db->result_first("SELECT value FROM " . UC_DBTABLEPRE . "vars WHERE name='mailexists'");
        if (empty($mailexists))
        {
            return FALSE;
        }
        else
        {
            return TRUE;
        }
    }

    function dstripslashes($string)
    {
        if (is_array($string))
        {
            foreach ($string as $key => $val)
            {
                $string[$key] = $this->dstripslashes($val);
            }
        }
        else
        {
            $string = stripslashes($string);
        }
        return $string;
    }

}
