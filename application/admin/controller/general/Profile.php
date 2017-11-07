<?php

namespace app\admin\controller\general;

use think\Session;
use app\admin\model\AdminLog;
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
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax())
        {
            $model = model('AdminLog');
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $total = $model
                    ->where($where)
                    ->where('admin_id', $this->auth->id)
                    ->order($sort, $order)
                    ->count();

            $list = $model
                    ->where($where)
                    ->where('admin_id', $this->auth->id)
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
            $params = $this->request->post("row/a");
            $params = array_filter(array_intersect_key($params, array_flip(array('email', 'nickname', 'password', 'avatar'))));
            unset($v);
            if (isset($params['password']))
            {
                $params['salt'] = Random::alnum();
                $params['password'] = md5(md5($params['password']) . $params['salt']);
            }
            if ($params)
            {
                model('admin')->where('id', $this->auth->id)->update($params);
                //因为个人资料面板读取的Session显示，修改自己资料后同时更新Session
                $admin = Session::get('admin');
                $admin_id = $admin ? $admin->id : 0;
                if($this->auth->id==$admin_id){
                    $admin = model('admin')->get(['id' => $admin_id]);
                    Session::set("admin", $admin);
                }
                $this->success();
            }
            $this->error();
        }
        return;
    }

}
