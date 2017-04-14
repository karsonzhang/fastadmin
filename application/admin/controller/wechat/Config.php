<?php

namespace app\admin\controller\wechat;

use app\admin\model\AdminLog;
use app\common\controller\Backend;
use app\common\model\Configvalue;

/**
 * 配置管理
 *
 * @icon fa fa-list-alt
 */
class Config extends Backend
{

    protected $wechatcfg = NULL;
    protected $obj = [];

    public function _initialize()
    {
        parent::_initialize();
        $this->wechatcfg = Configvalue::get('wechat');
        $this->obj = $this->wechatcfg->content;
    }

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax())
        {
            $configlist = isset($this->obj['config']) ? $this->obj['config'] : [];
            $list = array();
            foreach ($configlist as $row)
            {
                $list[] = $row;
            }
            $total = count($list);
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 添加
     */
    public function add()
    {
        if ($this->request->isPost())
        {
            $this->obj['config'][] = $this->request->post('row/a');
            $this->wechatcfg->content = $this->obj;
            $this->wechatcfg->save();
            AdminLog::record(__('Add'), $this->request->post('row/a'));
            $this->code = 1;
            return;
        }
        return $this->view->fetch();
    }

    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = [];
        foreach ($this->obj['config'] as $k => $v)
        {
            if ($v['id'] == $ids)
            {
                $row = $v;
                break;
            }
        }
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $params = $this->request->post('row/a');
            $this->obj['config'][$k] = $params;
            $this->obj['config'] = array_values($this->obj['config']);
            $this->wechatcfg->content = $this->obj;
            $this->wechatcfg->save();
            $this->code = 1;
            AdminLog::record(__('Edit'), $ids);
            return;
        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

    /**
     * 删除
     */
    public function del($ids = "")
    {
        $this->code = -1;
        if ($ids)
        {
            $ids = is_array($ids) ? $ids : explode(',', $ids);
            foreach ($this->obj['config'] as $k => $v)
            {
                if (in_array($v['id'], $ids))
                {
                    unset($this->obj['config'][$k]);
                }
            }
            $this->wechatcfg->content = $this->obj;
            $this->wechatcfg->save();
            AdminLog::record(__('Del'), $ids);
            $this->code = 1;
        }

        return;
    }

    /**
     * 批量更新
     */
    public function multi($ids = "")
    {
        $this->code = -1;
        //不支持指操作
        return;
    }

}
