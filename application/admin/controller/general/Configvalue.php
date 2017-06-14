<?php

namespace app\admin\controller\general;

use app\common\controller\Backend;

/**
 * 基本配置
 *
 * @icon fa fa-cog
 * @remark 用于管理一些字典数据,通常以键值格式进行录入,保存的数据格式为JSON
 * @internal
 */
class Configvalue extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Configvalue');
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
                if ($this->request->has('field'))
                {
                    //JSON字段
                    $fieldarr = $valuearr = [];
                    $field = $this->request->post('field/a');
                    $value = $this->request->post('value/a');
                    foreach ($field as $k => $v)
                    {
                        if ($v != '')
                        {
                            $fieldarr[] = $field[$k];
                            $valuearr[] = $value[$k];
                        }
                    }
                    $params['content'] = array_combine($fieldarr, $valuearr);
                }
                $this->model->save($params);
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
        // 状态为locked时不允许编辑
        if ($row['status'] == 'locked')
            $this->error(__('The current item can not be edited'));
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                if ($this->request->has('field'))
                {
                    //JSON字段
                    $fieldarr = $valuearr = [];
                    $field = $this->request->post('field/a');
                    $value = $this->request->post('value/a');
                    foreach ($field as $k => $v)
                    {
                        if ($v != '')
                        {
                            $fieldarr[] = $field[$k];
                            $valuearr[] = $value[$k];
                        }
                    }
                    $params['content'] = array_combine($fieldarr, $valuearr);
                }
                $row->save($params);
                $this->code = 1;
            }

            return;
        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

}
