<?php

namespace app\admin\controller\general;
 
use think\Config as tpConfig;
use app\common\library\Email;
use app\common\controller\Backend;

/**
 * 系统配置
 *
 * @icon fa fa-circle-o
 */
class Config extends Backend
{

    protected $model = null;
    protected $noNeedRight = ['check'];

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('Config');
    }

    public function index()
    {
        $siteList = [];
        $groupList = \app\admin\model\Config::getGroupList();
        foreach ($groupList as $k => $v)
        {
            $siteList[$k]['name'] = $k;
            $siteList[$k]['title'] = $v;
            $siteList[$k]['list'] = [];
        }

        foreach ($this->model->all() as $k => $v)
        {
            if (!isset($siteList[$v['group']]))
            {
                continue;
            }
            $value = $v->toArray();
            if (in_array($value['type'], ['select', 'selects', 'checkbox', 'radio']))
            {
                $value['value'] = explode(',', $value['value']);
            }
            if ($value['type'] == 'array')
            {
                $value['value'] = (array) json_decode($value['value'], TRUE);
            }
            $value['content'] = json_decode($value['content'], TRUE);
            $siteList[$v['group']]['list'][] = $value;
        }
        $index = 0;
        foreach ($siteList as $k => &$v)
        {
            $v['active'] = !$index ? true : false;
            $index++;
        }
        $this->view->assign('siteList', $siteList);
        $this->view->assign('typeList', \app\admin\model\Config::getTypeList());
        $this->view->assign('groupList', \app\admin\model\Config::getGroupList());
        return $this->view->fetch();
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
                try
                {
                    if ($params['content'] && in_array($params['type'], ['select', 'selects', 'checkbox', 'radio']))
                    {
                        $content = explode("\r\n", $params['content']);
                        $arr = [];
                        foreach ($content as $k => &$v)
                        {
                            if (stripos($v, "|") !== false)
                            {
                                $item = explode('|', $v);
                                $arr[$item[0]] = $item[1];
                            }
                        }
                        $params['content'] = $arr ? json_encode($arr, JSON_UNESCAPED_UNICODE) : '';
                    }
                    else
                    {
                        $params['content'] = '';
                    }
                    $result = $this->model->create($params);
                    if ($result !== false)
                    {
                        try
                        {
                            $this->refreshFile();
                            $this->code = 1;
                        }
                        catch (Exception $e)
                        {
                            $this->msg = $e->getMessage();
                        }
                    }
                    else
                    {
                        $this->msg = $this->model->getError();
                    }
                }
                catch (think\Exception $e)
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

    public function edit($ids = NULL)
    {
        $this->code = -1;
        if ($this->request->isPost())
        {
            $params = $this->request->post("row/a");
            if ($params)
            {
                $configList = [];
                foreach ($this->model->all() as $k => $v)
                {
                    if (isset($params[$v['name']]))
                    {
                        if ($v['type'] == 'array')
                        {
                            $fieldarr = $valuearr = [];
                            $field = $params[$v['name']]['field'];
                            $value = $params[$v['name']]['value'];

                            foreach ($field as $m => $n)
                            {
                                if ($n != '')
                                {
                                    $fieldarr[] = $field[$m];
                                    $valuearr[] = $value[$m];
                                }
                            }
                            $params[$v['name']] = array_combine($fieldarr, $valuearr);
                            $value = json_encode($params[$v['name']], JSON_UNESCAPED_UNICODE);
                        }
                        else
                        {
                            $value = is_array($params[$v['name']]) ? implode(',', $params[$v['name']]) : $params[$v['name']];
                        }

                        $configList[] = ['id' => $v['id'], 'value' => $value];
                    }
                }
                $this->model->saveAll($configList);
                try
                {
                    $this->refreshFile();
                    $this->code = 1;
                }
                catch (Exception $e)
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
    }

    protected function refreshFile()
    {
        $config = [];
        foreach ($this->model->all() as $k => $v)
        {

            $value = $v->toArray();
            if (in_array($value['type'], ['selects', 'checkbox', 'images', 'files']))
            {
                $value['value'] = explode(',', $value['value']);
            }
            if ($value['type'] == 'array')
            {
                $value['value'] = (array) json_decode($value['value'], TRUE);
            }
            $config[$value['name']] = $value['value'];
        }
        file_put_contents(APP_PATH . 'extra' . DS . 'site.php', '<?php' . "\n\nreturn " . var_export($config, true) . ";");
    }

    /**
     * @internal
     */
    public function check()
    {
        $params = $this->request->post("row/a");
        if ($params)
        {

            $config = $this->model->get($params);
            if (!$config)
            {
                return json(['ok' => '']);
            }
            else
            {
                return json(['error' => __('Name already exist')]);
            }
        }
        else
        {
            return json(['error' => __('Invalid parameters')]);
        }
    }


    public function emailtest()
    {
        $content = '<table style="width: 99.8%; "><tbody><tr><td id="QQMAILSTATIONERY" style="background:url(https://rescdn.qqmail.com/zh_CN/htmledition/images/xinzhi/bg/a_07.jpg) repeat-x #e4ebf5; min-height:550px; padding: 100px 55px 200px;">这是一封测试邮件,用于测试邮件配置是否正常!</td></tr></tbody></table>';

        $site = tpConfig::get("site");
        $email = new Email;
        $mailArr = Array();
        $mailArr['mTo'] = $site['mail_from'];       //收件人
        $mailArr['subject'] = '这是一封测试邮件';    //邮件主题
        $mailArr['content'] = $content;             //邮件内容(html)
        $mailArr['fromNic'] = 'Fastadmin系统邮件';   //发件人昵称[可省略]
        $mailArr['toNic'] = '亲爱的用户';            //收件人昵称[可省略]貌似无效
        $data = $email->sendMail($mailArr['mTo'],$mailArr['subject'],$mailArr['content'],$mailArr['fromNic'],$mailArr['toNic']);
        return json(['data'=>$data,'code'=>200,'message'=>'操作完成']);
    }
}
