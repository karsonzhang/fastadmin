<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: uccode.class.php 1166 2014-11-03 01:49:32Z hypowang $
 */

class uccode
{

    var $uccodes;

    function __construct()
    {
        $this->uccode();
    }

    function uccode()
    {
        $this->uccode = array(
            'pcodecount' => -1,
            'codecount'  => 0,
            'codehtml'   => ''
        );
    }

    function codedisp($code)
    {
        $this->uccode['pcodecount'] ++;
        $code = str_replace('\\"', '"', preg_replace("/^[\n\r]*(.+?)[\n\r]*$/is", "\\1", $code));
        $this->uccode['codehtml'][$this->uccode['pcodecount']] = $this->tpl_codedisp($code);
        $this->uccode['codecount'] ++;
        return "[\tUCENTER_CODE_" . $this->uccode[pcodecount] . "\t]";
    }

    function complie($message)
    {
        $message = dhtmlspecialchars($message);
        if (strpos($message, '[/code]') !== FALSE)
        {
            $message = preg_replace("/\s*\[code\](.+?)\[\/code\]\s*/ies", "\$this->codedisp('\\1')", $message);
        }
        if (strpos($message, '[/url]') !== FALSE)
        {
            $message = preg_replace("/\[url(=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|synacast){1}:\/\/|www\.)([^\[\"']+?))?\](.+?)\[\/url\]/ies", "\$this->parseurl('\\1', '\\5')", $message);
        }
        if (strpos($message, '[/email]') !== FALSE)
        {
            $message = preg_replace("/\[email(=([a-z0-9\-_.+]+)@([a-z0-9\-_]+[.][a-z0-9\-_.]+))?\](.+?)\[\/email\]/ies", "\$this->parseemail('\\1', '\\4')", $message);
        }
        $message = str_replace(array(
            '[/color]', '[/size]', '[/font]', '[/align]', '[b]', '[/b]',
            '[i]', '[/i]', '[u]', '[/u]', '[list]', '[list=1]', '[list=a]',
            '[list=A]', '[*]', '[/list]', '[indent]', '[/indent]', '[/float]'
                ), array(
            '</font>', '</font>', '</font>', '</p>', '<strong>', '</strong>', '<i>',
            '</i>', '<u>', '</u>', '<ul>', '<ul type="1">', '<ul type="a">',
            '<ul type="A">', '<li>', '</ul>', '<blockquote>', '</blockquote>', '</span>'
                ), preg_replace(array(
            "/\[color=([#\w]+?)\]/i",
            "/\[size=(\d+?)\]/i",
            "/\[size=(\d+(\.\d+)?(px|pt|in|cm|mm|pc|em|ex|%)+?)\]/i",
            "/\[font=([^\[\<]+?)\]/i",
            "/\[align=(left|center|right)\]/i",
            "/\[float=(left|right)\]/i"
                        ), array(
            "<font color=\"\\1\">",
            "<font size=\"\\1\">",
            "<font style=\"font-size: \\1\">",
            "<font face=\"\\1 \">",
            "<p align=\"\\1\">",
            "<span style=\"float: \\1;\">"
                        ), $message));
        if (strpos($message, '[/quote]') !== FALSE)
        {
            $message = preg_replace("/\s*\[quote\][\n\r]*(.+?)[\n\r]*\[\/quote\]\s*/is", $this->tpl_quote(), $message);
        }
        if (strpos($message, '[/img]') !== FALSE)
        {
            $message = preg_replace(array(
                "/\[img\]\s*([^\[\<\r\n]+?)\s*\[\/img\]/ies",
                "/\[img=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\<\r\n]+?)\s*\[\/img\]/ies"
                    ), array(
                "\$this->bbcodeurl('\\1', '<img src=\"%s\" border=\"0\" alt=\"\" />')",
                "\$this->bbcodeurl('\\3', '<img width=\"\\1\" height=\"\\2\" src=\"%s\" border=\"0\" alt=\"\" />')"
                    ), $message);
        }
        for ($i = 0; $i <= $this->uccode['pcodecount']; $i++)
        {
            $message = str_replace("[\tUCENTER_CODE_$i\t]", $this->uccode['codehtml'][$i], $message);
        }
        return nl2br(str_replace(array("\t", '   ', '  '), array('&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;'), $message));
    }

    function parseurl($url, $text)
    {
        if (!$url && preg_match("/((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|synacast){1}:\/\/|www\.)[^\[\"']+/i", trim($text), $matches))
        {
            $url = $matches[0];
            $length = 65;
            if (strlen($url) > $length)
            {
                $text = substr($url, 0, intval($length * 0.5)) . ' ... ' . substr($url, - intval($length * 0.3));
            }
            return '<a href="' . (substr(strtolower($url), 0, 4) == 'www.' ? 'http://' . $url : $url) . '" target="_blank">' . $text . '</a>';
        }
        else
        {
            $url = substr($url, 1);
            if (substr(strtolower($url), 0, 4) == 'www.')
            {
                $url = 'http://' . $url;
            }
            return '<a href="' . $url . '" target="_blank">' . $text . '</a>';
        }
    }

    function parseemail($email, $text)
    {
        $text = str_replace('\"', '"', $text);
        if (!$email && preg_match("/\s*([a-z0-9\-_.+]+)@([a-z0-9\-_]+[.][a-z0-9\-_.]+)\s*/i", $text, $matches))
        {
            $email = trim($matches[0]);
            return '<a href="mailto:' . $email . '">' . $email . '</a>';
        }
        else
        {
            return '<a href="mailto:' . substr($email, 1) . '">' . $text . '</a>';
        }
    }

    function bbcodeurl($url, $tags)
    {
        if (!preg_match("/<.+?>/s", $url))
        {
            if (!in_array(strtolower(substr($url, 0, 6)), array('http:/', 'https:', 'ftp://', 'rtsp:/', 'mms://')))
            {
                $url = 'http://' . $url;
            }
            return str_replace(array('submit', 'logging.php'), array('', ''), sprintf($tags, $url, addslashes($url)));
        }
        else
        {
            return '&nbsp;' . $url;
        }
    }

    function tpl_codedisp($code)
    {
        return '<div class="blockcode"><code id="code' . $this->uccodes['codecount'] . '">' . $code . '</code></div>';
    }

    function tpl_quote()
    {
        return '<div class="quote"><blockquote>\\1</blockquote></div>';
    }

}

/*

Usage:
$str = <<<EOF
1
2
3
EOF;
require_once 'lib/uccode.class.php';
$this->uccode = new uccode();
echo $this->uccode->complie($str);

*/