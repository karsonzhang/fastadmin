/*
 FastAdmin Install SQL

 官网: http://www.fastadmin.net
 演示: http://demo.fastadmin.net

 Date: 06/14/2017 17:12:25 PM
*/

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `fa_admin`
-- ----------------------------
DROP TABLE IF EXISTS `fa_admin`;
CREATE TABLE `fa_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(50) NOT NULL DEFAULT '' COMMENT '昵称',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `salt` varchar(30) NOT NULL DEFAULT '' COMMENT '密码盐',
  `avatar` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `loginfailure` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '失败次数',
  `logintime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `token` varchar(59) NOT NULL DEFAULT '' COMMENT 'Session标识',
  `status` varchar(30) NOT NULL DEFAULT 'normal' COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员表';

-- ----------------------------
--  Records of `fa_admin`
-- ----------------------------
BEGIN;
INSERT INTO `fa_admin` VALUES ('1', 'admin', 'Admin', '075eaec83636846f51c152f29b98a2fd', 's4f3', '/assets/img/avatar.png', 'admin@fastadmin.net', '0', '1497070325', '1492186163', '1497070325', 'c586728f-0687-4e1a-84c0-c3b9f9003850', 'normal'), ('2', 'admin2', 'admin2', '9a28ce07ce875fbd14172a9ca5357d3c', '2dHDmj', '/assets/img/avatar.png', 'admin2@fastadmin.net', '0', '0', '1492186163', '1492186163', '', 'normal'), ('3', 'admin3', 'admin3', '1c11f945dfcd808a130a8c2a8753fe62', 'WOKJEn', '/assets/img/avatar.png', 'admin3@fastadmin.net', '0', '0', '1492186201', '1492186201', '', 'normal'), ('4', 'admin22', 'admin22', '1c1a0aa0c3c56a8c1a908aab94519648', 'Aybcn5', '/assets/img/avatar.png', 'admin22@fastadmin.net', '0', '0', '1492186240', '1492186240', '', 'normal'), ('5', 'admin32', 'admin32', 'ade94d5d7a7033afa7d84ac3066d0a02', 'FvYK0u', '/assets/img/avatar.png', 'admin32@fastadmin.net', '0', '0', '1492186263', '1492186263', '', 'normal'), ('6', 'test123', 'test', '2a9020e6ef15245399f00d5cda5fb1e6', 'unbBZH', '', 'test@163.com', '0', '1497062737', '1497062728', '1497070313', '', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_admin_log`
-- ----------------------------
DROP TABLE IF EXISTS `fa_admin_log`;
CREATE TABLE `fa_admin_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `admin_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '管理员ID',
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '管理员名字',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '操作页面',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '日志标题',
  `content` text NOT NULL COMMENT '内容',
  `ip` varchar(50) NOT NULL DEFAULT '' COMMENT 'IP',
  `useragent` varchar(255) NOT NULL DEFAULT '' COMMENT 'User-Agent',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '操作时间',
  PRIMARY KEY (`id`),
  KEY `name` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员日志表';

-- ----------------------------
--  Table structure for `fa_article`
-- ----------------------------
DROP TABLE IF EXISTS `fa_article`;
CREATE TABLE `fa_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID',
  `flag` set('h','i','r') NOT NULL DEFAULT '' COMMENT '标志',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `image` varchar(100) NOT NULL DEFAULT '' COMMENT '图片',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `comments` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论数',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` enum('normal','hidden') NOT NULL DEFAULT 'normal' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='文章表';

-- ----------------------------
--  Table structure for `fa_attachment`
-- ----------------------------
DROP TABLE IF EXISTS `fa_attachment`;
CREATE TABLE `fa_attachment` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '物理路径',
  `imagewidth` varchar(30) NOT NULL DEFAULT '' COMMENT '宽度',
  `imageheight` varchar(30) NOT NULL DEFAULT '' COMMENT '宽度',
  `imagetype` varchar(30) NOT NULL DEFAULT '' COMMENT '图片类型',
  `imageframes` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '图片帧数',
  `filesize` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  `mimetype` varchar(30) NOT NULL DEFAULT '' COMMENT 'mime类型',
  `extparam` varchar(255) NOT NULL DEFAULT '' COMMENT '透传数据',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建日期',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `uploadtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上传时间',
  `storage` enum('local','upyun') NOT NULL DEFAULT 'local' COMMENT '存储位置',
  `sha1` varchar(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sha1` (`sha1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='附件表';

-- ----------------------------
--  Table structure for `fa_auth_group`
-- ----------------------------
DROP TABLE IF EXISTS `fa_auth_group`;
CREATE TABLE `fa_auth_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父组别',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '组名',
  `rules` text NOT NULL COMMENT '规则ID',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='分组表';

-- ----------------------------
--  Records of `fa_auth_group`
-- ----------------------------
BEGIN;
INSERT INTO `fa_auth_group` VALUES ('1', '0', '超级管理员', '*', '1490883540', '1490883540', 'normal'), ('2', '1', '二级管理员', '11180,11181,11182,11183,11184,11185,11198,11199,11200,11201,11202,11203,11204,11205,11206,11207,11208,11209,11210,11211,11212,11213,11214,11215,11216,11217,11218,11219,11220,11221,11222,11223,11224,11225,11226,11227,11228,11229,11230,11231,11232,11233,11234,11235,11236,11237,11238,11239,11240,11241,11242,11243,11244,11245,11246,11247,11248,11249,11250,11251,11252,11253,11254,11255,11256,11257,11258,11259,11260,11261,11262,11263,11264,11265,11266,11267,11268,11269,11270,11271,11272,11273,11274,11275,11276,11277,11278,11279,11280,11281,11282,11283,11284,11285,11286,11287,11288,11289', '1490883540', '1497431170', 'normal'), ('3', '2', '三级管理员', '11180,11181,11182,11183,11184,11185,11198,11199,11200,11201,11202,11203,11204,11205,11206,11207,11208,11209,11210,11211,11212,11213,11214,11215,11216,11217', '1490883540', '1497431183', 'normal'), ('4', '1', '二级管理员2', '11174,11175,11176,11177,11178,11179,11180,11181,11182,11183,11184,11185,11290,11291,11292,11293,11294,11295,11296,11297,11298,11299,11300,11301,11302,11303,11304,11305,11306,11307,11308,11309,11310,11311,11312,11313,11314,11315,11316', '1490883540', '1497431177', 'normal'), ('5', '2', '三级管理员2', '11180,11181,11182,11183,11184,11185,11218,11219,11220,11221,11222,11223,11224,11225,11226,11227,11228,11229,11230,11231,11232,11233,11234,11235,11236,11237,11238,11239,11240,11241,11242,11243,11244,11245,11246,11247,11248,11249,11250,11251,11252,11253,11254,11255,11256,11257,11258,11259,11260,11261,11262,11263,11264,11265,11266,11267,11268,11269,11270,11271,11272,11273,11274,11275,11276,11277,11278,11279,11280,11281,11282,11283,11284,11285,11286,11287,11288,11289', '1490883540', '1497431190', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_auth_group_access`
-- ----------------------------
DROP TABLE IF EXISTS `fa_auth_group_access`;
CREATE TABLE `fa_auth_group_access` (
  `uid` int(10) unsigned NOT NULL COMMENT '会员ID',
  `group_id` int(10) unsigned NOT NULL COMMENT '级别ID',
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限分组表';

-- ----------------------------
--  Records of `fa_auth_group_access`
-- ----------------------------
BEGIN;
INSERT INTO `fa_auth_group_access` VALUES ('1', '1'), ('2', '2'), ('3', '3'), ('4', '5'), ('5', '5'), ('6', '2');
COMMIT;

-- ----------------------------
--  Table structure for `fa_auth_rule`
-- ----------------------------
DROP TABLE IF EXISTS `fa_auth_rule`;
CREATE TABLE `fa_auth_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('menu','file') NOT NULL DEFAULT 'file' COMMENT 'menu为菜单,file为权限节点',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '规则名称',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '规则名称',
  `icon` varchar(50) NOT NULL DEFAULT '' COMMENT '图标',
  `condition` varchar(255) NOT NULL DEFAULT '' COMMENT '条件',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `ismenu` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否为菜单',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE,
  KEY `pid` (`pid`),
  KEY `weigh` (`weigh`)
) ENGINE=InnoDB AUTO_INCREMENT=11317 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='节点表';

-- ----------------------------
--  Records of `fa_auth_rule`
-- ----------------------------
BEGIN;
INSERT INTO `fa_auth_rule` VALUES ('11174', 'file', '0', '/admin/category', '分类管理', 'fa fa-list\r', '', '用于统一管理网站的所有分类,分类可进行无限级分类\r', '1', '1497429920', '1497429920', '119', 'normal'), ('11175', 'file', '11174', '/admin/category/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '142', 'normal'), ('11176', 'file', '11174', '/admin/category/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '141', 'normal'), ('11177', 'file', '11174', '/admin/category/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '140', 'normal'), ('11178', 'file', '11174', '/admin/category/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '139', 'normal'), ('11179', 'file', '11174', '/admin/category/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '138', 'normal'), ('11180', 'file', '0', '/admin/dashboard', '控制台', 'fa fa-dashboard\r', '', '用于展示当前系统中的统计数据、统计报表及重要实时数据\r', '1', '1497429920', '1497429920', '143', 'normal'), ('11181', 'file', '11180', '/admin/dashboard/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '136', 'normal'), ('11182', 'file', '11180', '/admin/dashboard/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '135', 'normal'), ('11183', 'file', '11180', '/admin/dashboard/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '134', 'normal'), ('11184', 'file', '11180', '/admin/dashboard/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '133', 'normal'), ('11185', 'file', '11180', '/admin/dashboard/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '132', 'normal'), ('11186', 'file', '0', '/admin/page', '单页管理', 'fa fa-tags', '', '用于管理普通的单页面,通常用于关于我们、联系我们、商务合作等单一页面\r\n', '1', '1497429920', '1497430149', '125', 'normal'), ('11187', 'file', '11186', '/admin/page/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '130', 'normal'), ('11188', 'file', '11186', '/admin/page/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '129', 'normal'), ('11189', 'file', '11186', '/admin/page/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '128', 'normal'), ('11190', 'file', '11186', '/admin/page/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '127', 'normal'), ('11191', 'file', '11186', '/admin/page/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '126', 'normal'), ('11192', 'file', '0', '/admin/version', '版本管理', 'fa fa-file-text-o', '', '', '1', '1497429920', '1497430600', '27', 'normal'), ('11193', 'file', '11192', '/admin/version/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '124', 'normal'), ('11194', 'file', '11192', '/admin/version/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '123', 'normal'), ('11195', 'file', '11192', '/admin/version/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '122', 'normal'), ('11196', 'file', '11192', '/admin/version/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '121', 'normal'), ('11197', 'file', '11192', '/admin/version/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '120', 'normal'), ('11198', 'file', '0', '/admin/auth', '权限管理', 'fa fa-group', '', '', '1', '1497429920', '1497430092', '99', 'normal'), ('11199', 'file', '11198', '/admin/auth/admin', '管理员管理', 'fa fa-user', '', '一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成', '1', '1497429920', '1497430320', '118', 'normal'), ('11200', 'file', '11199', '/admin/auth/admin/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '117', 'normal'), ('11201', 'file', '11199', '/admin/auth/admin/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '116', 'normal'), ('11202', 'file', '11199', '/admin/auth/admin/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '115', 'normal'), ('11203', 'file', '11199', '/admin/auth/admin/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '114', 'normal'), ('11204', 'file', '11198', '/admin/auth/adminlog', '管理员日志', 'fa fa-list-alt', '', '管理员可以查看自己所拥有的权限的管理员日志', '1', '1497429920', '1497430307', '113', 'normal'), ('11205', 'file', '11204', '/admin/auth/adminlog/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '112', 'normal'), ('11206', 'file', '11204', '/admin/auth/adminlog/detail', '详情', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '111', 'normal'), ('11207', 'file', '11204', '/admin/auth/adminlog/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '110', 'normal'), ('11208', 'file', '11198', '/admin/auth/group', '角色组', 'fa fa-group', '', '角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别下级的角色组或管理员', '1', '1497429920', '1497429920', '109', 'normal'), ('11209', 'file', '11208', '/admin/auth/group/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '108', 'normal'), ('11210', 'file', '11208', '/admin/auth/group/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '107', 'normal'), ('11211', 'file', '11208', '/admin/auth/group/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '106', 'normal'), ('11212', 'file', '11208', '/admin/auth/group/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '105', 'normal'), ('11213', 'file', '11198', '/admin/auth/rule', '规则管理', 'fa fa-bars', '', '规则通常对应一个控制器的方法,同时左侧的菜单栏数据也从规则中体现,通常建议通过控制台进行生成规则节点', '1', '1497429920', '1497430581', '104', 'normal'), ('11214', 'file', '11213', '/admin/auth/rule/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '103', 'normal'), ('11215', 'file', '11213', '/admin/auth/rule/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '102', 'normal'), ('11216', 'file', '11213', '/admin/auth/rule/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '101', 'normal'), ('11217', 'file', '11213', '/admin/auth/rule/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '100', 'normal'), ('11218', 'file', '0', '/admin/example', '示例管理', 'fa fa-magic', '', '', '1', '1497429920', '1497430123', '131', 'normal'), ('11219', 'file', '11218', '/admin/example/bootstraptable', '表格完整示例', 'fa fa-table', '', '在使用Bootstrap-table中的常用方式,更多使用方式可查看:http://bootstrap-table.wenzhixin.net.cn/zh-cn/', '1', '1497429920', '1497429920', '98', 'normal'), ('11220', 'file', '11219', '/admin/example/bootstraptable/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '97', 'normal'), ('11221', 'file', '11219', '/admin/example/bootstraptable/detail', '详情', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '96', 'normal'), ('11222', 'file', '11219', '/admin/example/bootstraptable/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '95', 'normal'), ('11223', 'file', '11219', '/admin/example/bootstraptable/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '94', 'normal'), ('11224', 'file', '11219', '/admin/example/bootstraptable/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '93', 'normal'), ('11225', 'file', '11219', '/admin/example/bootstraptable/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '92', 'normal'), ('11226', 'file', '11218', '/admin/example/colorbadge', '彩色角标', 'fa fa-table', '', '在JS端控制角标的显示与隐藏,请注意左侧菜单栏角标的数值变化', '1', '1497429920', '1497429920', '91', 'normal'), ('11227', 'file', '11226', '/admin/example/colorbadge/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '90', 'normal'), ('11228', 'file', '11226', '/admin/example/colorbadge/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '89', 'normal'), ('11229', 'file', '11226', '/admin/example/colorbadge/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '88', 'normal'), ('11230', 'file', '11226', '/admin/example/colorbadge/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '87', 'normal'), ('11231', 'file', '11226', '/admin/example/colorbadge/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '86', 'normal'), ('11232', 'file', '11218', '/admin/example/controllerjump', '控制器间跳转', 'fa fa-table', '', 'FastAdmin支持在控制器间跳转,点击后将切换到另外一个TAB中,无需刷新当前页面', '1', '1497429920', '1497429920', '85', 'normal'), ('11233', 'file', '11232', '/admin/example/controllerjump/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '84', 'normal'), ('11234', 'file', '11232', '/admin/example/controllerjump/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '83', 'normal'), ('11235', 'file', '11232', '/admin/example/controllerjump/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '82', 'normal'), ('11236', 'file', '11232', '/admin/example/controllerjump/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '81', 'normal'), ('11237', 'file', '11232', '/admin/example/controllerjump/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '80', 'normal'), ('11238', 'file', '11218', '/admin/example/cxselect', '多级联动', 'fa fa-table', '', 'FastAdmin使用了jQuery-cxselect实现多级联动,更多文档请参考https://github.com/karsonzhang/cxSelect', '1', '1497429920', '1497429920', '79', 'normal'), ('11239', 'file', '11238', '/admin/example/cxselect/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '78', 'normal'), ('11240', 'file', '11238', '/admin/example/cxselect/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '77', 'normal'), ('11241', 'file', '11238', '/admin/example/cxselect/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '76', 'normal'), ('11242', 'file', '11238', '/admin/example/cxselect/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '75', 'normal'), ('11243', 'file', '11238', '/admin/example/cxselect/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '74', 'normal'), ('11244', 'file', '11218', '/admin/example/multitable', '多表格示例', 'fa fa-table', '', '当一个页面上存在多个Bootstrap-table时该如何控制按钮和表格', '1', '1497429920', '1497429920', '73', 'normal'), ('11245', 'file', '11244', '/admin/example/multitable/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '72', 'normal'), ('11246', 'file', '11244', '/admin/example/multitable/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '71', 'normal'), ('11247', 'file', '11244', '/admin/example/multitable/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '70', 'normal'), ('11248', 'file', '11244', '/admin/example/multitable/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '69', 'normal'), ('11249', 'file', '11244', '/admin/example/multitable/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '68', 'normal'), ('11250', 'file', '11218', '/admin/example/relationmodel', '多模型关联', 'fa fa-table', '', '当使用到关联模型时需要重载index方法', '1', '1497429920', '1497429920', '67', 'normal'), ('11251', 'file', '11250', '/admin/example/relationmodel/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '66', 'normal'), ('11252', 'file', '11250', '/admin/example/relationmodel/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '65', 'normal'), ('11253', 'file', '11250', '/admin/example/relationmodel/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '64', 'normal'), ('11254', 'file', '11250', '/admin/example/relationmodel/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '63', 'normal'), ('11255', 'file', '11250', '/admin/example/relationmodel/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '62', 'normal'), ('11256', 'file', '0', '/admin/general', '常规管理', 'fa fa-cogs', '', '', '1', '1497429920', '1497430169', '137', 'normal'), ('11257', 'file', '11256', '/admin/general/attachment', '附件管理', 'fa fa-file-image-o', '', '主要用于管理上传到又拍云的数据或上传至本服务的上传数据\r\n', '1', '1497429920', '1497430699', '53', 'normal'), ('11258', 'file', '11257', '/admin/general/attachment/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '59', 'normal'), ('11259', 'file', '11257', '/admin/general/attachment/select', '选择附件', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '58', 'normal'), ('11260', 'file', '11257', '/admin/general/attachment/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '57', 'normal'), ('11261', 'file', '11257', '/admin/general/attachment/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '56', 'normal'), ('11262', 'file', '11257', '/admin/general/attachment/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '55', 'normal'), ('11263', 'file', '11257', '/admin/general/attachment/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '54', 'normal'), ('11264', 'file', '11256', '/admin/general/config', '系统配置', 'fa fa-cog', '', '', '1', '1497429920', '1497430683', '60', 'normal'), ('11265', 'file', '11264', '/admin/general/config/index', 'index', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '52', 'normal'), ('11266', 'file', '11264', '/admin/general/config/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '51', 'normal'), ('11267', 'file', '11264', '/admin/general/config/edit', 'edit', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '50', 'normal'), ('11268', 'file', '11264', '/admin/general/config/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '49', 'normal'), ('11269', 'file', '11264', '/admin/general/config/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '48', 'normal'), ('11270', 'file', '11256', '/admin/general/crontab', '定时任务', 'fa fa-tasks', '', '类似于Linux的Crontab定时任务,可以按照设定的时间进行任务的执行,目前仅支持三种任务:请求URL、执行SQL、执行Shell', '1', '1497429920', '1497429920', '47', 'normal'), ('11271', 'file', '11270', '/admin/general/crontab/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '46', 'normal'), ('11272', 'file', '11270', '/admin/general/crontab/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '45', 'normal'), ('11273', 'file', '11270', '/admin/general/crontab/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '44', 'normal'), ('11274', 'file', '11270', '/admin/general/crontab/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '43', 'normal'), ('11275', 'file', '11270', '/admin/general/crontab/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '42', 'normal'), ('11276', 'file', '11256', '/admin/general/database', '数据库管理', 'fa fa-database', '', '可在线进行一些简单的数据库表优化或修复,查看表结构和数据。也可以进行SQL语句的操作', '1', '1497429920', '1497429920', '41', 'normal'), ('11277', 'file', '11276', '/admin/general/database/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '40', 'normal'), ('11278', 'file', '11276', '/admin/general/database/query', 'SQL查询', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '39', 'normal'), ('11279', 'file', '11276', '/admin/general/database/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '38', 'normal'), ('11280', 'file', '11276', '/admin/general/database/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '37', 'normal'), ('11281', 'file', '11276', '/admin/general/database/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '36', 'normal'), ('11282', 'file', '11276', '/admin/general/database/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '35', 'normal'), ('11283', 'file', '11256', '/admin/general/profile', '个人配置', 'fa fa-user\r', '', '', '1', '1497429920', '1497429920', '34', 'normal'), ('11284', 'file', '11283', '/admin/general/profile/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '33', 'normal'), ('11285', 'file', '11283', '/admin/general/profile/update', '更新个人信息', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '32', 'normal'), ('11286', 'file', '11283', '/admin/general/profile/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '31', 'normal'), ('11287', 'file', '11283', '/admin/general/profile/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '30', 'normal'), ('11288', 'file', '11283', '/admin/general/profile/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '29', 'normal'), ('11289', 'file', '11283', '/admin/general/profile/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '28', 'normal'), ('11290', 'file', '0', '/admin/wechat', '微信管理', 'fa fa-wechat', '', '', '1', '1497429920', '1497430064', '61', 'normal'), ('11291', 'file', '11290', '/admin/wechat/autoreply', '微信自动回复管理', 'fa fa-reply-all', '', '', '1', '1497429920', '1497430619', '26', 'normal'), ('11292', 'file', '11291', '/admin/wechat/autoreply/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '25', 'normal'), ('11293', 'file', '11291', '/admin/wechat/autoreply/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '24', 'normal'), ('11294', 'file', '11291', '/admin/wechat/autoreply/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '23', 'normal'), ('11295', 'file', '11291', '/admin/wechat/autoreply/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '22', 'normal'), ('11296', 'file', '11291', '/admin/wechat/autoreply/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '21', 'normal'), ('11297', 'file', '11290', '/admin/wechat/config', '微信配置管理', 'fa fa-cog', '', '', '1', '1497429920', '1497430632', '20', 'normal'), ('11298', 'file', '11297', '/admin/wechat/config/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '19', 'normal'), ('11299', 'file', '11297', '/admin/wechat/config/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '18', 'normal'), ('11300', 'file', '11297', '/admin/wechat/config/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '17', 'normal'), ('11301', 'file', '11297', '/admin/wechat/config/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '16', 'normal'), ('11302', 'file', '11297', '/admin/wechat/config/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '15', 'normal'), ('11303', 'file', '11290', '/admin/wechat/menu', '菜单管理', 'fa fa-bars', '', '', '1', '1497429920', '1497430652', '14', 'normal'), ('11304', 'file', '11303', '/admin/wechat/menu/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '13', 'normal'), ('11305', 'file', '11303', '/admin/wechat/menu/edit', '修改', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '12', 'normal'), ('11306', 'file', '11303', '/admin/wechat/menu/sync', '同步', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '11', 'normal'), ('11307', 'file', '11303', '/admin/wechat/menu/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '10', 'normal'), ('11308', 'file', '11303', '/admin/wechat/menu/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '9', 'normal'), ('11309', 'file', '11303', '/admin/wechat/menu/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '8', 'normal'), ('11310', 'file', '11290', '/admin/wechat/response', '资源管理', 'fa fa-list-alt', '', '', '1', '1497429920', '1497429920', '7', 'normal'), ('11311', 'file', '11310', '/admin/wechat/response/select', '选择素材', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '6', 'normal'), ('11312', 'file', '11310', '/admin/wechat/response/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '5', 'normal'), ('11313', 'file', '11310', '/admin/wechat/response/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '4', 'normal'), ('11314', 'file', '11310', '/admin/wechat/response/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '3', 'normal'), ('11315', 'file', '11310', '/admin/wechat/response/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '2', 'normal'), ('11316', 'file', '11310', '/admin/wechat/response/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '1', 'normal'),('11317', 'file', '11218', '/admin/example/tabletemplate', '表格模板示例', 'fa fa-table', '', '可以通过使用表格模板将表格中的行渲染成一样的展现方式，基于此功能可以任意定制自己想要的展示列表', '1', '1497968508', '1497968508', '0', 'normal'), ('11318', 'file', '11317', '/admin/example/tabletemplate/index', '查看', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal'), ('11319', 'file', '11317', '/admin/example/tabletemplate/detail', '详情', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal'), ('11320', 'file', '11317', '/admin/example/tabletemplate/add', '添加', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal'), ('11321', 'file', '11317', '/admin/example/tabletemplate/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal'), ('11322', 'file', '11317', '/admin/example/tabletemplate/del', '删除', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal'), ('11323', 'file', '11317', '/admin/example/tabletemplate/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497968508', '1497968508', '0', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_category`
-- ----------------------------
DROP TABLE IF EXISTS `fa_category`;
CREATE TABLE `fa_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '栏目类型',
  `name` varchar(30) NOT NULL DEFAULT '',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `flag` set('hot','index','recommend') NOT NULL DEFAULT '',
  `image` varchar(100) NOT NULL DEFAULT '' COMMENT '图片',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `diyname` varchar(30) NOT NULL DEFAULT '' COMMENT '自定义名称',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `weigh` (`weigh`,`id`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='分类表';

-- ----------------------------
--  Records of `fa_category`
-- ----------------------------
BEGIN;
INSERT INTO `fa_category` VALUES ('1', '0', 'page', '官方新闻', 'news', 'recommend', '', '', '', 'news', '1495262190', '1495262190', '0', 'normal'), ('2', '0', 'page', '移动应用', 'mobileapp', 'hot', '', '', '', 'mobileapp', '1495262244', '1495262244', '0', 'normal'), ('3', '2', 'page', '微信公众号', 'wechatpublic', 'index', '', '', '', 'wechatpublic', '1495262288', '1495262288', '0', 'normal'), ('4', '2', 'page', 'Android开发', 'android', 'recommend', '', '', '', 'android', '1495262317', '1495262317', '0', 'normal'), ('5', '0', 'page', '软件产品', 'software', 'recommend', '', '', '', 'software', '1495262336', '1495262336', '0', 'normal'), ('6', '5', 'page', '网站建站', 'website', 'recommend', '', '', '', 'website', '1495262357', '1495262357', '0', 'normal'), ('7', '5', 'page', '企业管理软件', 'company', 'index', '', '', '', 'company', '1495262391', '1495262391', '0', 'normal'), ('8', '6', 'page', 'PC端', 'website-pc', 'recommend', '', '', '', 'website-pc', '1495262424', '1495262424', '0', 'normal'), ('9', '6', 'page', '移动端', 'website-mobile', 'recommend', '', '', '', 'website-mobile', '1495262456', '1495262456', '0', 'normal'), ('10', '7', 'page', 'CRM系统 ', 'company-crm', 'recommend', '', '', '', 'company-crm', '1495262487', '1495262487', '0', 'normal'), ('11', '7', 'page', 'SASS平台软件', 'company-sass', 'recommend', '', '', '', 'company-sass', '1495262515', '1495262515', '0', 'normal'), ('12', '0', 'test', '测试1', 'test1', 'recommend', '', '', '', '', '1497015727', '1497015727', '0', 'normal'), ('13', '0', 'test', '测试2', 'test2', 'recommend', '', '', '', '', '1497015738', '1497015738', '0', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_config`
-- ----------------------------
DROP TABLE IF EXISTS `fa_config`;
CREATE TABLE `fa_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '变量名',
  `group` varchar(30) NOT NULL DEFAULT '' COMMENT '分组',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '变量标题',
  `tip` varchar(100) NOT NULL DEFAULT '' COMMENT '变量描述',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '类型:string,text,int,bool,array,datetime,date,file',
  `value` text NOT NULL COMMENT '变量值',
  `content` text NOT NULL COMMENT '变量字典数据',
  `rule` varchar(100) NOT NULL DEFAULT '' COMMENT '验证规则',
  `extend` varchar(255) NOT NULL DEFAULT '' COMMENT '扩展属性',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='系统配置';

-- ----------------------------
--  Records of `fa_config`
-- ----------------------------
BEGIN;
INSERT INTO `fa_config` VALUES ('1', 'name', 'basic', '站点名称', '请填写站点名称', 'string', 'FastAdmin', '', 'required', ''), ('2', 'beian', 'basic', '备案号', '粤ICP备15054802号-4', 'string', '', '', '', ''), ('3', 'cdnurl', 'basic', 'CDN地址', '如果使用CDN云储存请配置该值', 'string', '', '', '', ''), ('4', 'version', 'basic', '版本号', '如果静态资源有变动请重新配置该值', 'string', '1.0.1', '', 'required', ''), ('5', 'timezone', 'basic', '时区', '', 'string', 'Asia/Shanghai', '', 'required', ''), ('6', 'forbiddenip', 'basic', '禁止访问IP', '一行一条记录', 'text', '', '', '', ''), ('7', 'languages', 'basic', '模块语言', '', 'array', '{\"backend\":\"zh-cn\",\"frontend\":\"zh-cn\"}', '', 'required', ''), ('8', 'fixedpage', 'basic', '后台默认页', '请尽量输入左侧菜单栏存在的链接', 'string', 'dashboard', '', 'required', ''), ('9', 'categorytype', 'dictionary', '分类类型', '', 'array', '{\"default\":\"默认\",\"page\":\"单页\",\"article\":\"文章\",\"test\":\"测试\"}', '', '', ''), ('10', 'configgroup', 'dictionary', '配置分组', '', 'array', '{\"basic\":\"基础配置\",\"email\":\"邮件配置\",\"dictionary\":\"字典配置\",\"user\":\"会员配置\",\"example\":\"示例分组\"}', '', '', ''),('11','mail_type','email','邮件发送方式','选择邮件发送方式','select','1','[\"请选择\",\"SMTP\",\"mail()函数\"]','',''),('12','mail_smtp_host','email','SMTP[服务器]','错误的配置发送邮件会导致服务器超时','string','smtp.qq.com','','',''),('13','mail_smtp_port','email','SMTP[端口]','(不加密默认25,SSL默认465,TLS默认587)','string','465','','',''),('14','mail_smtp_user','email','SMTP[用户名]','（填写完整用户名）','string','10000','','',''),('15','mail_smtp_pass','email','SMTP[密码]','（填写您的密码）','string','password','','',''),('16','mail_verify_type','email','SMTP验证方式','（SMTP验证方式[推荐SSL]）','select','2','[\"无\",\"TLS\",\"SSL\"]','',''),('17','mail_from','email','发件人邮箱','','string','10000@qq.com','','','');
COMMIT;

-- ----------------------------
--  Table structure for `fa_configvalue`
-- ----------------------------
DROP TABLE IF EXISTS `fa_configvalue`;
CREATE TABLE `fa_configvalue` (
  `id` varchar(30) NOT NULL DEFAULT '' COMMENT '配置ID',
  `name` varchar(300) NOT NULL DEFAULT '' COMMENT '配置名称',
  `content` varchar(1500) NOT NULL DEFAULT '' COMMENT '配置内容',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT 'normal' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='配置表';

-- ----------------------------
--  Records of `fa_configvalue`
-- ----------------------------
BEGIN;
INSERT INTO `fa_configvalue` VALUES ('qqun', 'QQ群: 636393962', '{\"qqun\":\"636393962\"}', '1493475993', '1493475993', '2', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_crontab`
-- ----------------------------
DROP TABLE IF EXISTS `fa_crontab`;
CREATE TABLE `fa_crontab` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `type` varchar(10) NOT NULL DEFAULT '' COMMENT '事件类型',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '事件标题',
  `content` text NOT NULL COMMENT '事件内容',
  `schedule` varchar(100) NOT NULL DEFAULT '' COMMENT 'Crontab格式',
  `sleep` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '延迟秒数执行',
  `maximums` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大执行次数 0为不限',
  `executes` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '已经执行的次数',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `begintime` int(10) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `endtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '结束时间',
  `executetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后执行时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` enum('completed','expired','hidden','normal') NOT NULL DEFAULT 'normal' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='定时任务表';

-- ----------------------------
--  Records of `fa_crontab`
-- ----------------------------
BEGIN;
INSERT INTO `fa_crontab` VALUES ('1', 'url', '请求FastAdmin', 'http://www.fastadmin.net', '* * * * *', '0', '0', '0', '1497070825', '1497070825', '1483200000', '1546272000', '0', '0', 'normal'), ('2', 'sql', '查询一条SQL', 'SELECT 1;', '* * * * *', '0', '0', '0', '1497071095', '1497071095', '1483200000', '1546272000', '0', '0', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_main`
-- ----------------------------
DROP TABLE IF EXISTS `fa_main`;
CREATE TABLE `fa_main` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `createtime` int(10) NOT NULL,
  `updatetime` int(10) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='主表';

-- ----------------------------
--  Records of `fa_main`
-- ----------------------------
BEGIN;
INSERT INTO `fa_main` VALUES ('1', '我是第一条', '/', 'fsdfds', '0', '0', 'normal'), ('2', '我是第二条', '/', 'fdsdsfd', '0', '0', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_main_multi`
-- ----------------------------
DROP TABLE IF EXISTS `fa_main_multi`;
CREATE TABLE `fa_main_multi` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `main_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `createtime` int(10) NOT NULL,
  `updatetime` int(10) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='多子表';

-- ----------------------------
--  Records of `fa_main_multi`
-- ----------------------------
BEGIN;
INSERT INTO `fa_main_multi` VALUES ('1', '1', 't1', 'i1', '', '0', '0', 'test'), ('2', '1', 't2', 'i2', '', '0', '0', ''), ('3', '2', 'tt2', 'i3', '', '0', '0', ' sdfds');
COMMIT;

-- ----------------------------
--  Table structure for `fa_main_single`
-- ----------------------------
DROP TABLE IF EXISTS `fa_main_single`;
CREATE TABLE `fa_main_single` (
  `main_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL COMMENT '内容',
  `image` varchar(100) NOT NULL COMMENT '图片',
  `content` text NOT NULL,
  `createtime` int(10) NOT NULL,
  `updatetime` int(10) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`main_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单子表';

-- ----------------------------
--  Records of `fa_main_single`
-- ----------------------------
BEGIN;
INSERT INTO `fa_main_single` VALUES ('1', '子表title', '//', 'aaaa', '0', '0', 'test'), ('2', '子表', 'fsdfds', 'bbb', '0', '0', 'fsdfds');
COMMIT;

-- ----------------------------
--  Table structure for `fa_page`
-- ----------------------------
DROP TABLE IF EXISTS `fa_page`;
CREATE TABLE `fa_page` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) NOT NULL DEFAULT '0' COMMENT '分类ID',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `flag` set('hot','index','recommend') NOT NULL DEFAULT '' COMMENT '标志',
  `image` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `content` text NOT NULL COMMENT '内容',
  `icon` varchar(50) NOT NULL DEFAULT '' COMMENT '图标',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `comments` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='单页表';

-- ----------------------------
--  Table structure for `fa_test`
-- ----------------------------
DROP TABLE IF EXISTS `fa_test`;
CREATE TABLE `fa_test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID(单选)',
  `category_ids` varchar(100) NOT NULL DEFAULT '' COMMENT '分类ID(多选)',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '会员ID',
  `user_ids` varchar(100) NOT NULL DEFAULT '' COMMENT '多会员ID',
  `week` enum('monday','tuesday','wednesday') NOT NULL COMMENT '星期(单选)',
  `flag` set('hot','index','recommend') NOT NULL DEFAULT '' COMMENT '标志(多选)',
  `genderdata` enum('male','female') NOT NULL DEFAULT 'male' COMMENT '性别(单选)',
  `hobbydata` set('music','reading','swimming') NOT NULL COMMENT '爱好(多选)',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `image` varchar(100) NOT NULL DEFAULT '' COMMENT '图片',
  `images` varchar(1500) NOT NULL DEFAULT '' COMMENT '图片组',
  `attachfile` varchar(100) NOT NULL DEFAULT '' COMMENT '附件',
  `keywords` varchar(100) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `price` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '价格',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `startdate` date DEFAULT NULL COMMENT '开始日期',
  `activitytime` datetime DEFAULT NULL COMMENT '活动时间(datetime)',
  `year` year(4) DEFAULT NULL COMMENT '年',
  `times` time DEFAULT NULL COMMENT '时间',
  `refreshtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '刷新时间(int)',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` enum('normal','hidden') NOT NULL DEFAULT 'normal' COMMENT '状态',
  `state` enum('0','1','2') NOT NULL DEFAULT '1' COMMENT '状态值:0=禁用,1=正常,2=推荐',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='测试表';

-- ----------------------------
--  Table structure for `fa_user`
-- ----------------------------
DROP TABLE IF EXISTS `fa_user`;
CREATE TABLE `fa_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(50) NOT NULL DEFAULT '' COMMENT '昵称',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `salt` varchar(30) NOT NULL DEFAULT '' COMMENT '密码盐',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `mobile` varchar(11) NOT NULL DEFAULT '' COMMENT '手机号',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `level` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '等级',
  `gender` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '性别',
  `birthday` date NOT NULL COMMENT '生日',
  `score` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '积分',
  `prevtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `loginfailure` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '失败次数',
  `logintime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `loginip` varchar(50) NOT NULL DEFAULT '' COMMENT '登录IP',
  `joinip` varchar(50) NOT NULL DEFAULT '' COMMENT '加入时间',
  `jointime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '加入时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `email` (`email`),
  KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='会员表';

-- ----------------------------
--  Records of `fa_user`
-- ----------------------------
BEGIN;
INSERT INTO `fa_user` VALUES ('3', 'admin', 'admin', 'c13f62012fd6a8fdf06b3452a94430e5', 'rpR6Bv', 'admin@163.com', '13888888888', '/assets/img/avatar.png', '0', '0', '2017-04-15', '0', '1491822015', '0', '1491822038', '127.0.0.1', '127.0.0.1', '1491461418', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_user_signin`
-- ----------------------------
DROP TABLE IF EXISTS `fa_user_signin`;
CREATE TABLE `fa_user_signin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '会员ID',
  `successions` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '连续签到次数',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员签到表';

-- ----------------------------
--  Table structure for `fa_user_third`
-- ----------------------------
DROP TABLE IF EXISTS `fa_user_third`;
CREATE TABLE `fa_user_third` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '会员ID',
  `platform` enum('weibo','wechat','qq') NOT NULL COMMENT '第三方应用',
  `openid` varchar(50) NOT NULL DEFAULT '' COMMENT '第三方唯一ID',
  `openname` varchar(50) NOT NULL DEFAULT '' COMMENT '第三方会员昵称',
  `access_token` varchar(100) NOT NULL DEFAULT '',
  `refresh_token` varchar(100) NOT NULL DEFAULT '',
  `expires_in` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '有效期',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `logintime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `expiretime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '过期时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `platform` (`platform`,`openid`),
  KEY `user_id` (`user_id`,`platform`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员连接表';

-- ----------------------------
--  Table structure for `fa_version`
-- ----------------------------
DROP TABLE IF EXISTS `fa_version`;
CREATE TABLE `fa_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `oldversion` varchar(30) NOT NULL DEFAULT '' COMMENT '旧版本号',
  `newversion` varchar(30) NOT NULL DEFAULT '' COMMENT '新版本号',
  `packagesize` varchar(30) NOT NULL DEFAULT '' COMMENT '包大小',
  `content` varchar(500) NOT NULL DEFAULT '' COMMENT '升级内容',
  `downloadurl` varchar(255) NOT NULL DEFAULT '' COMMENT '下载地址',
  `enforce` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '强制更新',
  `createtime` int(10) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='版本表';

-- ----------------------------
--  Records of `fa_version`
-- ----------------------------
BEGIN;
INSERT INTO `fa_version` VALUES ('1', '1.1.1,2', '1.2.1', '20M', '更新内容', 'http://www.downloadurl.com', '1', '1400000000', '0', '0', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_wechat_autoreply`
-- ----------------------------
DROP TABLE IF EXISTS `fa_wechat_autoreply`;
CREATE TABLE `fa_wechat_autoreply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `text` varchar(100) NOT NULL DEFAULT '' COMMENT '触发文本',
  `eventkey` varchar(50) NOT NULL DEFAULT '' COMMENT '响应事件',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信自动回复表';

-- ----------------------------
--  Records of `fa_wechat_autoreply`
-- ----------------------------
BEGIN;
INSERT INTO `fa_wechat_autoreply` VALUES ('1', '输入hello', 'hello', '58c7d908c4570', '123', '1493366855', '1493366855', 'normal'), ('2', '输入你好', '你好', '58fdfaa9e1965', 'sad', '1493704976', '1493704976', 'normal');
COMMIT;

-- ----------------------------
--  Table structure for `fa_wechat_config`
-- ----------------------------
DROP TABLE IF EXISTS `fa_wechat_config`;
CREATE TABLE `fa_wechat_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '配置名称',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '配置标题',
  `value` text NOT NULL COMMENT '配置值',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信配置表';

-- ----------------------------
--  Records of `fa_wechat_config`
-- ----------------------------
BEGIN;
INSERT INTO `fa_wechat_config` VALUES ('1', 'menu', '微信菜单', '[{\"name\":\"FastAdmin\",\"sub_button\":[{\"name\":\"官网\",\"type\":\"view\",\"url\":\"http:\\/\\/www.fastadmin.net\"},{\"name\":\"在线演示\",\"type\":\"view\",\"url\":\"http:\\/\\/demo.fastadmin.net\"},{\"name\":\"文档\",\"type\":\"view\",\"url\":\"http:\\/\\/doc.fastadmin.net\"}]},{\"name\":\"在线客服\",\"type\":\"click\",\"key\":\"58cb852984970\"},{\"name\":\"关于我们\",\"type\":\"click\",\"key\":\"58bf944aa0777\"}]', '1497398820', '1497422985'), ('2', 'service', '客服配置', '{\"onlinetime\":\"09:00-18:00\",\"offlinemsg\":\"请在工作时间联系客服！\",\"nosessionmsg\":\"当前没有客服在线！请稍后重试！\",\"waitformsg\":\"请问有什么可以帮到您？\"}', '1497429674', '1497429674'), ('3', 'signin', '连续登录配置', '{\"s1\":\"100\",\"s2\":\"200\",\"s3\":\"300\",\"sn\":\"500\"}', '1497429711', '1497429711');
COMMIT;

-- ----------------------------
--  Table structure for `fa_wechat_context`
-- ----------------------------
DROP TABLE IF EXISTS `fa_wechat_context`;
CREATE TABLE `fa_wechat_context` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) NOT NULL DEFAULT '',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '类型',
  `eventkey` varchar(64) NOT NULL DEFAULT '',
  `command` varchar(64) NOT NULL DEFAULT '',
  `message` varchar(255) NOT NULL DEFAULT '' COMMENT '内容',
  `refreshtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后刷新时间',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信上下文表';

-- ----------------------------
--  Table structure for `fa_wechat_response`
-- ----------------------------
DROP TABLE IF EXISTS `fa_wechat_response`;
CREATE TABLE `fa_wechat_response` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '资源名',
  `eventkey` varchar(128) NOT NULL DEFAULT '' COMMENT '事件',
  `type` enum('text','image','news','voice','video','music','link','app') NOT NULL DEFAULT 'text' COMMENT '类型',
  `content` text NOT NULL COMMENT '内容',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `event` (`eventkey`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信资源表';

-- ----------------------------
--  Records of `fa_wechat_response`
-- ----------------------------
BEGIN;
INSERT INTO `fa_wechat_response` VALUES ('1', '签到送积分', '58adaf7876aab', 'app', '{\"app\":\"signin\"}', '', '1487777656', '1487777656', 'normal'), ('2', '关于我们', '58bf944aa0777', 'app', '{\"app\":\"page\",\"id\":\"1\"}', '', '1488950346', '1488950346', 'normal'), ('3', '自动回复1', '58c7d908c4570', 'text', '{\"content\":\"world\"}', '', '1489492232', '1489492232', 'normal'), ('4', '联系客服', '58cb852984970', 'app', '{\"app\":\"service\"}', '', '1489732905', '1489732905', 'normal'), ('5', '自动回复2', '58fdfaa9e1965', 'text', '{\"content\":\"我是FastAdmin!\"}', '', '1493039785', '1493039785', 'normal');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
