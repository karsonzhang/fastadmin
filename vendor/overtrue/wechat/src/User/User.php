<?php

/*
 * This file is part of the overtrue/wechat.
 *
 * (c) overtrue <i@overtrue.me>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * User.php.
 *
 * @author    overtrue <i@overtrue.me>
 * @copyright 2015 overtrue <i@overtrue.me>
 *
 * @see      https://github.com/overtrue
 * @see      http://overtrue.me
 */

namespace EasyWeChat\User;

use EasyWeChat\Core\AbstractAPI;

/**
 * Class User.
 */
class User extends AbstractAPI
{
    const API_GET = 'https://api.weixin.qq.com/cgi-bin/user/info';
    const API_BATCH_GET = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget';
    const API_LIST = 'https://api.weixin.qq.com/cgi-bin/user/get';
    const API_GROUP = 'https://api.weixin.qq.com/cgi-bin/groups/getid';
    const API_REMARK = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark';
    const API_OAUTH_GET = 'https://api.weixin.qq.com/sns/userinfo';
    const API_GET_BLACK_LIST = 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist';
    const API_BATCH_BLACK_LIST = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist';
    const API_BATCH_UNBLACK_LIST = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist';

    /**
     * Fetch a user by open id.
     *
     * @param string $openId
     * @param string $lang
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function get($openId, $lang = 'zh_CN')
    {
        $params = [
                   'openid' => $openId,
                   'lang' => $lang,
                  ];

        return $this->parseJSON('get', [self::API_GET, $params]);
    }

    /**
     * Batch get users.
     *
     * @param array  $openIds
     * @param string $lang
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function batchGet(array $openIds, $lang = 'zh_CN')
    {
        $params = [];

        $params['user_list'] = array_map(function ($openId) use ($lang) {
            return [
                    'openid' => $openId,
                    'lang' => $lang,
                    ];
        }, $openIds);

        return $this->parseJSON('json', [self::API_BATCH_GET, $params]);
    }

    /**
     * List users.
     *
     * @param string $nextOpenId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function lists($nextOpenId = null)
    {
        $params = ['next_openid' => $nextOpenId];

        return $this->parseJSON('get', [self::API_LIST, $params]);
    }

    /**
     * Set user remark.
     *
     * @param string $openId
     * @param string $remark
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function remark($openId, $remark)
    {
        $params = [
                   'openid' => $openId,
                   'remark' => $remark,
                  ];

        return $this->parseJSON('json', [self::API_REMARK, $params]);
    }

    /**
     * Get user's group id.
     *
     * @param string $openId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function group($openId)
    {
        return $this->getGroup($openId);
    }

    /**
     * Get user's group.
     *
     * @param string $openId
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function getGroup($openId)
    {
        $params = ['openid' => $openId];

        return $this->parseJSON('json', [self::API_GROUP, $params]);
    }

    /**
     * Get black list.
     *
     * @param string|null $beginOpenid
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function blacklist($beginOpenid = null)
    {
        $params = ['begin_openid' => $beginOpenid];

        return $this->parseJSON('json', [self::API_GET_BLACK_LIST, $params]);
    }

    /**
     * Batch block user.
     *
     * @param array $openidList
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function batchBlock(array $openidList)
    {
        $params = ['openid_list' => $openidList];

        return $this->parseJSON('json', [self::API_BATCH_BLACK_LIST, $params]);
    }

    /**
     * Batch unblock user.
     *
     * @param array $openidList
     *
     * @return \EasyWeChat\Support\Collection
     */
    public function batchUnblock(array $openidList)
    {
        $params = ['openid_list' => $openidList];

        return $this->parseJSON('json', [self::API_BATCH_UNBLACK_LIST, $params]);
    }
}
