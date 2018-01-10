<?php
/**
 * FastAdmin安装程序
 * 
 * 安装完成后建议删除此文件
 * @author Karson
 * @website http://www.fastadmin.net
 */
// 定义目录分隔符
define('DS', DIRECTORY_SEPARATOR);

// 定义根目录
define('ROOT_PATH', __DIR__ . DS . '..' . DS);

// 定义应用目录
define('APP_PATH', ROOT_PATH . 'application' . DS);

// 安装包目录
define('INSTALL_PATH', APP_PATH . 'admin' . DS . 'command' . DS . 'Install' . DS);

// 判断文件或目录是否有写的权限
function is_really_writable($file)
{
    if (DIRECTORY_SEPARATOR == '/' AND @ ini_get("safe_mode") == FALSE)
    {
        return is_writable($file);
    }
    if (!is_file($file) OR ( $fp = @fopen($file, "r+")) === FALSE)
    {
        return FALSE;
    }

    fclose($fp);
    return TRUE;
}

$sitename = "FastAdmin";

$link = array(
    'qqun'  => "https://jq.qq.com/?_wv=1027&amp;k=487PNBb",
    'osc'   => 'https://git.oschina.net/karson/fastadmin/attach_files',
    'home'  => 'http://www.fastadmin.net?ref=install',
    'forum' => 'http://forum.fastadmin.net?ref=install',
    'doc'   => 'http://doc.fastadmin.net?ref=install',
);

// 检测目录是否存在
$checkDirs = [
    'thinkphp',
    'vendor',
    'public' . DS . 'assets' . DS . 'libs'
];
//缓存目录
$runtimeDir = APP_PATH . 'runtime';

//错误信息
$errInfo = '';

//数据库配置文件
$dbConfigFile = APP_PATH . 'database.php';

