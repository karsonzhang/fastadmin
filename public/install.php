<?php
/**
 * FastAdmin安装程序
 *
 * 安装完成后建议删除此文件
 * @author Karson
 * @website https://www.fastadmin.net
 */
// error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
// ini_set('display_errors', '1');
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
    if (DIRECTORY_SEPARATOR == '/' AND @ ini_get("safe_mode") == false) {
        return is_writable($file);
    }
    if (!is_file($file) OR ($fp = @fopen($file, "r+")) === false) {
        return false;
    }

    fclose($fp);
    return true;
}

$sitename = "FastAdmin";

$link = array(
    'qqun'  => "https://jq.qq.com/?_wv=1027&amp;k=487PNBb",
    'gitee' => 'https://gitee.com/karson/fastadmin/attach_files',
    'home'  => 'https://www.fastadmin.net?ref=install',
    'forum' => 'https://forum.fastadmin.net?ref=install',
    'doc'   => 'https://doc.fastadmin.net?ref=install',
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

//后台入口文件
$adminFile = ROOT_PATH . 'public' . DS . 'admin.php';

// 锁定的文件
$lockFile = INSTALL_PATH . 'install.lock';
if (is_file($lockFile)) {
    $errInfo = "当前已经安装{$sitename}，如果需要重新安装，请手动移除application/admin/command/Install/install.lock文件";
} else {
    if (version_compare(PHP_VERSION, '5.5.0', '<')) {
        $errInfo = "当前版本(" . PHP_VERSION . ")过低，请使用PHP5.5以上版本";
    } else {
        if (!extension_loaded("PDO")) {
            $errInfo = "当前未开启PDO，无法进行安装";
        } else {
            if (!is_really_writable($dbConfigFile)) {
                $open_basedir = ini_get('open_basedir');
                if ($open_basedir) {
                    $dirArr = explode(PATH_SEPARATOR, $open_basedir);
                    if ($dirArr && in_array(__DIR__, $dirArr)) {
                        $errInfo = '当前服务器因配置了open_basedir，导致无法读取父目录<br><a href="https://forum.fastadmin.net/thread/1145?ref=install" target="_blank">点击查看解决办法</a>';
                    }
                }
                if (!$errInfo) {
                    $errInfo = '当前权限不足，无法写入配置文件application/database.php<br><a href="https://forum.fastadmin.net/thread/1145?ref=install" target="_blank">点击查看解决办法</a>';
                }
            } else {
                $dirArr = [];
                foreach ($checkDirs as $k => $v) {
                    if (!is_dir(ROOT_PATH . $v)) {
                        $errInfo = '当前代码仅包含核心代码，请前往官网下载完整包或资源包覆盖后再尝试安装，<a href="https://www.fastadmin.net/download.html?ref=install" target="_blank">立即前往下载</a>';
                        break;
                    }
                }
            }
        }
    }
}
// 当前是POST请求
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($errInfo) {
        echo $errInfo;
        exit;
    }
    $err = '';
    $mysqlHostname = isset($_POST['mysqlHost']) ? $_POST['mysqlHost'] : '127.0.0.1';
    $mysqlHostport = isset($_POST['mysqlHostport']) ? $_POST['mysqlHostport'] : 3306;
    $hostArr = explode(':', $mysqlHostname);
    if (count($hostArr) > 1) {
        $mysqlHostname = $hostArr[0];
        $mysqlHostport = $hostArr[1];
    }
    $mysqlUsername = isset($_POST['mysqlUsername']) ? $_POST['mysqlUsername'] : 'root';
    $mysqlPassword = isset($_POST['mysqlPassword']) ? $_POST['mysqlPassword'] : '';
    $mysqlDatabase = isset($_POST['mysqlDatabase']) ? $_POST['mysqlDatabase'] : 'fastadmin';
    $mysqlPrefix = isset($_POST['mysqlPrefix']) ? $_POST['mysqlPrefix'] : 'fa_';
    $adminUsername = isset($_POST['adminUsername']) ? $_POST['adminUsername'] : 'admin';
    $adminPassword = isset($_POST['adminPassword']) ? $_POST['adminPassword'] : '123456';
    $adminPasswordConfirmation = isset($_POST['adminPasswordConfirmation']) ? $_POST['adminPasswordConfirmation'] : '123456';
    $adminEmail = isset($_POST['adminEmail']) ? $_POST['adminEmail'] : 'admin@admin.com';

    if (!preg_match("/^\w{3,12}$/", $adminUsername)) {
        echo "用户名只能由3-12位数字、字母、下划线组合";
        exit;
    }
    if (!preg_match("/^[\S]{6,16}$/", $adminPassword)) {
        echo "密码长度必须在6-16位之间，不能包含空格";
        exit;
    }
    if ($adminPassword !== $adminPasswordConfirmation) {
        echo "两次输入的密码不一致";
        exit;
    }

    try {
        //检测能否读取安装文件
        $sql = @file_get_contents(INSTALL_PATH . 'fastadmin.sql');
        if (!$sql) {
            throw new Exception("无法读取application/admin/command/Install/fastadmin.sql文件，请检查是否有读权限");
        }
        $sql = str_replace("`fa_", "`{$mysqlPrefix}", $sql);
        $pdo = new PDO("mysql:host={$mysqlHostname};port={$mysqlHostport}", $mysqlUsername, $mysqlPassword, array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));

        //检测是否支持innodb存储引擎
        $pdoStatement = $pdo->query("SHOW VARIABLES LIKE 'innodb_version'");
        $result = $pdoStatement->fetch();
        if (!$result) {
            throw new Exception("当前数据库不支持innodb存储引擎，请开启后再重新尝试安装");
        }

        $pdo->query("CREATE DATABASE IF NOT EXISTS `{$mysqlDatabase}` CHARACTER SET utf8 COLLATE utf8_general_ci;");

        $pdo->query("USE `{$mysqlDatabase}`");

        $pdo->exec($sql);

        $config = @file_get_contents($dbConfigFile);
        $callback = function ($matches) use ($mysqlHostname, $mysqlHostport, $mysqlUsername, $mysqlPassword, $mysqlDatabase, $mysqlPrefix) {
            $field = ucfirst($matches[1]);
            $replace = ${"mysql{$field}"};
            if ($matches[1] == 'hostport' && $mysqlHostport == 3306) {
                $replace = '';
            }
            return "'{$matches[1]}'{$matches[2]}=>{$matches[3]}Env::get('database.{$matches[1]}', '{$replace}'),";
        };
        $config = preg_replace_callback("/'(hostname|database|username|password|hostport|prefix)'(\s+)=>(\s+)Env::get\((.*)\)\,/", $callback, $config);

        //检测能否成功写入数据库配置
        $result = @file_put_contents($dbConfigFile, $config);
        if (!$result) {
            throw new Exception("无法写入数据库信息到application/database.php文件，请检查是否有写权限");
        }

        //检测能否成功写入lock文件
        $result = @file_put_contents($lockFile, 1);
        if (!$result) {
            throw new Exception("无法写入安装锁定到application/admin/command/Install/install.lock文件，请检查是否有写权限");
        }

        $newSalt = substr(md5(uniqid(true)), 0, 6);
        $newPassword = md5(md5($adminPassword) . $newSalt);
        $pdo->query("UPDATE {$mysqlPrefix}admin SET username = '{$adminUsername}', email = '{$adminEmail}',password = '{$newPassword}', salt = '{$newSalt}' WHERE username = 'admin'");

        $adminName = '';
        if (is_file($adminFile)) {
            $x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $adminName = substr(str_shuffle(str_repeat($x, ceil(10 / strlen($x)))), 1, 10) . '.php';
            rename($adminFile, ROOT_PATH . 'public' . DS . $adminName);
        }
        echo "success|{$adminName}";
    } catch (PDOException $e) {
        $err = $e->getMessage();
    } catch (Exception $e) {
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
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body, input, button {
            font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, 'Microsoft Yahei', Arial, sans-serif;
            font-size: 14px;
            color: #7E96B3;
        }

        .container {
            max-width: 480px;
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
            margin-top: 0;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 28px;
            font-weight: normal;
            color: #3C5675;
            margin-bottom: 0;
            margin-top: 0;
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

        button, .btn {
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

        .form-buttons {
            height: 52px;
            line-height: 52px;
        }

        .form-buttons .btn {
            margin-right: 5px;
        }

        #error, .error, #success, .success, #warmtips, .warmtips {
            background: #D83E3E;
            color: #fff;
            padding: 15px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        #success {
            background: #3C5675;
        }

        #error a, .error a {
            color: white;
            text-decoration: underline;
        }

        #warmtips {
            background: #ffcdcd;
            font-size: 14px;
            color: #e74c3c;
        }

        #warmtips a {
            background: #ffffff7a;
            display: block;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            color: #e21a1a;
            border-radius: 3px;
        }
    </style>
