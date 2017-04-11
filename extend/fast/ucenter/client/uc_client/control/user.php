<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: user.php 1174 2014-11-03 04:38:12Z hypowang $
 */
!defined('IN_UC') && exit('Access Denied');

define('UC_USER_CHECK_USERNAME_FAILED', -1);
define('UC_USER_USERNAME_BADWORD', -2);
define('UC_USER_USERNAME_EXISTS', -3);
define('UC_USER_EMAIL_FORMAT_ILLEGAL', -4);
define('UC_USER_EMAIL_ACCESS_ILLEGAL', -5);
define('UC_USER_EMAIL_EXISTS', -6);
define('UC_USER_MOBILE_FORMAT_ILLEGAL', -7);
define('UC_USER_MOBILE_ACCESS_ILLEGAL', -8);
define('UC_USER_MOBILE_EXISTS', -9);

class usercontrol extends base
{

    function __construct()
    {
        $this->usercontrol();
    }

    function usercontrol()
    {
        parent::__construct();
        $this->load('user');
        $this->app = $this->cache['apps'][UC_APPID];
    }

    // 同步注册
    function onsynregister()
    {
        $this->init_input();
        $uid = $this->input('uid');
        $password = $this->input('password');
        if ($this->app['synlogin'])
        {
            if ($this->user = $_ENV['user']->get_user_by_uid($uid))
            {
                $params = 'action=synregister' .
                        '&username=' . $this->user['username'] .
                        '&uid=' . $this->user['uid'] .
                        '&password=' . $password .
                        '&email=' . $this->user['email'] .
                        '&mobile=' . $this->user['mobile'] .
                        '&time=' . $this->time;
                $synstr = '';
                foreach ($this->cache['apps'] as $appid => $app)
                {
                    if ($app['synlogin'] && $app['appid'] != $this->app['appid'])
                    {
                        $synstr .= '<script type="text/javascript" src="' . $app['url'] . '/api/uc.php?time=' . $this->time . '&code=' . urlencode($this->authcode($params, 'ENCODE', $app['authkey'])) . '"></script>';
                    }
                }
                return $synstr;
            }
        }
        return '';
    }

    // 同步登录
    function onsynlogin()
    {
        $this->init_input();
        $uid = $this->input('uid');
        if ($this->app['synlogin'])
        {
            if ($this->user = $_ENV['user']->get_user_by_uid($uid))
            {
                $params = 'action=synlogin' .
                        '&username=' . $this->user['username'] .
                        '&uid=' . $this->user['uid'] .
                        '&password=' . $this->user['password'] .
                        '&time=' . $this->time;
                $synstr = '';
                foreach ($this->cache['apps'] as $appid => $app)
                {
                    if ($app['synlogin'] && $app['appid'] != $this->app['appid'])
                    {
                        $synstr .= '<script type="text/javascript" src="' . $app['url'] . '/api/uc.php?time=' . $this->time . '&code=' . urlencode($this->authcode($params, 'ENCODE', $app['authkey'])) . '"></script>';
                    }
                }
                return $synstr;
            }
        }
        return '';
    }

    // 同步退出
    function onsynlogout()
    {
        $this->init_input();
        if ($this->app['synlogin'])
        {
            $synstr = '';
            foreach ($this->cache['apps'] as $appid => $app)
            {
                if ($app['synlogin'] && $app['appid'] != $this->app['appid'])
                {
                    $synstr .= '<script type="text/javascript" src="' . $app['url'] . '/api/uc.php?time=' . $this->time . '&code=' . urlencode($this->authcode('action=synlogout&time=' . $this->time, 'ENCODE', $app['authkey'])) . '"></script>';
                }
            }
            return $synstr;
        }
        return '';
    }

    // 同步注册
    function onregister()
    {
        $this->init_input();
        $username = $this->input('username');
        $password = $this->input('password');
        $email = $this->input('email');
        $mobile = $this->input('mobile');
        $extend = $this->input('extend');
        $extend = $extend ? $extend : [];
        if (($status = $this->_check_username($username)) < 0)
        {
            return $status;
        }
        if ($email && ($status = $this->_check_email($email)) < 0)
        {
            return $status;
        }
        if ($mobile && ($status = $this->_check_mobile($mobile)) < 0)
        {
            return $status;
        }
        $uid = $_ENV['user']->add_user($username, $password, $email, $mobile, 0, $extend);
        return $uid;
    }

