<?php

namespace app\admin\command;

use think\addons\AddonException;
use think\addons\Service;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Exception;

class Addon extends Command
{

    protected function configure()
    {
        $this
                ->setName('addon')
                ->addOption('name', 'a', Option::VALUE_REQUIRED, 'addon name', null)
                ->addOption('action', 'c', Option::VALUE_REQUIRED, 'action(create/enable/disable/install/uninstall/refresh)', 'create')
                ->addOption('force', 'f', Option::VALUE_OPTIONAL, 'force override', null)
                ->setDescription('Addon manager');
    }

    protected function execute(Input $input, Output $output)
    {
        $name = $input->getOption('name') ?: '';
        $action = $input->getOption('action') ?: '';
        //强制覆盖
        $force = $input->getOption('force');

        include dirname(__DIR__) . DS . 'common.php';

        if (!$name)
        {
            throw new Exception('Addon name could not be empty');
        }
        if (!$action || !in_array($action, ['create', 'disable', 'enable', 'install', 'uninstall', 'refresh']))
        {
            throw new Exception('Please input correct action name');
        }

        $addonDir = ADDON_PATH . $name;
        switch ($action)
        {
            case 'create':
                //非覆盖模式时如果存在则报错
                if (is_dir($addonDir) && !$force)
                {
                    throw new Exception("addon already exists!\nIf you need to create again, use the parameter --force=true ");
                }
                //如果存在先移除
                if (is_dir($addonDir))
                {
                    rmdirs($addonDir);
                }
                mkdir($addonDir);
                $data = [
                    'name'           => $name,
                    'addon'          => $name,
                    'addonClassName' => ucfirst($name)
                ];
                $this->writeToFile("addon", $data, $addonDir . DS . ucfirst($name) . '.php');
                $this->writeToFile("config", $data, $addonDir . DS . 'config.php');
                $this->writeToFile("info", $data, $addonDir . DS . 'info.ini');
                $output->info("Create Successed!");
                break;
            case 'disable':
            case 'enable':
                try
                {
                    //调用启用、禁用的方法
                    Service::$action($name, 0);
                }
                catch (AddonException $e)
                {
                    if ($e->getCode() != -3)
                    {
                        throw new Exception($e->getMessage());
                    }
                    //如果有冲突文件则提醒
                    $data = $e->getData();
                    foreach ($data['conflictlist'] as $k => $v)
                    {
                        $output->warning($v);
                    }
                    $output->info("Are you sure you want to " . ($action == 'enable' ? 'override' : 'delete') . " all those files?  Type 'yes' to continue: ");
                    $line = fgets(STDIN);
                    if (trim($line) != 'yes')
                    {
                        throw new Exception("Operation is aborted!");
                    }
                    //调用启用、禁用的方法
                    Service::$action($name, 1);
                }
                catch (Exception $e)
                {
                    throw new Exception($e->getMessage());
                }
                $output->info(ucfirst($action) . " Successed!");
                break;
            case 'install':
                //非覆盖模式时如果存在则报错
                if (is_dir($addonDir) && !$force)
                {
                    throw new Exception("addon already exists!\nIf you need to install again, use the parameter --force=true ");
                }
                //如果存在先移除
                if (is_dir($addonDir))
                {
                    rmdirs($addonDir);
                }
                try
                {
                    Service::install($name, 0);
                }
                catch (AddonException $e)
                {
                    if ($e->getCode() != -3)
                    {
                        throw new Exception($e->getMessage());
                    }
                    //如果有冲突文件则提醒
                    $data = $e->getData();
                    foreach ($data['conflictlist'] as $k => $v)
                    {
                        $output->warning($v);
                    }
                    $output->info("Are you sure you want to override all those files?  Type 'yes' to continue: ");
                    $line = fgets(STDIN);
                    if (trim($line) != 'yes')
                    {
                        throw new Exception("Operation is aborted!");
                    }
                    Service::install($name, 1);
                }
                catch (Exception $e)
                {
                    throw new Exception($e->getMessage());
                }

                $output->info("Install Successed!");
                break;
            case 'uninstall':
                //非覆盖模式时如果存在则报错
                if (!$force)
                {
                    throw new Exception("If you need to uninstall addon, use the parameter --force=true ");
                }
                try
                {
                    Service::uninstall($name, 0);
                }
                catch (AddonException $e)
                {
                    if ($e->getCode() != -3)
                    {
                        throw new Exception($e->getMessage());
                    }
                    //如果有冲突文件则提醒
                    $data = $e->getData();
                    foreach ($data['conflictlist'] as $k => $v)
                    {
                        $output->warning($v);
                    }
                    $output->info("Are you sure you want to delete all those files?  Type 'yes' to continue: ");
                    $line = fgets(STDIN);
                    if (trim($line) != 'yes')
                    {
                        throw new Exception("Operation is aborted!");
                    }
                    Service::uninstall($name, 1);
                }
                catch (Exception $e)
                {
                    throw new Exception($e->getMessage());
                }

                $output->info("Uninstall Successed!");
                break;
            case 'refresh':
                Service::refresh();
                $output->info("Refresh Successed!");
                break;
            default :
                break;
        }
    }

    /**
     * 写入到文件
     * @param string $name
     * @param array $data
     * @param string $pathname
     * @return mixed
     */
    protected function writeToFile($name, $data, $pathname)
    {
        $search = $replace = [];
        foreach ($data as $k => $v)
        {
            $search[] = "{%{$k}%}";
            $replace[] = $v;
        }
        $stub = file_get_contents($this->getStub($name));
        $content = str_replace($search, $replace, $stub);

        if (!is_dir(dirname($pathname)))
        {
            mkdir(strtolower(dirname($pathname)), 0755, true);
        }
        return file_put_contents($pathname, $content);
    }

    /**
     * 获取基础模板
     * @param string $name
     * @return string
     */
    protected function getStub($name)
    {
        return __DIR__ . '/Addon/stubs/' . $name . '.stub';
    }

}