</head>

<body>
<div class="container">
    <h1>
        <svg width="80px" height="96px" viewBox="0 0 768 830" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M64.433651,605.899968 C20.067302,536.265612 0,469.698785 0,389.731348 C0,174.488668 171.922656,0 384,0 C596.077344,0 768,174.488668 768,389.731348 C768,469.698785 747.932698,536.265612 703.566349,605.899968 C614.4,753.480595 441.6,870.4 384,870.4 C326.4,870.4 153.6,753.480595 64.433651,605.899968 L64.433651,605.899968 Z"
                      id="body" fill="#18BC9C"></path>
                <path d="M429.648991,190.816 L430.160991,190.816 L429.648991,190.816 L429.648991,190.816 Z M429.648991,156 L427.088991,156 C419.408991,157.024 411.728991,160.608 404.560991,168.8 L403.024991,170.848 L206.928991,429.92 C198.736991,441.184 197.712991,453.984 204.368991,466.784 C210.512991,478.048 222.288991,485.728 235.600991,485.728 L336.464991,486.24 L304.208991,673.632 C301.648991,689.504 310.352991,705.376 325.200991,712.032 C329.808991,714.08 334.416991,714.592 339.536991,714.592 C349.776991,714.592 358.992991,709.472 366.160991,700.256 L561.744991,419.168 C569.936991,407.904 570.960991,395.104 564.304991,382.304 C557.648991,369.504 547.408991,363.36 533.072991,363.36 L432.208991,363.36 L463.952991,199.008 C464.464991,196.448 464.976991,193.376 464.976991,190.816 C464.976991,171.872 449.104991,156 431.184991,156 L429.648991,156 L429.648991,156 Z"
                      id="flash" fill="#FFFFFF"></path>
            </g>
        </svg>
    </h1>
    <h2>安装 <?php echo $sitename; ?></h2>
    <div>

        <p>若你在安装中遇到麻烦可点击 <a href="<?php echo $link['doc']; ?>" target="_blank">安装文档</a> <a
                    href="<?php echo $link['forum']; ?>" target="_blank">问答社区</a> <a
                    href="<?php echo $link['qqun']; ?>">QQ交流群</a></p>
        <!--<p><?php echo $sitename; ?>还支持在命令行php think install一键安装</p>-->

        <form method="post">
            <?php if ($errInfo): ?>
                <div class="error">
                    <?php echo $errInfo; ?>
                </div>
            <?php endif; ?>
            <div id="error" style="display:none"></div>
            <div id="success" style="display:none"></div>
            <div id="warmtips" style="display:none"></div>

            <div class="form-group">
                <div class="form-field">
                    <label>MySQL 数据库地址</label>
                    <input type="text" name="mysqlHost" value="127.0.0.1" required="">
                </div>

                <div class="form-field">
                    <label>MySQL 数据库名</label>
                    <input type="text" name="mysqlDatabase" value="fastadmin" required="">
                </div>

                <div class="form-field">
                    <label>MySQL 用户名</label>
                    <input type="text" name="mysqlUsername" value="root" required="">
                </div>

                <div class="form-field">
                    <label>MySQL 密码</label>
                    <input type="password" name="mysqlPassword">
                </div>

                <div class="form-field">
                    <label>MySQL 数据表前缀</label>
                    <input type="text" name="mysqlPrefix" value="fa_">
                </div>

                <div class="form-field">
                    <label>MySQL 端口号</label>
                    <input type="number" name="mysqlHostport" value="3306">
                </div>
            </div>

            <div class="form-group">
                <div class="form-field">
                    <label>管理者用户名</label>
                    <input name="adminUsername" value="admin" required=""/>
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

        <!-- jQuery -->
        <script src="https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js"></script>

        <script>
            $(function () {
                $('form :input:first').select();

                $('form').on('submit', function (e) {
                    e.preventDefault();
                    var form = this;
                    var $button = $(this).find('button')
                        .text('安装中...')
                        .prop('disabled', true);

                    $.post('', $(this).serialize())
                        .done(function (ret) {
                            if (ret.substr(0, 7) === 'success') {
                                var retArr = ret.split(/\|/);
                                $('#error').hide();
                                $(".form-group", form).remove();
                                $button.remove();
                                $("#success").text("安装成功！开始你的<?php echo $sitename; ?>之旅吧！").show();

                                $buttons = $(".form-buttons", form);
                                $('<a class="btn" href="./">访问首页</a>').appendTo($buttons);

                                if (typeof retArr[1] !== 'undefined' && retArr[1] !== '') {
                                    var url = location.href.replace(/install\.php/, retArr[1]);
                                    $("#warmtips").html('温馨提示：请将以下后台登录入口添加到你的收藏夹，为了你的安全，不要泄漏或发送给他人！如有泄漏请及时修改！<a href="' + url + '">' + url + '</a>').show();
                                    $('<a class="btn" href="' + url + '" id="btn-admin" style="background:#18bc9c">访问后台</a>').appendTo($buttons);
                                }
                                localStorage.setItem("fastep", "installed");
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