<?php

namespace app\admin\controller\general;

use app\common\controller\Backend;

/**
 * 定时任务
 *
 * @icon fa fa-tasks
 * @remark 类似于Linux的Crontab定时任务,可以按照设定的时间进行任务的执行,目前仅支持三种任务:请求URL、执行SQL、执行Shell
 */
class Crontab extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Crontab');
        $this->view->assign('typedata', [
            'url'   => __('Request Url'),
            'sql'   => __('Execute Sql Script'),
            'shell' => __('Execute Shell'),
        ]);
    }

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax())
        {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();
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
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                $this->model->create($params);
                $this->code = 1;
            }

            return;
        }
        return $this->view->fetch();
    }

    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                $row->save($params);
                $this->code = 1;
            }

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
            $count = $this->model->where('id', 'in', $ids)->delete();
            if ($count)
            {
                $this->code = 1;
            }
        }

        return;
    }

    /**
     * 批量更新
     */
    public function multi($ids = "")
    {
        $this->code = -1;
        $ids = $ids ? $ids : $this->request->param("ids");
        if ($ids)
        {
            if ($this->request->has('params'))
            {
                parse_str($this->request->post("params"), $values);
                $values = array_intersect_key($values, array_flip(array('status')));
                if ($values)
                {
                    $count = $this->model->where('id', 'in', $ids)->update($values);
                    if ($count)
                    {
                        $this->code = 1;
                    }
                }
            }
            else
            {
                $this->code = 1;
            }
        }

        return;
    }

}
