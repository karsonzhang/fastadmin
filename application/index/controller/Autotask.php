<?php

namespace app\index\controller;

use app\common\model\Crontab;
use fast\Date;
use fast\Http;
use think\Controller;
use think\Db;
use think\Exception;
use think\Log;

/**
 * 定时任务接口
 *
 * 以Crontab方式每分钟定时执行,且只可以Cli方式运行
 * @internal
 */
class Autotask extends Controller
{

    /**
     * 初始化方法,最前且始终执行
     */
    public function _initialize()
    {
        // 只可以以cli方式执行
        if (!$this->request->isCli())
            $this->error('Autotask script only work at client!');

        parent::_initialize();

        // 清除错误
        error_reporting(0);

        // 设置永不超时
        set_time_limit(0);
    }

    /**
     * 执行定时任务
     */
    public function crontab()
    {
        $time = time();
        $logDir = LOG_PATH . 'crontab/';
        if (!is_dir($logDir))
        {
            mkdir($logDir);
        }
        //筛选未过期且未完成的任务
        $crontabList = Crontab::where('status', '=', 'normal')->order('weigh desc,id desc')->select();
        foreach ($crontabList as $crontab)
        {
            $update = [];
            $execute = FALSE;
            if ($time < $crontab['begintime'])
            {
                //任务未开始
                continue;
            }
            if ($crontab['maximums'] && $crontab['executes'] > $crontab['maximums'])
            {
                //任务已超过最大执行次数
                $update['status'] = 'completed';
            }
            else if ($crontab['endtime'] > 0 && $time > $crontab['endtime'])
            {
                //任务已过期
                $update['status'] = 'expired';
            }
            else
            {
                //重复执行
                //如果未到执行时间则继续循环
                if (!Date::cron($crontab['schedule']))
                    continue;
                $execute = TRUE;
            }

            // 如果允许执行
            if ($execute)
            {
                $update['executetime'] = $time;
                $update['executes'] = $crontab['executes'] + 1;
                $update['status'] = ($crontab['maximums'] > 0 && $update['executes'] >= $crontab['maximums']) ? 'completed' : 'normal';
            }

            // 如果需要更新状态
            if (!$update)
                continue;
            // 更新状态
            $crontab->save($update);

            // 将执行放在后面是为了避免超时导致多次执行
            if (!$execute)
                continue;
            try
            {
                if ($crontab['type'] == 'url')
                {
                    if (substr($crontab['content'], 0, 1) == "/")
                    {
                        // 本地项目URL
                        exec('nohup php ' . ROOT_PATH . 'public/index.php ' . $crontab['content'] . ' >> ' . $logDir . date("Y-m-d") . '.log 2>&1 &');
                    }
                    else
                    {
                        // 远程异步调用URL
                        Http::sendAsyncRequest($crontab['content']);
                    }
                }
                else if ($crontab['type'] == 'sql')
                {
                    //这里需要强制重连数据库,使用已有的连接会报2014错误
                    $connect = Db::connect([], true);
                    $connect->execute("select 1");
                    // 执行SQL
                    $connect->getPdo()->exec($crontab['content']);
                }
                else if ($crontab['type'] == 'shell')
                {
                    // 执行Shell
                    exec($crontab['content'] . ' >> ' . $logDir . date("Y-m-d") . '.log 2>&1 &');
                }
            }
            catch (Exception $e)
            {
                Log::record($e->getMessage());
            }
        }
        return 'Execute completed!';
    }

}
