<?php

namespace app\admin\command;

use fast\Form;
use think\Config;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Db;
use think\Exception;
use think\Lang;

class Crud extends Command
{

    protected function configure()
    {
        $this
                ->setName('crud')
                ->addOption('table', 't', Option::VALUE_REQUIRED, 'table name without prefix', null)
                ->addOption('controller', 'c', Option::VALUE_OPTIONAL, 'controller name', null)
                ->addOption('model', 'm', Option::VALUE_OPTIONAL, 'model name', null)
                ->addOption('force', 'f', Option::VALUE_OPTIONAL, 'force override', null)
                ->addOption('local', 'l', Option::VALUE_OPTIONAL, 'local model', 1)
                ->addOption('relation', 'r', Option::VALUE_OPTIONAL, 'relation table name without prefix', null)
                ->addOption('relationmodel', 'e', Option::VALUE_OPTIONAL, 'relation model name', null)
                ->addOption('relationforeignkey', 'k', Option::VALUE_OPTIONAL, 'relation foreign key', null)
                ->addOption('relationprimarykey', 'p', Option::VALUE_OPTIONAL, 'relation primary key', null)
                ->addOption('mode', 'o', Option::VALUE_OPTIONAL, 'relation table mode,hasone or belongsto', 'hasone')
                ->setDescription('Build CRUD controller and model from table');
    }

