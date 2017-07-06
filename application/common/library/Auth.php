<?php

namespace app\common\library;

use app\common\model\User;
use app\common\model\UserThird;
use fast\Random;
use fast\ucenter\client\Client;
use think\Cookie;
use think\Db;
use think\Exception;
use think\Request;
use think\Validate;

/**
 * Auth类
 */
class Auth implements \JsonSerializable, \ArrayAccess
{

    const ERR_ACCOUNT_IS_INCORRECT = 'Account is incorrect';
    const ERR_ACCOUNT_NOT_EXIST = 'Account not exist';
    const ERR_USERNAME_IS_INCORRECT = 'Username is incorrect';
    const ERR_EMAIL_IS_INCORRECT = 'Email is incorrect';
    const ERR_PASSWORD_IS_INCORRECT = 'Password is incorrect';
    const ERR_USERNAME_OR_PASSWORD_IS_INCORRECT = 'Username or password is incorrect';
    const ERR_USERNAME_ALREADY_EXIST = 'Username already exist';
    const ERR_EMAIL_ALREADY_EXIST = 'Email already exist';
    const ERR_MOBILE_ALREADY_EXIST = 'Mobile already exist';
    const ERR_ACCOUNT_IS_LOCKED = 'Account is locked';
    const ERR_USERNAME_OR_PASSWORD_IS_MODIFIED = 'Username or password is modified';
    const ERR_YOU_ARE_NOT_LOGGED_IN = 'You are not logged in';
    const ERR_ACCOUNT_ALREADY_LOGGED_IN_AT_ANOTHER_PLACE = 'Account already logged in at another';

    protected static $instance = null;
    private $_error = '';
    private $_logined = FALSE;
    private $user = NULL;
    private $keeptime = 0;
    private $requestUri = '';

    public function __construct()
    {
        $this->user = new User;
    }

    /**
     * 初始化
     * @param array $options 参数
     * @return Auth
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
     * 
     * @return User
     */
    public function getModel()
    {
        return $this->user;
    }

    public function __get($name)
    {
        return $this->check() ? $this->user->$name : NULL;
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([$this->user, $name], $arguments);
    }

    /**
     * 注册用户
     *
     * @param string $username  用户名
     * @param string $password  密码
     * @param string $email     邮箱
     * @param string $mobile    手机号
     * @param string $extend    扩展参数
     * @return boolean
     */
    public function register($username, $password, $email = '', $mobile = '', $extend = [], $keeptime = 0, $sync = TRUE)
    {
        $rule = [
            'username' => 'require|length:6,30',
            'password' => 'require|length:6,30',
            'email'    => 'email',
            'mobile'   => 'regex:/^1\d{10}$/',
        ];

        $msg = [
            'username.require' => __('Username can not be empty'),
            'username.length'  => __('Username must be 6 to 30 characters'),
            'password.require' => __('Password can not be empty'),
            'password.length'  => __('Password must be 6 to 30 characters'),
            'email'            => __('Email is incorrect'),
            'mobile'           => __('Mobile is incorrect'),
        ];
        $data = [
            'username' => $username,
            'password' => $password,
            'email'    => $email,
            'mobile'   => $mobile,
        ];
        $validate = new Validate($rule, $msg);
        $result = $validate->check($data);
        if (!$result)
        {
            $this->setError($validate->getError());
            return FALSE;
        }

        // 检测用户名或邮箱、手机号是否存在
        if (User::getByUsername($username))
        {
            $this->setError(__('Username already exist'));
            return FALSE;
        }
        if ($email && User::getByEmail($email))
        {
            $this->setError(__('Email already exist'));
            return FALSE;
        }
        if ($mobile && User::getByMobile($mobile))
        {
            $this->setError(__('Mobile already exist'));
            return FALSE;
        }

        $ip = request()->ip();
        $time = time();
        $params = array_merge($data, [
            'nickname'  => $username,
            'salt'      => Random::alnum(),
            'jointime'  => $time,
            'joinip'    => $ip,
            'logintime' => $time,
            'loginip'   => $ip,
            'prevtime'  => $time,
            'status'    => 'normal'
        ]);
        $params['password'] = $this->getEncryptPassword($password, $params['salt']);
        $params = array_merge($params, $extend);

        ////////////////同步到Ucenter////////////////
        if (defined('UC_STATUS') && UC_STATUS && $sync)
        {
            $uc = new Client();
            $user_id = $uc->uc_user_register($username, $password, $email);
            // 如果小于0则说明发生错误
            if ($user_id <= 0)
            {
                $this->setError($user_id > -4 ? self::ERR_USERNAME_IS_INCORRECT : self::ERR_EMAIL_IS_INCORRECT);
                return FALSE;
            }
            else
            {
                $params['id'] = $user_id;
            }
        }

        //账号注册时需要开启事务,避免出现垃圾数据
        Db::startTrans();
        try
        {
            $ret = $this->user->save($params);
            Db::commit();

            // 此时的Model中只包含部分数据
            $this->user = $this->user->get($this->user->id);

            $this->keeptime($keeptime);
            return $this->syncLogin();
        }
        catch (Exception $e)
        {
            Db::rollback();
            return FALSE;
        }
    }

