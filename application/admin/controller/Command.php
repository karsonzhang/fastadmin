<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\Config;
use think\console\Input;
use think\Db;
use think\Exception;

/**
 * 在线命令管理
 *
 * @icon fa fa-circle-o
 */
class Command extends Backend
{

    /**
     * Command模型对象
     */
    protected $model = null;
    protected $noNeedRight = ['get_controller_list', 'get_field_list'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Command');
        $this->view->assign("statusList", $this->model->getStatusList());
    }

    /**
     * 添加
     */
    public function add()
    {

        $tableList = [];
        $list = \think\Db::query("SHOW TABLES");
        foreach ($list as $key => $row) {
            $tableList[reset($row)] = reset($row);
        }

        $this->view->assign("tableList", $tableList);
        return $this->view->fetch();
    }

    /**
     * 获取字段列表
     * @internal
     */
    public function get_field_list()
    {
        $dbname = Config::get('database.database');
        $prefix = Config::get('database.prefix');
        $table = $this->request->request('table');
        //从数据库中获取表字段信息
        $sql = "SELECT * FROM `information_schema`.`columns` "
            . "WHERE TABLE_SCHEMA = ? AND table_name = ? "
            . "ORDER BY ORDINAL_POSITION";
        //加载主表的列
        $columnList = Db::query($sql, [$dbname, $table]);
        $fieldlist = [];
        foreach ($columnList as $index => $item) {
            $fieldlist[] = $item['COLUMN_NAME'];
        }
        $this->success("", null, ['fieldlist' => $fieldlist]);
    }

    /**
     * 获取控制器列表
     * @internal
     */
    public function get_controller_list()
    {
        $adminPath = dirname(__DIR__) . DS;
        $controllerDir = $adminPath . 'controller' . DS;
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($controllerDir), \RecursiveIteratorIterator::LEAVES_ONLY
        );
        $list = [];
        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $name = str_replace($controllerDir, '', $filePath);
                $name = str_replace(DS, "/", $name);
                $list[] = ['id' => $name, 'name' => $name];
            }
        }
        $pageNumber = $this->request->request("pageNumber");
        $pageSize = $this->request->request("pageSize");
        return json(['list' => array_slice($list, ($pageNumber - 1) * $pageSize, $pageSize), 'total' => count($list)]);
    }

    /**
     * 详情
     */
    public function detail($ids)
    {
        $row = $this->model->get($ids);
        if (!$row)
            $this->error(__('No Results were found'));
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

    /**
     * 执行
     */
    public function execute($ids)
    {
        $row = $this->model->get($ids);
        if (!$row)
            $this->error(__('No Results were found'));
        $result = $this->doexecute($row['type'], json_decode($row['params'], true));
        $this->success("", null, ['result' => $result]);
    }

    /**
     * 执行命令
     */
    public function command($action = '')
    {
        $commandtype = $this->request->request("commandtype");
        $params = $this->request->request();
        $allowfields = [
            'crud' => 'table,controller,model,fields,force,local,delete,menu',
            'menu' => 'controller,delete',
            'min'  => 'module,resource,optimize',
            'api'  => 'url,module,output,template,force,title,author,class,language',
        ];
        $argv = [];
        $allowfields = isset($allowfields[$commandtype]) ? explode(',', $allowfields[$commandtype]) : [];
        $allowfields = array_filter(array_intersect_key($params, array_flip($allowfields)));
        if (isset($params['local']) && !$params['local']) {
            $allowfields['local'] = $params['local'];
        } else {
            unset($allowfields['local']);
        }
        foreach ($allowfields as $key => $param) {
            $argv[] = "--{$key}=" . (is_array($param) ? implode(',', $param) : $param);
        }
        if ($commandtype == 'crud') {
            $extend = 'setcheckboxsuffix,enumradiosuffix,imagefield,filefield,intdatesuffix,switchsuffix,citysuffix,selectpagesuffix,selectpagessuffix,ignorefields,sortfield,editorsuffix,headingfilterfield';
            $extendArr = explode(',', $extend);
            foreach ($params as $index => $item) {
                if (in_array($index, $extendArr)) {
                    foreach (explode(',', $item) as $key => $value) {
                        if ($value) {
                            $argv[] = "--{$index}={$value}";
                        }
                    }
                }
            }
            $isrelation = (int)$this->request->request('isrelation');
            if ($isrelation && isset($params['relation'])) {
                foreach ($params['relation'] as $index => $relation) {
                    foreach ($relation as $key => $value) {
                        $argv[] = "--{$key}=" . (is_array($value) ? implode(',', $value) : $value);
                    }
                }
            }
        } else if ($commandtype == 'menu') {
            if (isset($params['allcontroller']) && $params['allcontroller']) {
                $argv[] = "--controller=all-controller";
            } else {
                foreach (explode(',', $params['controllerfile']) as $index => $param) {
                    if ($param) {
                        $argv[] = "--controller=" . substr($param, 0, -4);
                    }
                }
            }
        } else if ($commandtype == 'min') {

        } else if ($commandtype == 'api') {

        } else {

        }
        if ($action == 'execute') {
            $result = $this->doexecute($commandtype, $argv);
            $this->success("", null, ['result' => $result]);
        } else {
            $this->success("", null, ['command' => "php think {$commandtype} " . implode(' ', $argv)]);
        }

        return;
    }

    protected function doexecute($commandtype, $argv)
    {
        $commandName = "\\app\\admin\\command\\" . ucfirst($commandtype);
        $input = new Input($argv);
        $output = new \addons\command\library\Output();
        $command = new $commandName($commandtype);
        $data = [
            'type'        => $commandtype,
            'params'      => json_encode($argv),
            'command'     => "php think {$commandtype} " . implode(' ', $argv),
            'executetime' => time(),
        ];
        $this->model->save($data);
        try {
            $command->run($input, $output);
            $result = implode("\n", $output->getMessage());
            $this->model->status = 'successed';
        } catch (Exception $e) {
            $result = implode("\n", $output->getMessage()) . "\n";
            $result .= $e->getMessage();
            $this->model->status = 'failured';
        }
        $result = trim($result);
        $this->model->content = $result;
        $this->model->save();
        return $result;
    }


}