    protected function execute(Input $input, Output $output)
    {
        $adminPath = dirname(__DIR__) . DS;
        //表名
        $table = $input->getOption('table') ?: '';
        //自定义控制器
        $controller = $input->getOption('controller');
        //自定义模型
        $model = $input->getOption('model');
        //强制覆盖
        $force = $input->getOption('force');
        //是否为本地model,为0时表示为全局model将会把model放在app/common/model中
        $local = $input->getOption('local');
        if (!$table)
        {
            throw new Exception('table name can\'t empty');
        }
        //关联表
        $relation = $input->getOption('relation');
        //自定义关联表模型
        $relationModel = $input->getOption('relationmodel');
        //模式
        $mode = $input->getOption('mode');
        //外键
        $relationForeignKey = $input->getOption('relationforeignkey');
        //主键
        $relationPrimaryKey = $input->getOption('relationprimarykey');
        //如果有启用关联模式
        if ($relation && !in_array($mode, ['hasone', 'belongsto']))
        {
            throw new Exception("relation table only work in hasone or belongsto mode");
        }

        $dbname = Config::get('database.database');
        $prefix = Config::get('database.prefix');

        //检查主表
        $tableName = $prefix . $table;
        $tableInfo = Db::query("SHOW TABLE STATUS LIKE '{$tableName}'", [], TRUE);
        if (!$tableInfo)
        {
            throw new Exception("table not found");
        }
        $tableInfo = $tableInfo[0];

        //检查关联表
        if ($relation)
        {
            $relationTableName = $prefix . $relation;
            $relationTableInfo = Db::query("SHOW TABLE STATUS LIKE '{$relationTableName}'", [], TRUE);
            if (!$relationTableInfo)
            {
                throw new Exception("relation table not found");
            }
        }

        //根据表名匹配对应的Fontawesome图标
        $iconPath = ROOT_PATH . str_replace('/', DS, '/public/assets/libs/font-awesome/less/variables.less');
        $iconName = is_file($iconPath) && stripos(file_get_contents($iconPath), '@fa-var-' . $table . ':') ? $table : 'fa fa-circle-o';

        //控制器默认以表名进行处理,以下划线进行分隔,如果需要自定义则需要传入controller,格式为目录层级
        $controllerArr = !$controller ? explode('_', strtolower($table)) : explode('/', strtolower($controller));
        $controllerUrl = implode('/', $controllerArr);
        $controllerName = ucfirst(array_pop($controllerArr));
        $controllerDir = implode(DS, $controllerArr);
        $controllerFile = ($controllerDir ? $controllerDir . DS : '') . $controllerName . '.php';

        //非覆盖模式时如果存在控制器文件则报错
        if (is_file($controllerFile) && !$force)
        {
            throw new Exception('controller already exists!\nIf you need to rebuild again, use the parameter --force=true ');
        }

        //模型默认以表名进行处理,以下划线进行分隔,如果需要自定义则需要传入model,不支持目录层级
        $modelName = $this->getModelName($model, $table);
        $modelFile = ($local ? $adminPath : APP_PATH . 'common' . DS) . 'model' . DS . $modelName . '.php';

        //关联模型默认以表名进行处理,以下划线进行分隔,如果需要自定义则需要传入relationmodel,不支持目录层级
        $relationModelName = $this->getModelName($relationModel, $relation);
        $relationModelFile = ($local ? $adminPath : APP_PATH . 'common' . DS) . 'model' . DS . $relationModelName . '.php';

        //非覆盖模式时如果存在模型文件则报错
        if (is_file($modelFile) && !$force)
        {
            throw new Exception('model already exists!\nIf you need to rebuild again, use the parameter --force=true ');
        }

        require $adminPath . 'common.php';

        //从数据库中获取表字段信息
        $sql = "SELECT * FROM `information_schema`.`columns` "
                . "WHERE TABLE_SCHEMA = ? AND table_name = ? "
                . "ORDER BY ORDINAL_POSITION";
        $columnList = Db::query($sql, [$dbname, $tableName]);
        $relationColumnList = [];
        if ($relation)
        {
            $relationColumnList = Db::query($sql, [$dbname, $relationTableName]);
        }

        $fieldArr = [];
        foreach ($columnList as $k => $v)
        {
            $fieldArr[] = $v['COLUMN_NAME'];
        }

        $relationFieldArr = [];
        foreach ($relationColumnList as $k => $v)
        {
            $relationFieldArr[] = $v['COLUMN_NAME'];
        }

        $addList = [];
        $editList = [];
        $javascriptList = [];
        $langList = [];
        $field = 'id';
        $order = 'id';
        $priDefined = FALSE;
        $priKey = '';
        $relationPriKey = '';
        foreach ($columnList as $k => $v)
        {
            if ($v['COLUMN_KEY'] == 'PRI')
            {
                $priKey = $v['COLUMN_NAME'];
                break;
            }
        }
        if (!$priKey)
        {
            throw new Exception('Primary key not found!');
        }
        if ($relation)
        {
            foreach ($relationColumnList as $k => $v)
            {
                if ($v['COLUMN_KEY'] == 'PRI')
                {
                    $relationPriKey = $v['COLUMN_NAME'];
                    break;
                }
            }
            if (!$relationPriKey)
            {
                throw new Exception('Relation Primary key not found!');
            }
        }
        $order = $priKey;


        //如果是关联模型
        if ($relation)
        {
            if ($mode == 'hasone')
            {
                $relationForeignKey = $relationForeignKey ? $relationForeignKey : $table . "_id";
                $relationPrimaryKey = $relationPrimaryKey ? $relationPrimaryKey : $priKey;
                if (!in_array($relationForeignKey, $relationFieldArr))
                {
                    throw new Exception('relation table must be contain field:' . $relationForeignKey);
                }
                if (!in_array($relationPrimaryKey, $fieldArr))
                {
                    throw new Exception('table must be contain field:' . $relationPrimaryKey);
                }
            }
            else
            {
                $relationForeignKey = $relationForeignKey ? $relationForeignKey : $relation . "_id";
                $relationPrimaryKey = $relationPrimaryKey ? $relationPrimaryKey : $relationPriKey;
                if (!in_array($relationForeignKey, $fieldArr))
                {
                    throw new Exception('table must be contain field:' . $relationForeignKey);
                }
                if (!in_array($relationPrimaryKey, $relationFieldArr))
                {
                    throw new Exception('relation table must be contain field:' . $relationPrimaryKey);
                }
            }
        }

        try
        {
            Form::setEscapeHtml(false);

            //循环所有字段,开始构造视图的HTML和JS信息
            foreach ($columnList as $k => $v)
            {
                $field = $v['COLUMN_NAME'];
                $itemArr = [];
                // 这里构建Enum和Set类型的列表数据
                if (in_array($v['DATA_TYPE'], ['enum', 'set']))
                {
                    $itemArr = substr($v['COLUMN_TYPE'], strlen($v['DATA_TYPE']) + 1, -1);
                    $itemArr = explode(',', str_replace("'", '', $itemArr));
                }
                // 语言列表
                if ($v['COLUMN_COMMENT'] != '')
                {
                    $langList[] = $this->getLangItem($field, $v['COLUMN_COMMENT']);
                }
                //createtime和updatetime是保留字段不能修改和添加
                if ($v['COLUMN_KEY'] != 'PRI' && !in_array($field, ['createtime', 'updatetime']))
                {
                    $inputType = $this->getFieldType($v);

                    // 如果是number类型时增加一个步长
                    $step = $inputType == 'number' && $v['NUMERIC_SCALE'] > 0 ? "0." . str_repeat(0, $v['NUMERIC_SCALE'] - 1) . "1" : 0;

                    $attrArr = ['id' => "c-{$field}"];
                    $cssClassArr = ['form-control'];
                    $fieldName = "row[{$field}]";
                    $defaultValue = $v['COLUMN_DEFAULT'];
                    $editValue = "{\$row.{$field}}";
                    // 如果默认值为空,则是一个必选项
                    if ($v['COLUMN_DEFAULT'] == '')
                    {
                        $attrArr['required'] = '';
                    }
                    if ($field == 'status' && in_array($inputType, ['text', 'number']))
                    {
                        //如果状态类型不是enum或set
                        $itemArr = !$itemArr ? ['normal', 'hidden'] : $itemArr;
                        $inputType = 'radio';
                    }
                    if ($inputType == 'select')
                    {
                        $cssClassArr[] = 'selectpicker';
                        $attrArr['class'] = implode(' ', $cssClassArr);
                        if ($v['DATA_TYPE'] == 'set')
                        {
                            $attrArr['multiple'] = '';
                            $fieldName .= "[]";
                        }
                        $attrStr = $this->getArrayString($attrArr);
                        $itemArr = $this->getLangArray($itemArr, FALSE);
                        $itemString = $this->getArrayString($itemArr);
                        $formAddElement = "{:build_select('{$fieldName}', [{$itemString}], '{$defaultValue}', [{$attrStr}])}";
                        $formEditElement = "{:build_select('{$fieldName}', [{$itemString}], \$row.{$field}, [{$attrStr}])}";
                    }
                    else if ($inputType == 'datetime')
                    {
                        $cssClassArr[] = 'datetimepicker';
                        $attrArr['class'] = implode(' ', $cssClassArr);
                        $format = "YYYY-MM-DD HH:mm:ss";
                        $phpFormat = "Y-m-d H:i:s";
                        $fieldFunc = '';
                        switch ($v['DATA_TYPE'])
                        {
                            case 'year';
                                $format = "YYYY";
                                $phpFormat = 'Y';
                                break;
                            case 'date';
                                $format = "YYYY-MM-DD";
                                $phpFormat = 'Y-m-d';
                                break;
                            case 'time';
                                $format = "HH:mm:ss";
                                $phpFormat = 'H:i:s';
                                break;
                            case 'timestamp';
                                $fieldFunc = 'datetime';
                            case 'datetime';
                                $format = "YYYY-MM-DD HH:mm:ss";
                                $phpFormat = 'Y-m-d H:i:s';
                                break;
                            default:
                                $fieldFunc = 'datetime';
                                break;
                        }
                        $defaultDateTime = "{:date('{$phpFormat}')}";
                        $attrArr['data-date-format'] = $format;
                        $attrArr['data-use-current'] = "true";
                        $fieldFunc = $fieldFunc ? "|{$fieldFunc}" : "";
                        $formAddElement = Form::text($fieldName, $defaultDateTime, $attrArr);
                        $formEditElement = Form::text($fieldName, "{\$row.{$field}{$fieldFunc}}", $attrArr);
                    }
                    else if ($inputType == 'checkbox')
                    {
                        $fieldName .= "[]";
                        $itemArr = $this->getLangArray($itemArr, FALSE);
                        $itemString = $this->getArrayString($itemArr);
                        $formAddElement = "{:build_checkboxs('{$fieldName}', [{$itemString}], '{$defaultValue}')}";
                        $formEditElement = "{:build_checkboxs('{$fieldName}', [{$itemString}], \$row.{$field})}";
                    }
                    else if ($inputType == 'radio')
                    {
                        $itemArr = $this->getLangArray($itemArr, FALSE);
                        $itemString = $this->getArrayString($itemArr);
                        $defaultValue = $defaultValue ? $defaultValue : key($itemArr);
                        $formAddElement = "{:build_radios('{$fieldName}', [{$itemString}], '{$defaultValue}')}";
                        $formEditElement = "{:build_radios('{$fieldName}', [{$itemString}], \$row.{$field})}";
                    }
                    else if ($inputType == 'textarea')
                    {
                        $cssClassArr[] = substr($field, -7) == 'content' ? 'summernote' : '';
                        $attrArr['class'] = implode(' ', $cssClassArr);
                        $attrArr['rows'] = 5;
                        $formAddElement = Form::textarea($fieldName, $defaultValue, $attrArr);
                        $formEditElement = Form::textarea($fieldName, $editValue, $attrArr);
                    }
                    else if ($field == 'category_id' || $field == 'category_ids')
                    {
                        $type = $table;
                        if ($field == 'category_ids')
                        {
                            $attrArr['multiple'] = '';
                        }
                        $attrStr = $this->getArrayString($attrArr);
                        $formAddElement = "{:build_category_select('{$fieldName}', '{$type}', '{$defaultValue}', [{$attrStr}])}";
                        $formEditElement = "{:build_category_select('{$fieldName}', '{$type}', \$row.{$field}, [{$attrStr}])}";
                    }
                    else
                    {
                        //CSS类名
                        $cssClassArr[] = substr($field, -3) == '_id' ? 'typeahead' : '';
                        $cssClassArr[] = substr($field, -4) == '_ids' ? 'tagsinput' : '';
                        $cssClassArr = array_filter($cssClassArr);
                        //因为有自动完成可输入其它内容
                        $step = array_intersect($cssClassArr, ['typeahead', 'tagsinput']) ? 0 : $step;
                        $attrArr['class'] = implode(' ', $cssClassArr);

                        $isUpload = in_array(substr($field, -4), ['file']) || in_array(substr($field, -5), ['files', 'image']) || in_array(substr($field, -6), ['images', 'avatar']) || in_array(substr($field, -7), ['avatars']) ? TRUE : FALSE;
                        //如果是步长则加上步长
                        if ($step)
                        {
                            $attrArr['step'] = $step;
                        }
                        //如果是图片加上个size
                        if ($isUpload)
                        {
                            $attrArr['size'] = 50;
                        }

                        $formAddElement = Form::input($inputType, $fieldName, $defaultValue, $attrArr);
                        $formEditElement = Form::input($inputType, $fieldName, $editValue, $attrArr);

                        //如果是图片或文件
                        if ($isUpload)
                        {
                            $formAddElement = $this->getImageUpload($field, $formAddElement);
                            $formEditElement = $this->getImageUpload($field, $formEditElement);
                        }
                    }
                    //构造添加和编辑HTML信息
                    $addList[] = $this->getFormGroup($field, $formAddElement);
                    $editList[] = $this->getFormGroup($field, $formEditElement);
                }

                //过滤text类型字段
                if ($v['DATA_TYPE'] != 'text')
                {
                    //主键
                    if ($v['COLUMN_KEY'] == 'PRI' && !$priDefined)
                    {
                        $priDefined = TRUE;
                        $javascriptList[] = "{field: 'state', checkbox: true}";
                    }
                    //构造JS列信息
                    $javascriptList[] = $this->getJsColumn($field);
                    //排序方式,如果有weigh则按weigh,否则按主键排序
                    $order = $field == 'weigh' ? 'weigh' : $order;
                }
            }

            $relationPriKey = 'id';
            $relationFieldArr = [];
            foreach ($relationColumnList as $k => $v)
            {
                $relationField = $v['COLUMN_NAME'];
                $relationFieldArr[] = $field;

                $relationField = strtolower($relationModelName) . "." . $relationField;
                // 语言列表
                if ($v['COLUMN_COMMENT'] != '')
                {
                    $langList[] = $this->getLangItem($relationField, $v['COLUMN_COMMENT']);
                }

                //过滤text类型字段
                if ($v['DATA_TYPE'] != 'text')
                {
                    //构造JS列信息
                    $javascriptList[] = $this->getJsColumn($relationField);
                }
            }


            //JS最后一列加上操作列
            $javascriptList[] = str_repeat(" ", 24) . "{field: 'operate', title: __('Operate'), events: Table.api.events.operate, formatter: Table.api.formatter.operate}";
            $addList = implode("\n", array_filter($addList));
            $editList = implode("\n", array_filter($editList));
            $javascriptList = implode(",\n", array_filter($javascriptList));
            $langList = implode(",\n", array_filter($langList));

            //表注释
            $tableComment = $tableInfo['Comment'];
            $tableComment = mb_substr($tableComment, -1) == '表' ? mb_substr($tableComment, 0, -1) . '管理' : $tableComment;

            //最终将生成的文件路径
            $controllerFile = $adminPath . 'controller' . DS . $controllerFile;
            $javascriptFile = ROOT_PATH . 'public' . DS . 'assets' . DS . 'js' . DS . 'backend' . DS . $controllerUrl . '.js';
            $addFile = $adminPath . 'view' . DS . $controllerUrl . DS . 'add.html';
            $editFile = $adminPath . 'view' . DS . $controllerUrl . DS . 'edit.html';
            $indexFile = $adminPath . 'view' . DS . $controllerUrl . DS . 'index.html';
            $langFile = $adminPath . 'lang' . DS . Lang::detect() . DS . $controllerUrl . '.php';

            $appNamespace = Config::get('app_namespace');
            $moduleName = 'admin';
            $controllerNamespace = "{$appNamespace}\\{$moduleName}\\controller" . ($controllerDir ? "\\" : "") . str_replace('/', "\\", $controllerDir);
            $modelNamespace = "{$appNamespace}\\" . ($local ? $moduleName : "common") . "\\model";


            $data = [
                'controllerNamespace'     => $controllerNamespace,
                'modelNamespace'          => $modelNamespace,
                'controllerUrl'           => $controllerUrl,
                'controllerDir'           => $controllerDir,
                'controllerName'          => $controllerName,
                'modelName'               => $modelName,
                'tableComment'            => $tableComment,
                'iconName'                => $iconName,
                'pk'                      => $priKey,
                'order'                   => $order,
                'table'                   => $table,
                'tableName'               => $tableName,
                'addList'                 => $addList,
                'editList'                => $editList,
                'javascriptList'          => $javascriptList,
                'langList'                => $langList,
                'modelAutoWriteTimestamp' => in_array('createtime', $fieldArr) || in_array('updatetime', $fieldArr) ? "'int'" : 'false',
                'createTime'              => in_array('createtime', $fieldArr) ? "'createtime'" : 'false',
                'updateTime'              => in_array('updatetime', $fieldArr) ? "'updatetime'" : 'false',
                'modelTableName'          => $table,
                'relationModelTableName'  => $relation,
                'relationModelName'       => $relationModelName,
                'relationWith'            => '',
                'relationMethod'          => '',
                'relationModel'           => '',
                'relationForeignKey'      => '',
                'relationPrimaryKey'      => '',
                'relationSearch'          => $relation ? 'true' : 'false',
                'controllerIndex'         => '',
                'modelMethod'             => '',
            ];

            //如果使用关联模型
            if ($relation)
            {
                //需要构造关联的方法
                $data['relationMethod'] = strtolower($relationModelName);
                //预载入的方法
                $data['relationWith'] = "->with('{$data['relationMethod']}')";
                //需要重写index方法
                $data['controllerIndex'] = $this->getReplacedStub('controllerindex', $data);
                //关联的模式
                $data['relationMode'] = $mode == 'hasone' ? 'hasOne' : 'belongsTo';
                //关联字段
                $data['relationForeignKey'] = $relationForeignKey;
                $data['relationPrimaryKey'] = $relationPrimaryKey ? $relationPrimaryKey : $priKey;
                //构造关联模型的方法
                $data['modelMethod'] = $this->getReplacedStub('modelmethod', $data);
            }

            // 生成控制器文件
            $result = $this->writeToFile('controller', $data, $controllerFile);
            // 生成模型文件
            $result = $this->writeToFile('model', $data, $modelFile);
            if ($relation && !is_file($relationModelFile))
            {
                // 生成关联模型文件
                $result = $this->writeToFile('relationmodel', $data, $relationModelFile);
            }
            // 生成视图文件
            $result = $this->writeToFile('add', $data, $addFile);
            $result = $this->writeToFile('edit', $data, $editFile);
            $result = $this->writeToFile('index', $data, $indexFile);
            // 生成JS文件
            $result = $this->writeToFile('javascript', $data, $javascriptFile);
            // 生成语言文件
            if ($langList)
            {
                $result = $this->writeToFile('lang', $data, $langFile);
            }
        }
        catch (\think\exception\ErrorException $e)
        {
            print_r($e);
        }
        $output->writeln("<info>Build Successed</info>");
    }

