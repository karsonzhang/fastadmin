<?php

use app\common\model\Category;
use fast\Form;
use fast\Tree;
use think\Db;

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
    $selected = is_array($selected) ? $selected : explode(',', $selected);
    foreach ($list as $k => $v)
    {
        $html[] = sprintf(Form::label("{$name}-{$k}", "%s {$v}"), Form::radio($name, $k, in_array($k, $selected), ['id' => "{$name}-{$k}"]));
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
    $selected = is_array($selected) ? $selected : explode(',', $selected);
    foreach ($list as $k => $v)
    {
        $html[] = sprintf(Form::label("{$name}-{$k}", "%s {$v}"), Form::checkbox($name, $k, in_array($k, $selected), ['id' => "{$name}-{$k}"]));
    }
    return implode(' ', $html);
}

/**
 * 生成分类下拉列表框
 * @param string $name
 * @param string $type
 * @param mixed $selected
 * @param array $attr
 * @return string
 */
function build_category_select($name, $type, $selected = null, $attr = [], $header = [])
{
    $tree = Tree::instance();
    $tree->init(Category::getCategoryArray($type), 'pid');
    $categorylist = $tree->getTreeList($tree->getTreeArray(0), 'name');
    $categorydata = $header ? $header : [];
    foreach ($categorylist as $k => $v)
    {
        $categorydata[$v['id']] = $v['name'];
    }
    $attr = array_merge(['id' => "c-{$name}", 'class' => 'form-control selectpicker'], $attr);
    return build_select($name, $categorydata, $selected, $attr);
}

/**
 * 生成表格操作按钮栏
 * @param array $btns 按钮组
 * @param array $attr 按钮属性值
 * @return string
 */
function build_toolbar($btns = NULL, $attr = [])
{
    $btns = $btns ? $btns : ['refresh', 'add', 'edit', 'delete'];
    $btns = is_array($btns) ? $btns : explode(',', $btns);
    $btnAttr = [
        'refresh' => ['javascript:;', 'btn btn-primary btn-refresh', 'fa fa-refresh', ''],
        'add'     => ['javascript:;', 'btn btn-success btn-add', 'fa fa-plus', __('Add')],
        'edit'    => ['javascript:;', 'btn btn-success btn-edit btn-disabled disabled', 'fa fa-pencil', __('Edit')],
        'delete'  => ['javascript:;', 'btn btn-danger btn-del btn-disabled disabled', 'fa fa-trash', __('Delete')],
    ];
    $btnAttr = array_merge($btnAttr, $attr);
    $html = [];
    foreach ($btns as $k => $v)
    {
        if (!isset($btnAttr[$v]))
        {
            continue;
        }
        list($href, $class, $icon, $text) = $btnAttr[$v];
        $html[] = '<a href="' . $href . '" class="' . $class . '" ><i class="' . $icon . '"></i> ' . $text . '</a>';
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
        $path = request()->pathinfo();
        $path = $path[0] == '/' ? $path : '/' . $path;
        // 根据当前的URI自动匹配父节点的标题和备注
        $data = Db::name('auth_rule')->where('name', $path)->field('title,remark')->find();
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

/**
 * 判断文件或文件夹是否可写
 * @param	string
 * @return	bool
 */
function is_really_writable($file)
{
    if (DIRECTORY_SEPARATOR === '/')
    {
        return is_writable($file);
    }
    if (is_dir($file))
    {
        $file = rtrim($file, '/') . '/' . md5(mt_rand());
        if (($fp = @fopen($file, 'ab')) === FALSE)
        {
            return FALSE;
        }
        fclose($fp);
        @chmod($file, 0777);
        @unlink($file);
        return TRUE;
    }
    elseif (!is_file($file) OR ( $fp = @fopen($file, 'ab')) === FALSE)
    {
        return FALSE;
    }
    fclose($fp);
    return TRUE;
}

/**
 * 删除文件夹
 * @param string $dirname
 * @return boolean
 */
function rmdirs($dirname)
{
    if (!is_dir($dirname))
        return false;
    $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dirname, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST
    );

    foreach ($files as $fileinfo)
    {
        $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
        $todo($fileinfo->getRealPath());
    }
    @rmdir($dirname);
    return true;
}

/**
 * 复制文件夹
 * @param string $source 源文件夹
 * @param string $dest 目标文件夹
 */
function copydirs($source, $dest)
{
    if (!is_dir($dest))
    {
        mkdir($dest, 0755);
    }
    foreach (
    $iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::SELF_FIRST) as $item
    )
    {
        if ($item->isDir())
        {
            $sontDir = $dest . DS . $iterator->getSubPathName();
            if (!is_dir($sontDir))
            {
                mkdir($sontDir);
            }
        }
        else
        {
            copy($item, $dest . DS . $iterator->getSubPathName());
        }
    }
}
