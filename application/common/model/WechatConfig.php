<?php

namespace app\common\model;

use think\Model;

class WechatConfig extends Model
{

    // 表名,不含前缀
    public $name = 'wechat_config';
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 追加属性
    protected $append = [
    ];

    /**
     * 读取指定配置名称的值
     * @param string $name
     * @return string
     */
    public static function value($name)
    {
        $item = self::get(['name' => $name]);
        return $item ? $item->value : '';
    }

}