    // 编辑ucenter中信息
    function onedit()
    {
        $this->init_input();
        $uid = intval($this->input('uid'));
        $username = $this->input('username');
        $password = $this->input('password');
        $email = $this->input('email');
        $mobile = $this->input('mobile');
        $extend = $this->input('extend');
        $extend = $extend ? $extend : [];

        $status = $_ENV['user']->edit_user($username, $password, $email, $mobile, $uid, $extend);

        if ($status > 0)
        {
            if (@include UC_ROOT . './data/cache/apps.php')
            {
                if (count($_CACHE['apps']) > 1)
                {
                    //手动调用一次同步到所有应用
                    uc_api_post('user', 'edit', $this->input);
                }
            }
            return $status;
            $this->load('note');
            $_ENV['note']->add('updateinfo', http_build_query($this->input));
        }
        return $status;
    }

    // 登录ucenter账号
    function onlogin()
    {
        $this->init_input();
        $username = $this->input('username');
        $password = $this->input('password');
        $isuid = $this->input('isuid'); //0用户名 1UID 2邮箱 3手机

        if ($isuid == 1)
        {
            $user = $_ENV['user']->get_user_by_uid($username);
        }
        elseif ($isuid == 2)
        {
            $user = $_ENV['user']->get_user_by_email($username);
        }
        elseif ($isuid == 3)
        {
            $user = $_ENV['user']->get_user_by_mobile($username);
        }
        else
        {
            $user = $_ENV['user']->get_user_by_username($username);
        }

        $passwordmd5 = preg_match('/^\w{32}$/', $password) ? $password : md5($password);
        if (empty($user))
        {
            $status = -1;
        }
        elseif ($user['password'] != md5($passwordmd5 . $user['salt']))
        {
            $status = -2;
        }
        else
        {
            $status = $user['uid'];
        }
        $merge = $status != -1 && !$isuid && $_ENV['user']->check_mergeuser($username) ? 1 : 0;
        return [
            'status'   => $status,
            'uid'      => isset($user['uid']) ? $user['uid'] : 0,
            'username' => isset($user['username']) ? $user['username'] : '',
            'password' => $password,
            'email'    => isset($user['email']) ? $user['email'] : '',
            'mobile'   => isset($user['mobile']) ? $user['mobile'] : '',
            'merge'    => $merge
        ];
    }

    function onlogincheck()
    {
        $this->init_input();
        $username = $this->input('username');
        $ip = $this->input('ip');
        return $_ENV['user']->can_do_login($username, $ip);
    }

    function oncheck_email()
    {
        $this->init_input();
        $email = $this->input('email');
        return $this->_check_email($email);
    }

    function oncheck_username()
    {
        $this->init_input();
        $username = $this->input('username');
        if (($status = $this->_check_username($username)) < 0)
        {
            return $status;
        }
        else
        {
            return 1;
        }
    }

