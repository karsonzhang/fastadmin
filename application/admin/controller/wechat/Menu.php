<?php

namespace app\admin\controller\wechat;

use app\common\controller\Backend;
use app\common\model\Configvalue;
use app\common\model\WechatResponse;
use EasyWeChat\Foundation\Application;
use think\Config;
use think\Exception;

/**
 * 菜单管理
 *
 * @icon fa fa-list-alt
 */
class Menu extends Backend
{

    protected $wechatcfg = NULL;

    public function _initialize()
    {
        parent::_initialize();
        $this->wechatcfg = \app\common\model\WechatConfig::get(['name' => 'menu']);
    }

    /**
     * 查看
     */
    public function index()
    {
        $responselist = array();
        $all = WechatResponse::all();
        foreach ($all as $k => $v)
        {
            $responselist[$v['eventkey']] = $v['title'];
        }
        $this->view->assign('responselist', $responselist);
        $this->view->assign('menu', (array) json_decode($this->wechatcfg->value, TRUE));
        return $this->view->fetch();
    }

    /**
     * 修改
     */
    public function edit($ids = NULL)
    {
        $menu = $this->request->post("menu");
        $menu = (array) json_decode($menu, TRUE);
        $this->wechatcfg->value = json_encode($menu, JSON_UNESCAPED_UNICODE);
        $this->wechatcfg->save();
        $this->code = 1;
        return;
    }

    /**
     * 同步
     */
    public function sync($ids = NULL)
    {
        $this->code = -1;
        $app = new Application(Config::get('wechat'));

        try
        {
            $ret = $app->menu->add(json_decode($this->wechatcfg->value, TRUE));
            if ($ret->errcode == 0)
            {
                $this->code = 1;
            }
            else
            {
                $this->content = $ret->errmsg;
            }
        }
        catch (Exception $e)
        {
            $this->content = $e->getMessage();
        }
        return;
    }

}
