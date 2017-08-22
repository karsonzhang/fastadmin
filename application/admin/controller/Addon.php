<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\addons\AddonException;
use think\addons\Service;
use think\Config;
use think\Exception;

/**
 * 插件管理
 *
 * @icon fa fa-circle-o
 */
class Addon extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 查看
     */
    public function index()
    {
        $addons = get_addon_list();
        foreach ($addons as $k => &$v)
        {
            $config = get_addon_config($v['name']);
            $v['config'] = $config ? 1 : 0;
        }
        $this->assignconfig(['addons' => $addons]);
        return $this->view->fetch();
    }

    /**
     * 配置
     */
    public function config($ids = NULL)
    {
        $name = $this->request->get("name");
        if (!$name)
        {
            $this->error(__('Parameter %s can not be empty', $ids ? 'id' : 'name'));
        }
        if (!is_dir(ADDON_PATH . $name))
        {
            $this->error(__('Directory not found'));
        }
        $info = get_addon_info($name);
        $config = get_addon_fullconfig($name);
        if (!$info)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if ($params)
            {
                $configList = [];
                foreach ($config as $k => &$v)
                {
                    if (isset($params[$v['name']]))
                    {
                        if ($v['type'] == 'array')
                        {
                            $fieldarr = $valuearr = [];
                            $field = $params[$v['name']]['field'];
                            $value = $params[$v['name']]['value'];

                            foreach ($field as $m => $n)
                            {
                                if ($n != '')
                                {
                                    $fieldarr[] = $field[$m];
                                    $valuearr[] = $value[$m];
                                }
                            }
                            $params[$v['name']] = array_combine($fieldarr, $valuearr);
                            $value = $params[$v['name']];
                        }
                        else
                        {
                            $value = is_array($params[$v['name']]) ? implode(',', $params[$v['name']]) : $params[$v['name']];
                        }

                        $v['value'] = $value;
                    }
                }
                try
                {
                    //更新配置文件
                    set_addon_fullconfig($name, $config);
                    $this->success();
                }
                catch (Exception $e)
                {
                    $this->error($e->getMessage());
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $this->view->assign("addon", ['info' => $info, 'config' => $config]);
        return $this->view->fetch();
    }

    /**
     * 安装
     */
    public function install()
    {
        $name = $this->request->post("name");
        $force = (int) $this->request->post("force");
        if (!$name)
        {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        try
        {
            Service::install($name, $force);
            $info = get_addon_info($name);
            $info['config'] = get_addon_config($name) ? 1 : 0;
            $this->success("安装成功", null, ['addon' => $info]);
        }
        catch (AddonException $e)
        {
            $this->result($e->getData(), $e->getCode(), $e->getMessage());
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage(), $e->getCode());
        }
    }

    /**
     * 卸载
     */
    public function uninstall()
    {
        $name = $this->request->post("name");
        $force = (int) $this->request->post("force");
        if (!$name)
        {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        try
        {
            Service::uninstall($name, $force);
            $this->success("卸载成功");
        }
        catch (AddonException $e)
        {
            $this->result($e->getData(), $e->getCode(), $e->getMessage());
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage());
        }
    }

    /**
     * 禁用启用
     */
    public function state()
    {
        $name = $this->request->post("name");
        $action = $this->request->post("action");
        $force = (int) $this->request->post("force");
        if (!$name)
        {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        try
        {
            $action = $action == 'enable' ? $action : 'disable';
            //调用启用、禁用的方法
            Service::$action($name, $force);
            $this->success("操作成功");
        }
        catch (AddonException $e)
        {
            $this->result($e->getData(), $e->getCode(), $e->getMessage());
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage());
        }
    }

    /**
     * 本地上传
     */
    public function local()
    {
        $file = $this->request->file('file');
        $addonTmpDir = RUNTIME_PATH . 'addons' . DS;
        if (!is_dir($addonTmpDir))
        {
            @mkdir($addonTmpDir, 0755, true);
        }
        $info = $file->rule('uniqid')->validate(['size' => 10240000, 'ext' => 'zip'])->move($addonTmpDir);
        if ($info)
        {
            $tmpName = substr($info->getFilename(), 0, stripos($info->getFilename(), '.'));
            $tmpAddonDir = ADDON_PATH . $tmpName . DS;
            $tmpFile = $addonTmpDir . $info->getSaveName();
            try
            {
                Service::unzip($tmpName);
                @unlink($tmpFile);
                $infoFile = $tmpAddonDir . 'info.ini';
                if (!is_file($infoFile))
                {
                    throw new Exception("插件配置文件未找到");
                }

                $config = Config::parse($infoFile, '', $tmpName);
                $name = isset($config['name']) ? $config['name'] : '';
                if (!$name)
                {
                    throw new Exception("插件配置信息不正确");
                }

                $newAddonDir = ADDON_PATH . $name . DS;
                if (is_dir($newAddonDir))
                {
                    throw new Exception("上传的插件已经存在");
                }

                //重命名插件文件夹
                rename($tmpAddonDir, $newAddonDir);
                try
                {
                    //默认禁用该插件
                    $info = get_addon_info($name);
                    if ($info['state'])
                    {
                        $info['state'] = 0;
                        set_addon_info($name, $info);
                    }

                    //执行插件的安装方法
                    $class = get_addon_class($name);
                    if (class_exists($class))
                    {
                        $addon = new $class();
                        $addon->install();
                    }

                    //导入SQL
                    Service::importsql($name);
                    
                    $info['config'] = get_addon_config($name) ? 1 : 0;
                    $this->success("插件安装成功，你需要手动启用该插件，使之生效", null, ['addon' => $info]);
                }
                catch (Exception $e)
                {
                    @rmdirs($newAddonDir);
                    throw new Exception($e->getMessage());
                }
            }
            catch (Exception $e)
            {
                @unlink($tmpFile);
                @rmdirs($tmpAddonDir);
                $this->error($e->getMessage());
            }
        }
        else
        {
            // 上传失败获取错误信息
            $this->error($file->getError());
        }
    }

    /**
     * 刷新缓存
     */
    public function refresh()
    {
        try
        {
            Service::refresh();
            $this->success("操作成功");
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage());
        }
    }

}
