<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use fast\Random;
use fast\Tree;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use think\Cache;
use think\Config;
use think\Db;
use think\Lang;

/**
 * Ajax异步请求接口
 * @internal
 */
class Ajax extends Backend
{

    protected $noNeedLogin = ['lang'];
    protected $noNeedRight = ['*'];
    protected $layout = '';

    /**
     * 自动完成
     */
    public function typeahead()
    {
        $search = $this->request->get("search");
        $field = $this->request->get("field");
        $field = str_replace(['row[', ']'], '', $field);
        if (substr($field, -3) !== '_id' && substr($field, -4) !== '_ids')
        {
            $this->code = -1;
            return;
        }
        $searchfield = 'name';
        $fieldArr = explode('_', $field);
        $field = $fieldArr[0];
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

        $searchlist = Db::name($field)
                ->whereOr($searchfield, 'like', "%{$search}%")
                ->whereOr('id', 'like', "%{$search}%")
                ->limit(10)
                ->field("id,{$searchfield} AS name")
                ->select();

        $this->code = 1;
        $this->data = ['searchlist' => $searchlist];
    }

    /**
     * SelectPage通用下拉列表搜索
     */
    public function selectpage()
    {
        //搜索关键词,客户端输入以空格分开,这里接收为数组
        $word = $this->request->request("q_word/a");
        //当前页
        $page = $this->request->request("pageNumber");
        //分页大小
        $pagesize = $this->request->request("pageSize");
        //搜索条件
        $andor = $this->request->request("and_or");
        //排序方式
        $orderby = $this->request->request("order_by/a");
        //表名
        $table = $this->request->request("db_table");
        //显示的字段
        $field = $this->request->request("field");
        //主键
        $primarykey = $this->request->request("pkey_name");
        //主键值
        $primaryvalue = $this->request->request("pkey_value");
        //搜索字段
        $searchfield = $this->request->request("search_field/a");
        //自定义搜索条件
        $custom = $this->request->request("custom/a");
        $order = [];
        foreach ($orderby as $k => $v)
        {
            $order[$v[0]] = $v[1];
        }
        $field = $field ? $field : 'name';

        //如果不使用ajax/selectpage这个页面提供结果,则是自己的控制器单独写搜索条件,$where按自己的需求写即可
        //这里只是能用考虑,所以搜索条件写得比较复杂
        //如果有primaryvalue,说明当前是初始化传值
        if ($primaryvalue)
        {
            $where = [$primarykey => ['in', $primaryvalue]];
        }
        else
        {
            $where = function($query) use($word, $andor, $field, $searchfield, $custom) {
                $where = $andor == "OR" ? "whereOr" : "where";
                foreach ($word as $k => $v)
                {
                    foreach ($searchfield as $m => $n)
                    {
                        $query->{$where}($n, "like", "%{$v}%");
                    }
                }
                if ($custom && is_array($custom))
                {
                    foreach ($custom as $k => $v)
                    {
                        $query->where($k, '=', $v);
                    }
                }
            };
        }
        $list = [];
        $total = Db::name($table)->where($where)->count();
        if ($total > 0)
        {
            $list = Db::name($table)->where($where)->order($order)->page($page, $pagesize)->field("{$primarykey},{$field}")->select();
        }

        //这里一定要返回有list这个字段,total是可选的,如果total<=list的数量,则会隐藏分页按钮
        return json(['list' => $list, 'total' => $total]);
    }

    /**
     * 加载语言包
     */
    public function lang()
    {
        header('Content-Type: application/javascript');
        $callback = $this->request->get('callback');
        $controllername = input("controllername");
        $this->loadlang($controllername);
        //强制输出JSON Object
        $result = 'define(' . json_encode(Lang::get(), JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE) . ');';
        return $result;
    }

