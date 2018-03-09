<?php

namespace app\common\model;

use think\Model;

/**
 * Token模型
 */
class Token Extends Model
{

    // 表名
    protected $name = 'user_token';
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    // 定义主键
    protected $pk = 'token';
    // 追加属性
    protected $append = [
        'expires_in'
    ];
    
    /**
     * 获取Token剩余有效期
     * @return int
     */
    public function getExpiresInAttr($value, $data)
    {
        return $data['expiretime'] ? max(0, $data['expiretime'] - time()) : 365 * 86400;
    }

}