    function onget_user()
    {
        $this->init_input();
        $username = $this->input('username');
        $isuid = $this->input('isuid'); //0用户名 1UID 2邮箱 3手机
        if ($isuid == 1)
        {
            $member = $_ENV['user']->get_user_by_uid($username);
        }
        else if ($isuid == 2)
        {
            $member = $_ENV['user']->get_user_by_email($username);
        }
        else if ($isuid == 3)
        {
            $member = $_ENV['user']->get_user_by_mobile($username);
        }
        else
        {
            $member = $_ENV['user']->get_user_by_username($username);
        }
        if ($member)
        {
            // 加载扩展表
            $memberfields = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "memberfields WHERE uid='{$member['uid']}'");

            $memberfields = $memberfields ? $memberfields : [];
            $member = [
                'uid'      => $member['uid'],
                'username' => $member['username'],
                'email'    => $member['email'],
                'mobile'   => $member['mobile']
            ];
            return array_merge($member, $memberfields);
        }
        else
        {
            return 0;
        }
    }

    function ongetprotected()
    {
        $this->init_input();
        $protectedmembers = $this->db->fetch_all("SELECT uid,username FROM " . UC_DBTABLEPRE . "protectedmembers GROUP BY username");
        return $protectedmembers;
    }

    function ondelete()
    {
        $this->init_input();
        $uid = $this->input('uid');
        return $_ENV['user']->delete_user($uid);
    }

    function onaddprotected()
    {
        $this->init_input();
        $username = $this->input('username');
        $admin = $this->input('admin');
        $appid = $this->app['appid'];
        $usernames = (array) $username;
        foreach ($usernames as $username)
        {
            $user = $_ENV['user']->get_user_by_username($username);
            $uid = $user['uid'];
            $this->db->query("REPLACE INTO " . UC_DBTABLEPRE . "protectedmembers SET uid='$uid', username='$username', appid='$appid', dateline='{$this->time}', admin='$admin'", 'SILENT');
        }
        return $this->db->errno() ? -1 : 1;
    }

    function ondeleteprotected()
    {
        $this->init_input();
        $username = $this->input('username');
        $appid = $this->app['appid'];
        $usernames = (array) $username;
        foreach ($usernames as $username)
        {
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "protectedmembers WHERE username='$username' AND appid='$appid'");
        }
        return $this->db->errno() ? -1 : 1;
    }

    function onmerge()
    {
        $this->init_input();
        $uid = $this->input('uid');
        $oldusername = $this->input('oldusername');
        $newusername = $this->input('newusername');
        $password = $this->input('password');
        $email = $this->input('email');
        $mobile = $this->input('mobile');
        $extend = $this->input('extend');
        $extend = $extend ? $extend : [];
        if (($status = $this->_check_username($newusername)) < 0)
        {
            return $status;
        }
        $uid = $_ENV['user']->add_user($newusername, $password, $email, $mobile, $uid, $extend);
        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "mergemembers WHERE appid='" . $this->app['appid'] . "' AND username='$oldusername'");
        return $uid;
    }

    function onmerge_remove()
    {
        $this->init_input();
        $username = $this->input('username');
        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "mergemembers WHERE appid='" . $this->app['appid'] . "' AND username='$username'");
        return NULL;
    }

    function _check_username($username)
    {
        $username = addslashes(trim(stripslashes($username)));
        if (!$_ENV['user']->check_username($username))
        {
            return UC_USER_CHECK_USERNAME_FAILED;
        }
        elseif (!$_ENV['user']->check_usernamecensor($username))
        {
            return UC_USER_USERNAME_BADWORD;
        }
        elseif ($_ENV['user']->check_usernameexists($username))
        {
            return UC_USER_USERNAME_EXISTS;
        }
        return 1;
    }

    function _check_email($email, $username = '')
    {
        if (empty($this->settings))
        {
            $this->settings = $this->cache('settings');
        }
        if (!$_ENV['user']->check_emailformat($email))
        {
            return UC_USER_EMAIL_FORMAT_ILLEGAL;
        }
        elseif (!$_ENV['user']->check_emailaccess($email))
        {
            return UC_USER_EMAIL_ACCESS_ILLEGAL;
        }
        elseif (!$this->settings['doublee'] && $_ENV['user']->check_emailexists($email, $username))
        {
            return UC_USER_EMAIL_EXISTS;
        }
        else
        {
            return 1;
        }
    }

    function _check_mobile($mobile, $username = '')
    {
        if (empty($this->settings))
        {
            $this->settings = $this->cache('settings');
        }
        if (!$_ENV['user']->check_mobileformat($mobile))
        {
            return UC_USER_EMAIL_FORMAT_ILLEGAL;
        }
        elseif (!$_ENV['user']->check_mobileaccess($mobile))
        {
            return UC_USER_EMAIL_ACCESS_ILLEGAL;
        }
        elseif (!$this->settings['doublee'] && $_ENV['user']->check_mobileexists($mobile, $username))
        {
            return UC_USER_EMAIL_EXISTS;
        }
        else
        {
            return 1;
        }
    }

    function onuploadavatar()
    {

    }

    function onrectavatar()
    {

    }

    function flashdata_decode($s)
    {

    }

}
