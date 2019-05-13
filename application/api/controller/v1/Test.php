<?php

namespace app\api\controller\v1;

use app\common\controller\Api;

/**
 * Token接口
 */
class Test extends Api
{
    protected $noNeedLogin = ['save'];
    protected $noNeedRight = '*';

    public function save()
    {
        $this->success('返回成功', ['action' => 'save']);
    }
}
