<?php

namespace app\admin\controller\wechat;

use app\common\controller\Backend;
use app\common\model\WechatResponse;

/**
 * 微信自动回复管理
 *
 * @icon fa fa-circle-o
 */
class Autoreply extends Backend
{

    protected $model = null;
    protected $noNeedRight = ['check_text_unique'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('WechatAutoreply');
    }

    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                $row->save($params);
                $this->code = 1;
            }
            return;
        }
        $response = WechatResponse::get(['eventkey' => $row['eventkey']]);
        $this->view->assign("response", $response);
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

    /**
     * 判断文本是否唯一
     * @internal
     */
    public function check_text_unique()
    {
        $row = $this->request->post("row/a");
        $except = $this->request->post("except");
        $text = isset($row['text']) ? $row['text'] : '';
        if ($this->model->where('text', $text)->where(function($query) use($except) {
                    if ($except)
                    {
                        $query->where('text', '<>', $except);
                    }
                })->count() == 0)
        {
            return json(['ok' => '']);
        }
        else
        {
            return json(['error' => __('Text already exists')]);
        }
    }

}
