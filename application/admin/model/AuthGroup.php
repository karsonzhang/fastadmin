<?php

namespace app\admin\model;

use think\Model;

class AuthGroup extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

<<<<<<< HEAD
    public function getNameAttr($value, $data)
    {
        return __($value);
    }

=======
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
}