    /**
     * 用户登录
     *
     * @param string    $account    账号,用户名、邮箱、手机号
     * @param string    $password   密码
     * @param int       $keeptime   有效时长,默认为浏览器关闭
     * @return array
     */
    public function login($account, $password, $keeptime = 0, $sync = TRUE)
    {
        $field = Validate::is($account, 'email') ? 'email' : (Validate::regex($account, '/^1\d{10}$/') ? 'mobile' : 'username');
        $user = $this->user->get([$field => $account]);
        if ($user)
        {
            if ($user->status != 'normal')
            {
                $this->setError(self::ERR_ACCOUNT_IS_LOCKED);
                return FALSE;
            }
            if ($user->password != $this->getEncryptPassword($password, $user->salt))
            {
                $this->setError(self::ERR_PASSWORD_IS_INCORRECT);
                return FALSE;
            }

            $this->user = $user;

            // 设置登录有效时长
            $this->keeptime($keeptime);

            return $this->syncLogin($sync);
        }
        else
        {
            $this->setError(self::ERR_ACCOUNT_IS_INCORRECT);
            return FALSE;
        }
    }

    /**
     * 注销登录退出
     * @return bool
     */
    public function logout($token = NULL)
    {
        //设置登录标识
        $this->_logined = FALSE;
        $token = is_null($token) ? Cookie::get('token') : $token;
        Token::delete($token);
        Cookie::delete('user_id');
        //Cookie::del('username');
        Cookie::delete('token');
        return TRUE;
    }

    /**
     * 生成Token
     * @return string
     */
    public function token()
    {
        //$token = Encrypt::aesEncode($this->keeptime . '|' . $expiretime, Config::get('encrypt', 'aes_key'), TRUE);
        $token = Random::uuid();
        Token::set($token, $this->user->id, $this->keeptime);
        return $token;
    }

    /**
     * 初始化
     *
     * @param int       $user_id    会员ID,默认从Cookie中取
     * @param string    $token      会员Token,默认从Cookie中取
     *
     * @return boolean
     */
    public function init($user_id = NULL, $token = NULL)
    {
        $user_id = $user_id ? $user_id : Cookie::get('user_id');
        $user_id = intval($user_id);
        if ($user_id > 0)
        {
            if ($this->_error)
                return FALSE;
            $user = $this->get($user_id);
            if (!$user)
            {
                $this->setError(self::ERR_ACCOUNT_NOT_EXIST);
                return FALSE;
            }
            if ($user['status'] != 'normal')
            {
                $this->setError(self::ERR_ACCOUNT_IS_LOCKED);
                return FALSE;
            }
            $token = $token ? $token : Cookie::get('token');
            if (!Token::check($token))
            {
                return FALSE;
            }
            if (Token::identity($token) != $user['id'])
            {
                return FALSE;
            }
            $this->user = $user;
            $this->_logined = TRUE;
            return TRUE;
        }
        else
        {
            $this->setError(self::ERR_YOU_ARE_NOT_LOGGED_IN);
            return FALSE;
        }
    }

