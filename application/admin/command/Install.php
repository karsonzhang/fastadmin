<?php

namespace app\admin\command;

use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Db;
use think\Exception;

class Install extends Command
{

    protected $model = null;

    protected function configure()
    {
        $this
                ->setName('install')
                ->addOption('force', 'f', Option::VALUE_OPTIONAL, 'force override', FALSE)
                ->setDescription('New installation of FastAdmin');
    }

    protected function execute(Input $input, Output $output)
    {

        //覆盖安装
        $force = $input->getOption('force');

        $installLockFile = __DIR__ . "/Install/install.lock";
        if (is_file($installLockFile) && !$force)
        {
            throw new Exception("\nFastAdmin already installed!\nIf you need to reinstall again, use the parameter --force=true ");
        }

        $sql = file_get_contents(__DIR__ . '/Install/fastadmin.sql');

        // 查询一次SQL,判断连接是否正常
        Db::execute("SELECT 1");

        // 调用原生PDO对象进行批量查询
        Db::getPdo()->exec($sql);

        file_put_contents($installLockFile, 1);
        $output->info("Install Successed!");
    }

}
