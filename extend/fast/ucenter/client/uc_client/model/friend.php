<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: friend.php 1059 2011-03-01 07:25:09Z monkey $
 */
!defined('IN_UC') && exit('Access Denied');

class friendmodel
{

    var $db;
    var $base;

    function __construct(&$base)
    {
        $this->friendmodel($base);
    }

    function friendmodel(&$base)
    {
        $this->base = $base;
        $this->db = $base->db;
    }

    function add($uid, $friendid, $comment = '')
    {
        $direction = $this->db->result_first("SELECT direction FROM " . UC_DBTABLEPRE . "friends WHERE uid='$friendid' AND friendid='$uid' LIMIT 1");
        if ($direction == 1)
        {
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "friends SET uid='$uid', friendid='$friendid', comment='$comment', direction='3'", 'SILENT');
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "friends SET direction='3' WHERE uid='$friendid' AND friendid='$uid'");
            return 1;
        }
        elseif ($direction == 2)
        {
            return 1;
        }
        elseif ($direction == 3)
        {
            return -1;
        }
        else
        {
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "friends SET uid='$uid', friendid='$friendid', comment='$comment', direction='1'", 'SILENT');
            return $this->db->insert_id();
        }
    }

    function delete($uid, $friendids)
    {
        $friendids = $this->base->implode($friendids);
        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "friends WHERE uid='$uid' AND friendid IN ($friendids)");
        $affectedrows = $this->db->affected_rows();
        if ($affectedrows > 0)
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "friends SET direction=1 WHERE uid IN ($friendids) AND friendid='$uid' AND direction='3'");
        }
        return $affectedrows;
    }

    function get_totalnum_by_uid($uid, $direction = 0)
    {
        $sqladd = '';
        if ($direction == 0)
        {
            $sqladd = "uid='$uid'";
        }
        elseif ($direction == 1)
        {
            $sqladd = "uid='$uid' AND direction='1'";
        }
        elseif ($direction == 2)
        {
            $sqladd = "friendid='$uid' AND direction='1'";
        }
        elseif ($direction == 3)
        {
            $sqladd = "uid='$uid' AND direction='3'";
        }
        $totalnum = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "friends WHERE $sqladd");
        return $totalnum;
    }

    function get_list($uid, $page, $pagesize, $totalnum, $direction = 0)
    {
        $start = $this->base->page_get_start($page, $pagesize, $totalnum);
        $sqladd = '';
        if ($direction == 0)
        {
            $sqladd = "f.uid='$uid'";
        }
        elseif ($direction == 1)
        {
            $sqladd = "f.uid='$uid' AND f.direction='1'";
        }
        elseif ($direction == 2)
        {
            $sqladd = "f.friendid='$uid' AND f.direction='1'";
        }
        elseif ($direction == 3)
        {
            $sqladd = "f.uid='$uid' AND f.direction='3'";
        }
        if ($sqladd)
        {
            $data = $this->db->fetch_all("SELECT f.*, m.username FROM " . UC_DBTABLEPRE . "friends f LEFT JOIN " . UC_DBTABLEPRE . "members m ON f.friendid=m.uid WHERE $sqladd LIMIT $start, $pagesize");
            return $data;
        }
        else
        {
            return array();
        }
    }

    function is_friend($uid, $friendids, $direction = 0)
    {
        $friendid_str = implode("', '", $friendids);
        $sqladd = '';
        if ($direction == 0)
        {
            $sqladd = "uid='$uid'";
        }
        elseif ($direction == 1)
        {
            $sqladd = "uid='$uid' AND friendid IN ('$friendid_str') AND direction='1'";
        }
        elseif ($direction == 2)
        {
            $sqladd = "friendid='$uid' AND uid IN ('$friendid_str') AND direction='1'";
        }
        elseif ($direction == 3)
        {
            $sqladd = "uid='$uid' AND friendid IN ('$friendid_str') AND direction='3'";
        }
        if ($this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "friends WHERE $sqladd") == count($friendids))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}