    /**
     * 读取角色权限树
     */
    public function roletree()
    {
        $this->loadlang('auth/group');

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
            $ruleList = collection(model('AuthRule')->order('weigh', 'desc')->select())->toArray();
            //读取父类角色所有节点列表
            $parentRuleList = [];
            if (in_array('*', explode(',', $parentgroupmodel->rules)))
            {
                $parentRuleList = $ruleList;
            }
            else
            {
                $parent_rule_ids = explode(',', $parentgroupmodel->rules);
                foreach ($ruleList as $k => $v)
                {
                    if (in_array($v['id'], $parent_rule_ids))
                    {
                        $parentRuleList[] = $v;
                    }
                }
            }

            //当前所有正常规则列表
            Tree::instance()->init($ruleList);

            //读取当前角色下规则ID集合
            $admin_rule_ids = $this->auth->getRuleIds();
            //是否是超级管理员
            $superadmin = $this->auth->isSuperAdmin();
            //当前拥有的规则ID集合
            $current_rule_ids = $id ? explode(',', $currentgroupmodel->rules) : [];

            if (!$id || !in_array($pid, Tree::instance()->getChildrenIds($id, TRUE)))
            {
                $ruleList = Tree::instance()->getTreeList(Tree::instance()->getTreeArray(0), 'name');
                $hasChildrens = [];
                foreach ($ruleList as $k => $v)
                {
                    if ($v['haschild'])
                        $hasChildrens[] = $v['id'];
                }
                $nodelist = [];
                foreach ($parentRuleList as $k => $v)
                {
                    if (!$superadmin && !in_array($v['id'], $admin_rule_ids))
                        continue;
                    $state = array('selected' => in_array($v['id'], $current_rule_ids) && !in_array($v['id'], $hasChildrens));
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
        if (empty($file))
        {
            $this->msg = "未上传文件或超出服务器上传限制";
            return;
        }

        //判断是否已经存在附件
        $sha1 = $file->hash();
        $uploaded = model("attachment")->where('sha1', $sha1)->find();
        if ($uploaded)
        {
            $this->code = 1;
            $this->data = [
                'url' => $uploaded['url']
            ];
            return;
        }

        $upload = Config::get('upload');

        preg_match('/(\d+)(\w+)/', $upload['maxsize'], $matches);
        $type = strtolower($matches[2]);
        $typeDict = ['b' => 0, 'k' => 1, 'kb' => 1, 'm' => 2, 'mb' => 2, 'gb' => 3, 'g' => 3];
        $size = (int) $upload['maxsize'] * pow(1024, isset($typeDict[$type]) ? $typeDict[$type] : 0);
        $fileInfo = $file->getInfo();
        $suffix = strtolower(pathinfo($fileInfo['name'], PATHINFO_EXTENSION));
        $suffix = $suffix ? $suffix : 'file';
        $replaceArr = [
            '{year}'     => date("Y"),
            '{mon}'      => date("m"),
            '{day}'      => date("d"),
            '{hour}'     => date("H"),
            '{min}'      => date("i"),
            '{sec}'      => date("s"),
            '{random}'   => Random::alnum(16),
            '{random32}' => Random::alnum(32),
            '{filename}' => $suffix ? substr($fileInfo['name'], 0, strripos($fileInfo['name'], '.')) : $fileInfo['name'],
            '{suffix}'   => $suffix,
            '{.suffix}'  => $suffix ? '.' . $suffix : '',
            '{filemd5}'  => md5_file($fileInfo['tmp_name']),
        ];
        $savekey = $upload['savekey'];
        $savekey = str_replace(array_keys($replaceArr), array_values($replaceArr), $savekey);

        $uploadDir = substr($savekey, 0, strripos($savekey, '/') + 1);
        $fileName = substr($savekey, strripos($savekey, '/') + 1);
        //
        $splInfo = $file->validate(['size' => $size])->move(ROOT_PATH . '/public' . $uploadDir, $fileName);
        if ($splInfo)
        {
            $imagewidth = $imageheight = 0;
            if (in_array($suffix, ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'swf']))
            {
                $imgInfo = getimagesize($splInfo->getPathname());
                $imagewidth = isset($imgInfo[0]) ? $imgInfo[0] : $imagewidth;
                $imageheight = isset($imgInfo[1]) ? $imgInfo[1] : $imageheight;
            }
            $params = array(
                'filesize'    => $fileInfo['size'],
                'imagewidth'  => $imagewidth,
                'imageheight' => $imageheight,
                'imagetype'   => $suffix,
                'imageframes' => 0,
                'mimetype'    => $fileInfo['type'],
                'url'         => $uploadDir . $splInfo->getSaveName(),
                'uploadtime'  => time(),
                'storage'     => 'local',
                'sha1'        => $sha1,
            );
            model("attachment")->create(array_filter($params));
            $this->code = 1;
            $this->data = [
                'url' => $uploadDir . $splInfo->getSaveName()
            ];
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

    /**
     * 清空系统缓存
     */
    public function wipecache()
    {
        $wipe_cache_type = ['TEMP_PATH', 'LOG_PATH', 'CACHE_PATH'];
        foreach ($wipe_cache_type as $item)
        {
            $dir = constant($item);
            if (!is_dir($dir))
                continue;
            $files = new RecursiveIteratorIterator(
                    new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST
            );

            foreach ($files as $fileinfo)
            {
                $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
                $todo($fileinfo->getRealPath());
            }

            //rmdir($dir);
        }
        Cache::clear();
        $this->code = 1;
    }

    /**
     * 读取分类数据
     */
    public function category()
    {
        $type = $this->request->get('type');
        $pid = $this->request->get('pid');
        $where = ['status' => 'normal'];
        if ($type)
        {
            $where['type'] = $type;
        }
        if ($pid)
        {
            $where['pid'] = $pid;
        }

        $categorylist = Db::name('category')->where($where)->field('id as value,name')->order('weigh desc,id desc')->select();
        $this->code = 1;
        $this->data = $categorylist;
        return;
    }

    /**
     * 读取省市区数据
     */
    public function area()
    {
        $province = $this->request->get('province');
        $city = $this->request->get('city');
        $where = ['pid' => 0, 'level' => 1];
        if ($province)
        {
            $where['pid'] = $province;
            $where['level'] = 2;
        }
        if ($city)
        {
            $where['pid'] = $city;
            $where['level'] = 3;
        }
        $provincelist = Db::name('area')->where($where)->field('id as value,name')->select();
        $this->code = 1;
        $this->data = $provincelist;
        return;
    }

}