// 锁定的文件
$lockFile = INSTALL_PATH . 'install.lock';
if (is_file($lockFile))
{
    $errInfo = "当前已经安装{$sitename}，如果需要重新安装，请手动移除application/admin/command/Install/install.lock文件";
}
else if (version_compare(PHP_VERSION, '5.5.0', '<'))
{
    $errInfo = "当前版本(" . PHP_VERSION . ")过低，请使用PHP5.5以上版本";
}
else if (!extension_loaded("PDO"))
{
    $errInfo = "当前未开启PDO，无法进行安装";
}
else if (!is_really_writable($dbConfigFile))
{
    $errInfo = "当前权限不足，无法写入配置文件application/database.php";
}
else
{
    $dirArr = [];
    foreach ($checkDirs as $k => $v)
    {
        if (!is_dir(ROOT_PATH . $v))
        {
            $errInfo = '请先下载完整包覆盖后再安装，<a href="' . $link['qqun'] . '" target="_blank">群共享下载</a> <a href="' . $link['osc'] . '" target="_blank">码云下载</a>';
            break;
        }
    }
}
// 当前是POST请求
if (!$errInfo && isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST')
{
    $err = '';
    $mysqlHostname = isset($_POST['mysqlHost']) ? $_POST['mysqlHost'] : 'localhost';
    $mysqlHostport = 3306;
    $hostArr = explode(':', $mysqlHostname);
    if (count($hostArr) > 1)
    {
        $mysqlHostname = $hostArr[0];
        $mysqlHostport = $hostArr[1];
    }
    $mysqlUsername = isset($_POST['mysqlUsername']) ? $_POST['mysqlUsername'] : 'root';
    $mysqlPassword = isset($_POST['mysqlPassword']) ? $_POST['mysqlPassword'] : '';
    $mysqlDatabase = isset($_POST['mysqlDatabase']) ? $_POST['mysqlDatabase'] : 'fastadmin';
    $adminUsername = isset($_POST['adminUsername']) ? $_POST['adminUsername'] : 'admin';
    $adminPassword = isset($_POST['adminPassword']) ? $_POST['adminPassword'] : '123456';
    $adminPasswordConfirmation = isset($_POST['adminPasswordConfirmation']) ? $_POST['adminPasswordConfirmation'] : '123456';
    $adminEmail = isset($_POST['adminEmail']) ? $_POST['adminEmail'] : 'admin@admin.com';

    if ($adminPassword !== $adminPasswordConfirmation)
    {
        echo "两次输入的密码不一致";
        exit;
    }
    else if (!preg_match("/^\w+$/", $adminUsername))
    {
        echo "用户名只能输入字母、数字、下划线";
        exit;
    }
    else if (!preg_match("/^[\S]+$/", $adminPassword))
    {
        echo "密码不能包含空格";
        exit;
    }
    else if (strlen($adminUsername) < 3 || strlen($adminUsername) > 12)
    {
        echo "用户名请输入3~12位字符";
        exit;
    }
    else if (strlen($adminPassword) < 6 || strlen($adminPassword) > 16)
    {

        echo "密码请输入6~16位字符";
        exit;
    }
    try
    {
        //检测能否读取安装文件
        $sql = @file_get_contents(INSTALL_PATH . 'fastadmin.sql');
        if (!$sql)
        {
            throw new Exception("无法读取application/admin/command/Install/fastadmin.sql文件，请检查是否有读权限");
        }
        $pdo = new PDO("mysql:host={$mysqlHostname};port={$mysqlHostport}", $mysqlUsername, $mysqlPassword, array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));

        $pdo->query("CREATE DATABASE IF NOT EXISTS `{$mysqlDatabase}` CHARACTER SET utf8 COLLATE utf8_general_ci;");

        $pdo->query("USE `{$mysqlDatabase}`");

        $pdo->exec($sql);

        $config = @file_get_contents($dbConfigFile);
        $callback = function($matches) use($mysqlHostname, $mysqlHostport, $mysqlUsername, $mysqlPassword, $mysqlDatabase) {
            $field = ucfirst($matches[1]);
            $replace = ${"mysql{$field}"};
            if ($matches[1] == 'hostport' && $mysqlHostport == 3306)
            {
                $replace = '';
            }
            return "'{$matches[1]}'{$matches[2]}=>{$matches[3]}'{$replace}',";
        };
        $config = preg_replace_callback("/'(hostname|database|username|password|hostport)'(\s+)=>(\s+)'(.*)'\,/", $callback, $config);

        //检测能否成功写入数据库配置
        $result = @file_put_contents($dbConfigFile, $config);
        if (!$result)
        {
            throw new Exception("无法写入数据库信息到application/database.php文件，请检查是否有写权限");
        }

        //检测能否成功写入lock文件
        $result = @file_put_contents($lockFile, 1);
        if (!$result)
        {
            throw new Exception("无法写入安装锁定到application/admin/command/Install/install.lock文件，请检查是否有写权限");
        }
        $newSalt = substr(md5(uniqid(true)), 0, 6);
        $newPassword = md5(md5($adminPassword) . $newSalt);
        $pdo->query("UPDATE fa_admin SET username = '{$adminUsername}', email = '{$adminEmail}',password = '{$newPassword}', salt = '{$newSalt}' WHERE username = 'admin'");
        echo "success";
    }
    catch (Exception $e)
    {
        $err = $e->getMessage();
    }
    catch (PDOException $e)
    {
        $err = $e->getMessage();
    }
    echo $err;
    exit;
}
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>安装<?php echo $sitename; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
        <meta name="renderer" content="webkit">

        <style>
            body {
                background: #fff;
                margin: 0;
                padding: 0;
                line-height: 1.5;
            }
            body, input, button {
                font-family: 'Open Sans', sans-serif;
                font-size: 16px;
                color: #7E96B3;
            }
            .container {
                max-width: 515px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            a {
                color: #18bc9c;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }

            h1 {
                margin-top:0;
                margin-bottom: 10px;
            }
            h2 {
                font-size: 28px;
                font-weight: normal;
                color: #3C5675;
                margin-bottom: 0;
            }

            form {
                margin-top: 40px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group .form-field:first-child input {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
            .form-group .form-field:last-child input {
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            }
            .form-field input {
                background: #EDF2F7;
                margin: 0 0 1px;
                border: 2px solid transparent;
                transition: background 0.2s, border-color 0.2s, color 0.2s;
                width: 100%;
                padding: 15px 15px 15px 180px;
                box-sizing: border-box;
            }
            .form-field input:focus {
                border-color: #18bc9c;
                background: #fff;
                color: #444;
                outline: none;
            }
            .form-field label {
                float: left;
                width: 160px;
                text-align: right;
                margin-right: -160px;
                position: relative;
                margin-top: 18px;
                font-size: 14px;
                pointer-events: none;
                opacity: 0.7;
            }
            button,.btn {
                background: #3C5675;
                color: #fff;
                border: 0;
                font-weight: bold;
                border-radius: 4px;
                cursor: pointer;
                padding: 15px 30px;
                -webkit-appearance: none;
            }
            button[disabled] {
                opacity: 0.5;
            }

            #error,.error,#success,.success {
                background: #D83E3E;
                color: #fff;
                padding: 15px 20px;
                border-radius: 4px;
                margin-bottom: 20px;
            }
            #success {
                background:#3C5675;
            }

            #error a, .error a {
                color:white;
                text-decoration: underline;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <h1>
                <svg width="100px" height="120px" viewBox="0 0 768 830" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M64.433651,605.899968 C20.067302,536.265612 0,469.698785 0,389.731348 C0,174.488668 171.922656,0 384,0 C596.077344,0 768,174.488668 768,389.731348 C768,469.698785 747.932698,536.265612 703.566349,605.899968 C614.4,753.480595 441.6,870.4 384,870.4 C326.4,870.4 153.6,753.480595 64.433651,605.899968 L64.433651,605.899968 Z" id="body" fill="#18BC9C"></path>
                <path d="M429.648991,190.816 L430.160991,190.816 L429.648991,190.816 L429.648991,190.816 Z M429.648991,156 L427.088991,156 C419.408991,157.024 411.728991,160.608 404.560991,168.8 L403.024991,170.848 L206.928991,429.92 C198.736991,441.184 197.712991,453.984 204.368991,466.784 C210.512991,478.048 222.288991,485.728 235.600991,485.728 L336.464991,486.24 L304.208991,673.632 C301.648991,689.504 310.352991,705.376 325.200991,712.032 C329.808991,714.08 334.416991,714.592 339.536991,714.592 C349.776991,714.592 358.992991,709.472 366.160991,700.256 L561.744991,419.168 C569.936991,407.904 570.960991,395.104 564.304991,382.304 C557.648991,369.504 547.408991,363.36 533.072991,363.36 L432.208991,363.36 L463.952991,199.008 C464.464991,196.448 464.976991,193.376 464.976991,190.816 C464.976991,171.872 449.104991,156 431.184991,156 L429.648991,156 L429.648991,156 Z" id="flash" fill="#FFFFFF"></path>
                </g>
                </svg>
            </h1>
            <h2>安装 <?php echo $sitename; ?></h2>
            <div>

                <p>若你在安装中遇到麻烦可点击  <a href="<?php echo $link['doc']; ?>" target="_blank">安装文档</a> <a href="<?php echo $link['forum']; ?>" target="_blank">交流论坛</a> <a href="<?php echo $link['qqun']; ?>">QQ交流群</a></p>
                <p><?php echo $sitename; ?>还支持在命令行php think install一键安装</p>

                <form method="post">
                    <?php if ($errInfo): ?>
                        <div class="error">
                            <?php echo $errInfo; ?>
                        </div>
                    <?php endif; ?>
                    <div id="error" style="display:none"></div>
                    <div id="success" style="display:none"></div>

                    <div class="form-group">
                        <div class="form-field">
                            <label>MySQL 数据库地址</label>
                            <input name="mysqlHost" value="localhost" required="">
                        </div>

                        <div class="form-field">
                            <label>MySQL 数据库名</label>
                            <input name="mysqlDatabase" value="fastadmin" required="">
                        </div>

                        <div class="form-field">
                            <label>MySQL 用户名</label>
                            <input name="mysqlUsername" value="root" required="">
                        </div>

                        <div class="form-field">
                            <label>MySQL 密码</label>
                            <input type="password" name="mysqlPassword">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="form-field">
                            <label>管理者用户名</label>
                            <input name="adminUsername" value="admin" required="" />
                        </div>

                        <div class="form-field">
                            <label>管理者Email</label>
                            <input name="adminEmail" value="admin@admin.com" required="">
                        </div>

                        <div class="form-field">
                            <label>管理者密码</label>
                            <input type="password" name="adminPassword" required="">
                        </div>

                        <div class="form-field">
                            <label>重复密码</label>
                            <input type="password" name="adminPasswordConfirmation" required="">
                        </div>
                    </div>

                    <div class="form-buttons">
                        <button type="submit" <?php echo $errInfo ? 'disabled' : '' ?>>点击安装</button>
                    </div>
                </form>

                <script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
                <script>
                    $(function () {
                        $('form :input:first').select();

                        $('form').on('submit', function (e) {
                            e.preventDefault();

                            var $button = $(this).find('button')
                                    .text('安装中...')
                                    .prop('disabled', true);

                            $.post('', $(this).serialize())
                                    .done(function (ret) {
                                        if (ret === 'success') {
                                            $('#error').hide();
                                            $("#success").text("安装成功！开始你的<?php echo $sitename; ?>之旅吧！").show();
                                            $('<a class="btn" href="./">访问首页</a> <a class="btn" href="./index.php/admin/index/login" style="background:#18bc9c">访问后台</a>').insertAfter($button);
                                            $button.remove();
                                        } else {
                                            $('#error').show().text(ret);
                                            $button.prop('disabled', false).text('点击安装');
                                            $("html,body").animate({
                                                scrollTop: 0
                                            }, 500);
                                        }
                                    })
                                    .fail(function (data) {
                                        $('#error').show().text('发生错误:\n\n' + data.responseText);
                                        $button.prop('disabled', false).text('点击安装');
                                        $("html,body").animate({
                                            scrollTop: 0
                                        }, 500);
                                    });

                            return false;
                        });
                    });
                </script>      
            </div>
        </div>
    </body>
</html>