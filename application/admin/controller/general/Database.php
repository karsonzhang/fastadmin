<?php

namespace app\admin\controller\general;

use app\common\controller\Backend;
use think\Db;
use think\Debug;

/**
 * 数据库管理
 *
 * @icon fa fa-database
 * @remark 可在线进行一些简单的数据库表优化或修复,查看表结构和数据。也可以进行SQL语句的操作
 */
class Database extends Backend
{

    /**
     * 查看
     */
    function index()
    {
        $tables_data_length = $tables_index_length = $tables_free_length = $tables_data_count = 0;
        $tables = $list = [];
        $list = Db::query("SHOW TABLES");
        foreach ($list as $key => $row)
        {
            $tables[] = ['name' => reset($row), 'rows' => 0];
        }
        $data['tables'] = $tables;
        /*
          $one = Db::table('configvalue')->where('name', 'sql')->find();
          $saved_sql = [];
          if ($one && $one['content'])
          $saved_sql = explode('###', $one['content']);

          $data['saved_sql'] = array_values(array_filter($saved_sql));
         * */
        $data['saved_sql'] = [];
        $this->view->assign($data);
        return $this->view->fetch();
    }

    /**
     * SQL查询
     */
    public function query()
    {
        $do_action = $this->request->post('do_action');

        echo '<style type="text/css">
            xmp,body{margin:0;padding:0;line-height:18px;font-size:12px;font-family:"Helvetica Neue", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;}
            hr{height:1px;margin:5px 1px;background:#e3e3e3;border:none;}
            </style>';
        if ($do_action == '')
            exit(__('Invalid parameters'));

        $tablename = $this->request->post("tablename/a");

        if (in_array($do_action, array('doquery', 'optimizeall', 'repairall')))
        {
            $this->$do_action();
        }
        else if (count($tablename) == 0)
        {
            exit(__('Invalid parameters'));
        }
        else
        {
            foreach ($tablename as $table)
            {
                $this->$do_action($table);
                echo "<br />";
            }
        }
    }

    private function viewinfo($name)
    {
        $row = Db::query("SHOW CREATE TABLE `{$name}`");
        $row = array_values($row[0]);
        $info = $row[1];
        echo "<xmp>{$info};</xmp>";
    }

    private function viewdata($name = '')
    {
        $sqlquery = "SELECT * FROM `{$name}`";
        $this->doquery($sqlquery);
    }

    private function optimize($name = '')
    {
        if (Db::execute("OPTIMIZE TABLE `{$name}`"))
        {
            echo __('Optimize table %s done', $name);
        }
        else
        {
            echo __('Optimize table %s fail', $name);
        }
    }

    private function optimizeall($name = '')
    {
        $list = Db::query("SHOW TABLES");
        foreach ($list as $key => $row)
        {
            $name = reset($row);
            if (Db::execute("OPTIMIZE TABLE {$name}"))
            {
                echo __('Optimize table %s done', $name);
            }
            else
            {
                echo __('Optimize table %s fail', $name);
            }
            echo "<br />";
        }
    }

    private function repair($name = '')
    {
        if (Db::execute("REPAIR TABLE `{$name}`"))
        {
            echo __('Repair table %s done', $name);
        }
        else
        {
            echo __('Repair table %s fail', $name);
        }
    }

    private function repairall($name = '')
    {
        $list = Db::query("SHOW TABLES");
        foreach ($list as $key => $row)
        {
            $name = reset($row);
            if (Db::execute("REPAIR TABLE {$name}"))
            {
                echo __('Repair table %s done', $name);
            }
            else
            {
                echo __('Repair table %s fail', $name);
            }
            echo "<br />";
        }
    }

    private function doquery($sql = null)
    {
        $sqlquery = $sql ? $sql : $this->request->post('sqlquery');
        if ($sqlquery == '')
            exit(__('SQL can not be empty'));
        $sqlquery = str_replace("\r", "", $sqlquery);
        $sqls = preg_split("/;[ \t]{0,}\n/i", $sqlquery);
        $maxreturn = 100;
        $r = '';
        foreach ($sqls as $key => $val)
        {
            if (trim($val) == '')
                continue;
            $val = rtrim($val, ';');
            $r .= "SQL：<span style='color:green;'>{$val}</span> ";
            if (preg_match("/^(select|explain)(.*)/i ", $val))
            {
                Debug::remark("begin");
                $limit = stripos(strtolower($val), "limit") !== false ? true : false;
                $count = Db::execute($val);
                if ($count > 0)
                {
                    $resultlist = Db::query($val . (!$limit && $count > $maxreturn ? ' LIMIT ' . $maxreturn : ''));
                }
                else
                {
                    $resultlist = [];
                }
                Debug::remark("end");
                $time = Debug::getRangeTime('begin', 'end', 4);

                $usedseconds = __('Query took %s seconds', $time) . "<br />";
                if ($count <= 0)
                {
                    $r .= __('Query returned an empty result');
                }
                else
                {
                    $r .= (__('Total:%s', $count) . (!$limit && $count > $maxreturn ? ',' . __('Max output:%s', $maxreturn) : ""));
                }
                $r = $r . ',' . $usedseconds;
                $j = 0;
                foreach ($resultlist as $m => $n)
                {
                    $j++;
                    if (!$limit && $j > $maxreturn)
                        break;
                    $r .= "<hr/>";
                    $r .= "<font color='red'>" . __('Row:%s', $j) . "</font><br />";
                    foreach ($n as $k => $v)
                    {
                        $r .= "<font color='blue'>{$k}：</font>{$v}<br/>\r\n";
                    }
                }
            }
            else
            {
                Debug::remark("begin");
                $count = Db::execute($val);
                Debug::remark("end");
                $time = Debug::getRangeTime('begin', 'end', 4);
                $r .= __('Query affected %s rows and took %s seconds', $count, $time) . "<br />";
            }
        }
        echo $r;
    }

}
