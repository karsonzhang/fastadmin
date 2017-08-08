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
                ->addOption('delete', 'd', Option::VALUE_OPTIONAL, 'delete the specified menu', '')
                ->setDescription('Build auth menu from controller');
    }

    protected function execute(Input $input, Output $output)
    {
        $this->model = new AuthRule();
        $adminPath = dirname(__DIR__) . DS;
        $moduleName = 'admin';
        //控制器名
        $controller = $input->getOption('controller') ?: '';
        if (!$controller)
        {
            throw new Exception("please input controller name");
        }
        //是否为删除模式
        $delete = $input->getOption('delete');
        if ($delete)
        {
            if ($controller == 'all-controller')
            {
                throw new Exception("could not delete all menu");
            }
            $ids = [];
            $list = $this->model->where('name', 'like', "/{$moduleName}/" . strtolower($controller) . "%")->select();
            foreach ($list as $k => $v)
            {
                $output->warning($v->name);
                $ids[] = $v->id;
            }
            if (!$ids)
            {
                throw new Exception("There is no menu to delete");
            }
            $readyMenu = [];
            $output->info("Are you sure you want to delete all those menu?  Type 'yes' to continue: ");
            $line = fgets(STDIN);
            if (trim($line) != 'yes')
            {
                throw new Exception("Operation is aborted!");
            }
            AuthRule::destroy($ids);

            Cache::rm("__menu__");
            $output->info("Delete Successed");
            return;
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
        $controllerTitle = trim(preg_replace(array('/^\/\*\*(.*)[\n\r\t]/u', '/[\s]+\*\//u', '/\*\s@(.*)/u', '/[\s|\*]+/u'), '', $classComment));

        //导入中文语言包
        \think\Lang::load(dirname(__DIR__) . DS . 'lang/zh-cn.php');

        //先定入菜单的数据
        $pid = 0;
        foreach ($controllerArr as $k => $v)
        {
            $key = $k + 1;
            $name = strtolower(implode('/', array_slice($controllerArr, 0, $key)));
            $title = (!isset($controllerArr[$key]) ? $controllerTitle : '');
            $icon = (!isset($controllerArr[$key]) ? $controllerIcon : 'fa fa-list');
            $remark = (!isset($controllerArr[$key]) ? $controllerRemark : '');
            $title = $title ? $title : __(ucfirst($v) . ' manager');
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
            $comment = preg_replace(array('/^\/\*\*(.*)[\n\r\t]/u', '/[\s]+\*\//u', '/\*\s@(.*)/u', '/[\s|\*]+/u'), '', $comment);

            $ruleArr[] = array('pid' => $pid, 'name' => $name . "/" . strtolower($n->name), 'icon' => 'fa fa-circle-o', 'title' => $comment ? $comment : $n->name, 'ismenu' => 0, 'status' => 'normal');
        }
        $this->model->saveAll($ruleArr);
    }

}