    /**
     * 检测是否登录
     *
     * @return boolean
     */
    public function check()
    {
        return $this->_logined;
    }

    /**
     * 检测是否登录
     *
     * @return boolean
     */
    public function isLogin()
    {
        return $this->check();
    }

    /**
     * 获取当前请求的URI
     * @return string
     */
    public function getRequestUri()
    {
        return $this->requestUri;
    }

    /**
     * 设置当前请求的URI
     * @param string $uri
     */
    public function setRequestUri($uri)
    {
        $this->requestUri = $uri;
    }

    /**
     * 第三方登录
     * @param string    $platform
     * @param array     $params
     * @param int       $keeptime
     * @return boolean
     */
    public function connect($platform, $params = [], $keeptime = 0)
    {
        $time = time();
        $values = [
            'platform'      => $platform,
            'openid'        => $params['openid'],
            'openname'      => isset($params['userinfo']['nickname']) ? $params['userinfo']['nickname'] : '',
            'access_token'  => $params['access_token'],
            'refresh_token' => $params['refresh_token'],
            'expires_in'    => $params['expires_in'],
            'logintime'     => $time,
            'expiretime'    => $time + $params['expires_in'],
        ];

        $this->keeptime($keeptime);
        $userthird = UserThird::get(['platform' => $platform, 'openid' => $params['openid']]);
        if ($userthird)
        {
            $this->user = $this->user->get($userthird['user_id']);
            if (!$this->user)
            {
                return FALSE;
            }
            $userthird->save($values);
            return $this->syncLogin();
        }
        else
        {
            // 先随机一个用户名,随后再变更为u+数字id
            $username = Random::alnum(20);
            $password = Random::alnum(6);
            // 默认注册一个会员
            $result = $this->register($username, $password, '', '', [], $keeptime);
            if (!$result)
            {
                return FALSE;
            }
            $userarr = ['username' => 'u' . $this->user->id];
            if (isset($params['userinfo']['nickname']))
                $userarr['nickname'] = $params['userinfo']['nickname'];
            if (isset($params['userinfo']['avatar']))
                $userarr['avatar'] = $params['userinfo']['avatar'];

            // 更新会员资料
            $this->user->save($userarr);

            // 保存第三方信息
            $values['user_id'] = $this->user->id;
            UserThird::create($values);

            // 写入登录Cookies和Token
            $this->writeStatus();
            return TRUE;
        }
    }

    /**
     * 删除一个指定会员
     * @param int $user_id
     * @param bool $sync 是否同步删除
     */
    public function delete($user_id, $sync = TRUE)
    {
        $user = $this->user->get($user_id);
        if (!$user)
        {
            return FALSE;
        }

        ////////////////同步到Ucenter////////////////
        if (defined('UC_STATUS') && UC_STATUS && $sync)
        {
            $uc = new Client();
            $re = $uc->uc_user_delete($user['id']);
            // 如果小于0则说明发生错误
            if ($re <= 0)
            {
                $this->setError(self::ERR_ACCOUNT_IS_LOCKED);
                return FALSE;
            }
        }
        // 调用事务删除账号
        $result = Db::transaction(function($db) use($user_id) {
                    // 删除会员
                    User::destroy($user_id);

                    // 删除会员第三方登录
                    UserThird::destroy($user_id);
                });

        return $result ? TRUE : FALSE;
    }

