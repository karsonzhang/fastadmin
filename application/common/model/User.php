<?php

namespace app\common\model;

use think\Model;

class User extends Model
{

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;
    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;

}
