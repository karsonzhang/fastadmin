<?php
$cdnurl = function_exists('config') ? config('view_replace_str.__CDN__') : '';
$publicurl = function_exists('config') ? (config('view_replace_str.__PUBLIC__')?:'/') : '/';
$debug = function_exists('config') ? config('app_debug') : false;

$lang = [
    'An error occurred' => '发生错误',
    'Home' => '返回主页',
    'Previous Page' => '返回上一页',
    'The page you are looking for is temporarily unavailable' => '你所浏览的页面暂时无法访问',
    'You can return to the previous page and try again' => '你可以返回上一页重试'
];

$langSet = '';

if (isset($_GET['lang'])) {
    $langSet = strtolower($_GET['lang']);
} elseif (isset($_COOKIE['think_var'])) {
    $langSet = strtolower($_COOKIE['think_var']);
} elseif (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
preg_match('/^([a-z\d\-]+)/i', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $matches);
    $langSet     = strtolower($matches[1] ?? '');
}
$langSet = $langSet && in_array($langSet, ['zh-cn', 'en']) ? $langSet : 'zh-cn';
$langSet == 'en' && $lang = array_combine(array_keys($lang), array_keys($lang));

?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title><?=$lang['An error occurred']?></title>
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="<?php echo $cdnurl;?>/assets/img/favicon.ico" />
    <style>
        * {-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}
        html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,caption,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent;}
        article,aside,details,figcaption,figure,footer,header,hgroup,nav,section {display:block;}
        html {font-size:16px;line-height:24px;width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;overflow-y:scroll;overflow-x:hidden;}
        img {vertical-align:middle;max-width:100%;height:auto;border:0;-ms-interpolation-mode:bicubic;}
        body {min-height:100%;background:#f4f6f8;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",微软雅黑,Arial,sans-serif;}
        .clearfix {clear:both;zoom:1;}
        .clearfix:before,.clearfix:after {content:"\0020";display:block;height:0;visibility:hidden;}
        .clearfix:after {clear:both;}
        body.error-page-wrapper,.error-page-wrapper.preview {background-position:center center;background-repeat:no-repeat;background-size:cover;position:relative;}
        .error-page-wrapper .content-container {border-radius:2px;text-align:center;box-shadow:0 0 30px rgba(99,99,99,0.06);padding:50px;background-color:#fff;width:100%;max-width:560px;position:absolute;left:50%;top:50%;margin-top:-220px;margin-left:-280px;}
        .error-page-wrapper .content-container.in {left:0px;opacity:1;}
        .error-page-wrapper .head-line {transition:color .2s linear;font-size:40px;line-height:60px;letter-spacing:-1px;margin-bottom:20px;color:#777;}
        .error-page-wrapper .subheader {transition:color .2s linear;font-size:32px;line-height:46px;color:#494949;}
        .error-page-wrapper .hr {height:1px;background-color:#eee;width:80%;max-width:350px;margin:25px auto;}
        .error-page-wrapper .context {transition:color .2s linear;font-size:16px;line-height:27px;color:#aaa;}
        .error-page-wrapper .context p {margin:0;}
        .error-page-wrapper .context p:nth-child(n+2) {margin-top:16px;}
        .error-page-wrapper .buttons-container {margin-top:35px;overflow:hidden;}
        .error-page-wrapper .buttons-container a {transition:text-indent .2s ease-out,color .2s linear,background-color .2s linear;text-indent:0px;font-size:14px;text-transform:uppercase;text-decoration:none;color:#fff;background-color:#2ecc71;border-radius:99px;padding:8px 0 8px;text-align:center;display:inline-block;overflow:hidden;position:relative;width:45%;}
        .error-page-wrapper .buttons-container a:hover {text-indent:15px;}
        .error-page-wrapper .buttons-container a:nth-child(1) {float:left;}
        .error-page-wrapper .buttons-container a:nth-child(2) {float:right;}
        @media screen and (max-width:580px) {
            .error-page-wrapper {padding:30px 5%;}
            .error-page-wrapper .content-container {padding:37px;position:static;left:0;margin-top:0;margin-left:0;}
            .error-page-wrapper .head-line {font-size:36px;}
            .error-page-wrapper .subheader {font-size:27px;line-height:37px;}
            .error-page-wrapper .hr {margin:30px auto;width:215px;}
        }
        @media screen and (max-width:450px) {
            .error-page-wrapper {padding:30px;}
            .error-page-wrapper .head-line {font-size:32px;}
            .error-page-wrapper .hr {margin:25px auto;width:180px;}
            .error-page-wrapper .context {font-size:15px;line-height:22px;}
            .error-page-wrapper .context p:nth-child(n+2) {margin-top:10px;}
            .error-page-wrapper .buttons-container {margin-top:29px;}
            .error-page-wrapper .buttons-container a {float:none !important;width:65%;margin:0 auto;font-size:13px;padding:9px 0;}
            .error-page-wrapper .buttons-container a:nth-child(2) {margin-top:12px;}
        }
    </style>
</head>
<body class="error-page-wrapper">
<div class="content-container">
    <div class="head-line">
        <img src="<?=$cdnurl?>/assets/img/error.svg" alt="" width="120"/>
    </div>
    <div class="subheader">
        <?=$debug?$message:$lang['The page you are looking for is temporarily unavailable']?>
    </div>
    <div class="hr"></div>
    <div class="context">

        <p>
            <?=$lang['You can return to the previous page and try again']?>
        </p>

    </div>
    <div class="buttons-container">
        <a href="<?=$publicurl?>"><?=$lang['Home']?></a>
        <a href="javascript:" onclick="history.go(-1)"><?=$lang['Previous Page']?></a>
    </div>
</div>
</body>
</html>
