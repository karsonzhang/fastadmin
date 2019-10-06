<?php

namespace app\common\model;

use think\Model;

/**
 * 配置模型
 */
class Config extends Model
{

    // 表名,不含前缀
    protected $name = 'config';
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;
    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    // 追加属性
    protected $append = [
    ];

    /**
     * 读取配置类型
     * @return array
     */
    public static function getTypeList()
    {
        $typeList = [
            'string'   => __('String'),
            'text'     => __('Text'),
            'editor'   => __('Editor'),
            'number'   => __('Number'),
            'date'     => __('Date'),
            'time'     => __('Time'),
            'datetime' => __('Datetime'),
            'select'   => __('Select'),
            'selects'  => __('Selects'),
            'image'    => __('Image'),
            'images'   => __('Images'),
            'file'     => __('File'),
            'files'    => __('Files'),
            'switch'   => __('Switch'),
            'checkbox' => __('Checkbox'),
            'radio'    => __('Radio'),
            'array'    => __('Array'),
            'custom'   => __('Custom'),
        ];
        return $typeList;
    }

    public static function getRegexList()
    {
        $regexList = [
            'required' => '必选',
            'digits'   => '数字',
            'letters'  => '字母',
            'date'     => '日期',
            'time'     => '时间',
            'email'    => '邮箱',
            'url'      => '网址',
            'qq'       => 'QQ号',
            'IDcard'   => '身份证',
            'tel'      => '座机电话',
            'mobile'   => '手机号',
            'zipcode'  => '邮编',
            'chinese'  => '中文',
            'username' => '用户名',
            'password' => '密码'
        ];
        return $regexList;
    }

    public function getExtendAttr($value, $data)
    {
        $result = preg_replace_callback("/\{([a-zA-Z]+)\}/", function ($matches) use ($data) {
            if (isset($data[$matches[1]])) {
                return $data[$matches[1]];
            }
        }, $data['extend']);
        return $result;
    }

    /**
     * 读取分类分组列表
     * @return array
     */
    public static function getGroupList()
    {
        $groupList = config('site.configgroup');
        foreach ($groupList as $k => &$v) {
            $v = __($v);
        }
        return $groupList;
    }

    public static function getArrayData($data)
    {
        if (!isset($data['value'])) {
            $result = [];
            foreach ($data as $index => $datum) {
                $result['field'][$index] = $datum['key'];
                $result['value'][$index] = $datum['value'];
            }
            $data = $result;
        }
        $fieldarr = $valuearr = [];
        $field = isset($data['field']) ? $data['field'] : (isset($data['key']) ? $data['key'] : []);
        $value = isset($data['value']) ? $data['value'] : [];
        foreach ($field as $m => $n) {
            if ($n != '') {
                $fieldarr[] = $field[$m];
                $valuearr[] = $value[$m];
            }
        }
        return $fieldarr ? array_combine($fieldarr, $valuearr) : [];
    }

    /**
     * 将字符串解析成键值数组
     * @param string $text
     * @return array
     */
    public static function decode($text, $split = "\r\n")
    {
        $content = explode($split, $text);
        $arr = [];
        foreach ($content as $k => $v) {
            if (stripos($v, "|") !== false) {
                $item = explode('|', $v);
                $arr[$item[0]] = $item[1];
            }
        }
        return $arr;
    }

    /**
     * 将键值数组转换为字符串
     * @param array $array
     * @return string
     */
    public static function encode($array, $split = "\r\n")
    {
        $content = '';
        if ($array && is_array($array)) {
            $arr = [];
            foreach ($array as $k => $v) {
                $arr[] = "{$k}|{$v}";
            }
            $content = implode($split, $arr);
        }
        return $content;
    }

    /**
     * 本地上传配置信息
     * @return array
     */
    public static function upload()
    {
        $uploadcfg = config('upload');

        $upload = [
            'cdnurl'    => $uploadcfg['cdnurl'],
            'uploadurl' => $uploadcfg['uploadurl'],
            'bucket'    => 'local',
            'maxsize'   => $uploadcfg['maxsize'],
            'mimetype'  => $uploadcfg['mimetype'],
            'multipart' => [],
            'multiple'  => $uploadcfg['multiple'],
        ];
        return $upload;
    }

}
