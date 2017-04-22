<?php

namespace app\common\model;

use think\Model;

/**
 * 分类模型
 */
class Category Extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 定义字段类型
    protected $type = [
    ];

    /**
     * 读取分类类型
     * @return array
     */
    public static function getTypeList()
    {
        $typelist = [
            'default' => __('Default'),
            'page'    => __('Page'),
            'article' => __('Article'),
            'block'   => __('Block'),
        ];
        return $typelist;
    }

}