    protected function getModelName($model, $table)
    {
        if (!$model)
        {
            $modelarr = explode('_', strtolower($table));
            foreach ($modelarr as $k => &$v)
                $v = ucfirst($v);
            unset($v);
            $modelName = implode('', $modelarr);
        }
        else
        {
            $modelName = ucfirst($model);
        }
        return $modelName;
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
        $content = $this->getReplacedStub($name, $data);

        if (!is_dir(dirname($pathname)))
        {
            mkdir(strtolower(dirname($pathname)), 0755, true);
        }
        return file_put_contents($pathname, $content);
    }

    /**
     * 获取替换后的数据
     * @param string $name
     * @param array $data
     * @return string
     */
    protected function getReplacedStub($name, $data)
    {
        $search = $replace = [];
        foreach ($data as $k => $v)
        {
            $search[] = "{%{$k}%}";
            $replace[] = $v;
        }
        $stub = file_get_contents($this->getStub($name));
        $content = str_replace($search, $replace, $stub);
        return $content;
    }

    /**
     * 获取基础模板
     * @param string $name
     * @return string
     */
    protected function getStub($name)
    {
        return __DIR__ . DS . 'Crud' . DS . 'stubs' . DS . $name . '.stub';
    }

    protected function getLangItem($field, $content)
    {
        if (!Lang::has($field))
        {
            return <<<EOD
    '{$field}'  =>  '{$content}'
EOD;
        }
        else
        {
            return '';
        }
    }

