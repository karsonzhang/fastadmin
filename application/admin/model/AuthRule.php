<?php

namespace app\admin\model;

use think\Cache;
use think\Model;

class AuthRule extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    protected static function init()
    {
        self::afterWrite(function ($row) {
            Cache::rm('__menu__');
        });
    }

    public function getTitleAttr($value, $data)
    {
        return __($value);
    }

    public function getMenutypeList()
    {
        return ['addtabs' => __('Addtabs'), 'dialog' => __('Dialog'), 'ajax' => __('Ajax'), 'blank' => __('Blank')];
    }

}
