<?php

namespace app\admin\model;

use think\Model;

class Page extends Model
{

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    public function category()
    {
        return $this->belongsTo('app\common\model\Category', 'category_id')->setEagerlyType(0);
    }
}
