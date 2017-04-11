<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: tag.php 1059 2011-03-01 07:25:09Z monkey $
 */
!defined('IN_UC') && exit('Access Denied');

class tagmodel
{

    var $db;
    var $base;

    function __construct(&$base)
    {
        $this->tagmodel($base);
    }

    function tagmodel(&$base)
    {
        $this->base = $base;
        $this->db = $base->db;
    }

    function get_tag_by_name($tagname)
    {
        $arr = $this->db->fetch_all("SELECT * FROM " . UC_DBTABLEPRE . "tags WHERE tagname='$tagname'");
        return $arr;
    }

    function get_template($appid)
    {
        $result = $this->db->result_first("SELECT tagtemplates FROM " . UC_DBTABLEPRE . "applications WHERE appid='$appid'");
        return $result;
    }

    function updatedata($appid, $data)
    {
        $appid = intval($appid);
        include_once UC_ROOT . 'lib/xml.class.php';
        $data = @xml_unserialize($data);
        $this->base->load('app');
        $data[0] = addslashes($data[0]);
        $datanew = array();
        if (is_array($data[1]))
        {
            foreach ($data[1] as $r)
            {
                $datanew[] = $_ENV['misc']->array2string($r);
            }
        }
        $tmp = $_ENV['app']->get_apps('type', "appid='$appid'");
        $datanew = addslashes($tmp[0]['type'] . "\t" . implode("\t", $datanew));
        if (!empty($data[0]))
        {
            $return = $this->db->result_first("SELECT count(*) FROM " . UC_DBTABLEPRE . "tags WHERE tagname='$data[0]' AND appid='$appid'");
            if ($return)
            {
                $this->db->query("UPDATE " . UC_DBTABLEPRE . "tags SET data='$datanew', expiration='" . $this->base->time . "' WHERE tagname='$data[0]' AND appid='$appid'");
            }
            else
            {
                $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "tags (tagname, appid, data, expiration) VALUES ('$data[0]', '$appid', '$datanew', '" . $this->base->time . "')");
            }
        }
    }

    function formatcache($appid, $tagname)
    {
        $return = $this->db->result_first("SELECT count(*) FROM " . UC_DBTABLEPRE . "tags WHERE tagname='$tagname' AND appid='$appid'");
        if ($return)
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "tags SET expiration='0' WHERE tagname='$tagname' AND appid='$appid'");
        }
        else
        {
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "tags (tagname, appid, expiration) VALUES ('$tagname', '$appid', '0')");
        }
    }

}
