<?php

namespace app\common\controller;

use app\common\library\Auth;
use think\Controller;
use think\Loader;

//UC通信接口基类,抽象类，必须继承使用

define('API_ADDUSER', 1);  //note 用户添加 API 接口开关
define('API_DELETEUSER', 1);  //note 用户删除 API 接口开关
define('API_GETTAG', 1);  //note 获取标签 API 接口开关
define('API_SYNLOGIN', 1);  //note 同步登录 API 接口开关
define('API_SYNLOGOUT', 1);  //note 同步登出 API 接口开关
define('API_UPDATEPW', 1);  //note 更改用户密码 开关
define('API_UPDATEINFO', 1);  //note 更改用户信息 开关
define('API_UPDATEBADWORDS', 1); //note 更新关键字列表 开关
define('API_UPDATEHOSTS', 1);  //note 更新域名解析缓存 开关
define('API_UPDATEAPPS', 1);  //note 更新应用列表 开关
define('API_UPDATECLIENT', 1);  //note 更新客户端缓存 开关
define('API_UPDATECREDIT', 1);  //note 更新用户积分 开关
define('API_GETCREDITSETTINGS', 1); //note 向 UCenter 提供积分设置 开关
define('API_GETCREDIT', 1);  //note 获取用户的某项积分 开关
define('API_UPDATECREDITSETTINGS', 1); //note 更新应用积分设置 开关

define('API_RETURN_SUCCEED', '1');
define('API_RETURN_FAILED', '-1');
define('API_RETURN_FORBIDDEN', '-2');

abstract class Uc extends Controller
{

    /**
     *
     * @var \app\common\library\Auth
     */
    protected $user = null;
    public $code; //code参数原始字符串
    public $action; //解析code得到的动作名
    public $error = NULL;
    public $get; //get数据
    public $post; //post数据
    protected $appdir; //uc_client所在目录

    /**
     * 初始化方法
     */

    public function _initialize()
    {
        parent::_initialize();
        $modulename = $this->request->module();
        $controllername = strtolower($this->request->controller());
        $actionname = strtolower($this->request->action());

        $path = '/' . $modulename . '/' . str_replace('.', '/', $controllername) . '/' . $actionname;

        $this->user = Auth::instance();

        // 设置当前请求的URI
        $this->user->setRequestUri($path);

        // 检测当前是否登录并进行初始化
        //$this->user->init();
        //
        //加载UC函数库
        //加载UC XML类库
        Loader::import('fast.ucenter.common.Functions');
        Loader::import('fast.ucenter.common.XML');
        $this->initConfig(); //初始化UC应用配置
        $this->initRequest(); //初始化请求
    }

    function initConfig()
    {
        if (!defined('UC_API'))
        {
            $this->error('未发现uc常量配置信息');
        }
    }

    function _serialize($arr, $htmlon = 0)
    {
        return xml_serialize($arr, $htmlon);
    }

    /**
     * 解析请求
     * @return boolean
     */
    public function initRequest()
    {
        $code = $this->request->get('code');
        parse_str(_uc_authcode($code, 'DECODE', UC_KEY), $get);
        if (get_magic_quotes_gpc())
        {
            $get = _uc_stripslashes($get);
        }
        if (empty($get) || !isset($get['time']) || !isset($get['action']))
        {
            $this->error = '非法请求';
            return false;
        }
        $timestamp = time();
        if ($timestamp - $get['time'] > 36001111)
        {
            $this->error = '请求有效期已过';
            return false;
        }

        $requestdata = file_get_contents('php://input');
        $this->code = $code;
        $this->action = strtolower(parse_name($get['action'], '1'));
        $this->get = $get;
        $this->post = @xml_unserialize($requestdata);
        $this->appdir = EXTEND_PATH . 'fast/ucenter/client/';
        // 定义允许请求的接口
        $allowaction = ['test', 'adduser', 'deleteuser', 'gettag', 'synregister', 'synlogin', 'synlogout', 'updateinfo', 'updatebadwords', 'updatehosts', 'updateapps', 'updateclient', 'updatecredit', 'getcreditsettings', 'updatecreditsettings'];
        if (!in_array($this->action, $allowaction))
        {
            $this->error = '请求不允许';
            return false;
        }
    }

    /**
     * 响应ucserver的通信请求，调用相应方法，输出最终结果并结束整个流程
     */
    public function response()
    {
        if ($this->_before_response())
        {
            if ($this->error !== NULL)
            {
                exit($this->error);
            }
            $response = call_user_func(array($this, $this->action));
        }
        if ($this->_after_response($response))
        {
            exit($response);
        }
        exit('-1');
    }

    protected function _before_response()
    {
        return true;
    }

    protected function _after_response($response = "")
    {
        return true;
    }

    public function test()
    {
        return API_RETURN_SUCCEED;
    }

}
