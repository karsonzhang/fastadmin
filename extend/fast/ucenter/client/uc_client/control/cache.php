<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: cache.php 1059 2011-03-01 07:25:09Z monkey $
 */
!defined('IN_UC') && exit('Access Denied');

class cachecontrol extends base
{

    function __construct()
    {
        $this->cachecontrol();
    }

    function cachecontrol()
    {
        parent::__construct();
    }

    function onupdate($arr)
    {
        $this->load("cache");
        $_ENV['cache']->updatedata();
    }

}
