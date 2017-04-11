<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use fast\Http;
use fast\Tree;
use think\Db;
use think\Lang;

/**
 * Ajax异步请求接口
 * @internal
 */
class Ajax extends Backend
{

    protected $noNeedLogin = ['dailybg', 'lang'];
    protected $noNeedRight = ['*'];
    protected $layout = '';

    /**
     * 自动完成
     */
    public function typeahead()
    {
        $search = $this->_request->getRequest("search");
        $field = $this->_request->getRequest("field");
        $field = str_replace(['row[', ']'], '', $field);
        if (substr($field, -3) !== '_id' && substr($field, -4) !== '_ids')
        {
            $this->code = -1;
            return;
        }
        $searchfield = 'name';
        $field = substr($field, 0, -3);
        switch ($field)
        {
            case 'category':
                $field = 'category';
                $searchfield = 'name';
                break;
            case 'user':
                $searchfield = 'nickname';
                break;
        }

        $searchlist = Db::table($field)
                ->orWhere($searchfield, 'like', "%{$search}%")
                ->orWhere('id', 'like', "%{$search}%")
                ->limit(10)
                ->select("id,{$searchfield} AS name");

        foreach ($searchlist as $k => &$v)
        {
            $v['name'] = $v['name'] . "[id:{$v['id']}]";
        }
        unset($v);
        $this->code = 1;
        $this->data = ['searchlist' => $searchlist];
    }

    /**
     * 加载语言包
     */
    public function lang()
    {
        header('Content-Type: application/javascript');
        $modulename = $this->request->module();
        $callback = $this->request->get('callback');
        $controllername = input("controllername");
        Lang::load(APP_PATH . $modulename . '/lang/' . Lang::detect() . '/' . str_replace('.', '/', $controllername) . '.php');
        //强制输出JSON Object
//        $result = 'define(' . json_encode(Lang::get(), JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE) . ');';
        return jsonp(Lang::get());
    }

    /**
     * 每日一图
     */
    public function dailybg()
    {
        //采用Infinty的图片
        $this->code = 1;
        $this->data = [
            'url' => 'http://img.infinitynewtab.com/wallpaper/' . (date("Ymd") % 4000) . '.jpg'
        ];
        return;
        //采用Bing每日一图
        $ret = Http::sendRequest("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", [], 'GET');
        if ($ret['ret'])
        {
            $json = json_decode($ret['msg'], TRUE);
            if ($json && isset($json['images'][0]))
            {
                $url = $json['images'][0]['url'];
                $startdate = $json['images'][0]['startdate'];
                $enddate = $json['images'][0]['enddate'];
                $copyright = $json['images'][0]['copyright'];
                $url = substr($url, 0, 4) != 'http' ? 'http://cn.bing.com' . $url : $url;
                $title = '';
                $intro = '';
                $ret = Http::sendRequest("http://cn.bing.com/cnhp/coverstory/", [], 'GET');
                if ($ret['ret'])
                {
                    $info = json_decode($ret['msg'], TRUE);
                    if (isset($info['title']))
                    {
                        $title = $info['title'];
                        $intro = $info['para1'];
                    }
                }
                $this->code = 1;
                $this->data = [
                    'title'     => $title,
                    'intro'     => $intro,
                    'url'       => $url,
                    'startdate' => $startdate,
                    'enddate'   => $enddate,
                    'copyright' => $copyright,
                ];
            }
        }
    }

