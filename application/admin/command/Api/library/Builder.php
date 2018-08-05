<?php

namespace app\admin\command\Api\library;

use think\Config;

/**
 * @website https://github.com/calinrada/php-apidoc
 * @author  Calin Rada <rada.calin@gmail.com>
 * @author  Karson <karsonzhang@163.com>
 */
class Builder
{

    /**
     *
     * @var \think\View
     */
    public $view = null;

    /**
     * parse classes
     * @var array
     */
    protected $classes = [];

    /**
     *
     * @param array $classes
     */
    public function __construct($classes = [])
    {
        $this->classes = array_merge($this->classes, $classes);
        $this->view = new \think\View(Config::get('template'), Config::get('view_replace_str'));
    }

    protected function extractAnnotations()
    {
        $st_output = [];
        foreach ($this->classes as $class) {
            $classAnnotation = Extractor::getClassAnnotations($class);
            // 如果忽略
            if (isset($classAnnotation['ApiInternal'])) {
                continue;
            }
            $st_output[] = Extractor::getAllClassAnnotations($class);
        }
        return end($st_output);
    }

    protected function generateHeadersTemplate($docs)
    {
        if (!isset($docs['ApiHeaders'])) {
            return [];
        }

        $headerslist = array();
        foreach ($docs['ApiHeaders'] as $params) {
            $tr = array(
                'name'        => $params['name'],
                'type'        => $params['type'],
                'sample'      => isset($params['sample']) ? $params['sample'] : '',
                'required'    => isset($params['required']) ? $params['required'] : false,
                'description' => isset($params['description']) ? $params['description'] : '',
            );
            $headerslist[] = $tr;
        }

        return $headerslist;
    }

    protected function generateParamsTemplate($docs)
    {
        if (!isset($docs['ApiParams'])) {
            return [];
        }

        $paramslist = array();
        foreach ($docs['ApiParams'] as $params) {
            $tr = array(
                'name'        => $params['name'],
                'type'        => isset($params['type']) ? $params['type'] : 'string',
                'sample'      => isset($params['sample']) ? $params['sample'] : '',
                'required'    => isset($params['required']) ? $params['required'] : true,
                'description' => isset($params['description']) ? $params['description'] : '',
            );
            $paramslist[] = $tr;
        }

        return $paramslist;
    }

    protected function generateReturnHeadersTemplate($docs)
    {
        if (!isset($docs['ApiReturnHeaders'])) {
            return [];
        }

        $headerslist = array();
        foreach ($docs['ApiReturnHeaders'] as $params) {
            $tr = array(
                'name'        => $params['name'],
                'type'        => 'string',
                'sample'      => isset($params['sample']) ? $params['sample'] : '',
                'required'    => isset($params['required']) && $params['required'] ? 'Yes' : 'No',
                'description' => isset($params['description']) ? $params['description'] : '',
            );
            $headerslist[] = $tr;
        }

        return $headerslist;
    }

    protected function generateReturnParamsTemplate($st_params)
    {
        if (!isset($st_params['ApiReturnParams'])) {
            return [];
        }

        $paramslist = array();
        foreach ($st_params['ApiReturnParams'] as $params) {
            $tr = array(
                'name'        => $params['name'],
                'type'        => isset($params['type']) ? $params['type'] : 'string',
                'sample'      => isset($params['sample']) ? $params['sample'] : '',
                'description' => isset($params['description']) ? $params['description'] : '',
            );
            $paramslist[] = $tr;
        }

        return $paramslist;
    }

    protected function generateBadgeForMethod($data)
    {
        $method = strtoupper(is_array($data['ApiMethod'][0]) ? $data['ApiMethod'][0]['data'] : $data['ApiMethod'][0]);
        $labes = array(
            'POST'    => 'label-primary',
            'GET'     => 'label-success',
            'PUT'     => 'label-warning',
            'DELETE'  => 'label-danger',
            'PATCH'   => 'label-default',
            'OPTIONS' => 'label-info'
        );

        return isset($labes[$method]) ? $labes[$method] : $labes['GET'];
    }

    public function parse()
    {
        $annotations = $this->extractAnnotations();

        $counter = 0;
        $section = null;
        $docslist = [];
        foreach ($annotations as $class => $methods) {
            foreach ($methods as $name => $docs) {
                if (isset($docs['ApiSector'][0])) {
                    $section = is_array($docs['ApiSector'][0]) ? $docs['ApiSector'][0]['data'] : $docs['ApiSector'][0];
                } else {
                    $section = $class;
                }
                if (0 === count($docs)) {
                    continue;
                }

                $docslist[$section][] = [
                    'id'                => $counter,
                    'method'            => is_array($docs['ApiMethod'][0]) ? $docs['ApiMethod'][0]['data'] : $docs['ApiMethod'][0],
                    'method_label'      => $this->generateBadgeForMethod($docs),
                    'section'           => $section,
                    'route'             => is_array($docs['ApiRoute'][0]) ? $docs['ApiRoute'][0]['data'] : $docs['ApiRoute'][0],
                    'title'           => is_array($docs['ApiTitle'][0]) ? $docs['ApiTitle'][0]['data'] : $docs['ApiTitle'][0],
                    'summary'           => is_array($docs['ApiSummary'][0]) ? $docs['ApiSummary'][0]['data'] : $docs['ApiSummary'][0],
                    'body'              => isset($docs['ApiBody'][0]) ? is_array($docs['ApiBody'][0]) ? $docs['ApiBody'][0]['data'] : $docs['ApiBody'][0] : '',
                    'headerslist'       => $this->generateHeadersTemplate($docs),
                    'paramslist'        => $this->generateParamsTemplate($docs),
                    'returnheaderslist' => $this->generateReturnHeadersTemplate($docs),
                    'returnparamslist'  => $this->generateReturnParamsTemplate($docs),
                    'return'            => isset($docs['ApiReturn']) ? is_array($docs['ApiReturn'][0]) ? $docs['ApiReturn'][0]['data'] : $docs['ApiReturn'][0] : '',
                ];
                $counter++;
            }
        }

        return $docslist;
    }

    public function getView()
    {
        return $this->view;
    }

    /**
     * 渲染
     * @param string $template
     * @param array $vars
     * @return string
     */
    public function render($template, $vars = [])
    {
        $docslist = $this->parse();

        return $this->view->display(file_get_contents($template), array_merge($vars, ['docslist' => $docslist]));
    }

}
