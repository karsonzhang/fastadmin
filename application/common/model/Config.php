<?php

namespace app\common\model;

use think\Model;

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
            'number'   => __('Number'),
            'datetime' => __('Datetime'),
            'select'   => __('Select'),
            'selects'  => __('Selects'),
            'image'    => __('Image'),
            'images'   => __('Images'),
            'file'     => __('File'),
            'files'    => __('Files'),
            'checkbox' => __('Checkbox'),
            'radio'    => __('Radio'),
            'array'    => __('Array'),
        ];
        return $typeList;
    }

    /**
     * 读取分类分组列表
     * @return array
     */
    public static function getGroupList()
    {
        $groupList = config('site.configgroup');
        return $groupList;
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
