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

}
