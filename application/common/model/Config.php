<?php

namespace app\common\model;

use think\Model;

class Config extends Model
{

    // 表名,不含前缀
    protected $name = 'config';
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;
    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    // 追加属性
    protected $append = [
    ];

    /**
     * 读取配置类型
     * @return array
     */
    public static function getTypeList()
    {
        $typeList = [
            'string'   => __('String'),
            'text'     => __('Text'),
            'number'   => __('Number'),
            'datetime' => __('Datetime'),
            'select'   => __('Select'),
            'selects'  => __('Selects'),
            'image'    => __('Image'),
            'images'   => __('Images'),
            'file'     => __('File'),
            'files'    => __('Files'),
            'checkbox' => __('Checkbox'),
            'radio'    => __('Radio'),
            'array'    => __('Array'),
        ];
        return $typeList;
    }

    /**
     * 读取分类分组列表
     * @return array
     */
    public static function getGroupList()
    {
        $groupList = config('site.configgroup');
        return $groupList;
    }
    
    /**
     * 加载上传配置
     *
     * @param array $params 扩展参数,常用字段savekey,mimetype,maxsize,ext-param,notify-url,return-url<br>
     * 更多字段可参考http://docs.upyun.com/api/form_api/#_2
     *
     * @return array
     */
    public static function upload($params = [])
    {
        $uploadcfg = config('upload');
        $uploadcfg = $uploadcfg ? $uploadcfg : [];
        $uploadcfg = array_merge($uploadcfg, $params);
        $uploadcfg['bucket'] = isset($uploadcfg['bucket']) ? $uploadcfg['bucket'] : '';
        $multiple = isset($uploadcfg['multiple']) ? $uploadcfg['multiple'] : false;
        $savekey = isset($uploadcfg['savekey']) ? $uploadcfg['savekey'] : '';
        $uploadcfg['save-key'] = isset($uploadcfg['save-key']) ? $uploadcfg['save-key'] : $savekey;
        $expiration = time() + (isset($uploadcfg['expire']) ? $uploadcfg['expire'] : 600);
        $uploadcfg['expiration'] = isset($uploadcfg['expiration']) ? $uploadcfg['expiration'] : $expiration;
        $notifyurl = isset($uploadcfg['notifyurl']) ? $uploadcfg['notifyurl'] : '';
        $returnurl = isset($uploadcfg['returnurl']) ? $uploadcfg['returnurl'] : '';
        if ($notifyurl)
            $uploadcfg['notify-url'] = $notifyurl;
        else
            unset($uploadcfg['notify-url']);
        if ($returnurl)
            $uploadcfg['return-url'] = $returnurl;
        else
            unset($uploadcfg['return-url']);

        //设置允许的附加字段
        $allowfields = [
            'bucket', 'save-key', 'expiration', 'date', 'content-md5', 'notify-url', 'return-url', 'content-secret', 'content-type', 'allow-file-type', 'content-length-range',
            'image-width-range', 'image-height-range', 'x-gmkerl-thumb', 'x-gmkerl-type', 'apps', 'b64encoded', 'ext-param'
        ];
        $params = array_intersect_key($uploadcfg, array_flip($allowfields));
        $policy = base64_encode(json_encode($params));
        $signature = md5($policy . '&' . (isset($uploadcfg['formkey']) ? $uploadcfg['formkey'] : ''));
        $multipart = [
            'policy'    => $policy,
            'signature' => $signature,
        ];

        $multipart = array_merge($multipart, $params);
        return [
            'cdnurl'    => isset($uploadcfg['cdnurl']) ? $uploadcfg['cdnurl'] : '',
            'uploadurl' => isset($uploadcfg['uploadurl']) ? $uploadcfg['uploadurl'] : url('ajax/upload'),
            'bucket'    => $uploadcfg['bucket'],
            'maxsize'   => isset($uploadcfg['maxsize']) ? $uploadcfg['maxsize'] : '',
            'mimetype'  => isset($uploadcfg['mimetype']) ? $uploadcfg['mimetype'] : '',
            'multipart' => $multipart,
            'multiple'  => $multiple,
        ];
    }

}
