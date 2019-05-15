<?php

namespace app\admin\controller;

use app\common\controller\Backend;
use think\Db;
use think\Config;

//use think\Config;

/**
 * 自建表管理
 *
 * @icon fa fa-circle-o
 */
class Tablemake extends Backend {

	/**
	 * Test模型对象
	 * @var \app\admin\model\Test
	 */
	protected $ModelOnline = null;
	protected $ModelFields = null;

	public function _initialize() {
		parent::_initialize();
		$this->ModelOnline = model('TableMakeTables');
		$this->ModelFields = model('TableMakeFields');
	}

	/*
	 * 模块列表
	 */

	public function index() {
		if ($this->request->isAjax()) {
			//weigh desc,
			$list = $this->ModelOnline->order('id desc')->select();
			$total = count($list);
			$prefix = Config::get('database.prefix');
			$result = array("total" => $total, "rows" => $list, "prefix" => $prefix);
			return json($result);
		}
		return $this->view->fetch();
	}

	/*
	 * 添加模块
	 */

	public function add() {
		if ($this->request->isPost()) {
			$params = $this->request->post("row/a");
			if ($params) {
				if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
					$params[$this->dataLimitField] = $this->auth->id;
				}
				try {
					//是否采用模型验证
					if ($this->modelValidate) {
						$name = str_replace("\\model\\", "\\validate\\", get_class($this->ModelOnline));
						$validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
						$this->ModelOnline->validate($validate);
					}
					$params['createtime'] = time();
					$params['updatetime'] = time();
					$result = $this->ModelOnline->allowField(true)->save($params);
					$prefix = Config::get('database.prefix');
					if ($result !== false) {
						//在此执行创建表的操作
						$sql = "CREATE TABLE IF NOT EXISTS `{$prefix}" . $params['table'] . "` (
								`id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
								
								PRIMARY KEY (`id`)
							  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='" . $params['name'] . "';";

						$res = \think\Db::execute($sql);
						//var_export($res);
						$this->success();
					} else {
						$this->error($this->ModelOnline->getError());
					}
				} catch (\think\exception\PDOException $e) {
					$this->error($e->getMessage());
				} catch (\think\Exception $e) {
					$this->error($e->getMessage());
				}
			}
			$this->error(__('Parameter %s can not be empty', ''));
		}

		$prefix = Config::get('database.prefix');
		$this->view->assign("prefix", $prefix);
		return $this->view->fetch();
	}

	/*
	 * 编辑模块
	 */

	public function edit($ids = NULL) {
		$row = $this->ModelOnline->get($ids);
		if (!$row)
			$this->error(__('No Results were found'));
		$adminIds = $this->getDataLimitAdminIds();
		if (is_array($adminIds)) {
			if (!in_array($row[$this->dataLimitField], $adminIds)) {
				$this->error(__('You have no permission'));
			}
		}
		if ($this->request->isPost()) {
			$params = $this->request->post("row/a");
			if ($params) {
				try {
					//是否采用模型验证
					if ($this->modelValidate) {
						$name = basename(str_replace('\\', '/', get_class($this->ModelOnline)));
						$validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : true) : $this->modelValidate;
						$row->validate($validate);
					}
					$params['updatetime'] = time();
					$result = $row->allowField(true)->save($params);
					if ($result !== false) {
						$prefix = Config::get('database.prefix');
						$sql = "ALTER TABLE  `{$prefix}" . $row['table'] . "`  COMMENT='" . $row['name'] . "';";
						$res = \think\Db::execute($sql);
						$this->success();
					} else {
						$this->error($row->getError());
					}
				} catch (\think\exception\PDOException $e) {
					$this->error($e->getMessage());
				} catch (\think\Exception $e) {
					$this->error($e->getMessage());
				}
			}
			$this->error(__('Parameter %s can not be empty', ''));
		}
		$prefix = Config::get('database.prefix');
		$this->view->assign("row", $row);
		$this->view->assign("prefix", $prefix);
		return $this->view->fetch();
	}

	/*
	 * 删除模块
	 */

	public function del($ids = NULL) {
		if ($ids) {
			$pk = $this->ModelOnline->getPk();
			$adminIds = $this->getDataLimitAdminIds();
			if (is_array($adminIds)) {
				$count = $this->ModelOnline->where($this->dataLimitField, 'in', $adminIds);
			}
			$list = $this->ModelOnline->where($pk, 'in', $ids)->select();
			$prefix = Config::get('database.prefix');
			$count = 0;
			foreach ($list as $k => $v) {
				$sql = "DROP TABLE IF EXISTS `{$prefix}" . $v->table . "`;";
				try {
					$res = \think\Db::execute($sql);
					$this->ModelFields->where("mid", '=', $v->id)->delete();
					$count += $v->delete();
					if ($count) {
						$this->success(__('删除成功！'), null, __('删除成功！'));
					} else {
						$this->error(__('No rows were deleted'));
					}
				} catch (Exception $ex) {
					$this->error(__('No rows were deleted'));
				}
			}
		}
		$this->error(__('Parameter %s can not be empty', 'ids'));
	}

	/*
	 * 验证重名
	 */

	public function check($table = null, $name = null) {
		if ($table == null && $name == null) {
			if ($this->request->isAjax()) {
				$table = $this->request->request('table');
				$name = $this->request->request('name');
			}
		}
		if ($table && $name) {
			$sql = "describe  `{$table}`  `{$name}`";
			$res = \think\Db::query($sql);
			if ($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	/*
	 * 字段列表
	 */

	public function fields($ids = NULL) {
		if ($ids == NULL) {
			$ids = intval($this->request->request('ids'));
		}
		$model = $this->ModelOnline->get($ids);
		if (!$model) {
			$this->error(__('No Results were found'));
		}

		if ($this->request->isAjax()) {
			$list = $this->ModelFields->where("mid", '=', $ids)->order('id desc')->select();
			$total = count($list);
			$prefix = Config::get('database.prefix');
			$result = array("total" => $total, "rows" => $list, "prefix" => $prefix);
			return json($result);
		}
		$this->view->assign("ids", $ids);
		return $this->view->fetch();
	}

	/*
	 * 添加字段
	 */

	public function field_add($mid = NULL) {
		$mod_table = $this->ModelOnline->get($mid);
		if (!$mod_table)
			$this->error(__('No Results were found'));
		if ($this->request->isPost()) {
			$params = $this->request->post("row/a");
			if ($params) {
				try {
					//是否采用模型验证
					if ($this->modelValidate) {
						$name = str_replace("\\model\\", "\\validate\\", get_class($this->ModelFields));
						$validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
						$this->ModelFields->validate($validate);
					}
					$prefix = Config::get('database.prefix');
					$field = array();
					$fieldData = array();
					switch ($params['category']) {
						case "1":
							$allow = array(
								"text" => array("suffix" => "text", "type" => "varchar", "length" => 200),
								"number" => array("suffix" => "number", "type" => "int", "length" => 10),
								"time" => array("suffix" => "time", "type" => "int", "length" => 11),
								"image" => array("suffix" => "image", "type" => "varchar", "length" => 255),
								"images" => array("suffix" => "images", "type" => "varchar", "length" => 2000),
								"file" => array("suffix" => "file", "type" => "varchar", "length" => 255),
								"files" => array("suffix" => "files", "type" => "varchar", "length" => 2000),
								"avatar" => array("suffix" => "avatar", "type" => "varchar", "length" => 255),
								"avatars" => array("suffix" => "avatars", "type" => "varchar", "length" => 2000),
								"content" => array("suffix" => "content", "type" => "text", "length" => 0),
								"_id" => array("suffix" => "_id", "type" => "int", "length" => 10),
								"_ids" => array("suffix" => "_ids", "type" => "varchar", "length" => 255),
								"list-enum" => array("suffix" => "list", "type" => "enum", "length" => 0),
								"list-set" => array("suffix" => "list", "type" => "set", "length" => 0),
								"data-enum" => array("suffix" => "data", "type" => "enum", "length" => 0),
								"data-set" => array("suffix" => "data", "type" => "set", "length" => 0),
								"switch" => array("suffix" => "switch", "type" => "tinyint", "length" => 1),
							);
							if (isset($allow[$params['suffix']]) && is_array($allow[$params['suffix']])) {
								$fieldData['special'] = "";
								$fieldData['suffix'] = $params['suffix'];
								//$field['name'] = $params['name'] . $allow[$params['suffix']]['suffix']; //字段名
								$field['name'] = $params['name']; //字段名
								$field['field']=$params['name'] . $allow[$params['suffix']]['suffix']; //字段名
								$field['length'] = $field['length2'] = isset($params['length']) && intval($params['length']) ? intval($params['length']) : $allow[$params['suffix']]['length']; //字段长度
								$field['type'] = $allow[$params['suffix']]['type']; //字段类型
								$field['default'] = isset($params['default']) ? $params['default'] : ""; //默认值
								if ($allow[$params['suffix']]['type'] == "enum" || $allow[$params['suffix']]['type'] == "set") {
									$comment = \GuzzleHttp\json_decode($params['comment'], true);
									$field['comment'] = $params['title'] . ":"; //备注
									$field['length2'] = "";
									$str = "";
									$default_optional = array();
									foreach ($comment as $k => $v) {
										$default_optional[] = $k;
										$field['comment'] .= $str . $k . "=" . $v;
										$field['length2'] .= $str . "'" . $k . "'";
										$str = ",";
									}
									if (!in_array($field['default'], $default_optional)) {
										$field['default'] = $default_optional[0];
									}
								} else {
									$params['comment'] = "";
									$field['comment'] = $params['title']; //备注	
								}
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						case "2":
							$allow = array(
								"varchar" => array("type" => "varchar", "length" => 255),
								"int" => array("type" => "int", "length" => 10),
								"enum" => array("type" => "enum", "length" => 0),
								"set" => array("type" => "set", "length" => 0),
								"float" => array("type" => "float", "length" => "10,2"),
								"text" => array("type" => "text", "length" => 0),
								"datetime" => array("type" => "datetime", "length" => 10),
								"date" => array("type" => "date", "length" => 10),
								"year" => array("type" => "year", "length" => 4),
								"timestamp" => array("type" => "timestamp", "length" => 10),
							);
							if (isset($allow[$params['type']]) && is_array($allow[$params['type']])) {
								$fieldData['special'] = "";
								$fieldData['suffix'] = "";
								$params['suffix'] = "";
								$field['name'] = $params['name']; //字段名
								$field['field']= $params['name']; //字段名
								if ($params['type'] == "float") {
									$field['length'] = $field['length2'] = isset($params['length']) && $params['length'] ? $params['length'] : $allow[$params['type']]['length']; //字段长度
								} else {
									$field['length'] = $field['length2'] = isset($params['length']) && intval($params['length']) ? intval($params['length']) : $allow[$params['type']]['length']; //字段长度
								}
								$field['type'] = $allow[$params['type']]['type']; //字段类型
								$field['default'] = isset($params['default']) ? $params['default'] : ""; //默认值
								if ($allow[$params['type']]['type'] == "enum" || $allow[$params['type']]['type'] == "set") {
									$comment = \GuzzleHttp\json_decode($params['comment'], true);
									$field['comment'] = $params['title'] . ":"; //备注
									$field['length2'] = "";
									$str = "";
									$default_optional = array();
									foreach ($comment as $k => $v) {
										$default_optional[] = $k;
										$field['comment'] .= $str . $k . "=" . $v;
										$field['length2'] .= $str . "'" . $k . "'";
										$str = ",";
									}
									if (!in_array($field['default'], $default_optional)) {
										$field['default'] = $default_optional[0];
									}
								} else {
									$params['comment'] = "";
									$field['comment'] = $params['title']; //备注	
								}
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						case "3":
							$allow = array(
								"category_id" => array("title" => "分类ID(单选)", "type" => "int", "length" => 10),
								"category_ids" => array("title" => "分类ID(多选)", "type" => "varchar", "length" => 200),
								"weigh" => array("title" => "权重", "type" => "int", "length" => 10),
								"createtime" => array("title" => "创建时间", "type" => "int", "length" => 10),
								"updatetime" => array("title" => "更新时间", "type" => "int", "length" => 10)
							);
							if (isset($allow[$params['special']]) && is_array($allow[$params['special']])) {
								$fieldData['special'] = $params['special'];
								$fieldData['suffix'] = "";
								//$params['title'] = $allow[$params['special']]['title'];
								$params['comment'] = $params['suffix'] = "";
								$field['name'] = $params['special']; //字段名
								$field['field']= $params['special']; //字段名
								$field['length'] = $field['length2'] = $allow[$params['special']]['length']; //字段长度
								$field['comment'] = $params['title']; //备注
								$field['type'] = $allow[$params['special']]['type']; //字段类型
								$field['default'] = $field['type'] == "varchar" ? "" : "0"; //默认值
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						default :
							$this->error(__('No Results were found'));
							break;
					}

					if ($this->check($prefix . $mod_table['table'], $field['name'])) {
						$this->error(__('字段已经存在！'));
					}
					$fieldData['mid'] = $params['mid'];
					$fieldData['category'] = $params['category'];
					$fieldData['title'] = $params['title'];
					$fieldData['name'] = $field['name'];
					$fieldData['field'] = $field['field'];
					$fieldData['type'] = $field['type'];
					$fieldData['length'] = $field['length'];
					$fieldData['default'] = $field['default'];
					$fieldData['comment'] = $field['comment'];
					$fieldData['createtime'] = time();
					$fieldData['updatetime'] = time();
					if ($fieldData['type'] == "text") {
						$fieldData['default'] = "";
					}
					$result = $this->ModelFields->allowField(true)->save($fieldData);
					if ($field['type'] == "int") {
						$field['default'] = intval($field['default']);
					} elseif ($field['type'] == "tinyint") {
						$field['default'] = in_array($field['default'], [0, 1]) ? $field['default'] : 0;
					} elseif ($field['type'] == "float") {
						$field['default'] = is_float($field['default']) ? $field['default'] : 0;
					}

					if ($result !== false) {
						//在此执行添加字段的操作
						if (in_array($field['type'], ["text", "datetime", "date", "year", "timestamp"])) {
							$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}` ADD COLUMN `{$field['field']}`  {$field['type']}  NOT NULL  COMMENT '{$field['comment']}';";
						} else {
							$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}` ADD COLUMN `{$field['field']}`  {$field['type']}({$field['length2']}) NOT NULL DEFAULT '{$field['default']}' COMMENT '{$field['comment']}';";
						}

						try {
							$res = \think\Db::execute($sql);
							$this->success();
						} catch (Exception $ex) {
							//$result->delete();
							$this->error(__('参数错误，请检查字段名，字段长度或者默认值等输入参数是否合法', ''));
						}
					} else {
						$this->error($this->ModelFields->getError());
					}
				} catch (\think\exception\PDOException $e) {
					$this->error($e->getMessage());
				} catch (\think\Exception $e) {
					$this->error($e->getMessage());
				}
			}
			$this->error(__('Parameter %s can not be empty', ''));
		}
		$prefix = Config::get('database.prefix');
		$this->view->assign("prefix", $prefix);
		$this->view->assign("mid", $mid);
		return $this->view->fetch();
	}

	/*
	 * 修改字段
	 */

	public function field_edit($ids = NULL) {
		//$oldField_info = $this->ModelFields->get($ids);
		$field_info = $this->ModelFields->get($ids);
		$oldField_info=$field_info->toArray();
		//var_dump($field_info);
		if (!$field_info)
			$this->error(__('No Results were found'));

		$mod_table = $this->ModelOnline->get($field_info['mid']);
		if (!$mod_table)
			$this->error(__('No Results were found'));

		if ($this->request->isPost()) {
			$params = $this->request->post("row/a");
			if ($params) {
				try {
					//是否采用模型验证
					if ($this->modelValidate) {
						$name = str_replace("\\model\\", "\\validate\\", get_class($this->ModelFields));
						$validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
						$this->ModelFields->validate($validate);
					}
					$prefix = Config::get('database.prefix');
					$field = array();
					$fieldData = array();
					switch ($field_info['category']) {
						case "1":
							$allow = array(
								"text" => array("suffix" => "text", "type" => "varchar", "length" => 200),
								"number" => array("suffix" => "number", "type" => "int", "length" => 10),
								"time" => array("suffix" => "time", "type" => "int", "length" => 11),
								"image" => array("suffix" => "image", "type" => "varchar", "length" => 255),
								"images" => array("suffix" => "images", "type" => "varchar", "length" => 2000),
								"file" => array("suffix" => "file", "type" => "varchar", "length" => 255),
								"files" => array("suffix" => "files", "type" => "varchar", "length" => 2000),
								"avatar" => array("suffix" => "avatar", "type" => "varchar", "length" => 255),
								"avatars" => array("suffix" => "avatars", "type" => "varchar", "length" => 2000),
								"content" => array("suffix" => "content", "type" => "text", "length" => 0),
								"_id" => array("suffix" => "_id", "type" => "int", "length" => 10),
								"_ids" => array("suffix" => "_ids", "type" => "varchar", "length" => 255),
								"list-enum" => array("suffix" => "list", "type" => "enum", "length" => 0),
								"list-set" => array("suffix" => "list", "type" => "set", "length" => 0),
								"data-enum" => array("suffix" => "data", "type" => "enum", "length" => 0),
								"data-set" => array("suffix" => "data", "type" => "set", "length" => 0),
								"switch" => array("suffix" => "switch", "type" => "tinyint", "length" => 1),
							);
							if (isset($allow[$params['suffix']]) && is_array($allow[$params['suffix']])) {
								$fieldData['special'] = "";
								$fieldData['suffix'] = $params['suffix'];
								$field['name'] = $params['name']; //字段名
								$field['field']=$params['name'] . $allow[$params['suffix']]['suffix']; //字段名
								$field['length'] = $field['length2'] = isset($params['length']) && intval($params['length']) ? intval($params['length']) : $allow[$params['suffix']]['length']; //字段长度
								$field['type'] = $allow[$params['suffix']]['type']; //字段类型
								$field['default'] = isset($params['default']) ? $params['default'] : ""; //默认值
								if ($allow[$params['suffix']]['type'] == "enum" || $allow[$params['suffix']]['type'] == "set") {
									$comment = \GuzzleHttp\json_decode($params['comment'], true);
									$field['comment'] = $params['title'] . ":"; //备注
									$field['length2'] = "";
									$str = "";
									$default_optional = array();
									foreach ($comment as $k => $v) {
										$default_optional[] = $k;
										$field['comment'] .= $str . $k . "=" . $v;
										$field['length2'] .= $str . "'" . $k . "'";
										$str = ",";
									}
									if (!in_array($field['default'], $default_optional)) {
										$field['default'] = $default_optional[0];
									}
								} else {
									$params['comment'] = "";
									$field['comment'] = $params['title']; //备注	
								}
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						case "2":
							$allow = array(
								"varchar" => array("type" => "varchar", "length" => 255),
								"int" => array("type" => "int", "length" => 10),
								"enum" => array("type" => "enum", "length" => 0),
								"set" => array("type" => "set", "length" => 0),
								"float" => array("type" => "float", "length" => "10,2"),
								"text" => array("type" => "text", "length" => 0),
								"datetime" => array("type" => "datetime", "length" => 10),
								"date" => array("type" => "date", "length" => 10),
								"year" => array("type" => "year", "length" => 4),
								"timestamp" => array("type" => "timestamp", "length" => 10),
							);
							if (isset($allow[$params['type']]) && is_array($allow[$params['type']])) {
								$fieldData['special'] = "";
								$fieldData['suffix'] = "";
								$params['suffix'] = "";
								$field['name'] = $params['name']; //字段名
								$field['field']= $params['name']; //字段名
								if ($params['type'] == "float") {
									$field['length'] = $field['length2'] = isset($params['length']) && $params['length'] ? $params['length'] : $allow[$params['type']]['length']; //字段长度
								} else {
									$field['length'] = $field['length2'] = isset($params['length']) && intval($params['length']) ? intval($params['length']) : $allow[$params['type']]['length']; //字段长度
								}
								$field['type'] = $allow[$params['type']]['type']; //字段类型
								$field['default'] = isset($params['default']) ? $params['default'] : ""; //默认值
								if ($allow[$params['type']]['type'] == "enum" || $allow[$params['type']]['type'] == "set") {
									$comment = \GuzzleHttp\json_decode($params['comment'], true);
									$field['comment'] = $params['title'] . ":"; //备注
									$field['length2'] = "";
									$str = "";
									$default_optional = array();
									foreach ($comment as $k => $v) {
										$default_optional[] = $k;
										$field['comment'] .= $str . $k . "=" . $v;
										$field['length2'] .= $str . "'" . $k . "'";
										$str = ",";
									}
									if (!in_array($field['default'], $default_optional)) {
										$field['default'] = $default_optional[0];
									}
								} else {
									$params['comment'] = "";
									$field['comment'] = $params['title']; //备注	
								}
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						case "3":
							$allow = array(
								"category_id" => array("title" => "分类ID(单选)", "type" => "int", "length" => 10),
								"category_ids" => array("title" => "分类ID(多选)", "type" => "varchar", "length" => 200),
								"weigh" => array("title" => "权重", "type" => "int", "length" => 10),
								"createtime" => array("title" => "创建时间", "type" => "int", "length" => 10),
								"updatetime" => array("title" => "更新时间", "type" => "int", "length" => 10)
							);
							if (isset($allow[$params['special']]) && is_array($allow[$params['special']])) {
								$fieldData['special'] = $params['special'];
								$fieldData['suffix'] = "";
								//$params['title'] = $allow[$params['special']]['title'];
								$params['comment'] = $params['suffix'] = "";
								$field['name'] = $params['special']; //字段名
								$field['field']=  $params['special']; //字段名
								$field['length'] = $field['length2'] = $allow[$params['special']]['length']; //字段长度
								$field['comment'] = $params['title']; //备注
								$field['type'] = $allow[$params['special']]['type']; //字段类型
								$field['default'] = $field['type'] == "varchar" ? "" : "0"; //默认值
							} else {
								$this->error(__('特殊字段类型不正确！'));
							}
							break;
						default :
							$this->error(__('No Results were found'));
							break;
					}
					/*
					  if ($this->check($prefix . $mod_table['table'], $field['name'])) {
					  $this->error(__('字段已经存在！'));
					  } */
					$fieldData['mid'] = $params['mid'];
					//$fieldData['category'] = $params['category'];
					$fieldData['title'] = $params['title'];
					$fieldData['name'] = $field['name'];
					$fieldData['field'] = $field['field'];
					$fieldData['type'] = $field['type'];
					$fieldData['length'] = $field['length'];
					$fieldData['default'] = $field['default'];
					$fieldData['comment'] = $field['comment'];
					//$fieldData['createtime'] = time();
					$fieldData['updatetime'] = time();
					if ($fieldData['type'] == "text") {
						$fieldData['default'] = "";
					}


					$result =$field_info->save($fieldData);
					if ($field['type'] == "int") {
						$field['default'] = intval($field['default']);
					} elseif ($field['type'] == "tinyint") {
						$field['default'] = in_array($field['default'], [0, 1]) ? $field['default'] : 0;
					} elseif ($field['type'] == "float") {
						$field['default'] = is_float($field['default']) ? $field['default'] : 0;
					}

					if ($result !== false) {
						//在此执行添加字段的操作
						if (in_array($field['type'], ["text", "datetime", "date", "year", "timestamp"])) {
							//$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}` ADD COLUMN `{$field['field']}`  {$field['type']}  NOT NULL  COMMENT '{$field['comment']}';";
							$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}`  CHANGE COLUMN `{$oldField_info['field']}` `{$field['field']}`  {$field['type']} NOT NULL  COMMENT '{$field['comment']}' ;";
							
							
						} else {
							//$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}` ADD COLUMN `{$field['field']}`  {$field['type']}({$field['length2']}) NOT NULL DEFAULT '{$field['default']}' COMMENT '{$field['comment']}';";
							$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}`  CHANGE COLUMN `{$oldField_info['field']}` `{$field['field']}`  {$field['type']}({$field['length2']}) NOT NULL DEFAULT '{$field['default']}' COMMENT '{$field['comment']}' ;";
						}
						
						/*
						ALTER TABLE `fa_test_01`  CHANGE COLUMN `dwadwad` `ddd`  varchar(255) NOT NULL DEFAULT '新默认值' COMMENT '新的注释' ;
						 *  */

						try {
							$res = \think\Db::execute($sql);
							$this->success();
						} catch (Exception $ex) {
							$field_info->save($oldField_info);
							$this->error(__('参数错误，请检查字段名，字段长度或者默认值等输入参数是否合法', ''));
						}
					} else {
						$this->error($this->ModelFields->getError());
					}
				} catch (\think\exception\PDOException $e) {
					$field_info->save($oldField_info);
					$this->error($e->getMessage());
				} catch (\think\Exception $e) {
					$field_info->save($oldField_info);
					$this->error($e->getMessage());
				}
			}
			$this->error(__('Parameter %s can not be empty', ''));
		}
		$comment = "";
		if ($field_info['type'] == "enum" || $field_info['type'] == "set") {
			//echo $field_info['comment'];
			$commentStr=substr($field_info['comment'],strpos($field_info['comment'],":")+1);
			
			$commentArr=[];
			foreach (explode(",", $commentStr) as $k=>$v){
				
				list($key,$val)= explode("=", $v);
				
				$commentArr[$key]=$val;
			}
			
			$comment = \json_encode($commentArr);
		}
		$prefix = Config::get('database.prefix');
		$this->view->assign("field_info", $field_info);
		$this->view->assign("row", $field_info);
		$this->view->assign("prefix", $prefix);
		$this->view->assign("comment", $comment);
		$this->view->assign("mid", $field_info['mid']);
		return $this->view->fetch();
	}

	public function field_del($ids = NULL) {
		if ($ids) {
			$pk = $this->ModelFields->getPk();
			$adminIds = $this->getDataLimitAdminIds();
			if (is_array($adminIds)) {
				$count = $this->ModelFields->where($this->dataLimitField, 'in', $adminIds);
			}
			$list = $this->ModelFields->where($pk, 'in', $ids)->select();
			$prefix = Config::get('database.prefix');
			$count = 0;
			foreach ($list as $k => $v) {
				$mod_table = $this->ModelOnline->get($v['mid']);
				$sql = "ALTER TABLE `{$prefix}{$mod_table['table']}` DROP `{$v['field']}` ";
				try {
					$res = \think\Db::execute($sql);
					$count += $v->delete();
					if ($count) {
						$this->success();
					} else {
						$this->error(__('No rows were deleted'));
					}
				} catch (Exception $ex) {
					$this->error(__('No rows were deleted'));
				}
			}
		}
		$this->error(__('Parameter %s can not be empty', 'ids'));
	}

	/**
	 * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
	 * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
	 * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
	 */
}