    /**
     * 读取数据和语言数组列表
     * @param array $arr
     * @return array
     */
    protected function getLangArray($arr, $withTpl = TRUE)
    {
        $langArr = [];
        foreach ($arr as $k => $v)
        {
            $langArr[(is_numeric($k) ? $v : $k)] = is_numeric($k) ? ($withTpl ? "{:" : "") . "__('" . ucfirst($v) . "')" . ($withTpl ? "}" : "") : $v;
        }
        return $langArr;
    }

    /**
     * 将数据转换成带字符串
     * @param array $arr
     * @return string
     */
    protected function getArrayString($arr)
    {
        $stringArr = [];
        foreach ($arr as $k => $v)
        {
            $is_var = in_array(substr($v, 0, 1), ['$', '_']);
            if (!$is_var)
            {
                $v = str_replace("'", "\'", $v);
                $k = str_replace("'", "\'", $k);
            }
            $stringArr[] = "'" . (is_numeric($k) ? $v : $k) . "' => " . (is_numeric($k) ? "__('" . ucfirst($k) . "')" : $is_var ? $v : "'{$v}'");
        }
        return implode(",", $stringArr);
    }

    protected function getFieldType(& $v)
    {
        $inputType = 'text';
        switch ($v['DATA_TYPE'])
        {
            case 'bigint':
            case 'int':
            case 'mediumint':
            case 'smallint':
            case 'tinyint':
                $inputType = 'number';
                break;
            case 'enum':
            case 'set':
                $inputType = 'select';
                break;
            case 'decimal':
            case 'double':
            case 'float':
                $inputType = 'number';
                break;
            case 'longtext':
            case 'text':
            case 'mediumtext':
            case 'smalltext':
            case 'tinytext':
                $inputType = 'textarea';
                break;
            case 'year';
            case 'date';
            case 'time';
            case 'datetime';
            case 'timestamp';
                $inputType = 'datetime';
                break;
            default:
                break;
        }
        $fieldsName = $v['COLUMN_NAME'];
        // 如果后缀以time结尾说明也是个时间字段
        if (substr($fieldsName, -4) == 'time')
        {
            $inputType = 'datetime';
        }
        // 如果后缀以data结尾且类型为enum,说明是个单选框
        if (substr($fieldsName, -4) == 'data' && $v['DATA_TYPE'] == 'enum')
        {
            $inputType = "radio";
        }
        // 如果后缀以data结尾且类型为set,说明是个复选框
        if (substr($fieldsName, -4) == 'data' && $v['DATA_TYPE'] == 'set')
        {
            $inputType = "checkbox";
        }
        return $inputType;
    }

