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
 * @remark 可在线安装、卸载、禁用、启用插件，同时支持添加本地插件。FastAdmin已上线插件商店 ，你可以发布你的免费或付费插件：<a href="http://www.fastadmin.net/store.html" target="_blank">http://www.fastadmin.net/store.html</a>
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
            $uid = $this->request->post("uid");
            $token = $this->request->post("token");
            $version = $this->request->post("version");
            $faversion = $this->request->post("faversion");
            $extend = [
                'uid'       => $uid,
                'token'     => $token,
                'version'   => $version,
                'faversion' => $faversion
            ];
            Service::install($name, $force, $extend);
            $info = get_addon_info($name);
            $info['config'] = get_addon_config($name) ? 1 : 0;
            $info['state'] = 1;
            $this->success(__('Install successful'), null, ['addon' => $info]);
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
            $this->success(__('Uninstall successful'));
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
            $this->success(__('Operate successful'));
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
        Config::set('default_return_type', 'json');

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
                    throw new Exception(__('Addon info file was not found'));
                }

                $config = Config::parse($infoFile, '', $tmpName);
                $name = isset($config['name']) ? $config['name'] : '';
                if (!$name)
                {
                    throw new Exception(__('Addon info file data incorrect'));
                }

                $newAddonDir = ADDON_PATH . $name . DS;
                if (is_dir($newAddonDir))
                {
                    throw new Exception(__('Addon already exists'));
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
                    $this->success(__('Offline installed tips'), null, ['addon' => $info]);
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
     * 更新插件
     */
    public function upgrade()
    {
        $name = $this->request->post("name");
        if (!$name)
        {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        try
        {
            $uid = $this->request->post("uid");
            $token = $this->request->post("token");
            $version = $this->request->post("version");
            $faversion = $this->request->post("faversion");
            $extend = [
                'uid'       => $uid,
                'token'     => $token,
                'version'   => $version,
                'faversion' => $faversion
            ];
            //调用更新的方法
            Service::upgrade($name, $extend);
            $this->success(__('Operate successful'));
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
     * 刷新缓存
     */
    public function refresh()
    {
        try
        {
            Service::refresh();
            $this->success(__('Operate successful'));
        }
        catch (Exception $e)
        {
            $this->error($e->getMessage());
        }
    }

    /**
     * 已装插件
     */
    public function downloaded()
    {
        $offset = (int) $this->request->get("offset");
        $limit = (int) $this->request->get("limit");
        $search = $this->request->get("search");
        $search = htmlspecialchars(strip_tags($search));

        $addons = get_addon_list();
        $list = [];
        foreach ($addons as $k => $v)
        {
            if ($search && stripos($v['name'], $search) === FALSE && stripos($v['intro'], $search) === FALSE)
                continue;

            $v['flag'] = '';
            $v['banner'] = '';
            $v['image'] = '';
            $v['donateimage'] = '';
            $v['demourl'] = '';
            $v['price'] = '0.00';
            $v['url'] = addon_url($v['name']);
            $v['createtime'] = filemtime(ADDON_PATH . $v['name']);
            $list[] = $v;
        }
        $total = count($list);
        $list = array_slice($list, $offset, $limit);
        $result = array("total" => $total, "rows" => $list);

        $callback = $this->request->get('callback') ? "jsonp" : "json";
        return $callback($result);
    }

}
