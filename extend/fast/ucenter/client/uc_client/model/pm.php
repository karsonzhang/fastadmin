<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: pm.php 1160 2013-10-24 08:04:45Z jeffjzhang $
 */
!defined('IN_UC') && exit('Access Denied');

define('PMINBALCKLIST_ERROR', -6);
define('PMSENDSELF_ERROR', -8);
define('PMSENDNONE_ERROR', -9);
define('PMSENDCHATNUM_ERROR', -10);
define('PMTHREADNONE_ERROR', -11);
define('PMPRIVILEGENONE_ERROR', -12);
define('PMCHATTYPE_ERROR', -13);
define('PMUIDTYPE_ERROR', -14);
define('PMDATA_ERROR', -15);

class pmmodel
{

    var $db;
    var $base;

    function __construct(&$base)
    {
        $this->pmmodel($base);
    }

    function pmmodel(&$base)
    {
        $this->base = $base;
        $this->db = $base->db;
    }

    function pmintval($pmid)
    {
        return @is_numeric($pmid) ? $pmid : 0;
    }

    function getpmbypmid($uid, $pmid)
    {
        if (!$pmid)
        {
            return array();
        }
        $arr = array();
        $pm = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_indexes i LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON t.plid=i.plid WHERE i.pmid='$pmid'");
        if ($this->isprivilege($pm['plid'], $uid))
        {
            $pms = $this->db->fetch_all("SELECT t.*, p.*, t.authorid as founderuid, t.dateline as founddateline FROM " . UC_DBTABLEPRE . $this->getposttablename($pm['plid']) . " p LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON t.plid=p.plid WHERE p.pmid='$pm[pmid]'");
            $arr = $this->getpostlist($pms);
        }
        return $arr;
    }

    function isprivilege($plid, $uid)
    {
        if (!$plid || !$uid)
        {
            return true;
        }
        $query = $this->db->query("SELECT * FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid' AND uid='$uid'");
        if ($this->db->fetch_array($query))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function getpmbyplid($uid, $plid, $starttime, $endtime, $start, $ppp, $type = 0)
    {
        if (!$type)
        {
            $pm = $this->getprivatepmbyplid($uid, $plid, $starttime, $endtime, $start, $ppp);
        }
        else
        {
            $pm = $this->getchatpmbyplid($uid, $plid, $starttime, $endtime, $start, $ppp);
        }
        return $this->getpostlist($pm);
    }

    function getpostlist($list)
    {
        if (empty($list))
        {
            return array();
        }
        $authoridarr = $authorarr = array();
        foreach ($list as $key => $value)
        {
            $authoridarr[$value['authorid']] = $value['authorid'];
        }
        if ($authoridarr)
        {
            $this->base->load('user');
            $authorarr = $_ENV['user']->id2name($authoridarr);
        }
        foreach ($list as $key => $value)
        {
            if ($value['pmtype'] == 1)
            {
                $users = explode('_', $value['min_max']);
                if ($value['authorid'] == $users[0])
                {
                    $value['touid'] = $users[1];
                }
                else
                {
                    $value['touid'] = $users[0];
                }
            }
            else
            {
                $value['touid'] = 0;
            }
            $value['author'] = $authorarr[$value['authorid']];

            $value['msgfromid'] = $value['authorid'];
            $value['msgfrom'] = $value['author'];
            $value['msgtoid'] = $value['touid'];

            unset($value['min_max']);
            unset($value['delstatus']);
            unset($value['lastmessage']);
            $list[$key] = $value;
        }
        return $list;
    }

    function setpmstatus($uid, $touids, $plids, $status = 0)
    {
        if (!$uid)
        {
            return false;
        }
        if (!$status)
        {
            $oldstatus = 1;
            $newstatus = 0;
        }
        else
        {
            $oldstatus = 0;
            $newstatus = 1;
        }
        if ($touids)
        {
            foreach ($touids as $key => $value)
            {
                if ($uid == $value || !$value)
                {
                    return false;
                }
                $relastionship[] = $this->relationship($uid, $value);
            }
            $plid = $plidpostarr = array();
            $query = $this->db->query("SELECT plid FROM " . UC_DBTABLEPRE . "pm_lists WHERE min_max IN (" . $this->base->implode($relationship) . ")");
            while ($thread = $this->db->fetch_array($query))
            {
                $plidarr[] = $thread['plid'];
            }
            if ($plidarr)
            {
                $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew='$newstatus' WHERE plid IN (" . $this->base->implode($plidarr) . ") AND uid='$uid' AND isnew='$oldstatus'");
            }
        }
        if ($plids)
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew='$newstatus' WHERE plid IN (" . $this->base->implode($plids) . ") AND uid='$uid' AND isnew='$oldstatus'");
        }
        return true;
    }

