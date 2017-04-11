<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: user.php 1179 2014-11-03 07:11:25Z hypowang $
 */
!defined('IN_UC') && exit('Access Denied');

class usermodel
{

    var $db;
    var $base;

    function __construct(&$base)
    {
        $this->usermodel($base);
    }

    function usermodel(&$base)
    {
        $this->base = $base;
        $this->db = $base->db;
    }

    function get_user_by_uid($uid)
    {
        $arr = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "members WHERE uid='$uid'");
        return $arr;
    }

    function get_user_by_username($username)
    {
        $arr = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "members WHERE username='$username'");
        return $arr;
    }

    function get_user_by_email($email)
    {
        $arr = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "members WHERE email='$email'");
        return $arr;
    }

    function get_user_by_mobile($mobile)
    {
        $arr = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "members WHERE mobile='$mobile'");
        return $arr;
    }

    function check_username($username)
    {
        $guestexp = '\xA1\xA1|\xAC\xA3|^Guest|^\xD3\xCE\xBF\xCD|\xB9\x43\xAB\xC8';
        $len = $this->dstrlen($username);
        if ($len > 15 || $len < 3 || preg_match("/\s+|^c:\\con\\con|[%,\*\"\s\<\>\&]|$guestexp/is", $username))
        {
            return FALSE;
        }
        else
        {
            return TRUE;
        }
    }

    function dstrlen($str)
    {
        if (strtolower(UC_CHARSET) != 'utf-8')
        {
            return strlen($str);
        }
        $count = 0;
        for ($i = 0; $i < strlen($str); $i++)
        {
            $value = ord($str[$i]);
            if ($value > 127)
            {
                $count++;
                if ($value >= 192 && $value <= 223)
                    $i++;
                elseif ($value >= 224 && $value <= 239)
                    $i = $i + 2;
                elseif ($value >= 240 && $value <= 247)
                    $i = $i + 3;
            }
            $count++;
        }
        return $count;
    }

    function check_mergeuser($username)
    {
        $data = $this->db->result_first("SELECT count(*) FROM " . UC_DBTABLEPRE . "mergemembers WHERE appid='" . $this->base->app['appid'] . "' AND username='$username'");
        return $data;
    }

    function check_usernamecensor($username)
    {
        $_CACHE['badwords'] = $this->base->cache('badwords');
        $censorusername = $this->base->get_setting('censorusername');
        $censorusername = $censorusername['censorusername'];
        $censorexp = '/^(' . str_replace(array('\\*', "\r\n", ' '), array('.*', '|', ''), preg_quote(($censorusername = trim($censorusername)), '/')) . ')$/i';
        $usernamereplaced = isset($_CACHE['badwords']['findpattern']) && !empty($_CACHE['badwords']['findpattern']) ? @preg_replace($_CACHE['badwords']['findpattern'], $_CACHE['badwords']['replace'], $username) : $username;
        return !(($usernamereplaced != $username) || ($censorusername && preg_match($censorexp, $username)));
    }

    function check_usernameexists($username)
    {
        $data = $this->db->result_first("SELECT username FROM " . UC_DBTABLEPRE . "members WHERE username='$username'");
        return $data;
    }

    function check_emailformat($email)
    {
        return strlen($email) > 6 && strlen($email) <= 32 && preg_match("/^([a-z0-9\-_.+]+)@([a-z0-9\-]+[.][a-z0-9\-.]+)$/", $email);
    }

    function check_emailaccess($email)
    {
        $setting = $this->base->get_setting(array('accessemail', 'censoremail'));
        $accessemail = $setting['accessemail'];
        $censoremail = $setting['censoremail'];
        $accessexp = '/(' . str_replace("\r\n", '|', preg_quote(trim($accessemail), '/')) . ')$/i';
        $censorexp = '/(' . str_replace("\r\n", '|', preg_quote(trim($censoremail), '/')) . ')$/i';
        if ($accessemail || $censoremail)
        {
            return !(($accessemail && !preg_match($accessexp, $email)) || ($censoremail && preg_match($censorexp, $email)));
        }
        else
        {
            return TRUE;
        }
    }

    function check_emailexists($email, $username = '')
    {
        $sqladd = $username !== '' ? "AND username<>'$username'" : '';
        $email = $this->db->result_first("SELECT email FROM  " . UC_DBTABLEPRE . "members WHERE email='$email' $sqladd");
        return $email;
    }

    function check_mobileformat($mobile)
    {
        return strlen($mobile) >= 11 && preg_match("/^1[34578]\d{9}$/", $mobile);
    }

    function check_mobileaccess($mobile)
    {
        $setting = $this->base->get_setting(array('accessmobile', 'censormobile'));
        $accessmobile = $setting['accessmobile'];
        $censormobile = $setting['censormobile'];
        $accessexp = '/(' . str_replace("\r\n", '|', preg_quote(trim($accessmobile), '/')) . ')$/i';
        $censorexp = '/(' . str_replace("\r\n", '|', preg_quote(trim($censormobile), '/')) . ')$/i';
        if ($accessmobile || $censormobile)
        {
            return !(($accessmobile && !preg_match($accessexp, $mobile)) || ($censormobile && preg_match($censorexp, $mobile)));
        }
        else
        {
            return TRUE;
        }
    }

    function check_mobileexists($mobile, $username = '')
    {
        $sqladd = $username !== '' ? "AND username<>'$username'" : '';
        $mobile = $this->db->result_first("SELECT mobile FROM  " . UC_DBTABLEPRE . "members WHERE mobile='$mobile' $sqladd");
        return $mobile;
    }

    /**
     * 检测是否登录
     * @param string $username
     * @param string $password
     * @param array $user
     * @return int
     */
    function check_login($username, $password, &$user)
    {
        $user = $this->get_user_by_username($username);
        if (empty($user['username']))
        {
            return -1;
        }
        elseif ($user['password'] != md5(md5($password) . $user['salt']))
        {
            return -2;
        }
        return $user['uid'];
    }

    /**
     * 在Ucenter中添加一个账号
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $mobile
     * @param int $uid
     * @param array $extend
     * @return int
     */
    function add_user($username, $password, $email = '', $mobile = '', $uid = 0, $extend = [])
    {
        $regip = $this->base->onlineip;
        $salt = substr(uniqid(rand()), -6);
        $password = md5(md5($password) . $salt);

        $values = $uid ? "uid='" . intval($uid) . "'," : '';
        $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "members SET $values username='$username', password='$password', email='$email', regip='$regip', regdate='" . $this->base->time . "', salt='$salt'");
        $uid = $this->db->insert_id();
        $extendfields = [];
        foreach ($extend as $k => $v)
        {
            $extendfields[] = "{$k} = '{$v}'";
        }
        $extendfields = $extendfields ? ',' . implode(',', $extendfields) : '';
        $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "memberfields SET uid='$uid' {$extendfields}");
        return $uid;
    }

    /**
     * 编辑Ucenter中的账号
     * @param string $username
     * @param string $password
     * @param string $email
     * @param string $mobile
     * @return int
     */
    function edit_user($username, $password = '', $email = '', $mobile = '', $uid = 0, $extend = [])
    {
        $uid = intval($uid);
        $data = $this->db->fetch_first("SELECT username, uid, password, salt FROM " . UC_DBTABLEPRE . "members WHERE uid='$uid'");
        if (!$data)
        {
            return -7;
        }
        $isprotected = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "protectedmembers WHERE uid = '{$data['uid']}'");
        if ($isprotected)
        {
            return -8;
        }
        $fields = [];
        if ($username)
            $fields[] = "username = '{$username}'";
        if ($email)
            $fields[] = "email = '{$email}'";
        if ($mobile)
            $fields[] = "mobile = '{$mobile}'";
        if ($password)
            $fields[] = "password = '" . md5(md5($password) . $data['salt']) . "'";
        $values = implode(',', $fields);
        if ($values || $extend)
        {
            if ($values)
            {
                $this->db->query("UPDATE " . UC_DBTABLEPRE . "members SET $values WHERE uid='{$data['uid']}'");
            }
            $extendfields = [];
            foreach ($extend as $k => $v)
            {
                $extendfields[] = "{$k} = '{$v}'";
            }
            $extendfields = $extendfields ? implode(',', $extendfields) : '';
            if ($extendfields)
            {
                $this->db->query("UPDATE " . UC_DBTABLEPRE . "memberfields SET {$extendfields} WHERE uid='{$data['uid']}'");
            }
            return 1;
        }
        else
        {
            return -7;
        }
    }

    /**
     * 删除一个账号
     * @param array $uidsarr
     * @return int
     */
    function delete_user($uidsarr)
    {
        $uidsarr = (array) $uidsarr;
        if (!$uidsarr)
        {
            return 0;
        }
        $uids = $this->base->implode($uidsarr);
        $arr = $this->db->fetch_all("SELECT uid FROM " . UC_DBTABLEPRE . "protectedmembers WHERE uid IN ($uids)");
        $puids = array();
        foreach ((array) $arr as $member)
        {
            $puids[] = $member['uid'];
        }
        $uids = $this->base->implode(array_diff($uidsarr, $puids));
        if ($uids)
        {
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "members WHERE uid IN($uids)");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "memberfields WHERE uid IN($uids)");
            uc_user_deleteavatar($uidsarr);
            $this->base->load('note');
            $_ENV['note']->add('deleteuser', "ids=$uids");
            return $this->db->affected_rows();
        }
        else
        {
            return 0;
        }
    }

    function delete_useravatar($uidsarr)
    {
        $uidsarr = (array) $uidsarr;
        foreach ((array) $uidsarr as $uid)
        {
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'big', 'real')) && unlink($avatar_file);
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'middle', 'real')) && unlink($avatar_file);
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'small', 'real')) && unlink($avatar_file);
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'big')) && unlink($avatar_file);
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'middle')) && unlink($avatar_file);
            file_exists($avatar_file = UC_DATADIR . './avatar/' . $this->base->get_avatar($uid, 'small')) && unlink($avatar_file);
        }
    }

    /**
     * 获取账号总数
     * @param string $sqladd
     * @return int
     */
    function get_total_num($sqladd = '')
    {
        $data = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "members $sqladd");
        return $data;
    }

    /**
     * 获取列表
     * @param int $page
     * @param int $ppp
     * @param int $totalnum
     * @param string $sqladd
     * @return array
     */
    function get_list($page, $ppp, $totalnum, $sqladd)
    {
        $start = $this->base->page_get_start($page, $ppp, $totalnum);
        $data = $this->db->fetch_all("SELECT * FROM " . UC_DBTABLEPRE . "members $sqladd LIMIT $start, $ppp");
        return $data;
    }

    function name2id($usernamesarr)
    {
        $usernamesarr = uc_addslashes($usernamesarr, 1, TRUE);
        $usernames = $this->base->implode($usernamesarr);
        $query = $this->db->query("SELECT uid FROM " . UC_DBTABLEPRE . "members WHERE username IN($usernames)");
        $arr = array();
        while ($user = $this->db->fetch_array($query))
        {
            $arr[] = $user['uid'];
        }
        return $arr;
    }

    function id2name($uidarr)
    {
        $arr = array();
        $query = $this->db->query("SELECT uid, username FROM " . UC_DBTABLEPRE . "members WHERE uid IN (" . $this->base->implode($uidarr) . ")");
        while ($user = $this->db->fetch_array($query))
        {
            $arr[$user['uid']] = $user['username'];
        }
        return $arr;
    }

    function quescrypt($questionid, $answer)
    {
        return $questionid > 0 && $answer != '' ? substr(md5($answer . md5($questionid)), 16, 8) : '';
    }

    function can_do_login($username, $ip = '')
    {

        $check_times = $this->base->settings['login_failedtime'] < 1 ? 5 : $this->base->settings['login_failedtime'];

        $username = substr(md5($username), 8, 15);
        $expire = 15 * 60;
        if (!$ip)
        {
            $ip = $this->base->onlineip;
        }

        $ip_check = $user_check = array();
        $query = $this->db->query("SELECT * FROM " . UC_DBTABLEPRE . "failedlogins WHERE ip='" . $ip . "' OR ip='$username'");
        while ($row = $this->db->fetch_array($query))
        {
            if ($row['ip'] === $username)
            {
                $user_check = $row;
            }
            elseif ($row['ip'] === $ip)
            {
                $ip_check = $row;
            }
        }

        if (empty($ip_check) || ($this->base->time - $ip_check['lastupdate'] > $expire))
        {
            $ip_check = array();
            $this->db->query("REPLACE INTO " . UC_DBTABLEPRE . "failedlogins (ip, count, lastupdate) VALUES ('{$ip}', '0', '{$this->base->time}')");
        }

        if (empty($user_check) || ($this->base->time - $user_check['lastupdate'] > $expire))
        {
            $user_check = array();
            $this->db->query("REPLACE INTO " . UC_DBTABLEPRE . "failedlogins (ip, count, lastupdate) VALUES ('{$username}', '0', '{$this->base->time}')");
        }

        if ($ip_check || $user_check)
        {
            $time_left = min(($check_times - $ip_check['count']), ($check_times - $user_check['count']));
            return $time_left;
        }

        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "failedlogins WHERE lastupdate<" . ($this->base->time - ($expire + 1)), 'UNBUFFERED');

        return $check_times;
    }

    function loginfailed($username, $ip = '')
    {
        $username = substr(md5($username), 8, 15);
        if (!$ip)
        {
            $ip = $this->base->onlineip;
        }
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "failedlogins SET count=count+1, lastupdate='" . $this->base->time . "' WHERE ip='" . $ip . "' OR ip='$username'");
    }

}
