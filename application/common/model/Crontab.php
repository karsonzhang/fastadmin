<?php

namespace app\common\model;

use think\Model;

class Crontab extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 定义字段类型
    protected $type = [
    ];
    // 追加属性
    protected $append = [
        'type_text'
    ];

    public static function getTypeList()
    {
        return [
            'url'   => __('Request Url'),
            'sql'   => __('Execute Sql Script'),
            'shell' => __('Execute Shell'),
        ];
    }

    public function getTypeTextAttr($value, $data)
    {
        $typelist = self::getTypeList();
        $value = $value ? $value : $data['type'];
        return $value && isset($typelist[$value]) ? $typelist[$value] : $value;
    }

    protected function setBegintimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    protected function setEndtimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

    protected function setExecutetimeAttr($value)
    {
        return $value && !is_numeric($value) ? strtotime($value) : $value;
    }

}
