<?php

namespace app\common\model;

use think\Model;

class Version extends Model
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
     * 检测版本号
     *
     * @param string $version 客户端版本号
     * @return array
     */
    public static function check($version)
    {
        $versionlist = self::all(['status' => 'normal'], [], TRUE);
        foreach ($versionlist as $k => $v)
        {
            // 版本正常且新版本号不等于验证的版本号且找到匹配的旧版本
            if ($v['status'] == 'normal' && $v['newversion'] !== $version && self::inversion($version, $v['oldversion']))
            {
                $updateversion = $v;
                break;
            }
        }
        if (isset($updateversion))
        {
            $search = ['{version}', '{newversion}', '{downloadurl}', '{url}', '{packagesize}'];
            $replace = [$version, $updateversion['newversion'], $updateversion['downloadurl'], $updateversion['downloadurl'], $updateversion['packagesize']];
            $upgradetext = str_replace($search, $replace, $updateversion['content']);
            return [
                "enforce"     => $updateversion['enforce'],
                "version"     => $version,
                "newversion"  => $updateversion['newversion'],
                "downloadurl" => $updateversion['downloadurl'],
                "packagesize" => $updateversion['packagesize'],
                "upgradetext" => $upgradetext
            ];
        }
        return NULL;
    }

    /**
     * 检测版本是否的版本要求的数据中
     *
     * @param string $version
     * @param array $data
     */
    public static function inversion($version, $data = [])
    {
        //版本号以.分隔
        $data = is_array($data) ? $data : [$data];
        if ($data)
        {
            if (in_array("*", $data) || in_array($version, $data))
            {
                return TRUE;
            }
            $ver = explode('.', $version);
            if ($ver)
            {
                $versize = count($ver);
                //验证允许的版本
                foreach ($data as $m)
                {
                    $c = explode('.', $m);
                    if (!$c || $versize != count($c))
                        continue;
                    $i = 0;
                    foreach ($c as $a => $k)
                    {
                        if (!self::compare($ver[$a], $k))
                        {
                            continue 2;
                        }
                        else
                        {
                            $i++;
                        }
                    }
                    if ($i == $versize)
                        return TRUE;
                }
            }
        }
        return FALSE;
    }

    /**
     * 比较两个版本号
     *
     * @param string $v1
     * @param string $v2
     * @return boolean
     */
    public static function compare($v1, $v2)
    {
        if ($v2 == "*" || $v1 == $v2)
        {
            return TRUE;
        }
        else
        {
            $values = [];
            $k = explode(',', $v2);
            foreach ($k as $v)
            {
                if (strpos($v, '-') !== FALSE)
                {
                    list($start, $stop) = explode('-', $v);
                    for ($i = $start; $i <= $stop; $i++)
                    {
                        $values[] = $i;
                    }
                }
                else
                {
                    $values[] = $v;
                }
            }
            return in_array($v1, $values) ? TRUE : FALSE;
        }
    }

}