    /**
     * 直接登录账号
     * @param int $user_id
     * @param boolean $sync
     * @return boolean
     */
    public function direct($user_id, $sync = TRUE)
    {
        $this->user = $this->user->get($user_id);
        if ($this->user)
        {
            $this->syncLogin($sync);
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    /**
     * 获取密码加密方式
     * @param string $password
     * @param string $salt
     * @return string
     */
    public function getEncryptPassword($password, $salt = '')
    {
        return md5(md5($password) . $salt);
    }
    
    

    /**
     * 检测当前控制器和方法是否匹配传递的数组
     *
     * @param array $arr 需要验证权限的数组
     */
    public function match($arr = [])
    {
        $request = Request::instance();
        $arr = is_array($arr) ? $arr : explode(',', $arr);
        if (!$arr)
        {
            return FALSE;
        }
        // 是否存在
        if (in_array(strtolower($request->action()), $arr) || in_array('*', $arr))
        {
            return TRUE;
        }

        // 没找到匹配
        return FALSE;
    }

    /**
     * 同步登录信息
     * @param int $sync     是否同步登录到UC
     * @return boolean
     */
    protected function syncLogin($sync = TRUE)
    {
        ////////////////同步到Ucenter////////////////
        if (defined('UC_STATUS') && UC_STATUS && $sync)
        {
            $uc = new Client();
            $re = $uc->uc_user_login($this->user->id, $this->user->password . '#split#' . $this->user->salt, 3);
            // 如果小于0则说明发生错误
            if ($re <= 0)
            {
                $this->setError(self::ERR_USERNAME_OR_PASSWORD_IS_INCORRECT);
                return FALSE;
            }
        }

        //增加登录次数和设置最后登录时间
        $this->user->save([
            'prevtime'  => $this->user->logintime,
            'logintime' => time(),
            'loginip'   => request()->ip(),
        ]);

        // 写入登录Cookies和Token
        $this->writeStatus();
        return TRUE;
    }

    /**
     * 写入登录态和Cookie
     *
     * @param int $keeptime
     */
    protected function writeStatus()
    {
        //设置登录标识
        $this->_logined = TRUE;

        $token = $this->token();
        Cookie::set('user_id', $this->user->id, $this->keeptime);
        Cookie::set('username', $this->user->username, 86400 * 365);
        //加密安全字符
        Cookie::set('token', $token, $this->keeptime);
        $this->setError('');
    }

    /**
     * 设置会话有效时间
     * @param int $keeptime 默认为永久
     */
    public function keeptime($keeptime = 0)
    {
        $this->keeptime = $keeptime;
    }

    /**
     * 渲染用户数据
     * @param array     $datalist
     * @param array     $fields
     * @param string    $fieldkey
     * @param string    $renderkey
     * @return array
     */
    public function render(&$datalist, $fields = [], $fieldkey = 'user_id', $renderkey = 'userinfo')
    {
        $fields = !$fields ? ['id', 'nickname', 'level', 'avatar'] : (is_array($fields) ? $fields : explode(',', $fields));
        $ids = [];
        foreach ($datalist as $k => $v)
        {
            if (!isset($v[$fieldkey]))
                continue;
            $ids[] = $v[$fieldkey];
        }
        $list = [];
        if ($ids)
        {
            if (!in_array('id', $fields))
            {
                $fields[] = 'id';
            }
            $ids = array_unique($ids);
            $selectlist = User::where('id', 'in', $ids)->column($fields);
            foreach ($selectlist as $k => $v)
            {
                $list[$v['id']] = $v;
            }
        }
        foreach ($datalist as $k => &$v)
        {
            $v[$renderkey] = isset($list[$v[$fieldkey]]) ? $list[$v[$fieldkey]] : NULL;
        }
        unset($v);
        return $datalist;
    }

    /**
     * 设置错误信息
     *
     * @param $error
     */
    public function setError($error)
    {
        $this->_error = $error;
        return $this;
    }

    /**
     * 获取错误信息
     * @return string
     */
    public function getError()
    {
        return __($this->_error);
    }

    public function __toString()
    {
        return $this->user->toJson();
    }

    // JsonSerializable
    public function jsonSerialize()
    {
        return $this->user->toArray();
    }

    // ArrayAccess
    public function offsetSet($name, $value)
    {
        $this->user->setAttr($name, $value);
    }

    public function offsetExists($name)
    {
        return $this->user->__isset($name);
    }

    public function offsetUnset($name)
    {
        $this->user->__unset($name);
    }

    public function offsetGet($name)
    {
        return $this->user->getAttr($name);
    }

}
