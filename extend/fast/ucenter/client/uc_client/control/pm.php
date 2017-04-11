<?php

/*
  [UCenter] (C)2001-2099 Comsenz Inc.
  This is NOT a freeware, use is subject to license terms

  $Id: pm.php 1067 2011-03-08 10:06:51Z svn_project_zhangjie $
 */
!defined('IN_UC') && exit('Access Denied');

define('PRIVATEPMTHREADLIMIT_ERROR', -1);
define('PMFLOODCTRL_ERROR', -2);
define('PMMSGTONOTFRIEND', -3);
define('PMSENDREGDAYS', -4);
define('CHATPMTHREADLIMIT_ERROR', -5);
define('CHATPMMEMBERLIMIT_ERROR', -7);

class pmcontrol extends base
{

    function __construct()
    {
        $this->pmcontrol();
    }

    function pmcontrol()
    {
        parent::__construct();
        $this->load('user');
        $this->load('pm');
    }

    function oncheck_newpm()
    {
        $this->init_input();
        $uid = intval($this->input('uid'));
        $more = intval($this->input('more'));
        if (!$_ENV['pm']->isnewpm($uid) && !$more)
        {
            return 0;
        }
        $newprvpm = $_ENV['pm']->getpmnum($uid, 1, 1);
        $newchatpm = $_ENV['pm']->getpmnum($uid, 2, 1);
        $newpm = $newprvpm + $newchatpm;
        if ($more == 0)
        {
            return $newpm;
        }
        elseif ($more == 1)
        {
            return array('newpm' => $newpm, 'newprivatepm' => $newprvpm);
        }
        elseif ($more == 2 || $more == 3)
        {
            if ($more == 2)
            {
                return array('newpm' => $newpm, 'newprivatepm' => $newprvpm, 'newchatpm' => $newchatpm);
            }
            else
            {
                $lastpm = $_ENV['pm']->lastpm($uid);
                require_once UC_ROOT . 'lib/uccode.class.php';
                $this->uccode = new uccode();
                $lastpm['lastsummary'] = $this->uccode->complie($lastpm['lastsummary']);
                return array('newpm' => $newpm, 'newprivatepm' => $newprvpm, 'newchatpm' => $newchatpm, 'lastdate' => $lastpm['lastdateline'], 'lastmsgfromid' => $lastpm['lastauthorid'], 'lastmsgfrom' => $lastpm['lastauthorusername'], 'lastmsg' => $lastpm['lastsummary']);
            }
        }
        elseif ($more == 4)
        {
            return array('newpm' => $newpm, 'newprivatepm' => $newprvpm, 'newchatpm' => $newchatpm);
        }
        else
        {
            return 0;
        }
    }

    function onsendpm()
    {
        $this->init_input();
        $fromuid = $this->input('fromuid');
        $msgto = $this->input('msgto');
        $subject = $this->input('subject');
        $message = $this->input('message');
        $replypmid = $this->input('replypmid');
        $isusername = $this->input('isusername');
        $type = $this->input('type');

        if (!$fromuid)
        {
            return 0;
        }

        $user = $_ENV['user']->get_user_by_uid($fromuid);
        $user = daddslashes($user, 1);
        if (!$user)
        {
            return 0;
        }
        $this->user['uid'] = $user['uid'];
        $this->user['username'] = $user['username'];

        if ($replypmid)
        {
            $isusername = 0;
            $plid = $_ENV['pm']->getplidbypmid($replypmid);
            $msgto = $_ENV['pm']->getuidbyplid($plid);
            unset($msgto[$this->user['uid']]);
        }
        else
        {
            if (!empty($msgto))
            {
                $msgto = array_unique(explode(',', $msgto));
            }
        }

        if ($isusername)
        {
            $msgto = $_ENV['user']->name2id($msgto);
        }
        $countmsgto = count($msgto);

        if ($this->settings['pmsendregdays'])
        {
            if ($user['regdate'] > $this->time - $this->settings['pmsendregdays'] * 86400)
            {
                return PMSENDREGDAYS;
            }
        }
        if ($this->settings['chatpmmemberlimit'])
        {
            if ($type == 1 && ($countmsgto > ($this->settings['chatpmmemberlimit'] - 1)))
            {
                return CHATPMMEMBERLIMIT_ERROR;
            }
        }
        if ($this->settings['pmfloodctrl'])
        {
            if (!$_ENV['pm']->ispminterval($this->user['uid'], $this->settings['pmfloodctrl']))
            {
                return PMFLOODCTRL_ERROR;
            }
        }
        if ($this->settings['privatepmthreadlimit'])
        {
            if (!$_ENV['pm']->isprivatepmthreadlimit($this->user['uid'], $this->settings['privatepmthreadlimit']))
            {
                return PRIVATEPMTHREADLIMIT_ERROR;
            }
        }
        if ($this->settings['chatpmthreadlimit'])
        {
            if (!$_ENV['pm']->ischatpmthreadlimit($this->user['uid'], $this->settings['chatpmthreadlimit']))
            {
                return CHATPMTHREADLIMIT_ERROR;
            }
        }

        $lastpmid = 0;
        if ($replypmid)
        {
            $lastpmid = $_ENV['pm']->replypm($plid, $this->user['uid'], $this->user['username'], $message);
        }
        else
        {
            $lastpmid = $_ENV['pm']->sendpm($this->user['uid'], $this->user['username'], $msgto, $subject, $message, $type);
        }
        return $lastpmid;
    }

