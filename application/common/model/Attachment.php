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
        return is_numeric($value) ? $value : strtotime($value);
    }

    public static function getMimetypeList()
    {
        $data = [
            "image/*"        => "图片",
            "audio/*"        => "音频",
            "video/*"        => "视频",
            "text/*"         => "文档",
            "application/*"  => "应用",
            "zip,rar,7z,tar" => "压缩包",
        ];
        return $data;
    }

    protected static function init()
    {
        // 如果已经上传该资源，则不再记录
        self::beforeInsert(function ($model) {
            if (self::where('url', '=', $model['url'])->find()) {
                return false;
            }
        });
    }
}
