<?php

namespace app\admin\library\traits;

use app\admin\model\AdminLog;

trait Backend
{

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
                AdminLog::record(__('Add'), $this->model->getLastInsID());
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
                AdminLog::record(__('Edit'), $ids);
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
                AdminLog::record(__('Del'), $ids);
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
                        AdminLog::record(__('Multi'), $ids);
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
