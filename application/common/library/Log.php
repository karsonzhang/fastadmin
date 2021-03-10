<?php

namespace app\common\library;

use Psr\Log\AbstractLogger;
use think\Hook;

/**
 * 日志记录类
 */
class Log extends AbstractLogger
{

    /**
     * Logs with an arbitrary level.
     *
     * @param mixed   $level
     * @param string  $message
     * @param mixed[] $context
     *
     * @return void
     *
     * @throws \Psr\Log\InvalidArgumentException
     */
    public function log($level, $message, array $context = array())
    {
        \think\Log::write($message);
    }
}
