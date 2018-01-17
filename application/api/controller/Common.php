<?php

namespace app\api\controller;

use app\api\model\Area;
use app\common\controller\Api;
use fast\Version;
use think\Config;

/**
 * 公共接口
 */
class Common extends Api
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 加载初始化
     * 
     * 必选参数:version<br>
     * 可选参数:lng,lat
     */
    public function init()
    {
        if ($version = $this->request->request('version'))
        {
            $lng = $this->request->request('lng');
            $lat = $this->request->request('lat');
            $content = [
                'citydata'    => Area::getCityFromLngLat($lng, $lat),
                'versiondata' => Version::check($version),
                'uploaddata'  => Config::get('upload'),
                'coverdata'   => Config::get("cover"),
            ];
            $this->success('', $content);
        }
        else
        {
            $this->error(__('Invalid parameters'));
        }
    }

}
