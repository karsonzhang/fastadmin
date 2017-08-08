<?php

namespace fast;

/**
 * 版本检测和对比
 */
class Version
{

    /**
     * 检测版本是否的版本要求的数据中
     *
     * @param string $version 
     * @param array $data 
     */
    public static function check($version, $data = [])
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
