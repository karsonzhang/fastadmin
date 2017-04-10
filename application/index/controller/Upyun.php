<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Config;

/**
 * 又拍云异步接口
 */
class Upyun extends Frontend
{

    public function notify()
    {
        $url = $this->request->param("url");
        $code = $this->request->param("code");
        $message = $this->request->param("message");
        $sign = $this->request->param("sign");
        $time = $this->request->param("time");
        $extparam = $this->request->param("ext-param");
        if ($url && $code && $message && $time && $sign)
        {
            $arr = [$code, $message, $url, $time, Config::get('upload', 'formkey')];
            if ($extparam)
            {
                $arr[] = $extparam;
            }
            if ($sign == md5(implode('&', $arr)))
            {
                $params = array(
                    'filesize'    => $this->request->param("file_size"),
                    'imagewidth'  => $this->request->param("image-width"),
                    'imageheight' => $this->request->param("image-height"),
                    'imagetype'   => $this->request->param("image-type"),
                    'imageframes' => $this->request->param("image-frames"),
                    'mimetype'    => $this->request->param("mimetype"),
                    'extparam'    => $extparam,
                    'url'         => $url,
                    'uploadtime'  => $time
                );
                model("attachment")->create(array_filter($params));
                echo "success";
            }
            else
            {
                echo "failure";
            }
        }
        else
        {
            echo "failure";
        }
        return;
    }

}
