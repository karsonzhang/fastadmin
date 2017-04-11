<?php

namespace app\admin\controller\general;

use app\common\controller\Backend;
use fast\Random;

/**
 * 个人配置
 *
 * @icon fa fa-user
 */
class Profile extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        if ($this->request->isAjax())
        {
            $model = model('AdminLog');
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $total = $model
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $model
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
     * 更新个人信息
     */
    public function update()
    {
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            $params = array_filter(array_intersect_key($params, array_flip(array('email', 'nickname', 'password'))));
            unset($v);
            if (isset($params['password']))
            {
                $params['salt'] = Random::alnum();
                $params['password'] = md5(md5($params['password']) . $params['salt']);
            }
            if ($params)
            {
                model('admin')->where('id', $this->auth->id)->update($params);
                $this->code = 1;
            }
        }
        return;
    }

}
