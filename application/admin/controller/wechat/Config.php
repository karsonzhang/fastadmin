<?php

namespace app\admin\controller\wechat;

use app\common\controller\Backend;
use think\Controller;
use think\Request;

/**
 * 微信配置管理
 *
 * @icon fa fa-circle-o
 */
class Config extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('WechatConfig');
    }

    /**
     * 添加
     */
    public function add()
    {
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                foreach ($params as $k => &$v)
                {
                    $v = is_array($v) ? implode(',', $v) : $v;
                }

                if ($params['mode'] == 'json')
                {
                    //JSON字段
                    $fieldarr = $valuearr = [];
                    $field = $this->request->post('field/a');
                    $value = $this->request->post('value/a');
                    foreach ($field as $k => $v)
                    {
                        if ($v != '')
                        {
                            $fieldarr[] = $field[$k];
                            $valuearr[] = $value[$k];
                        }
                    }
                    $params['value'] = json_encode(array_combine($fieldarr, $valuearr), JSON_UNESCAPED_UNICODE);
                }
                unset($params['mode']);
                try
                {
                    //是否采用模型验证
                    if ($this->modelValidate)
                    {
                        $name = basename(str_replace('\\', '/', get_class($this->model)));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
                        $this->model->validate($validate);
                    }
                    $result = $this->model->save($params);
                    if ($result !== false)
                    {
                        $this->code = 1;
                    }
                    else
                    {
                        $this->msg = $this->model->getError();
                    }
                }
                catch (\think\exception\PDOException $e)
                {
                    $this->msg = $e->getMessage();
                }
            }
            else
            {
                $this->msg = __('Parameter %s can not be empty', '');
            }

            return;
        }
        return $this->view->fetch();
    }

    /**
     * 编辑
     */
    public function edit($ids = NULL)
    {
        $row = $this->model->get($ids);
        if (!$row)
            $this->error(__('No Results were found'));
        if ($this->request->isPost())
        {
            $this->code = -1;
            $params = $this->request->post("row/a");
            if ($params)
            {
                foreach ($params as $k => &$v)
                {
                    $v = is_array($v) ? implode(',', $v) : $v;
                }

                if ($params['mode'] == 'json')
                {
                    //JSON字段
                    $fieldarr = $valuearr = [];
                    $field = $this->request->post('field/a');
                    $value = $this->request->post('value/a');
                    foreach ($field as $k => $v)
                    {
                        if ($v != '')
                        {
                            $fieldarr[] = $field[$k];
                            $valuearr[] = $value[$k];
                        }
                    }
                    $params['value'] = json_encode(array_combine($fieldarr, $valuearr), JSON_UNESCAPED_UNICODE);
                }
                unset($params['mode']);
                try
                {
                    //是否采用模型验证
                    if ($this->modelValidate)
                    {
                        $name = basename(str_replace('\\', '/', get_class($this->model)));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : true) : $this->modelValidate;
                        $row->validate($validate);
                    }
                    $result = $row->save($params);
                    if ($result !== false)
                    {
                        $this->code = 1;
                    }
                    else
                    {
                        $this->msg = $row->getError();
                    }
                }
                catch (think\exception\PDOException $e)
                {
                    $this->msg = $e->getMessage();
                }
            }
            else
            {
                $this->msg = __('Parameter %s can not be empty', '');
            }

            return;
        }
        $this->view->assign("row", $row);
        $this->view->assign("value", (array) json_decode($row->value, true));
        return $this->view->fetch();
    }

}
