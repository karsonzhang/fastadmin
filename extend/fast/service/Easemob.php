<?php

namespace fast\service;

use fast\Http;
use think\Cache;
use think\Config;
use think\Log;

/**
 * 环信消息类
 */
class Easemob
{

    const URL = 'https://a1.easemob.com';

    static $_config = null;

    /**
     * 创建用户
     *
     * @param string $username 用户名
     * @param string $password 密码
     * @param string $nickname 昵称
     * @param boolean $token 是否认证模式
     * @return array
     */
    public static function register($username, $password, $nickname = '', $token = TRUE)
    {
        $params = ['username' => $username, 'password' => $password];
        if ($nickname)
        {
            $params['nickname'] = $nickname;
        }
        return self::api('users', $params, $token);
    }

    /**
     * 创建聊天室
     *
     * @param string $name 名称
     * @param string $description 描述
     * @param string $owner 创建人
     * @param int $maxusers 最多参与者
     * @param array $members 成员
     * @return array
     */
    public static function createRoom($name, $description, $owner, $maxusers = 5000, $members = [])
    {
        $owner = (string) $owner;
        $params = [
            "name"        => $name, //聊天室名称，此属性为必须的
            "description" => $description, //聊天室描述，此属性为必须的
            "maxusers"    => $maxusers, //聊天室成员最大数（包括群主），值为数值类型，默认值200，最大值5000，此属性为可选的
            "owner"       => $owner, //聊天室的管理员，此属性为必须的
        ];
        if ($members)
        {
            if (!in_array($owner, $members))
            {
                $members[] = $owner;
            }
            $params['members'] = $members;
        }
        return self::api('chatrooms', $params, TRUE);
    }

    /**
     * 创建群组
     *
     * @param string $name 名称
     * @param string $description 描述
     * @param string $owner 管理员
     * @param int $maxusers 最大成员数量
     * @param array $members 成员列表
     * @param boolean $public 是否公开
     * @param boolean $approval 加入是否审核
     * @return array
     */
    public static function createGroup($name, $description, $owner, $maxusers = 2000, $members = [], $public = TRUE, $approval = FALSE)
    {
        $owner = (string) $owner;
        $params = [
            "groupname" => $name,
            "desc"      => $description,
            "public"    => (bool) $public,
            "maxusers"  => $maxusers,
            "approval"  => (bool) $approval,
            "owner"     => $owner,
        ];
        if ($members)
        {
            if (!in_array($owner, $members))
            {
                $members[] = $owner;
            }
            $params['members'] = $members;
        }
        return self::api('chatgroups', $params, TRUE);
    }

    /**
     * 修改群组信息
     *
     * @param int $group_id
     * @param string $name
     * @param string $description
     * @param int $maxusers
     * @return array
     */
    public static function editGroup($group_id, $name, $description, $maxusers)
    {
        $params = [
            "groupname" => $name,
            "desc"      => $description,
            "maxusers"  => $maxusers,
        ];
        return self::api('chatgroups/' . $group_id, $params, TRUE, 'PUT');
    }

    /**
     * 获取好友列表
     */
    public static function getFiends($owner_username)
    {
        return self::api("users/{$owner_username}/contacts/users", [], TRUE, 'GET');
    }

    /**
     * 删除群组
     *
     * @param int $group_id
     * @return array
     */
    public static function deleteGroup($group_id)
    {
        $params = [];
        return self::api('chatgroups/' . $group_id, $params, TRUE, 'DELETE');
    }

    /**
     * 发送消息
     *
     * @param string $from 发件人
     * @param string $to 收件人
     * @param mixed $msg 消息内容
     * @param string $target_type 消息类型 users/chatgroups/chatrooms
     * @return array
     */
    public static function sendMessage($from, $to, $msg, $target_type = 'users')
    {
        if (!is_array($msg))
        {
            $msg = [
                'type' => 'txt',
                'msg'  => $msg
            ];
        }
        $data = [
            'target_type' => $target_type,
            'target'      => is_array($to) ? $to : [$to],
            'from'        => $from,
        ];
        if (isset($msg['ext']))
        {
            $data['ext'] = $msg['ext'];
        }
        unset($msg['ext']);
        $data['msg'] = $msg;
        return self::api('messages', $data);
    }

