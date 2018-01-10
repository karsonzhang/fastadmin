<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
<?php

namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{

    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        return $this->view->fetch();
    }

    public function news()
    {
        $newslist = [];
<<<<<<< HEAD
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.ckido.com']);
    }

}
=======
<?php

namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{

    protected $layout = '';

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        return $this->view->fetch();
    }

    public function news()
    {
        $newslist = [];
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }

}
>>>>>>> master
=======
        return jsonp(['newslist' => $newslist, 'new' => count($newslist), 'url' => 'http://www.fastadmin.net?ref=news']);
    }

}
>>>>>>> parent of c7e97ae... Merge pull request #7 from karsonzhang/master
