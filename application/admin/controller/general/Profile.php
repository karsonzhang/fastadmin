<?php

namespace app\admin\controller\general;

<<<<<<< HEAD
use app\admin\model\Admin;
use app\common\controller\Backend;
use fast\Random;
use think\Session;
=======
use think\Session;
use app\admin\model\AdminLog;
use app\common\controller\Backend;
use fast\Random;
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master

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
<<<<<<< HEAD
        //设置过滤方法
        $this->request->filter(['strip_tags']);
=======
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
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
<<<<<<< HEAD
                $admin = Admin::get($this->auth->id);
                $admin->save($params);
                //因为个人资料面板读取的Session显示，修改自己资料后同时更新Session
                Session::set("admin", $admin->toArray());
=======
                model('admin')->where('id', $this->auth->id)->update($params);
                //因为个人资料面板读取的Session显示，修改自己资料后同时更新Session
                $admin = Session::get('admin');
                $admin_id = $admin ? $admin->id : 0;
                if($this->auth->id==$admin_id){
                    $admin = model('admin')->get(['id' => $admin_id]);
                    Session::set("admin", $admin);
                }
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
                $this->success();
            }
            $this->error();
        }
        return;
    }

}