    /**
     * 获取离线消息记录条数
     * @param string $owner_username
     * @return array
     */
    public static function getOfflineMsgCount($owner_username)
    {
        return self::api("users/{$owner_username}/offline_msg_count", [], TRUE, 'GET');
    }

    /**
     * 群组添加成员
     * @param int $chatroom_id
     * @param array $usernames
     * @param array
     */
    public static function addChatRoomMembers($chatroom_id, $usernames)
    {
        return self::api("chatgroups/{$chatroom_id}/users", $usernames, TRUE);
    }

    /**
     * 添加单个成员POST
     */
    public static function addOneChatRoomMember($chatroom_id, $username)
    {
        //return $chatroom_id;
        return self::api("chatgroups/{$chatroom_id}/users/{$username}", [], TRUE);
    }

    /**
     * 群组删除成员
     * @param int $chatroom_id
     * @param string $usernames
     * @return array
     */
    public static function minusChatRoomMembers($chatroom_id, $usernames)
    {
        return self::api("chatgroups/{$chatroom_id}/users/{$usernames}", [], TRUE, 'DELETE');
    }

    /**
     * 添加好友
     */
    public static function addFriends($owner_username, $friend_username)
    {
        return self::api("users/{$owner_username}/contacts/users/{$friend_username}", [], TRUE);
    }

    /**
     * 删除好友
     */
    public static function minusFriends($owner_username, $friend_username)
    {
        return self::api("users/{$owner_username}/contacts/users/{$friend_username}", [], TRUE, 'DELETE');
    }

    /**
     * 查看用户参与的所有群组
     * @param type $owner_username
     * @return type
     */
    public static function joinedChatgroups($owner_username)
    {
        return self::api("users/{$owner_username}/joined_chatgroups", [], TRUE, 'GET');
    }

    /**
     * 调用API接口
     *
     * @param string $api 接口
     * @param array $params request head参数
     * @param boolean $token 是否认证模式
     * @param string $method 请求方法 POST/GET
     * @param array $options 扩展配置
     * @return array
     */
    public static function api($api, $params = [], $token = TRUE, $method = 'POST', $options = [])
    {
        $header = ['Content-Type:application/json'];
        if ($token)
        {
            $header[] = self::getNewToken();
        }
        $config = Config::get('service.easemob');
        $options[CURLOPT_HTTPHEADER] = $header;

        $url = self::URL . '/' . $config['org_name'] . '/' . $config['app_name'] . '/' . $api;
        //return $url;
        $ret = Http::sendRequest($url, json_encode($params), $method, $options);
        if ($ret['ret'] && $ret['msg'])
        {
            $msg = json_decode($ret['msg'], TRUE);
            if (isset($msg['error']))
            {
                Log::error($ret['msg']);
            }
            return isset($msg['error']) ? [] : $msg;
        }
        else
        {
            return [];
        }
    }

    private static function getToken()
    {
        $tokendata = Cache::get('easemobtoken');
        if ($tokendata && $tokendata['expiretime'] > time())
        {
            return $tokendata['access_token'];
        }
        else
        {
            $config = Config::get('service.easemob');
            $data = self::api('token', [
                        'grant_type'    => 'client_credentials',
                        'client_id'     => $config['client_id'],
                        'client_secret' => $config['client_secret'],
                            ], FALSE, 'POST');
            if ($data)
            {
                $data['expiretime'] = time() + $data['expires_in'];
                Cache::set('easemobtoken', $data, $data['expires_in'] - 10);
                return $data['access_token'];
            }
            else
            {
                return '';
            }
        }
    }

}
