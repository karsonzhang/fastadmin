<?php

namespace app\common\model;

use think\Model;

class Attachment extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 定义字段类型
    protected $type = [
    ];

    public function setUploadtimeAttr($value)
    {
        return strtotime($value);
    }

}
