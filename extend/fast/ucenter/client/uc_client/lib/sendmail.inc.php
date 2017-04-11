<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: sendmail.inc.php 1124 2011-12-06 11:03:23Z svn_project_zhangjie $
 */
!defined('IN_UC') && exit('Access Denied');

if ($mail_setting['mailsilent'])
{
    error_reporting(0);
}

$maildelimiter = $mail_setting['maildelimiter'] == 1 ? "\r\n" : ($mail_setting['maildelimiter'] == 2 ? "\r" : "\n");
$mailusername = isset($mail_setting['mailusername']) ? $mail_setting['mailusername'] : 1;
$appname = $this->base->cache['apps'][$mail['appid']]['name'];
$mail['subject'] = '=?' . $mail['charset'] . '?B?' . base64_encode(str_replace("\r", '', str_replace("\n", '', '[' . $appname . '] ' . $mail['subject']))) . '?=';
$mail['message'] = chunk_split(base64_encode(str_replace("\r\n.", " \r\n..", str_replace("\n", "\r\n", str_replace("\r", "\n", str_replace("\r\n", "\n", str_replace("\n\r", "\r", $mail['message'])))))));

$email_from = $mail['frommail'] == '' ? '=?' . $mail['charset'] . '?B?' . base64_encode($appname) . "?= <$mail_setting[maildefault]>" : (preg_match('/^(.+?) \<(.+?)\>$/', $email_from, $from) ? '=?' . $mail['charset'] . '?B?' . base64_encode($from[1]) . "?= <$from[2]>" : $mail['frommail']);

foreach (explode(',', $mail['email_to']) as $touser)
{
    $tousers[] = preg_match('/^(.+?) \<(.+?)\>$/', $touser, $to) ? ($mailusername ? '=?' . $mail['charset'] . '?B?' . base64_encode($to[1]) . "?= <$to[2]>" : $to[2]) : $touser;
}

$mail['email_to'] = implode(',', $tousers);

$headers = "From: $email_from{$maildelimiter}X-Priority: 3{$maildelimiter}X-Mailer: Discuz! $version{$maildelimiter}MIME-Version: 1.0{$maildelimiter}Content-type: text/" . ($mail['htmlon'] ? 'html' : 'plain') . "; charset=$mail[charset]{$maildelimiter}Content-Transfer-Encoding: base64{$maildelimiter}";

$mail_setting['mailport'] = $mail_setting['mailport'] ? $mail_setting['mailport'] : 25;

if ($mail_setting['mailsend'] == 1 && function_exists('mail'))
{

    return @mail($mail['email_to'], $mail['subject'], $mail['message'], $headers);
}
elseif ($mail_setting['mailsend'] == 2)
{

    if (!$fp = fsocketopen($mail_setting['mailserver'], $mail_setting['mailport'], $errno, $errstr, 30))
    {
        return false;
    }

    stream_set_blocking($fp, true);

    $lastmessage = fgets($fp, 512);
    if (substr($lastmessage, 0, 3) != '220')
    {
        return false;
    }

    fputs($fp, ($mail_setting['mailauth'] ? 'EHLO' : 'HELO') . " discuz\r\n");
    $lastmessage = fgets($fp, 512);
    if (substr($lastmessage, 0, 3) != 220 && substr($lastmessage, 0, 3) != 250)
    {
        return false;
    }

    while (1)
    {
        if (substr($lastmessage, 3, 1) != '-' || empty($lastmessage))
        {
            break;
        }
        $lastmessage = fgets($fp, 512);
    }

    if ($mail_setting['mailauth'])
    {
        fputs($fp, "AUTH LOGIN\r\n");
        $lastmessage = fgets($fp, 512);
        if (substr($lastmessage, 0, 3) != 334)
        {
            return false;
        }

        fputs($fp, base64_encode($mail_setting['mailauth_username']) . "\r\n");
        $lastmessage = fgets($fp, 512);
        if (substr($lastmessage, 0, 3) != 334)
        {
            return false;
        }

        fputs($fp, base64_encode($mail_setting['mailauth_password']) . "\r\n");
        $lastmessage = fgets($fp, 512);
        if (substr($lastmessage, 0, 3) != 235)
        {
            return false;
        }

        $email_from = $mail_setting['mailfrom'];
    }

    fputs($fp, "MAIL FROM: <" . preg_replace("/.*\<(.+?)\>.*/", "\\1", $email_from) . ">\r\n");
    $lastmessage = fgets($fp, 512);
    if (substr($lastmessage, 0, 3) != 250)
    {
        fputs($fp, "MAIL FROM: <" . preg_replace("/.*\<(.+?)\>.*/", "\\1", $email_from) . ">\r\n");
        $lastmessage = fgets($fp, 512);
        if (substr($lastmessage, 0, 3) != 250)
        {
            return false;
        }
    }

    $email_tos = array();
    foreach (explode(',', $mail['email_to']) as $touser)
    {
        $touser = trim($touser);
        if ($touser)
        {
            fputs($fp, "RCPT TO: <" . preg_replace("/.*\<(.+?)\>.*/", "\\1", $touser) . ">\r\n");
            $lastmessage = fgets($fp, 512);
            if (substr($lastmessage, 0, 3) != 250)
            {
                fputs($fp, "RCPT TO: <" . preg_replace("/.*\<(.+?)\>.*/", "\\1", $touser) . ">\r\n");
                $lastmessage = fgets($fp, 512);
                return false;
            }
        }
    }

    fputs($fp, "DATA\r\n");
    $lastmessage = fgets($fp, 512);
    if (substr($lastmessage, 0, 3) != 354)
    {
        return false;
    }

    $headers .= 'Message-ID: <' . gmdate('YmdHs') . '.' . substr(md5($mail['message'] . microtime()), 0, 6) . rand(100000, 999999) . '@' . $_SERVER['HTTP_HOST'] . ">{$maildelimiter}";

    fputs($fp, "Date: " . gmdate('r') . "\r\n");
    fputs($fp, "To: " . $mail['email_to'] . "\r\n");
    fputs($fp, "Subject: " . $mail['subject'] . "\r\n");
    fputs($fp, $headers . "\r\n");
    fputs($fp, "\r\n\r\n");
    fputs($fp, "$mail[message]\r\n.\r\n");
    $lastmessage = fgets($fp, 512);
    if (substr($lastmessage, 0, 3) != 250)
    {
        return false;
    }

    fputs($fp, "QUIT\r\n");
    return true;
}
elseif ($mail_setting['mailsend'] == 3)
{

    ini_set('SMTP', $mail_setting['mailserver']);
    ini_set('smtp_port', $mail_setting['mailport']);
    ini_set('sendmail_from', $email_from);

    return @mail($mail['email_to'], $mail['subject'], $mail['message'], $headers);
}