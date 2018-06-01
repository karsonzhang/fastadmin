<?php

namespace app\admin\command;

use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Exception;

class Min extends Command
{

    /**
     * 路径和文件名配置
     */
    protected $options = [
        'cssBaseUrl'  => 'public/assets/css/',
        'cssBaseName' => '{module}',
        'jsBaseUrl'   => 'public/assets/js/',
        'jsBaseName'  => 'require-{module}',
    ];

    protected function configure()
    {
        $this
                ->setName('min')
                ->addOption('module', 'm', Option::VALUE_REQUIRED, 'module name(frontend or backend),use \'all\' when build all modules', null)
                ->addOption('resource', 'r', Option::VALUE_REQUIRED, 'resource name(js or css),use \'all\' when build all resources', null)
                ->addOption('optimize', 'o', Option::VALUE_OPTIONAL, 'optimize type(uglify|closure|none)', 'none')
                ->setDescription('Compress js and css file');
    }

    protected function execute(Input $input, Output $output)
    {
        $module = $input->getOption('module') ?: '';
        $resource = $input->getOption('resource') ?: '';
        $optimize = $input->getOption('optimize') ?: 'none';

        if (!$module || !in_array($module, ['frontend', 'backend', 'all']))
        {
            throw new Exception('Please input correct module name');
        }
        if (!$resource || !in_array($resource, ['js', 'css', 'all']))
        {
            throw new Exception('Please input correct resource name');
        }

        $moduleArr = $module == 'all' ? ['frontend', 'backend'] : [$module];
        $resourceArr = $resource == 'all' ? ['js', 'css'] : [$resource];

        $minPath = __DIR__ . DS . 'Min' . DS;
        $publicPath = ROOT_PATH . 'public' . DS;
        $tempFile = $minPath . 'temp.js';

        $nodeExec = '';

        if (!$nodeExec)
        {
            if (IS_WIN)
            {
                // Winsows下请手动配置配置该值,一般将该值配置为 '"C:\Program Files\nodejs\node.exe"'，除非你的Node安装路径有变更
                $nodeExec = '"C:\Program Files\nodejs\node.exe"';
            }
            else
            {
                try
                {
                    $nodeExec = exec("which node");
                    if (!$nodeExec)
                    {
                        throw new Exception("node environment not found!please install node first!");
                    }
                }
                catch (Exception $e)
                {
                    throw new Exception($e->getMessage());
                }
            }
        }

        foreach ($moduleArr as $mod)
        {
            foreach ($resourceArr as $res)
            {
                $data = [
                    'publicPath'  => $publicPath,
                    'jsBaseName'  => str_replace('{module}', $mod, $this->options['jsBaseName']),
                    'jsBaseUrl'   => $this->options['jsBaseUrl'],
                    'cssBaseName' => str_replace('{module}', $mod, $this->options['cssBaseName']),
                    'cssBaseUrl'  => $this->options['cssBaseUrl'],
                    'jsBasePath'  => str_replace(DS, '/', ROOT_PATH . $this->options['jsBaseUrl']),
                    'cssBasePath' => str_replace(DS, '/', ROOT_PATH . $this->options['cssBaseUrl']),
                    'optimize'    => $optimize,
                    'ds'          => DS,
                ];

                //源文件
                $from = $data["{$res}BasePath"] . $data["{$res}BaseName"] . '.' . $res;
                if (!is_file($from))
                {
                    $output->error("{$res} source file not found!file:{$from}");
                    continue;
                }
                if ($res == "js")
                {
                    $content = file_get_contents($from);
                    preg_match("/require\.config\(\{[\r\n]?[\n]?+(.*?)[\r\n]?[\n]?}\);/is", $content, $matches);
                    if (!isset($matches[1]))
                    {
                        $output->error("js config not found!");
                        continue;
                    }
                    $config = preg_replace("/(urlArgs|baseUrl):(.*)\n/", '', $matches[1]);
                    $data['config'] = $config;
                }
                // 生成压缩文件
                $this->writeToFile($res, $data, $tempFile);

                $output->info("Compress " . $data["{$res}BaseName"] . ".{$res}");

                // 执行压缩
                $command = "{$nodeExec} \"{$minPath}r.js\" -o \"{$tempFile}\" >> \"{$minPath}node.log\"";
                if ($output->isDebug())
                {
                    $output->warning($command);
                }
                echo exec($command);
            }
        }

        if (!$output->isDebug())
        {
            @unlink($tempFile);
        }

        $output->info("Build Successed!");
    }

    /**
     * 写入到文件
     * @param string $name
     * @param array $data
     * @param string $pathname
     * @return mixed
     */
    protected function writeToFile($name, $data, $pathname)
    {
        $search = $replace = [];
        foreach ($data as $k => $v)
        {
            $search[] = "{%{$k}%}";
            $replace[] = $v;
        }
        $stub = file_get_contents($this->getStub($name));
        $content = str_replace($search, $replace, $stub);

        if (!is_dir(dirname($pathname)))
        {
            mkdir(strtolower(dirname($pathname)), 0755, true);
        }
        return file_put_contents($pathname, $content);
    }

    /**
     * 获取基础模板
     * @param string $name
     * @return string
     */
    protected function getStub($name)
    {
        return __DIR__ . DS . 'Min' . DS . 'stubs' . DS . $name . '.stub';
    }

}