    function ondelete()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $pmids = $this->input('pmids');
        if (empty($pmids))
        {
            return 0;
        }
        if (is_array($pmids))
        {
            $this->apps = $this->cache('apps');
            if ($this->apps[$this->app['appid']]['type'] == 'UCHOME')
            {
                $id = $_ENV['pm']->deletepmbyplids($this->user['uid'], $this->input('pmids'));
            }
            else
            {
                $id = $_ENV['pm']->deletepmbypmids($this->user['uid'], $this->input('pmids'));
            }
        }
        else
        {
            $id = $_ENV['pm']->deletepmbypmid($this->user['uid'], $this->input('pmids'));
        }
        return $id;
    }

    function ondeletechat()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $plids = $this->input('plids');
        $type = intval($this->input('type'));
        if ($type == 1)
        {
            return $_ENV['pm']->deletepmbyplids($this->user['uid'], $plids);
        }
        else
        {
            return $_ENV['pm']->quitchatpm($this->user['uid'], $plids);
        }
    }

    function ondeleteuser()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $id = $_ENV['pm']->deletepmbyplids($this->user['uid'], $this->input('touids'), 1);
        return $id;
    }

    function onreadstatus()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $_ENV['pm']->setpmstatus($this->user['uid'], $this->input('uids'), $this->input('plids'), $this->input('status'));
    }

    function onignore()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        return $_ENV['pm']->set_ignore($this->user['uid']);
    }

    function onls()
    {
        $this->init_input();
        $pagesize = $this->input('pagesize');
        $filter = $this->input('filter');
        $page = $this->input('page');
        $msglen = $this->input('msglen');
        $this->user['uid'] = intval($this->input('uid'));

        $filter = $filter ? (in_array($filter, array('newpm', 'privatepm')) ? $filter : '') : '';
        if ($filter == 'newpm')
        {
            $type = 0;
            $new = 1;
        }
        elseif ($filter == 'privatepm')
        {
            $type = 0;
            $new = 0;
        }
        else
        {
            return array();
        }
        $pmnum = $_ENV['pm']->getpmnum($this->user['uid'], $type, $new);
        $start = $this->page_get_start($page, $pagesize, $pmnum);

        if ($pagesize > 0)
        {
            $pms = $_ENV['pm']->getpmlist($this->user['uid'], $filter, $start, $pagesize);
            if (is_array($pms) && !empty($pms))
            {
                foreach ($pms as $key => $pm)
                {
                    if ($msglen)
                    {
                        $pms[$key]['lastsummary'] = $_ENV['pm']->removecode($pms[$key]['lastsummary'], $msglen);
                    }
                    else
                    {
                        unset($pms[$key]['lastsummary']);
                    }
                }
            }
            $result['data'] = $pms;
        }
        $result['count'] = $pmnum;
        return $result;
    }

    function onview()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $pmid = $this->input('pmid');
        $touid = $this->input('touid');
        $daterange = $this->input('daterange');
        $page = $this->input('page');
        $pagesize = $this->input('pagesize');
        $isplid = $this->input('isplid');
        $type = $this->input('type');

        $daterange = empty($daterange) ? 1 : $daterange;
        $today = $this->time - ($this->time + $this->settings['timeoffset']) % 86400;
        if ($daterange == 1)
        {
            $starttime = $today;
        }
        elseif ($daterange == 2)
        {
            $starttime = $today - 86400;
        }
        elseif ($daterange == 3)
        {
            $starttime = $today - 172800;
        }
        elseif ($daterange == 4)
        {
            $starttime = $today - 604800;
        }
        elseif ($daterange == 5)
        {
            $starttime = 0;
        }
        $endtime = $this->time;

        if (!$isplid)
        {
            $plid = $_ENV['pm']->getplidbytouid($this->user['uid'], $touid);
        }
        else
        {
            $plid = $touid;
        }
        if ($page)
        {
            $pmnum = $_ENV['pm']->getpmnumbyplid($this->user['uid'], $plid);
            $start = $this->page_get_start($page, $pagesize, $pmnum);
            $ppp = $pagesize;
        }
        else
        {
            $pmnum = 0;
            $start = 0;
            $ppp = 0;
        }

        if ($pmid)
        {
            $pms = $_ENV['pm']->getpmbypmid($this->user['uid'], $pmid);
        }
        else
        {
            $pms = $_ENV['pm']->getpmbyplid($this->user['uid'], $plid, $starttime, $endtime, $start, $ppp, $type);
        }

        require_once UC_ROOT . 'lib/uccode.class.php';
        $this->uccode = new uccode();
        if ($pms)
        {
            foreach ($pms as $key => $pm)
            {
                $pms[$key]['message'] = $this->uccode->complie($pms[$key]['message']);
            }
        }
        return $pms;
    }

    function onviewnum()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $touid = $this->input('touid');
        $isplid = $this->input('isplid');
        if (!$isplid)
        {
            $plid = $_ENV['pm']->getplidbytouid($this->user['uid'], $touid);
        }
        else
        {
            $plid = $touid;
        }
        $pmnum = $_ENV['pm']->getpmnumbyplid($this->user['uid'], $plid);
        return $pmnum;
    }

    function onviewnode()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $type = $this->input('type');
        $pmid = $this->input('pmid');
        $type = 0;
        $pms = $_ENV['pm']->getpmbypmid($this->user['uid'], $pmid);

        require_once UC_ROOT . 'lib/uccode.class.php';
        $this->uccode = new uccode();
        if ($pms)
        {
            foreach ($pms as $key => $pm)
            {
                $pms[$key]['message'] = $this->uccode->complie($pms[$key]['message']);
            }
        }
        $pms = $pms[0];
        return $pms;
    }

    function onchatpmmemberlist()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $plid = intval($this->input('plid'));
        return $_ENV['pm']->chatpmmemberlist($this->user['uid'], $plid);
    }

    function onkickchatpm()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $plid = intval($this->input('plid'));
        $touid = intval($this->input('touid'));
        return $_ENV['pm']->kickchatpm($plid, $this->user['uid'], $touid);
    }

    function onappendchatpm()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $plid = intval($this->input('plid'));
        $touid = intval($this->input('touid'));
        return $_ENV['pm']->appendchatpm($plid, $this->user['uid'], $touid);
    }

    function onblackls_get()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        return $_ENV['pm']->get_blackls($this->user['uid']);
    }

    function onblackls_set()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $blackls = $this->input('blackls');
        return $_ENV['pm']->set_blackls($this->user['uid'], $blackls);
    }

    function onblackls_add()
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $username = $this->input('username');
        return $_ENV['pm']->update_blackls($this->user['uid'], $username, 1);
    }

    function onblackls_delete($arr)
    {
        $this->init_input();
        $this->user['uid'] = intval($this->input('uid'));
        $username = $this->input('username');
        return $_ENV['pm']->update_blackls($this->user['uid'], $username, 2);
    }

}
