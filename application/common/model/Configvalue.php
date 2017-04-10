<?php

namespace app\common\model;

use think\Model;
use think\Config;

class Configvalue extends Model
{

    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    // 定义字段类型
    protected $type = [
        'content' => 'json',
    ];

    /**
     * 加载上传配置
     *
     * @param string $savekey 保存路径 例:/{year}/{mon}/{day}/{filemd5}{.suffix}
     * @param mixed $mimetype 上传类型 例:image/*,application/zip
     * @param int $maxsize 上传文件大小  例:10mb
     *
     * @return array
     */
    public static function upload($savekey = '', $mimetype = '', $maxsize = '')
    {
        $uploadcfg = Config::get('upload');
        $uploadcfg = $uploadcfg ? $uploadcfg : [];
        $bucket = isset($uploadcfg['bucket']) ? $uploadcfg['bucket'] : '';
        $savekey = $savekey ? $savekey : (isset($uploadcfg['savekey']) ? $uploadcfg['savekey'] : '');
        $expiration = time() + (isset($uploadcfg['expire']) ? $uploadcfg['expire'] : 0);
        $options = [
            'bucket'     => $bucket,
            'save-key'   => $savekey,
            'expiration' => $expiration
        ];
        $policy = base64_encode(json_encode($options));
        $signature = md5($policy . '&' . (isset($uploadcfg['formkey']) ? $uploadcfg['formkey'] : ''));
        return [
            'cdnurl'    => isset($uploadcfg['cdnurl']) ? $uploadcfg['cdnurl'] : '',
            'uploadurl' => isset($uploadcfg['uploadurl']) ? $uploadcfg['uploadurl'] : url('ajax/upload'),
            'bucket'    => isset($uploadcfg['bucket']) ? $uploadcfg['bucket'] : '',
            'maxsize'   => $maxsize ? $maxsize : (isset($uploadcfg['maxsize']) ? $uploadcfg['maxsize'] : ''),
            'mimetype'  => $mimetype ? $mimetype : (isset($uploadcfg['mimetype']) ? $uploadcfg['mimetype'] : ''),
            'policy'    => $policy,
            'signature' => $signature,
        ];
    }

}
