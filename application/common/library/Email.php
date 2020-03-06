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
        'debug'   => false, //调式模式
    ];

    /**
     * 初始化
     * @access public
     * @param array $options 参数
     * @return Email
     */
    public static function instance($options = [])
    {
        if (is_null(self::$instance)) {
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
        if ($config = Config::get('site')) {
            $this->options = array_merge($this->options, $config);
        }
        $this->options = array_merge($this->options, $options);
        $securArr = [1 => 'tls', 2 => 'ssl'];

        $this->mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $this->mail->CharSet = $this->options['charset'];
        if ($this->options['mail_type'] == 1) {
            $this->mail->SMTPDebug = $this->options['debug'];
            $this->mail->isSMTP();
            $this->mail->SMTPAuth = true;
        } else {
            $this->mail->isMail();
        }
        $this->mail->Host = $this->options['mail_smtp_host'];
        $this->mail->Username = $this->options['mail_from'];
        $this->mail->Password = $this->options['mail_smtp_pass'];
        $this->mail->SMTPSecure = isset($securArr[$this->options['mail_verify_type']]) ? $securArr[$this->options['mail_verify_type']] : '';
        $this->mail->Port = $this->options['mail_smtp_port'];

        //设置发件人
        $this->from($this->options['mail_from'], $this->options['mail_smtp_user']);
    }

    /**
     * 设置邮件主题
     * @param string $subject 邮件主题
     * @return $this
     */
    public function subject($subject)
    {
        $this->mail->Subject = $subject;
        return $this;
    }

    /**
     * 设置发件人
     * @param string $email 发件人邮箱
     * @param string $name  发件人名称
     * @return $this
     */
    public function from($email, $name = '')
    {
        $this->mail->setFrom($email, $name);
        return $this;
    }

    /**
     * 设置收件人
     * @param mixed  $email 收件人,多个收件人以,进行分隔
     * @param string $name  收件人名称
     * @return $this
     */
    public function to($email, $name = '')
    {
        $emailArr = $this->buildAddress($email);
        foreach ($emailArr as $address => $name) {
            $this->mail->addAddress($address, $name);
        }

        return $this;
    }

    /**
     * 设置抄送
     * @param mixed  $email 收件人,多个收件人以,进行分隔
     * @param string $name  收件人名称
     * @return Email
     */
    public function cc($email, $name = '')
    {
        $emailArr = $this->buildAddress($email);
        foreach ($emailArr as $address => $name) {
            $this->mail->addCC($address, $name);
        }
        return $this;
    }

    /**
     * 设置密送
     * @param mixed  $email 收件人,多个收件人以,进行分隔
     * @param string $name  收件人名称
     * @return Email
     */
    public function bcc($email, $name = '')
    {
        $emailArr = $this->buildAddress($email);
        foreach ($emailArr as $address => $name) {
            $this->mail->addBCC($address, $name);
        }
        return $this;
    }

    /**
     * 设置邮件正文
     * @param string  $body   邮件下方
     * @param boolean $ishtml 是否HTML格式
     * @return $this
     */
    public function message($body, $ishtml = true)
    {
        if ($ishtml) {
            $this->mail->msgHTML($body);
        } else {
            $this->mail->Body = $body;
        }
        return $this;
    }

    /**
     * 添加附件
     * @param string $path 附件路径
     * @param string $name 附件名称
     * @return Email
     */
    public function attachment($path, $name = '')
    {
        $this->mail->addAttachment($path, $name);
        return $this;
    }

    /**
     * 构建Email地址
     * @param mixed $emails Email数据
     * @return array
     */
    protected function buildAddress($emails)
    {
        $emails = is_array($emails) ? $emails : explode(',', str_replace(";", ",", $emails));
        $result = [];
        foreach ($emails as $key => $value) {
            $email = is_numeric($key) ? $value : $key;
            $result[$email] = is_numeric($key) ? "" : $value;
        }
        return $result;
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
        if (in_array($this->options['mail_type'], [1, 2])) {
            try {
                $result = $this->mail->send();
            } catch (\PHPMailer\PHPMailer\Exception $e) {
                $this->setError($e->getMessage());
            }

            $this->setError($result ? '' : $this->mail->ErrorInfo);
        } else {
            //邮件功能已关闭
            $this->setError(__('Mail already closed'));
        }
        return $result;
    }

}
