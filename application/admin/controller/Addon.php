<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use fast\Http;
use think\addons\AddonException;
use think\addons\Service;
use think\Cache;
use think\Config;
use think\Db;
use think\Exception;

/**
 * 插件管理
 *
 * @icon   fa fa-cube
 * @remark 可在线安装、卸载、禁用、启用、配置、升级插件，插件升级前请做好备份。
 */
class Addon extends Backend
{
    protected $model = null;
    protected $noNeedRight = ['get_table_list'];

    public function _initialize()
    {
        parent::_initialize();
        if (!$this->auth->isSuperAdmin() && in_array($this->request->action(), ['install', 'uninstall', 'local', 'upgrade'])) {
            $this->error(__('Access is allowed only to the super management group'));
        }
    }

    /**
     * 查看
     */
    public function index()
    {
        $addons = get_addon_list();
        foreach ($addons as $k => &$v) {
            $config = get_addon_config($v['name']);
            $v['config'] = $config ? 1 : 0;
            $v['url'] = str_replace($this->request->server('SCRIPT_NAME'), '', $v['url']);
        }
        $this->assignconfig(['addons' => $addons, 'api_url' => config('fastadmin.api_url'), 'faversion' => config('fastadmin.version')]);
        return $this->view->fetch();
    }

    /**
     * 配置
     */
    public function config($name = null)
    {
        $name = $name ? $name : $this->request->get("name");
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        if (!is_dir(ADDON_PATH . $name)) {
            $this->error(__('Directory not found'));
        }
        $info = get_addon_info($name);
        $config = get_addon_fullconfig($name);
        if (!$info) {
            $this->error(__('No Results were found'));
        }
        if ($this->request->isPost()) {
            $params = $this->request->post("row/a", [], 'trim');
            if ($params) {
                foreach ($config as $k => &$v) {
                    if (isset($params[$v['name']])) {
                        if ($v['type'] == 'array') {
                            $params[$v['name']] = is_array($params[$v['name']]) ? $params[$v['name']] : (array)json_decode($params[$v['name']], true);
                            $value = $params[$v['name']];
                        } else {
                            $value = is_array($params[$v['name']]) ? implode(',', $params[$v['name']]) : $params[$v['name']];
                        }
                        $v['value'] = $value;
                    }
                }
                try {
                    //更新配置文件
                    set_addon_fullconfig($name, $config);
                    Service::refresh();
                    $this->success();
                } catch (Exception $e) {
                    $this->error(__($e->getMessage()));
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $tips = [];
        foreach ($config as $index => &$item) {
            if ($item['name'] == '__tips__') {
                $tips = $item;
                unset($config[$index]);
            }
        }
        $this->view->assign("addon", ['info' => $info, 'config' => $config, 'tips' => $tips]);
        $configFile = ADDON_PATH . $name . DS . 'config.html';
        $viewFile = is_file($configFile) ? $configFile : '';
        return $this->view->fetch($viewFile);
    }

    /**
     * 安装
     */
    public function install()
    {
        $name = $this->request->post("name");
        $force = (int)$this->request->post("force");
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }

        $info = [];
        try {
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
            $info = Service::install($name, $force, $extend);
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (Exception $e) {
            $this->error(__($e->getMessage()), $e->getCode());
        }
        $this->success(__('Install successful'), '', ['addon' => $info]);
    }

    /**
     * 卸载
     */
    public function uninstall()
    {
        $name = $this->request->post("name");
        $force = (int)$this->request->post("force");
        $droptables = (int)$this->request->post("droptables");
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        //只有开启调试且为超级管理员才允许删除相关数据库
        $tables = [];
        if ($droptables && Config::get("app_debug") && $this->auth->isSuperAdmin()) {
            $tables = get_addon_tables($name);
        }
        try {
            Service::uninstall($name, $force);
            if ($tables) {
                $prefix = Config::get('database.prefix');
                //删除插件关联表
                foreach ($tables as $index => $table) {
                    //忽略非插件标识的表名
                    if (!preg_match("/^{$prefix}{$name}/", $table)) {
                        continue;
                    }
                    Db::execute("DROP TABLE IF EXISTS `{$table}`");
                }
            }
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (Exception $e) {
            $this->error(__($e->getMessage()));
        }
        $this->success(__('Uninstall successful'));
    }

    /**
     * 禁用启用
     */
    public function state()
    {
        $name = $this->request->post("name");
        $action = $this->request->post("action");
        $force = (int)$this->request->post("force");
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        try {
            $action = $action == 'enable' ? $action : 'disable';
            //调用启用、禁用的方法
            Service::$action($name, $force);
            Cache::rm('__menu__');
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (Exception $e) {
            $this->error(__($e->getMessage()));
        }
        $this->success(__('Operate successful'));
    }

    /**
     * 本地上传
     */
    public function local()
    {
        Config::set('default_return_type', 'json');

        $info = [];
        $file = $this->request->file('file');
        try {
            $uid = $this->request->post("uid");
            $token = $this->request->post("token");
            $faversion = $this->request->post("faversion");
            if (!$uid || !$token) {
                throw new Exception(__('Please login and try to install'));
            }
            $extend = [
                'uid'       => $uid,
                'token'     => $token,
                'faversion' => $faversion
            ];
            $info = Service::local($file, $extend);
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (Exception $e) {
            $this->error(__($e->getMessage()));
        }
        $this->success(__('Offline installed tips'), '', ['addon' => $info]);
    }

    /**
     * 更新插件
     */
    public function upgrade()
    {
        $name = $this->request->post("name");
        $addonTmpDir = RUNTIME_PATH . 'addons' . DS;
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        if (!is_dir($addonTmpDir)) {
            @mkdir($addonTmpDir, 0755, true);
        }

        $info = [];
        try {
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
            $info = Service::upgrade($name, $extend);
            Cache::rm('__menu__');
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (Exception $e) {
            $this->error(__($e->getMessage()));
        }
        $this->success(__('Operate successful'), '', ['addon' => $info]);
    }

    /**
     * 已装插件
     */
    public function downloaded()
    {
        $offset = (int)$this->request->get("offset");
        $limit = (int)$this->request->get("limit");
        $filter = $this->request->get("filter");
        $search = $this->request->get("search");
        $search = htmlspecialchars(strip_tags($search));
        $onlineaddons = Cache::get("onlineaddons");
        if (!is_array($onlineaddons) && config('fastadmin.api_url')) {
            $onlineaddons = [];
            $result = Http::sendRequest(config('fastadmin.api_url') . '/addon/index', [], 'GET', [
                CURLOPT_HTTPHEADER => ['Accept-Encoding:gzip'],
                CURLOPT_ENCODING   => "gzip"
            ]);
            if ($result['ret']) {
                $json = (array)json_decode($result['msg'], true);
                $rows = isset($json['rows']) ? $json['rows'] : [];
                foreach ($rows as $index => $row) {
                    $onlineaddons[$row['name']] = $row;
                }
            }
            Cache::set("onlineaddons", $onlineaddons, 600);
        }
        $filter = (array)json_decode($filter, true);
        $addons = get_addon_list();
        $list = [];
        foreach ($addons as $k => $v) {
            if ($search && stripos($v['name'], $search) === false && stripos($v['title'], $search) === false && stripos($v['intro'], $search) === false) {
                continue;
            }

            if (isset($onlineaddons[$v['name']])) {
                $v = array_merge($v, $onlineaddons[$v['name']]);
            } else {
                $v['category_id'] = 0;
                $v['flag'] = '';
                $v['banner'] = '';
                $v['image'] = '';
                $v['donateimage'] = '';
                $v['demourl'] = '';
                $v['price'] = __('None');
                $v['screenshots'] = [];
                $v['releaselist'] = [];
            }
            $v['url'] = addon_url($v['name']);
            $v['url'] = str_replace($this->request->server('SCRIPT_NAME'), '', $v['url']);
            $v['createtime'] = filemtime(ADDON_PATH . $v['name']);
            if ($filter && isset($filter['category_id']) && is_numeric($filter['category_id']) && $filter['category_id'] != $v['category_id']) {
                continue;
            }
            $list[] = $v;
        }
        $total = count($list);
        if ($limit) {
            $list = array_slice($list, $offset, $limit);
        }
        $result = array("total" => $total, "rows" => $list);

        $callback = $this->request->get('callback') ? "jsonp" : "json";
        return $callback($result);
    }

    /**
     * 获取插件相关表
     */
    public function get_table_list()
    {
        $name = $this->request->post("name");
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        $tables = get_addon_tables($name);
        $prefix = Config::get('database.prefix');
        foreach ($tables as $index => $table) {
            //忽略非插件标识的表名
            if (!preg_match("/^{$prefix}{$name}/", $table)) {
                unset($tables[$index]);
            }
        }
        $tables = array_values($tables);
        $this->success('', null, ['tables' => $tables]);
    }
}
