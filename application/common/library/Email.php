<?php

namespace app\common\library;

use think\Config;

class Email
{

    /**
     * 单例对象
     */
    protected static $instance;

    /**
     * phpmailer对象
     */
    protected $mail = [];

    /**
     * 错误内容
     */
    protected $_error = '';

    /**
     * 默认配置
     */
    public $options = [
        'charset' => 'utf-8', //编码格式
        'debug'   => 0, //调式模式
    ];

    /**
     * 初始化
     * @access public
     * @param array $options 参数
     * @return Email
     */
    public static function instance($options = [])
    {
        if (is_null(self::$instance))
        {
            self::$instance = new static($options);
        }

        return self::$instance;
    }

    /**
     * 构造函数
     * @param array $options
     */
    public function __construct($options = [])
    {
        if ($config = Config::get('site'))
        {
            $this->options = array_merge($this->options, $config);
        }
        $this->options = array_merge($this->options, $options);
        vendor('phpmailer.phpmailer.PHPMailerAutoload');
        $securArr = [1 => 'tls', 2 => 'ssl'];

        $this->mail = new \PHPMailer(true);
        $this->mail->CharSet = $this->options['charset'];
        $this->mail->SMTPDebug = $this->options['debug'];
        $this->mail->isSMTP();
        $this->mail->SMTPAuth = true;
        $this->mail->Host = $this->options['mail_smtp_host'];
        $this->mail->Username = $this->options['mail_smtp_user'];
        $this->mail->Password = $this->options['mail_smtp_pass'];
        $this->mail->SMTPSecure = isset($securArr[$this->options['mail_verify_type']]) ? $securArr[$this->options['mail_verify_type']] : '';
        $this->mail->Port = $this->options['mail_smtp_port'];

        //设置发件人
        $this->from($this->options['mail_from']);
    }

    /**
     * 设置邮件主题
     * @param string $subject
     * @return $this
     */
    public function subject($subject)
    {
        $this->options['subject'] = $subject;
        return $this;
    }

    /**
     * 设置发件人
     * @param string $email
     * @param string $name
     * @return $this
     */
    public function from($email, $name = '')
    {
        $this->options['from'] = $email;
        $this->options['from_name'] = $name;
        return $this;
    }

    /**
     * 设置收件人
     * @param string $email
     * @param string $name
     * @return $this
     */
    public function to($email, $name = '')
    {
        $this->options['to'] = $email;
        $this->options['to_name'] = $name;
        return $this;
    }

    /**
     * 设置邮件正文
     * @param string $body
     * @param boolean $ishtml
     * @return $this
     */
    public function message($body, $ishtml = true)
    {
        $this->options['body'] = $body;
        $this->options['ishtml'] = $ishtml;
        return $this;
    }

    /**
     * 获取最后产生的错误
     * @return string
     */
    public function getError()
    {
        return $this->_error;
    }

    /**
     * 设置错误
     * @param string $error 信息信息
     */
    protected function setError($error)
    {
        $this->_error = $error;
    }

    /**
     * 发送邮件
     * @return boolean
     */
    public function send()
    {
        $result = false;
        switch ($this->options['mail_type'])
        {
            case 1:
                //使用phpmailer发送
                $this->mail->setFrom($this->options['from'], $this->options['from_name']);
                $this->mail->addAddress($this->options['to'], $this->options['to_name']);
                $this->mail->Subject = $this->options['subject'];
                if ($this->options['ishtml'])
                {
                    $this->mail->msgHTML($this->options['body']);
                }
                else
                {
                    $this->mail->Body = $this->options['body'];
                }
                try
                {
                    $result = $this->mail->send();
                }
                catch (\phpmailerException $e)
                {
                    $this->setError($e->getMessage());
                }

                $this->setError($result ? '' : $this->mail->ErrorInfo);
                break;
            case 2:
                //使用mail方法发送邮件
                $headers = 'MIME-Version: 1.0' . "\r\n";
                $headers .= "Content-type: text/html; charset=" . $this->options['charset'] . "\r\n";
                $headers .= "To: {$this->options['to_name']} <{$this->options['to']}>\r\n"; //收件人
                $headers .= "From: {$this->options['from_name']} <{$this->options['from']}>\r\n"; //发件人
                $result = mail($this->options['to'], $this->options['subject'], $this->options['body'], $headers);
                $this->setError($result ? '' : error_get_last()['message']);
                break;
            default:
                //邮件功能已关闭
                $this->setError(__('Mail already closed'));
                break;
        }
        return $result;
    }

}
