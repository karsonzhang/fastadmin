<?php

namespace app\common\library;

use think\Config;

class Email
{
    /**
     * 发送邮件
     * @param string $mTo 收件人
     * @param string $subject 邮件主题
     * @param string $content 邮件内容(html)
     * @param string $fromNic 发件人昵称
     * @param string $toNic 收件人昵称
     */
    public function sendMail($mTo='',$subject='',$content='',$fromNic='',$toNic='')
    {
        $site = Config::get("site");
        $re = Vendor('phpmailer.phpmailer.PHPMailerAutoload');

        $mail = new \PHPMailer ();

        //$mail->SMTPDebug = 3;                               // Enable verbose debug output
        $mail->isSMTP();                                      //smtp需要鉴权 这个必须是true
        $mail->Host = $site['mail_smtp_host'];                //SMTP服务器地址
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = $site['mail_smtp_user'];            // SMTP 用戶名
        $mail->Password = $site['mail_smtp_pass'];            // SMTP 密碼
        switch ($site['mail_verify_type'])                    // Enable TLS encryption, `ssl` also accepted
        {
        case 1:
          $mail->SMTPSecure = 'tls';
          break;
        case 2:
          $mail->SMTPSecure = 'ssl';
          break;
        default:
          $mail->SMTPSecure = '';
        }
        $mail->Port = $site['mail_smtp_port'];                                      // 设置ssl连接smtp服务器的远程服务器端口号
        $mail->setFrom($site['mail_from'], $fromNic);                               // [发件人],[昵称(可选)]
        $mail->addAddress($mTo, $toNic);                                            // [收件人],[昵称(可选)]
        //$mail->addReplyTo('xxxxxx@qq.com', 'Information');                        // 回复地址(可选)
        //$mail->addCC('xxxxxx@qq.com');                                            //好像是密送
        //$mail->addBCC('xxxxxx@qq.com');                                           //好像是密送B
        // $mail->addAttachment('/var/tmp/file.tar.gz');                            // 添加附件
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');                       // 附件名选项
        $mail->isHTML(true);                                                        //邮件正文是否为html编码
        $mail->Subject = $subject;                                                  //添加邮件主题
        $mail->Body    = $content;                                                  //邮件正文
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';//附加信息，可以省略

        switch ($site['mail_type'])
        {
        case 1:
            if(!$mail->send()) {//这里如果提交错误的smpt配置PHPmailer会卡住暂时不清楚为什么
                $sendResult['text'] = $mail->ErrorInfo;
                $sendResult['data'] = false;
                return $sendResult;
            } else {
                $sendResult['text'] ='smtp发送成功';
                $sendResult['data'] = true;
                return $sendResult;
            }
            break;
        case 2://使用mail方法发送邮件
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $headers .= 'To: '.$toNic.' <'.$mTo.'>' . "\r\n";//收件人
            $headers .= 'From: '.$fromNic.' <'.$site['mail_from'].'>' . "\r\n";//发件人
            $sendResult['data'] = mail($mTo, $subject, $content, $headers);
            if ($sendResult['data']) {
                $sendResult['text'] ='mail函数发送成功';
            }else{
                $sendResult['text'] ='mail函数发送失败';
            }
            return $sendResult;
            break;
        default:
            $sendResult['data'] = false;
            $sendResult['text'] ='已关闭邮件发送';
            return $sendResult;
        }
    }
}