    function set_ignore($uid)
    {
        return $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "newpm WHERE uid='$uid'");
    }

    function isnewpm($uid)
    {
        return $this->db->result_first("SELECT uid FROM " . UC_DBTABLEPRE . "newpm WHERE uid='$uid'");
    }

    function lastpm($uid)
    {
        $lastpm = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_members m LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON m.plid=t.plid WHERE m.uid='$uid' ORDER BY m.lastdateline DESC LIMIT 1");
        $lastmessage = unserialize($lastpm['lastmessage']);
        if ($lastmessage['lastauthorid'])
        {
            $lastpm['lastauthorid'] = $lastmessage['lastauthorid'];
            $lastpm['lastauthor'] = $lastmessage['lastauthor'];
            $lastpm['lastsummary'] = $lastmessage['lastsummary'];
        }
        else
        {
            $lastpm['lastauthorid'] = $lastmessage['firstauthorid'];
            $lastpm['lastauthor'] = $lastmessage['firstauthor'];
            $lastpm['lastsummary'] = $lastmessage['firstsummary'];
        }
        return $lastpm;
    }

    function getpmnum($uid, $type = 0, $isnew = 0)
    {
        $newsql = '';
        $newnum = 0;

        if ($isnew)
        {
            $newsql = 'AND m.isnew=1';
        }
        if (!$type)
        {
            $newnum = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_members m WHERE m.uid='$uid' $newsql");
        }
        else
        {
            $newnum = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_members m LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON t.plid=m.plid WHERE m.uid='$uid' $newsql AND t.pmtype='$type'");
        }
        return $newnum;
    }

    function getpmnumbyplid($uid, $plid)
    {
        return $this->db->result_first("SELECT pmnum FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid' AND uid='$uid'");
    }

    function sendpm($fromuid, $fromusername, $touids, $subject, $message, $type = 0)
    {
        if (!$fromuid || !$fromusername || !$touids || !$message)
        {
            return 0;
        }
        $touids = array_unique($touids);
        $relationship = $existplid = $pm_member_insertsql = array();
        $this->base->load('user');
        $tmptouidarr = $touids;
        $blackls = $this->get_blackls($fromuid, $touids);

        foreach ($tmptouidarr as $key => $value)
        {
            if ($fromuid == $value || !$value)
            {
                return PMSENDSELF_ERROR;
            }

            if (in_array('{ALL}', $blackls[$value]))
            {
                unset($touids[$key]);
                continue;
            }
            $blackls[$value] = $_ENV['user']->name2id($blackls[$value]);
            if (!(isset($blackls[$value]) && !in_array($fromuid, $blackls[$value])))
            {
                unset($touids[$key]);
            }
            else
            {
                $relationship[$value] = $this->relationship($fromuid, $value);
            }
        }
        if (empty($touids))
        {
            return PMSENDNONE_ERROR;
        }
        if ($type == 1 && count($touids) < 2)
        {
            return PMSENDCHATNUM_ERROR;
        }

        $_CACHE['badwords'] = $this->base->cache('badwords');
        if ($_CACHE['badwords']['findpattern'])
        {
            $subject = @preg_replace($_CACHE['badwords']['findpattern'], $_CACHE['badwords']['replace'], $subject);
            $message = @preg_replace($_CACHE['badwords']['findpattern'], $_CACHE['badwords']['replace'], $message);
        }
        if (!$subject)
        {
            $subject = $this->removecode(trim($message), 80);
        }
        else
        {
            $subject = dhtmlspecialchars($subject);
        }
        $lastsummary = $this->removecode(trim(stripslashes($message)), 150);

        if (!$type)
        {
            $query = $this->db->query("SELECT plid, min_max FROM " . UC_DBTABLEPRE . "pm_lists WHERE min_max IN (" . $this->base->implode($relationship) . ")");
            while ($thread = $this->db->fetch_array($query))
            {
                $existplid[$thread['min_max']] = $thread['plid'];
            }
            $lastmessage = array('lastauthorid' => $fromuid, 'lastauthor' => $fromusername, 'lastsummary' => $lastsummary);
            $lastmessage = addslashes(serialize($lastmessage));
            foreach ($relationship as $key => $value)
            {
                if (!isset($existplid[$value]))
                {
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_lists(authorid, pmtype, subject, members, min_max, dateline, lastmessage) VALUES('$fromuid', '1', '$subject', 2, '$value', '" . $this->base->time . "', '$lastmessage')");
                    $plid = $this->db->insert_id();
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_indexes(plid) VALUES('$plid')");
                    $pmid = $this->db->insert_id();
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . $this->getposttablename($plid) . "(pmid, plid, authorid, message, dateline, delstatus) VALUES('$pmid', '$plid', '$fromuid', '$message', '" . $this->base->time . "', 0)");
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$key', '1', '1', '0', '" . $this->base->time . "')");
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$fromuid', '0', '1', '" . $this->base->time . "', '" . $this->base->time . "')");
                }
                else
                {
                    $plid = $existplid[$value];
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_indexes(plid) VALUES('$plid')");
                    $pmid = $this->db->insert_id();
                    $this->db->query("INSERT INTO " . UC_DBTABLEPRE . $this->getposttablename($plid) . "(pmid, plid, authorid, message, dateline, delstatus) VALUES('$pmid', '$plid', '$fromuid', '$message', '" . $this->base->time . "', 0)");
                    $result = $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$key', '1', '1', '0', '" . $this->base->time . "')", 'SILENT');
                    if (!$result)
                    {
                        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=1, pmnum=pmnum+1, lastdateline='" . $this->base->time . "' WHERE plid='$plid' AND uid='$key'");
                    }
                    $result = $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$fromuid', '0', '1', '" . $this->base->time . "', '" . $this->base->time . "')", 'SILENT');
                    if (!$result)
                    {
                        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=0, pmnum=pmnum+1, lastupdate='" . $this->base->time . "', lastdateline='" . $this->base->time . "' WHERE plid='$plid' AND uid='$fromuid'");
                    }
                    $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_lists SET lastmessage='$lastmessage' WHERE plid='$plid'");
                }
            }
        }
        else
        {
            $lastmessage = array('firstauthorid' => $fromuid, 'firstauthor' => $fromusername, 'firstsummary' => $lastsummary);
            $lastmessage = addslashes(serialize($lastmessage));
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_lists(authorid, pmtype, subject, members, min_max, dateline, lastmessage) VALUES('$fromuid', '2', '$subject', '" . (count($touids) + 1) . "', '', '" . $this->base->time . "', '$lastmessage')");
            $plid = $this->db->insert_id();
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_indexes(plid) VALUES('$plid')");
            $pmid = $this->db->insert_id();
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . $this->getposttablename($plid) . "(pmid, plid, authorid, message, dateline, delstatus) VALUES('$pmid', '$plid', '$fromuid', '$message', '" . $this->base->time . "', 0)");
            $pm_member_insertsql[] = "('$plid', '$fromuid', '0', '1', '" . $this->base->time . "', '" . $this->base->time . "')";
            foreach ($touids as $key => $value)
            {
                $pm_member_insertsql[] = "('$plid', '$value', '1', '1', '0', '" . $this->base->time . "')";
            }
            $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES " . implode(',', $pm_member_insertsql));
        }

        $newpm = array();
        foreach ($touids as $key => $value)
        {
            $newpm[] = "('$value')";
        }
        $this->db->query("REPLACE INTO " . UC_DBTABLEPRE . "newpm(uid) VALUES " . implode(',', $newpm));
        return $pmid;
    }

    function replypm($plid, $fromuid, $fromusername, $message)
    {
        if (!$plid || !$fromuid || !$fromusername || !$message)
        {
            return 0;
        }

        $threadpm = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'");
        if (empty($threadpm))
        {
            return PMTHREADNONE_ERROR;
        }

        if ($threadpm['pmtype'] == 1)
        {
            $users = explode('_', $threadpm['min_max']);
            if ($users[0] == $fromuid)
            {
                $touid = $users[1];
            }
            elseif ($users[1] == $fromuid)
            {
                $touid = $users[0];
            }
            else
            {
                return PMPRIVILEGENONE_ERROR;
            }

            $blackls = $this->get_blackls($fromuid, $touid);
            if (in_array('{ALL}', $blackls[$touid]))
            {
                return PMINBALCKLIST_ERROR;
            }
            $this->base->load('user');
            $blackls[$touid] = $_ENV['user']->name2id($blackls[$touid]);
            if (!(isset($blackls[$touid]) && !in_array($fromuid, $blackls[$touid])))
            {
                return PMINBALCKLIST_ERROR;
            }
        }

        $memberuid = array();
        $query = $this->db->query("SELECT * FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid'");
        while ($member = $this->db->fetch_array($query))
        {
            $memberuid[$member['uid']] = "('$member[uid]')";
        }
        if (!isset($memberuid[$fromuid]))
        {
            return PMPRIVILEGENONE_ERROR;
        }

        $_CACHE['badwords'] = $this->base->cache('badwords');
        if ($_CACHE['badwords']['findpattern'])
        {
            $message = @preg_replace($_CACHE['badwords']['findpattern'], $_CACHE['badwords']['replace'], $message);
        }
        $lastsummary = $this->removecode(trim(stripslashes($message)), 150);

        $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_indexes(plid) VALUES('$plid')");
        $pmid = $this->db->insert_id();
        $this->db->query("INSERT INTO " . UC_DBTABLEPRE . $this->getposttablename($plid) . "(pmid, plid, authorid, message, dateline, delstatus) VALUES('$pmid', '$plid', '$fromuid', '$message', '" . $this->base->time . "', 0)");
        if ($threadpm['pmtype'] == 1)
        {
            $lastmessage = array('lastauthorid' => $fromuid, 'lastauthor' => $fromusername, 'lastsummary' => $lastsummary);
            $lastmessage = addslashes(serialize($lastmessage));
            $result = $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$touid', '1', '1', '0', '" . $this->base->time . "')", 'SILENT');
            if (!$result)
            {
                $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=1, pmnum=pmnum+1, lastdateline='" . $this->base->time . "' WHERE plid='$plid' AND uid='$touid'");
            }
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=0, pmnum=pmnum+1, lastupdate='" . $this->base->time . "', lastdateline='" . $this->base->time . "' WHERE plid='$plid' AND uid='$fromuid'");
        }
        else
        {
            $lastmessage = unserialize($threadpm['lastmessage']);
            $lastmessage = array('firstauthorid' => $lastmessage['firstauthorid'], 'firstauthor' => $lastmessage['firstauthor'], 'firstsummary' => $lastmessage['firstsummary'], 'lastauthorid' => $fromuid, 'lastauthor' => $fromusername, 'lastsummary' => $lastsummary);
            $lastmessage = addslashes(serialize($lastmessage));
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=1, pmnum=pmnum+1, lastdateline='" . $this->base->time . "' WHERE plid='$plid'");
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=0, lastupdate='" . $this->base->time . "' WHERE plid='$plid' AND uid='$fromuid'");
        }
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_lists SET lastmessage='$lastmessage' WHERE plid='$plid'");

        $this->db->query("REPLACE INTO " . UC_DBTABLEPRE . "newpm(uid) VALUES " . implode(',', $memberuid) . "");

        return $pmid;
    }

    function appendchatpm($plid, $uid, $touid)
    {
        if (!$plid || !$uid || !$touid)
        {
            return 0;
        }
        $threadpm = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'");
        if (empty($threadpm))
        {
            return PMTHREADNONE_ERROR;
        }
        if ($threadpm['pmtype'] != 2)
        {
            return PMCHATTYPE_ERROR;
        }
        if ($threadpm['authorid'] != $uid)
        {
            return PMPRIVILEGENONE_ERROR;
        }

        $blackls = $this->get_blackls($uid, $touid);
        if (in_array('{ALL}', $blackls[$touid]))
        {
            return PMINBALCKLIST_ERROR;
        }
        $this->base->load('user');
        $blackls[$touid] = $_ENV['user']->name2id($blackls[$touid]);
        if (!(isset($blackls[$touid]) && !in_array($uid, $blackls[$touid])))
        {
            return PMINBALCKLIST_ERROR;
        }

        $pmnum = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . $this->getposttablename($plid) . " WHERE plid='$plid'");
        $this->db->query("INSERT INTO " . UC_DBTABLEPRE . "pm_members(plid, uid, isnew, pmnum, lastupdate, lastdateline) VALUES('$plid', '$touid', '1', '$pmnum', '0', '0')", 'SILENT');
        $num = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid'");
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_lists SET members='$num' WHERE plid='$plid'");

        return 1;
    }

    function kickchatpm($plid, $uid, $touid)
    {
        if (!$uid || !$touid || !$plid || $uid == $touid)
        {
            return 0;
        }
        $threadpm = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'");
        if ($threadpm['pmtype'] != 2)
        {
            return PMCHATTYPE_ERROR;
        }
        if ($threadpm['authorid'] != $uid)
        {
            return PMPRIVILEGENONE_ERROR;
        }
        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid' AND uid='$touid'");
        $num = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid'");
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_lists SET members='$num' WHERE plid='$plid'");
        return 1;
    }

    function quitchatpm($uid, $plids)
    {
        if (!$uid || !$plids)
        {
            return 0;
        }
        $list = array();
        $query = $this->db->query("SELECT * FROM " . UC_DBTABLEPRE . "pm_members m LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON m.plid=t.plid WHERE m.plid IN (" . $this->base->implode($plids) . ") AND m.uid='$uid'");
        while ($threadpm = $this->db->fetch_array($query))
        {
            if ($threadpm['pmtype'] != 2)
            {
                return PMCHATTYPE_ERROR;
            }
            if ($threadpm['authorid'] == $uid)
            {
                return PMPRIVILEGENONE_ERROR;
            }
            $list[] = $threadpm['plid'];
        }

        if ($list)
        {
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid IN (" . $this->base->implode($list) . ") AND uid='$uid'");
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_lists SET members=members-1 WHERE plid IN (" . $this->base->implode($list) . ")");
        }

        return 1;
    }

    function deletepmbypmid($uid, $pmid)
    {
        if (!$uid || !$pmid)
        {
            return 0;
        }
        $index = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_indexes i LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON i.plid=t.plid WHERE i.pmid='$pmid'");
        if ($index['pmtype'] != 1)
        {
            return PMUIDTYPE_ERROR;
        }
        $users = explode('_', $index['min_max']);
        if (!in_array($uid, $users))
        {
            return PMPRIVILEGENONE_ERROR;
        }
        if ($index['authorid'] != $uid)
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . $this->getposttablename($index['plid']) . " SET delstatus=2 WHERE pmid='$pmid' AND delstatus=0");
            $updatenum = $this->db->affected_rows();
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . $this->getposttablename($index['plid']) . " WHERE pmid='$pmid' AND delstatus=1");
            $deletenum = $this->db->affected_rows();
        }
        else
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . $this->getposttablename($index['plid']) . " SET delstatus=1 WHERE pmid='$pmid' AND delstatus=0");
            $updatenum = $this->db->affected_rows();
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . $this->getposttablename($index['plid']) . " WHERE pmid='$pmid' AND delstatus=2");
            $deletenum = $this->db->affected_rows();
        }

        if (!$this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . $this->getposttablename($index['plid']) . " WHERE plid='$index[plid]'"))
        {
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$index[plid]'");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$index[plid]'");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_indexes WHERE plid='$index[plid]'");
        }
        else
        {
            $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET pmnum=pmnum-" . ($updatenum + $deletenum) . " WHERE plid='" . $index['plid'] . "' AND uid='$uid'");
        }
        return 1;
    }

    function deletepmbypmids($uid, $pmids)
    {
        if ($pmids)
        {
            foreach ($pmids as $key => $pmid)
            {
                $this->deletepmbypmid($uid, $pmid);
            }
        }
        return 1;
    }

    /*
      function deletepmbypmids($uid, $pmids) {
      if(!$uid || !$pmids) {
      return 0;
      }
      $pmplid = $delstatus1pm = $delstatus2pm = $pmplidpost = array();
      $existplid = array();
      $query = $this->db->query("SELECT * FROM ".UC_DBTABLEPRE."pm_indexes i LEFT JOIN ".UC_DBTABLEPRE."pm_lists t ON i.plid=t.plid WHERE i.pmid IN (".$this->base->implode($pmids).") AND t.pmtype=1");
      while($index = $this->db->fetch_array($query)) {
      $users = explode('_', $index['min_max']);
      if(!in_array($uid, $users)) {
      return PMPRIVILEGENONE_ERROR;
      }
      if($index['authorid'] == $uid) {
      $delstatus1pm[$this->getposttablename($index['plid'])][] = $index['pmid'];
      } else {
      $delstatus2pm[$this->getposttablename($index['plid'])][] = $index['pmid'];
      }
      $pmplidpost[$this->getposttablename($index['plid'])][] = $index['plid'];
      $pmplid[$index['plid']] = $index['plid'];
      }
      if(empty($pmplidpost)) {
      return 0;
      }

      if($delstatus1pm) {
      foreach($delstatus1pm as $key => $value) {
      $this->db->query("UPDATE ".UC_DBTABLEPRE."$key SET delstatus=1 WHERE pmid IN (".$this->base->implode($value).") AND delstatus=0");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."$key WHERE pmid IN (".$this->base->implode($value).") AND delstatus=2");
      }
      }

      if($delstatus2pm) {
      foreach($delstatus2pm as $key => $value) {
      $this->db->query("UPDATE ".UC_DBTABLEPRE."$key SET delstatus=2 WHERE pmid IN (".$this->base->implode($value).") AND delstatus=0");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."$key WHERE pmid IN (".$this->base->implode($value).") AND delstatus=1");
      }
      }

      foreach($pmplidpost as $key => $value) {
      $query = $this->db->query("SELECT DISTINCT plid FROM ".UC_DBTABLEPRE."$key WHERE plid IN (".$this->base->implode($value).")");
      while($pmpostarr = $this->db->fetch_array($query)) {
      $existplid[] = $pmpostarr['plid'];
      }
      }
      $pmplid = array_diff($pmplid, $existplid);
      if($pmplid) {
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_lists WHERE plid IN (".$this->base->implode($pmplid).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_members WHERE plid IN (".$this->base->implode($pmplid).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_indexes WHERE plid IN (".$this->base->implode($pmplid).")");
      }
      return 1;
      }
     */

    function deletepmbyplid($uid, $plid, $isuser = 0)
    {
        if (!$uid || !$plid)
        {
            return 0;
        }

        if ($isuser)
        {
            $relationship = $this->relationship($uid, $plid);
            $sql = "SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE min_max='$relationship'";
        }
        else
        {
            $sql = "SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'";
        }

        $query = $this->db->query($sql);
        if ($list = $this->db->fetch_array($query))
        {
            if ($list['pmtype'] == 1)
            {
                $user = explode('_', $list['min_max']);
                if (!in_array($uid, $user))
                {
                    return PMPRIVILEGENONE_ERROR;
                }
            }
            else
            {
                if ($uid != $list['authorid'])
                {
                    return PMPRIVILEGENONE_ERROR;
                }
            }
        }
        else
        {
            return PMTHREADNONE_ERROR;
        }

        if ($list['pmtype'] == 1)
        {
            if ($uid == $list['authorid'])
            {
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " WHERE plid='$list[plid]' AND delstatus=2");
                $this->db->query("UPDATE " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " SET delstatus=1 WHERE plid='$list[plid]' AND delstatus=0");
            }
            else
            {
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " WHERE plid='$list[plid]' AND delstatus=1");
                $this->db->query("UPDATE " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " SET delstatus=2 WHERE plid='$list[plid]' AND delstatus=0");
            }
            $count = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " WHERE plid='$list[plid]'");
            if (!$count)
            {
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$list[plid]'");
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$list[plid]'");
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_indexes WHERE plid='$list[plid]'");
            }
            else
            {
                $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$list[plid]' AND uid='$uid'");
            }
        }
        else
        {
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . $this->getposttablename($list['plid']) . " WHERE plid='$list[plid]'");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$list[plid]'");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$list[plid]'");
            $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "pm_indexes WHERE plid='$list[plid]'");
        }
        return 1;
    }

    function deletepmbyplids($uid, $plids, $isuser = 0)
    {
        if ($plids)
        {
            foreach ($plids as $key => $plid)
            {
                $this->deletepmbyplid($uid, $plid, $isuser);
            }
        }
        return 1;
    }

    /*
      function deletepmbyplid($uid, $plids, $isuser = 0) {
      if(!$uid || !$plids) {
      return 0;
      }

      $privatepm = $chatpm = array();
      $privatepmauthorpost = $privatepmpost = $privatepmpostall = array();
      $existplid = array();
      if($isuser) {
      $relationship = array();
      foreach($plids as $key => $value) {
      if($uid == $value || !$value) {
      return PMDATA_ERROR;
      }
      $relationship[] = $this->relationship($uid, $value);
      }
      $sql = "SELECT * FROM ".UC_DBTABLEPRE."pm_lists WHERE min_max IN (".$this->base->implode($relationship).")";
      } else {
      $sql = "SELECT * FROM ".UC_DBTABLEPRE."pm_lists WHERE plid IN (".$this->base->implode($plids).")";
      }
      $query = $this->db->query($sql);
      while($threadpm = $this->db->fetch_array($query)) {
      if($threadpm['pmtype'] == 1) {
      $users = explode('_', $threadpm['min_max']);
      if($users[0] == $uid) {
      $touid = $users[1];
      } elseif($users[1] == $uid) {
      $touid = $users[0];
      } else {
      continue;
      }

      if($threadpm['authorid'] == $uid) {
      $privatepmauthorpost[$this->getposttablename($threadpm['plid'])][] = $threadpm['plid'];
      } else {
      $privatepmpost[$this->getposttablename($threadpm['plid'])][] = $threadpm['plid'];
      }
      $privatepmpostall[$this->getposttablename($threadpm['plid'])][] = $threadpm['plid'];
      $privatepm[] = $threadpm['plid'];
      } else {
      if($uid != $threadpm['authorid']) {
      continue;
      }
      $chatpm[] = $threadpm['plid'];
      $chatpmpost[$this->getposttablename($threadpm['plid'])][] = $threadpm['plid'];
      }
      }

      if($privatepmauthorpost) {
      foreach($privatepmauthorpost as $key => $value) {
      $this->db->query("UPDATE ".UC_DBTABLEPRE."$key SET delstatus=1 WHERE plid IN (".$this->base->implode($value).") AND delstatus=0");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."$key WHERE plid IN (".$this->base->implode($value).") AND delstatus=2");
      }
      }

      if($privatepmpost) {
      foreach($privatepmpost as $key => $value) {
      $this->db->query("UPDATE ".UC_DBTABLEPRE."$key SET delstatus=2 WHERE plid IN (".$this->base->implode($value).") AND delstatus=0");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."$key WHERE plid IN (".$this->base->implode($value).") AND delstatus=1");
      }
      }
      if($privatepmpostall) {
      foreach($privatepmpostall as $key => $value) {
      $query = $this->db->query("SELECT DISTINCT plid FROM ".UC_DBTABLEPRE."$key WHERE plid IN (".$this->base->implode($value).")");
      while($postpm = $this->db->fetch_array($query)) {
      $existplid[] = $postpm['plid'];
      }
      }
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_members WHERE plid IN (".$this->base->implode($privatepm).") AND uid='$uid'");
      $privatepm = array_diff($privatepm, $existplid);
      if(!empty($privatepm)) {
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_lists WHERE plid IN (".$this->base->implode($privatepm).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_members WHERE plid IN (".$this->base->implode($privatepm).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_indexes WHERE plid IN (".$this->base->implode($privatepm).")");
      }
      }
      if($chatpmpost) {
      foreach($chatpmpost as $key => $value) {
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."$key WHERE plid IN (".$this->base->implode($value).")");
      }
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_lists WHERE plid IN (".$this->base->implode($chatpm).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_members WHERE plid IN (".$this->base->implode($chatpm).")");
      $this->db->query("DELETE FROM ".UC_DBTABLEPRE."pm_indexes WHERE plid IN (".$this->base->implode($chatpm).")");
      }
      return 1;
      }
     */

    function getprivatepmbyplid($uid, $plid, $starttime = 0, $endtime = 0, $start = 0, $ppp = 0)
    {
        if (!$uid || !$plid)
        {
            return 0;
        }
        if (!$this->isprivilege($plid, $uid))
        {
            return 0;
        }
        $thread = $this->db->fetch_first("SELECT * FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'");
        if ($thread['pmtype'] != 1)
        {
            return 0;
        }
        $pms = $addsql = array();
        $addsql[] = "p.plid='$plid'";
        if ($thread['authorid'] == $uid)
        {
            $addsql[] = 'p.delstatus IN (0,2)';
        }
        else
        {
            $addsql[] = 'p.delstatus IN (0,1)';
        }
        if ($starttime)
        {
            $addsql[] = "p.dateline>'$starttime'";
        }
        if ($endtime)
        {
            $addsql[] = "p.dateline<'$endtime'";
        }
        if ($addsql)
        {
            $addsql = implode(' AND ', $addsql);
        }
        else
        {
            $addsql = '';
        }
        if ($ppp)
        {
            $limitsql = 'LIMIT ' . intval($start) . ', ' . intval($ppp);
        }
        else
        {
            $limitsql = '';
        }
        $pms = $this->db->fetch_all("SELECT t.*, p.*, t.authorid as founderuid, t.dateline as founddateline FROM " . UC_DBTABLEPRE . $this->getposttablename($plid) . " p LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON p.plid=t.plid WHERE $addsql ORDER BY p.dateline DESC $limitsql");
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=0 WHERE plid='$plid' AND uid='$uid' AND isnew=1");
        return array_reverse($pms);
    }

    function getchatpmbyplid($uid, $plid, $starttime = 0, $endtime = 0, $start = 0, $ppp = 0)
    {
        if (!$uid || !$plid)
        {
            return 0;
        }
        if (!$this->isprivilege($plid, $uid))
        {
            return 0;
        }
        $pms = $addsql = array();
        $addsql[] = "p.plid='$plid'";
        if ($starttime)
        {
            $addsql[] = "p.dateline>'$starttime'";
        }
        if ($endtime)
        {
            $addsql[] = "p.dateline<'$endtime'";
        }
        if ($addsql)
        {
            $addsql = implode(' AND ', $addsql);
        }
        else
        {
            $addsql = '';
        }
        if ($ppp)
        {
            $limitsql = 'LIMIT ' . intval($start) . ', ' . intval($ppp);
        }
        else
        {
            $limitsql = '';
        }
        $query = $this->db->query("SELECT t.*, p.*, t.authorid as founderuid, t.dateline as founddateline FROM " . UC_DBTABLEPRE . $this->getposttablename($plid) . " p LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON p.plid=t.plid WHERE $addsql ORDER BY p.dateline DESC $limitsql");
        while ($pm = $this->db->fetch_array($query))
        {
            if ($pm['pmtype'] != 2)
            {
                return 0;
            }
            $pms[] = $pm;
        }
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "pm_members SET isnew=0 WHERE plid='$plid' AND uid='$uid' AND isnew=1");
        return array_reverse($pms);
    }

    function getpmlist($uid, $filter, $start, $ppp = 10)
    {
        if (!$uid)
        {
            return 0;
        }
        $members = $touidarr = $tousernamearr = array();

        if ($filter == 'newpm')
        {
            $addsql = 'm.isnew=1 AND ';
        }
        else
        {
            $addsql = '';
        }
        $query = $this->db->query("SELECT * FROM " . UC_DBTABLEPRE . "pm_members m LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON t.plid=m.plid WHERE $addsql m.uid='$uid' ORDER BY m.lastdateline DESC LIMIT $start, $ppp");
        while ($member = $this->db->fetch_array($query))
        {
            if ($member['pmtype'] == 1)
            {
                $users = explode('_', $member['min_max']);
                $member['touid'] = $users[0] == $uid ? $users[1] : $users[0];
            }
            else
            {
                $member['touid'] = 0;
            }
            $touidarr[$member['touid']] = $member['touid'];
            $members[] = $member;
        }

        $this->db->query("DELETE FROM " . UC_DBTABLEPRE . "newpm WHERE uid='$uid'");

        $array = array();
        if ($members)
        {
            $today = $this->base->time - $this->base->time % 86400;
            $this->base->load('user');
            $tousernamearr = $_ENV['user']->id2name($touidarr);
            foreach ($members as $key => $data)
            {

                $daterange = 5;
                $data['founddateline'] = $data['dateline'];
                $data['dateline'] = $data['lastdateline'];
                $data['pmid'] = $data['plid'];
                $lastmessage = unserialize($data['lastmessage']);
                if ($lastmessage['firstauthorid'])
                {
                    $data['firstauthorid'] = $lastmessage['firstauthorid'];
                    $data['firstauthor'] = $lastmessage['firstauthor'];
                    $data['firstsummary'] = $lastmessage['firstsummary'];
                }
                if ($lastmessage['lastauthorid'])
                {
                    $data['lastauthorid'] = $lastmessage['lastauthorid'];
                    $data['lastauthor'] = $lastmessage['lastauthor'];
                    $data['lastsummary'] = $lastmessage['lastsummary'];
                }
                $data['msgfromid'] = $lastmessage['lastauthorid'];
                $data['msgfrom'] = $lastmessage['lastauthor'];
                $data['message'] = $lastmessage['lastsummary'];

                $data['new'] = $data['isnew'];

                $data['msgtoid'] = $data['touid'];
                if ($data['lastdateline'] >= $today)
                {
                    $daterange = 1;
                }
                elseif ($data['lastdateline'] >= $today - 86400)
                {
                    $daterange = 2;
                }
                elseif ($data['lastdateline'] >= $today - 172800)
                {
                    $daterange = 3;
                }
                elseif ($data['lastdateline'] >= $today - 604800)
                {
                    $daterange = 4;
                }
                $data['daterange'] = $daterange;

                $data['tousername'] = $tousernamearr[$data['touid']];
                unset($data['min_max']);
                $array[] = $data;
            }
        }
        return $array;
    }

    function getplidbypmid($pmid)
    {
        if (!$pmid)
        {
            return false;
        }
        return $this->db->result_first("SELECT plid FROM " . UC_DBTABLEPRE . "pm_indexes WHERE pmid='$pmid'");
    }

    function getplidbytouid($uid, $touid)
    {
        if (!$uid || !$touid)
        {
            return 0;
        }
        return $this->db->result_first("SELECT plid FROM " . UC_DBTABLEPRE . "pm_lists WHERE min_max='" . $this->relationship($uid, $touid) . "'");
    }

    function getuidbyplid($plid)
    {
        if (!$plid)
        {
            return array();
        }
        $uidarr = array();
        $query = $this->db->query("SELECT uid FROM " . UC_DBTABLEPRE . "pm_members WHERE plid='$plid'");
        while ($uid = $this->db->fetch_array($query))
        {
            $uidarr[$uid['uid']] = $uid['uid'];
        }
        return $uidarr;
    }

    function chatpmmemberlist($uid, $plid)
    {
        if (!$uid || !$plid)
        {
            return 0;
        }
        $uidarr = $this->getuidbyplid($plid);
        if (empty($uidarr))
        {
            return 0;
        }
        if (!isset($uidarr[$uid]))
        {
            return 0;
        }
        $authorid = $this->db->result_first("SELECT authorid FROM " . UC_DBTABLEPRE . "pm_lists WHERE plid='$plid'");
        return array('author' => $authorid, 'member' => $uidarr);
    }

    function relationship($fromuid, $touid)
    {
        if ($fromuid < $touid)
        {
            return $fromuid . '_' . $touid;
        }
        elseif ($fromuid > $touid)
        {
            return $touid . '_' . $fromuid;
        }
        else
        {
            return '';
        }
    }

    function getposttablename($plid)
    {
        $id = substr((string) $plid, -1, 1);
        return 'pm_messages_' . intval($id);
    }

    function get_blackls($uid, $uids = array())
    {
        if (!$uids)
        {
            $blackls = $this->db->result_first("SELECT blacklist FROM " . UC_DBTABLEPRE . "memberfields WHERE uid='$uid'");
        }
        else
        {
            $uids = $this->base->implode($uids);
            $blackls = array();
            $query = $this->db->query("SELECT uid, blacklist FROM " . UC_DBTABLEPRE . "memberfields WHERE uid IN ($uids)");
            while ($data = $this->db->fetch_array($query))
            {
                $blackls[$data['uid']] = explode(',', $data['blacklist']);
            }
        }
        return $blackls;
    }

    function set_blackls($uid, $blackls)
    {
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "memberfields SET blacklist='$blackls' WHERE uid='$uid'");
        return $this->db->affected_rows();
    }

    function update_blackls($uid, $username, $action = 1)
    {
        $username = !is_array($username) ? array($username) : $username;
        if ($action == 1)
        {
            if (!in_array('{ALL}', $username))
            {
                $usernames = $this->base->implode($username);
                $query = $this->db->query("SELECT username FROM " . UC_DBTABLEPRE . "members WHERE username IN ($usernames)");
                $usernames = array();
                while ($data = $this->db->fetch_array($query))
                {
                    $usernames[addslashes($data['username'])] = addslashes($data['username']);
                }
                if (!$usernames)
                {
                    return 0;
                }
                $blackls = addslashes($this->db->result_first("SELECT blacklist FROM " . UC_DBTABLEPRE . "memberfields WHERE uid='$uid'"));
                if ($blackls)
                {
                    $list = explode(',', $blackls);
                    foreach ($list as $k => $v)
                    {
                        if (in_array($v, $usernames))
                        {
                            unset($usernames[$v]);
                        }
                    }
                }
                if (!$usernames)
                {
                    return 1;
                }
                $listnew = implode(',', $usernames);
                $blackls .= $blackls !== '' ? ',' . $listnew : $listnew;
            }
            else
            {
                $blackls = addslashes($this->db->result_first("SELECT blacklist FROM " . UC_DBTABLEPRE . "memberfields WHERE uid='$uid'"));
                $blackls .= ',{ALL}';
            }
        }
        else
        {
            $blackls = addslashes($this->db->result_first("SELECT blacklist FROM " . UC_DBTABLEPRE . "memberfields WHERE uid='$uid'"));
            $list = $blackls = explode(',', $blackls);
            foreach ($list as $k => $v)
            {
                if (in_array($v, $username))
                {
                    unset($blackls[$k]);
                }
            }
            $blackls = implode(',', $blackls);
        }
        $this->db->query("UPDATE " . UC_DBTABLEPRE . "memberfields SET blacklist='$blackls' WHERE uid='$uid'");
        return 1;
    }

    function removecode($str, $length)
    {
        static $uccode = null;
        if ($uccode === null)
        {
            require_once UC_ROOT . 'lib/uccode.class.php';
            $uccode = new uccode();
        }
        $str = $uccode->complie($str);
        return trim($this->base->cutstr(strip_tags($str), $length));
    }

    function ispminterval($uid, $interval = 0)
    {
        if (!$uid)
        {
            return 0;
        }
        $interval = intval($interval);
        if (!$interval)
        {
            return 1;
        }
        $lastupdate = $this->db->result_first("SELECT lastupdate FROM " . UC_DBTABLEPRE . "pm_members WHERE uid='$uid' ORDER BY lastupdate DESC LIMIT 1");
        if (($this->base->time - $lastupdate) > $interval)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    function isprivatepmthreadlimit($uid, $maxnum = 0)
    {
        if (!$uid)
        {
            return 0;
        }
        $maxnum = intval($maxnum);
        if (!$maxnum)
        {
            return 1;
        }
        $num = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_members m LEFT JOIN " . UC_DBTABLEPRE . "pm_lists t ON m.plid=t.plid WHERE uid='$uid' AND lastupdate>'" . ($this->base->time - 86400) . "' AND t.pmtype=1");
        if ($maxnum - $num < 0)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }

    function ischatpmthreadlimit($uid, $maxnum = 0)
    {
        if (!$uid)
        {
            return 0;
        }
        $maxnum = intval($maxnum);
        if (!$maxnum)
        {
            return 1;
        }
        $num = $this->db->result_first("SELECT COUNT(*) FROM " . UC_DBTABLEPRE . "pm_lists WHERE authorid='$uid' AND dateline>'" . ($this->base->time - 86400) . "'");
        if ($maxnum - $num < 0)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }

}