    /**
     * 获取表单分组数据
     * @param string $field
     * @param string $content
     * @return string
     */
    protected function getFormGroup($field, $content)
    {
        $langField = ucfirst($field);
        return<<<EOD
    <div class="form-group">
        <label for="c-{$field}" class="control-label col-xs-12 col-sm-2">{:__('{$langField}')}:</label>
        <div class="col-xs-12 col-sm-8">
            {$content}
        </div>
    </div>
EOD;
    }

    /**
     * 获取图片模板数据
     * @param string $field
     * @param string $content
     * @return array
     */
    protected function getImageUpload($field, $content)
    {
        $filter = substr($field, -4) == 'avatar' || substr($field, -5) == 'image' || substr($field, -6) == 'images' ? ' data-mimetype="image/*"' : "";
        $multiple = substr($field, -1) == 's' ? ' data-multiple="true"' : ' data-multiple="false"';
        $preview = $filter ? ' data-preview-id="p-' . $field . '"' : '';
        $previewcontainer = $preview ? '<ul class="row list-inline plupload-preview" id="p-' . $field . '"></ul>' : '';
        return <<<EOD
<div class="form-inline">
                {$content}
                <span><button type="button" id="plupload-{$field}" class="btn btn-danger plupload" data-input-id="c-{$field}"{$filter}{$multiple}{$preview}><i class="fa fa-upload"></i> {:__('Upload')}</button></span>
                <span><button type="button" id="fachoose-{$field}" class="btn btn-primary fachoose" data-input-id="c-{$field}"{$filter}{$multiple}><i class="fa fa-list"></i> {:__('Choose')}</button></span>
                {$previewcontainer}
            </div>
EOD;
    }

    /**
     * 获取JS列数据
     * @param string $field
     * @return string
     */
    protected function getJsColumn($field)
    {
        $lang = ucfirst($field);
        $html = str_repeat(" ", 24) . "{field: '{$field}', title: __('{$lang}')";
        $field = substr($field, stripos($field, '.') + 1);
        $formatter = '';
        if ($field == 'status')
            $formatter = 'status';
        else if ($field == 'icon')
            $formatter = 'icon';
        else if ($field == 'flag')
            $formatter = 'flag';
        else if (substr($field, -4) == 'time')
            $formatter = 'datetime';
        else if (substr($field, -3) == 'url')
            $formatter = 'url';
        else if (substr($field, -5) == 'image')
            $formatter = 'image';
        if ($formatter)
            $html .= ", formatter: Table.api.formatter." . $formatter . "}";
        else
            $html .= "}";
        return $html;
    }

}
