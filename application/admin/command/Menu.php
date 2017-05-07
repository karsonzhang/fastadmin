<?php

namespace app\admin\command;

use app\admin\model\AuthRule;
use ReflectionClass;
use ReflectionMethod;
use think\Cache;
use think\Config;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Exception;

class Menu extends Command
{

    protected $model = null;

    protected function configure()
    {
        $this
                ->setName('menu')
                ->addOption('controller', 'c', Option::VALUE_REQUIRED, 'controller name,use \'all-controller\' when build all menu', null)
                ->setDescription('Build auth menu from controller');
    }

    protected function execute(Input $input, Output $output)
    {
        $this->model = new AuthRule();
        $adminPath = dirname(__DIR__) . DS;
        //控制器名
        $controller = $input->getOption('controller') ? : '';
        if (!$controller)
        {
            throw new Exception("please input controller name");
        }

        if ($controller != 'all-controller')
        {
            $controllerArr = explode('/', $controller);
            end($controllerArr);
            $key = key($controllerArr);
            $controllerArr[$key] = ucfirst($controllerArr[$key]);
            $adminPath = dirname(__DIR__) . DS . 'controller' . DS . implode(DS, $controllerArr) . '.php';
            if (!is_file($adminPath))
            {
                $output->error("controller not found");
                return;
            }
            $this->importRule($controller);
        }
        else
        {
            $this->model->destroy([]);
            $controllerDir = $adminPath . 'controller' . DS;
            // 扫描新的节点信息并导入
            $treelist = $this->import($this->scandir($controllerDir));
        }
        Cache::rm("__menu__");
        $output->info("Build Successed!");
    }

    /**
     * 递归扫描文件夹
     * @param string $dir
     * @return array
     */
    public function scandir($dir)
    {
        $result = [];
        $cdir = scandir($dir);
        foreach ($cdir as $value)
        {
            if (!in_array($value, array(".", "..")))
            {
                if (is_dir($dir . DS . $value))
                {
                    $result[$value] = $this->scandir($dir . DS . $value);
                }
                else
                {
                    $result[] = $value;
                }
            }
        }
        return $result;
    }

    /**
     * 导入规则节点
     * @param array $dirarr
     * @param array $parentdir
     * @return array
     */
    public function import($dirarr, $parentdir = [])
    {
        $menuarr = [];
        foreach ($dirarr as $k => $v)
        {
            if (is_array($v))
            {
                //当前是文件夹
                $nowparentdir = array_merge($parentdir, [$k]);
                $this->import($v, $nowparentdir);
            }
            else
            {
                //只匹配PHP文件
                if (!preg_match('/^(\w+)\.php$/', $v, $matchone))
                {
                    continue;
                }
                //导入文件
                $controller = ($parentdir ? implode('/', $parentdir) . '/' : '') . $matchone[1];
                $this->importRule($controller);
            }
        }

        return $menuarr;
    }

    protected function importRule($controller)
    {
        $controllerArr = explode('/', $controller);
        end($controllerArr);
        $key = key($controllerArr);
        $controllerArr[$key] = ucfirst($controllerArr[$key]);
        $classSuffix = Config::get('controller_suffix') ? ucfirst(Config::get('url_controller_layer')) : '';
        $className = "\\app\\admin\\controller\\" . implode("\\", $controllerArr) . $classSuffix;
        if (version_compare(PHP_VERSION, '7.0.0', '<'))
        {
            $pathArr = $controllerArr;
            array_unshift($pathArr, '', 'application', 'admin', 'controller');
            $classFile = ROOT_PATH . implode(DS, $pathArr) . $classSuffix . ".php";
            $classContent = file_get_contents($classFile);
            $uniqueName = uniqid("FastAdmin") . $classSuffix;
            $classContent = str_replace("class " . $controllerArr[$key] . $classSuffix . " ", 'class ' . $uniqueName . ' ', $classContent);
            $classContent = preg_replace("/namespace\s(.*);/", 'namespace ' . __NAMESPACE__ . ";", $classContent);

            //临时的类文件
            $tempClassFile = __DIR__ . DS . $uniqueName . ".php";
            file_put_contents($tempClassFile, $classContent);
            $className = "\\app\\admin\\command\\" . $uniqueName;
        }
        //反射机制调用类的注释和方法名
        $reflector = new ReflectionClass($className);

        if (isset($tempClassFile))
        {
            //删除临时文件
            @unlink($tempClassFile);
        }

        //只匹配公共的方法
        $methods = $reflector->getMethods(ReflectionMethod::IS_PUBLIC);
        $classComment = $reflector->getDocComment();
        //忽略的类
        if (stripos($classComment, "@internal") !== FALSE)
        {
            return;
        }
        preg_match_all('#(@.*?)\n#s', $classComment, $annotations);
        $controllerIcon = 'fa fa-circle-o';
        $controllerRemark = '';
        //判断注释中是否设置了icon值
        if (isset($annotations[1]))
        {
            foreach ($annotations[1] as $tag)
            {
                if (stripos($tag, '@icon') !== FALSE)
                {
                    $controllerIcon = substr($tag, stripos($tag, ' ') + 1);
                }
                if (stripos($tag, '@remark') !== FALSE)
                {
                    $controllerRemark = substr($tag, stripos($tag, ' ') + 1);
                }
            }
        }
        //过滤掉其它字符
        $controllerTitle = trim(preg_replace(array('/^\/\*\*(.*)[\n\r\t]/', '/[\s]+\*\//', '/\*\s@(.*)/', '/[\s|\*]+/'), '', $classComment));
        //先定入菜单的数据
        $pid = 0;
        $name = "/admin";
        foreach (explode('/', $controller) as $k => $v)
        {
            $name .= '/' . strtolower($v);
            $title = (!isset($controllerArr[$k + 1]) ? $controllerTitle : ucfirst($v));
            $icon = (!isset($controllerArr[$k + 1]) ? $controllerIcon : 'fa fa-list');
            $remark = (!isset($controllerArr[$k + 1]) ? $controllerRemark : '');
            $title = $title ? $title : ucfirst($v);
            $rulemodel = $this->model->get(['name' => $name]);
            if (!$rulemodel)
            {
                $this->model
                        ->data(['pid' => $pid, 'name' => $name, 'title' => $title, 'icon' => $icon, 'remark' => $remark, 'ismenu' => 1, 'status' => 'normal'])
                        ->isUpdate(false)
                        ->save();
                $pid = $this->model->id;
            }
            else
            {
                $pid = $rulemodel->id;
            }
        }
        $ruleArr = [];
        foreach ($methods as $m => $n)
        {
            //过滤特殊的类
            if (substr($n->name, 0, 2) == '__' || $n->name == '_initialize')
            {
                continue;
            }
            //只匹配符合的方法
            if (!preg_match('/^(\w+)' . Config::get('action_suffix') . '/', $n->name, $matchtwo))
            {
                unset($methods[$m]);
                continue;
            }
            $comment = $reflector->getMethod($n->name)->getDocComment();
            //忽略的方法
            if (stripos($comment, "@internal") !== FALSE)
            {
                continue;
            }
            //过滤掉其它字符
            $comment = preg_replace(array('/^\/\*\*(.*)[\n\r\t]/', '/[\s]+\*\//', '/\*\s@(.*)/', '/[\s|\*]+/'), '', $comment);

            $ruleArr[] = array('pid' => $pid, 'name' => $name . "/" . strtolower($n->name), 'icon' => 'fa fa-circle-o', 'title' => $comment ? $comment : $n->name, 'ismenu' => 0, 'status' => 'normal');
        }
        $this->model->saveAll($ruleArr);
    }

}
