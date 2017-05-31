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
        $url = $this->request->post("url");
        $code = $this->request->post("code");
        $message = $this->request->post("message");
        $sign = $this->request->post("sign");
        $time = $this->request->post("time");
        $extparam = $this->request->post("ext-param");
        if ($url && $code && $message && $time && $sign)
        {
            $arr = [$code, $message, $url, $time, Config::get('upload.formkey')];
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
                    'uploadtime'  => $time,
                    'storage'     => 'upyun'
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