    /**
     * 读取角色权限树
     */
    public function roletree()
    {
        $model = model('AuthGroup');
        $id = $this->request->post("id");
        $pid = $this->request->post("pid");
        $parentgroupmodel = $model->get($pid);
        $currentgroupmodel = NULL;
        if ($id)
        {
            $currentgroupmodel = $model->get($id);
        }
        if (($pid || $parentgroupmodel) && (!$id || $currentgroupmodel))
        {
            $id = $id ? $id : NULL;
            //读取父类角色所有节点列表
            $parentrulelist = model('AuthRule')->all(in_array('*', explode(',', $parentgroupmodel->rules)) ? NULL : $parentgroupmodel->rules);
            //读取当前角色下规则ID集合
            $admin_rule_ids = $this->auth->getRuleIds();
            $superadmin = $this->auth->isSuperAdmin();
            $current_rule_ids = $id ? explode(',', $currentgroupmodel->rules) : [];
            if (!$id || !array_key_exists($pid, Tree::instance()->init($model->all(['status' => 'normal']))->getChildrenIds($id, TRUE)))
            {
                //构造jstree所需的数据
                $nodelist = [];
                foreach ($parentrulelist as $k => $v)
                {
                    if (!$superadmin && !in_array($v['id'], $admin_rule_ids))
                        continue;
                    $state = array('selected' => !$v['ismenu'] && in_array($v['id'], $current_rule_ids));
                    $nodelist[] = array('id' => $v['id'], 'parent' => $v['pid'] ? $v['pid'] : '#', 'text' => $v['title'], 'type' => 'menu', 'state' => $state);
                }
                $this->code = 1;
                $this->data = $nodelist;
            }
            else
            {
                $this->code = -1;
                $this->data = __('Can not change the parent to child');
            }
        }
        else
        {
            $this->code = -1;
            $this->data = __('Group not found');
        }
    }

    /**
     * 上传文件
     */
    public function upload()
    {
        $this->code = -1;
        $file = $this->request->file('file');
        $uploaddir = '/public/uploads/';
        $info = $file->move(ROOT_PATH . $uploaddir);
        if ($info)
        {
            $this->code = 200;
            $this->data = $uploaddir . $info->getSaveName();
        }
        else
        {
            // 上传失败获取错误信息
            $this->data = $file->getError();
        }
    }

    /**
     * 通用排序
     */
    public function weigh()
    {
        //排序的数组
        $ids = $this->request->post("ids");
        //拖动的记录ID
        $changeid = $this->request->post("changeid");
        //操作字段
        $field = $this->request->post("field");
        //操作的数据表
        $table = $this->request->post("table");
        //排序的方式
        $orderway = $this->request->post("orderway", 'strtolower');
        $orderway = $orderway == 'asc' ? 'ASC' : 'DESC';
        $sour = $weighdata = [];
        $ids = explode(',', $ids);
        $prikey = 'id';
        $pid = $this->request->post("pid");

        // 如果设定了pid的值,此时只匹配满足条件的ID,其它忽略
        if ($pid !== '')
        {
            $hasids = [];
            $list = Db::name($table)->where($prikey, 'in', $ids)->where('pid', 'in', $pid)->field('id,pid')->select();
            foreach ($list as $k => $v)
            {
                $hasids[] = $v['id'];
            }
            $ids = array_values(array_intersect($ids, $hasids));
        }

        //直接修复排序
        $one = Db::name($table)->field("{$field},COUNT(*) AS nums")->group($field)->having('nums > 1')->find();
        if ($one)
        {
            $list = Db::name($table)->field("$prikey,$field")->order($field, $orderway)->select();
            foreach ($list as $k => $v)
            {
                Db::name($table)->where($prikey, $v[$prikey])->update([$field => $k + 1]);
            }
            $this->code = 1;
        }
        else
        {
            $list = Db::name($table)->field("$prikey,$field")->where($prikey, 'in', $ids)->order($field, $orderway)->select();
            foreach ($list as $k => $v)
            {
                $sour[] = $v[$prikey];
                $weighdata[$v[$prikey]] = $v[$field];
            }
            $position = array_search($changeid, $ids);
            $desc_id = $sour[$position];    //移动到目标的ID值,取出所处改变前位置的值
            $sour_id = $changeid;
            $desc_value = $weighdata[$desc_id];
            $sour_value = $weighdata[$sour_id];
            //echo "移动的ID:{$sour_id}\n";
            //echo "替换的ID:{$desc_id}\n";
            $weighids = array();
            $temp = array_values(array_diff_assoc($ids, $sour));
            foreach ($temp as $m => $n)
            {
                if ($n == $sour_id)
                {
                    $offset = $desc_id;
                }
                else
                {
                    if ($sour_id == $temp[0])
                    {
                        $offset = isset($temp[$m + 1]) ? $temp[$m + 1] : $sour_id;
                    }
                    else
                    {
                        $offset = isset($temp[$m - 1]) ? $temp[$m - 1] : $sour_id;
                    }
                }
                $weighids[$n] = $weighdata[$offset];
                Db::name($table)->where($prikey, $n)->update([$field => $weighdata[$offset]]);
            }
            $this->code = 1;
        }
    }

}
