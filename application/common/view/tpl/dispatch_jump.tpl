{__NOLAYOUT__}<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>跳转提示</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="__CDN__/assets/img/favicon.ico" />
        <style type="text/css">
            *{box-sizing:border-box;margin:0;padding:0;font-family:Lantinghei SC,Open Sans,Arial,Hiragino Sans GB,Microsoft YaHei,"微软雅黑",STHeiti,WenQuanYi Micro Hei,SimSun,sans-serif;-webkit-font-smoothing:antialiased}
            body{padding:70px 0;background:#edf1f4;font-weight:400;font-size:1pc;-webkit-text-size-adjust:none;color:#333}
            a{outline:0;color:#3498db;text-decoration:none;cursor:pointer}
            .system-message{margin:20px 5%;padding:40px 20px;background:#fff;box-shadow:1px 1px 1px hsla(0,0%,39%,.1);text-align:center}
            .system-message h1{margin:0;margin-bottom:9pt;color:#444;font-weight:400;font-size:40px}
            .system-message .jump,.system-message .image{margin:20px 0;padding:0;padding:10px 0;font-weight:400}
            .system-message .jump{font-size:14px}
            .system-message .jump a{color:#333}
            .system-message p{font-size:9pt;line-height:20px}
            .system-message .btn{display:inline-block;margin-right:10px;width:138px;height:2pc;border:1px solid #44a0e8;border-radius:30px;color:#44a0e8;text-align:center;font-size:1pc;line-height:2pc;margin-bottom:5px;}
            .success .btn{border-color:#69bf4e;color:#69bf4e}
            .error .btn{border-color:#ff8992;color:#ff8992}
            .info .btn{border-color:#3498db;color:#3498db}
            .copyright p{width:100%;color:#919191;text-align:center;font-size:10px}
            .system-message .btn-grey{border-color:#bbb;color:#bbb}
            .clearfix:after{clear:both;display:block;visibility:hidden;height:0;content:"."}
            @media (max-width:768px){body {padding:20px 0;}}
            @media (max-width:480px){.system-message h1{font-size:30px;}}
        </style>
    </head>
    <body>
        <div class="system-message <?php echo $code == 1 ? 'success' : ($code == 0 ? 'error' : 'info');?>">
            <div class="image">
                <img src="__CDN__/assets/img/<?php echo $code == 1 ? 'success' : ($code == 0 ? 'error' : 'info');?>.svg" alt="" width="150" />
            </div>
            <h1><?php echo($msg);?></h1>
            <p class="jump">
                页面将在 <span id="wait"><?php echo($wait);?></span> 秒后自动<a id="href" href="<?php echo($url);?>">跳转</a>
            </p>
            <p class="clearfix">
                <a href="javascript:history.go(-1);" class="btn btn-grey">返回上一步</a>
                <a href="<?php echo($url);?>" class="btn btn-primary">立即跳转</a>
            </p>
        </div>
        <div class="copyright">
            <p>Powered by <a href="http://www.fastadmin.net/?ref=jump">FastAdmin</a></p>
        </div>
        <script type="text/javascript">
            (function () {
                var wait = document.getElementById('wait'),
                        href = document.getElementById('href').href;
                var interval = setInterval(function () {
                    var time = --wait.innerHTML;
                    if (time <= 0) {
                        location.href = href;
                        clearInterval(interval);
                    }
                }, 1000);
            })();
        </script>
    </body>
</html>
