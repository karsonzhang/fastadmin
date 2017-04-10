<?php

use app\admin\library\Auth;
use app\common\model\Configvalue;
use fast\Form;
use think\Db;

function get_upload_multipart($savekey = '', $mimetype = '', $maxsize = '')
{
    // 加载配置
    $configvalue = new Configvalue;
    // 上传参数配置配置
    $uploadcfg = $configvalue->upload($savekey, $mimetype, $maxsize);

    return json_encode(['policy' => $uploadcfg['policy'], 'signature' => $uploadcfg['signature']]);
}

function get_flag_list()
{
    return [
        'h' => __('Hot'),
        'i' => __('Index'),
        'r' => __('Recommend'),
    ];
}

/**
 * 生成下拉列表
 * @param string $name
 * @param mixed $options
 * @param mixed $selected
 * @param mixed $attr
 * @return string
 */
function build_select($name, $options, $selected = [], $attr = [])
{
    $options = is_array($options) ? $options : explode(',', $options);
    $selected = is_array($selected) ? $selected : explode(',', $selected);
    return Form::select($name, $options, $selected, $attr);
}

/**
 * 生成单选按钮组
 * @param string $name
 * @param array $list
 * @param mixed $selected
 * @return string
 */
function build_radios($name, $list = [], $selected = null)
{
    $html = [];
    $selected = is_null($selected) ? key($list) : $selected;
    foreach ($list as $k => $v)
    {
        $html[] = sprintf(Form::label("{$name}-{$k}", "%s {$v}"), Form::radio($name, $k, $k == $selected, ['id' => "{$name}-{$k}"]));
    }
    return implode(' ', $html);
}

/**
 * 生成复选按钮组
 * @param string $name
 * @param array $list
 * @param mixed $selected
 * @return string
 */
function build_checkboxs($name, $list = [], $selected = null)
{
    $html = [];
    $selected = is_null($selected) ? [] : $selected;
    foreach ($list as $k => $v)
    {
        $html[] = sprintf(Form::label("{$name}-{$k}", "%s {$v}"), Form::checkbox($name, $k, $k == $selected, ['id' => "{$name}-{$k}"]));
    }
    return implode(' ', $html);
}

/**
 * 生成表格操作按钮栏
 * @param array $btns
 * @return string
 */
function build_toolbar($btns = NULL)
{
    $btns = $btns ? $btns : ['refresh', 'add', 'edit', 'delete'];
    $btns = is_array($btns) ? $btns : explode(',', $btns);
    $addbtn = __('Add');
    $editbtn = __('Edit');
    $deletebtn = __('Delete');
    $html = [];
    if (in_array('refresh', $btns))
    {
        $html[] = '<a class="btn btn-primary btn-refresh" ><i class="fa fa-refresh"></i></a>';
    }
    if (in_array('add', $btns))
    {
        $html[] = '<a class="btn btn-success btn-add" ><i class="fa fa-plus"></i> ' . $addbtn . '</a>';
    }
    if (in_array('edit', $btns))
    {
        $html[] = '<a class="btn btn-success btn-edit btn-disabled disabled" ><i class="fa fa-pencil"></i> ' . $editbtn . '</a>';
    }
    if (in_array('delete', $btns))
    {
        $html[] = '<a class="btn btn-danger btn-del btn-disabled disabled" ><i class="fa fa-trash"></i> ' . $deletebtn . '</a>';
    }
    return implode(' ', $html);
}

/**
 * 生成页面Heading
 *
 * @param string $title
 * @param string $content
 * @return string
 */
function build_heading($title = NULL, $content = NULL)
{
    if (is_null($title) && is_null($content))
    {
        // 根据当前的URI自动匹配父节点的标题和备注
        $path = Auth::instance()->getRequestUri();
        $data = Db::name('auth_rule')->where('id', 'IN', function($query) use($path)
                {
                    $query->name('auth_rule')->where('name', $path)->field('pid');
                })->find();
        if ($data)
        {
            $title = $data['title'];
            $content = $data['remark'];
        }
    }
    if (!$content)
        return '';
    return '<div class="panel-heading"><div class="panel-lead"><em>' . $title . '</em>' . $content . '</div></div>';
}
