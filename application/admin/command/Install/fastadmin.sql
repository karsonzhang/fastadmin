/*
 FastAdmin Install SQL

 官网: http://www.fastadmin.net
 演示: http://demo.fastadmin.net

 Date: 04/15/2017 00:15:20 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='管理员表';

-- ----------------------------
--  Records of `fa_admin`
-- ----------------------------
BEGIN;
INSERT INTO `fa_admin` VALUES ('1', 'admin', 'Admin', '075eaec83636846f51c152f29b98a2fd', 's4f3', '/assets/img/avatar.png', 'admin@fastadmin.net', '0', '1492185129', '1492186163', '1492185129', '6780cd73-f650-4627-9371-60d3739f4e77', 'normal'), ('2', 'admin2', 'admin2', '9a28ce07ce875fbd14172a9ca5357d3c', '2dHDmj', '/assets/img/avatar.png', 'admin2@fastadmin.net', '0', '0', '1492186163', '1492186163', '', 'normal'), ('3', 'admin3', 'admin3', '1c11f945dfcd808a130a8c2a8753fe62', 'WOKJEn', '/assets/img/avatar.png', 'admin3@fastadmin.net', '0', '0', '1492186201', '1492186201', '', 'normal'), ('4', 'admin22', 'admin22', '1c1a0aa0c3c56a8c1a908aab94519648', 'Aybcn5', '/assets/img/avatar.png', 'admin22@fastadmin.net', '0', '0', '1492186240', '1492186240', '', 'normal'), ('5', 'admin32', 'admin32', 'ade94d5d7a7033afa7d84ac3066d0a02', 'FvYK0u', '/assets/img/avatar.png', 'admin32@fastadmin.net', '0', '0', '1492186263', '1492186263', '', 'normal');
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
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '操作时间',
  PRIMARY KEY (`id`),
  KEY `name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员日志表';

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
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
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
INSERT INTO `fa_auth_group` VALUES ('1', '0', '超级管理员', '*', '1490883540', '1490883540', 'normal'), ('2', '1', '二级管理员', '10400,10401,10402,10403,10404,10405,10406,10407,10408,10409,10410,10411,10412,10413,10414,10415,10416,10417,10418,10419,10420,10421,10422,10423,10424,10425,10426,10427,10428,10429,10430,10431,10432,10433,10434,10435,10436,10437,10438,10439,10440,10441,10442,10443,10444,10445,10446,10447,10448,10449,10450,10451,10452,10453,10454,10455,10456,10457,10458,10459,10460,10461,10462,10463', '1490883540', '1492186066', 'normal'), ('3', '2', '三级管理员', '10400,10401,10402,10403,10404,10405,10412,10413,10414,10415,10416,10417,10418,10419,10420,10421,10422,10423,10424,10425,10426,10427,10428,10429,10430', '1490883540', '1492186072', 'normal'), ('4', '1', '二级管理员2', '10400,10401,10402,10403,10404,10405,10406,10407,10408,10409,10410,10411,10431,10432,10433,10434,10435,10436,10437,10438,10439,10440,10441,10442,10443,10444,10445,10446,10447,10448,10449,10450,10451,10452,10453,10454,10455,10456,10457,10458,10459,10460,10461,10462,10463,10464,10465,10466,10467,10468,10469,10470,10471,10472,10473,10474,10475,10476,10477,10478,10479,10480,10481,10482,10483,10484,10485,10486,10487,10488,10489,10490', '1490883540', '1492186059', 'normal'), ('5', '2', '三级管理员2', '10400,10401,10402,10403,10404,10405', '1490883540', '1492186095', 'normal');
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
INSERT INTO `fa_auth_group_access` VALUES ('1', '1'), ('2', '2'), ('3', '3'), ('4', '5'), ('5', '5');
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
) ENGINE=InnoDB AUTO_INCREMENT=10491 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='节点表';

-- ----------------------------
--  Records of `fa_auth_rule`
-- ----------------------------
BEGIN;
INSERT INTO `fa_auth_rule` VALUES ('10400', 'file', '0', '/admin/dashboard', '控制台', 'fa fa-dashboard', '', '用于展示当前系统中的统计数据、统计报表及重要实时数据\r\n', '1', '1491655325', '1492184975', '0', 'normal'), ('10401', 'file', '10400', '/admin/dashboard/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10402', 'file', '10400', '/admin/dashboard/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10403', 'file', '10400', '/admin/dashboard/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10404', 'file', '10400', '/admin/dashboard/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10405', 'file', '10400', '/admin/dashboard/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10406', 'file', '0', '/admin/page', '单页管理', 'fa fa-tags', '', '用于管理普通的单页面,通常用于关于我们、联系我们、商务合作等单一页面\r\n', '1', '1491655325', '1494259768', '0', 'normal'), ('10407', 'file', '10406', '/admin/page/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10408', 'file', '10406', '/admin/page/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10409', 'file', '10406', '/admin/page/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10410', 'file', '10406', '/admin/page/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10411', 'file', '10406', '/admin/page/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10412', 'file', '0', '/admin/auth', '权限管理', 'fa fa-group', '', '', '1', '1491655325', '1494259815', '0', 'normal'), ('10413', 'file', '10412', '/admin/auth/admin', '管理员管理', 'fa fa-users', '', '一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成', '1', '1491655325', '1491655325', '0', 'normal'), ('10414', 'file', '10413', '/admin/auth/admin/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10415', 'file', '10413', '/admin/auth/admin/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10416', 'file', '10413', '/admin/auth/admin/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10417', 'file', '10413', '/admin/auth/admin/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10418', 'file', '10413', '/admin/auth/admin/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10419', 'file', '10412', '/admin/auth/group', '角色组', 'fa fa-group', '', '角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别下级的角色组或管理员', '1', '1491655325', '1491655325', '0', 'normal'), ('10420', 'file', '10419', '/admin/auth/group/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10421', 'file', '10419', '/admin/auth/group/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10422', 'file', '10419', '/admin/auth/group/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10423', 'file', '10419', '/admin/auth/group/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10424', 'file', '10419', '/admin/auth/group/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10425', 'file', '10412', '/admin/auth/rule', '规则管理', 'fa fa-list', '', '规则通常对应一个控制器的方法,同时左侧的菜单栏数据也从规则中体现,通常建议通过控制台进行生成规则节点', '1', '1491655325', '1491655325', '0', 'normal'), ('10426', 'file', '10425', '/admin/auth/rule/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10427', 'file', '10425', '/admin/auth/rule/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10428', 'file', '10425', '/admin/auth/rule/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10429', 'file', '10425', '/admin/auth/rule/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10430', 'file', '10425', '/admin/auth/rule/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10431', 'file', '0', '/admin/general', '常规管理', 'fa fa-cog', '', '', '1', '1491655325', '1494259697', '0', 'normal'), ('10432', 'file', '10431', '/admin/general/attachment', '附件管理', 'fa fa-circle-o\r', '', '主要用于管理上传到又拍云的数据或上传至本服务的上传数据\r', '1', '1491655325', '1491655325', '0', 'normal'), ('10433', 'file', '10432', '/admin/general/attachment/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10434', 'file', '10432', '/admin/general/attachment/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10435', 'file', '10432', '/admin/general/attachment/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10436', 'file', '10432', '/admin/general/attachment/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10437', 'file', '10432', '/admin/general/attachment/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10438', 'file', '10431', '/admin/general/configvalue', '基本配置', 'fa fa-cog', '', '用于管理一些字典数据,通常以键值格式进行录入,保存的数据格式为JSON', '1', '1491655325', '1491655325', '0', 'normal'), ('10439', 'file', '10438', '/admin/general/configvalue/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10440', 'file', '10438', '/admin/general/configvalue/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10441', 'file', '10438', '/admin/general/configvalue/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10442', 'file', '10438', '/admin/general/configvalue/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10443', 'file', '10438', '/admin/general/configvalue/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10444', 'file', '10431', '/admin/general/crontab', '定时任务', 'fa fa-tasks', '', '类似于Linux的Crontab定时任务,可以按照设定的时间进行任务的执行,目前仅支持三种任务:请求URL、执行SQL、执行Shell', '1', '1491655325', '1491655325', '0', 'normal'), ('10445', 'file', '10444', '/admin/general/crontab/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10446', 'file', '10444', '/admin/general/crontab/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10447', 'file', '10444', '/admin/general/crontab/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10448', 'file', '10444', '/admin/general/crontab/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10449', 'file', '10444', '/admin/general/crontab/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10450', 'file', '10431', '/admin/general/database', '数据库管理', 'fa fa-database', '', '可在线进行一些简单的数据库表优化或修复,查看表结构和数据。也可以进行SQL语句的操作', '1', '1491655325', '1491655325', '0', 'normal'), ('10451', 'file', '10450', '/admin/general/database/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10452', 'file', '10450', '/admin/general/database/query', 'SQL查询', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10453', 'file', '10450', '/admin/general/database/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10454', 'file', '10450', '/admin/general/database/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10455', 'file', '10450', '/admin/general/database/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10456', 'file', '10450', '/admin/general/database/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10457', 'file', '10431', '/admin/general/profile', '个人配置', 'fa fa-user\r', '', '', '1', '1491655325', '1491655325', '0', 'normal'), ('10458', 'file', '10457', '/admin/general/profile/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10459', 'file', '10457', '/admin/general/profile/update', '更新个人信息', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10460', 'file', '10457', '/admin/general/profile/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10461', 'file', '10457', '/admin/general/profile/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10462', 'file', '10457', '/admin/general/profile/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10463', 'file', '10457', '/admin/general/profile/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10464', 'file', '0', '/admin/wechat', '微信管理', 'fa fa-wechat', '', '', '1', '1491655325', '1494259718', '0', 'normal'), ('10465', 'file', '10464', '/admin/wechat/autoreply', '微信自动回复管理', 'fa fa-circle-o\r', '', '', '1', '1491655325', '1491655325', '0', 'normal'), ('10466', 'file', '10465', '/admin/wechat/autoreply/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10467', 'file', '10465', '/admin/wechat/autoreply/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10468', 'file', '10465', '/admin/wechat/autoreply/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10469', 'file', '10465', '/admin/wechat/autoreply/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10470', 'file', '10465', '/admin/wechat/autoreply/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10471', 'file', '10464', '/admin/wechat/config', '配置管理', 'fa fa-list-alt', '', '', '1', '1491655325', '1491655325', '0', 'normal'), ('10472', 'file', '10471', '/admin/wechat/config/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10473', 'file', '10471', '/admin/wechat/config/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10474', 'file', '10471', '/admin/wechat/config/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10475', 'file', '10471', '/admin/wechat/config/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10476', 'file', '10471', '/admin/wechat/config/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10477', 'file', '10464', '/admin/wechat/menu', '菜单管理', 'fa fa-list-alt', '', '', '1', '1491655325', '1491655325', '0', 'normal'), ('10478', 'file', '10477', '/admin/wechat/menu/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10479', 'file', '10477', '/admin/wechat/menu/edit', '修改', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10480', 'file', '10477', '/admin/wechat/menu/sync', '同步', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10481', 'file', '10477', '/admin/wechat/menu/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10482', 'file', '10477', '/admin/wechat/menu/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10483', 'file', '10477', '/admin/wechat/menu/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10484', 'file', '10464', '/admin/wechat/response', '资源管理', 'fa fa-list-alt', '', '', '1', '1491655325', '1491655325', '0', 'normal'), ('10485', 'file', '10484', '/admin/wechat/response/select', '选择素材', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10486', 'file', '10484', '/admin/wechat/response/add', '添加', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10487', 'file', '10484', '/admin/wechat/response/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10488', 'file', '10484', '/admin/wechat/response/index', '查看', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10489', 'file', '10484', '/admin/wechat/response/del', '删除', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10490', 'file', '10484', '/admin/wechat/response/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1491655325', '1491655325', '0', 'normal'), ('10491', 'file', '0', '/admin/category', '分类管理', 'fa fa-list\r', '', '用于统一管理网站的所有分类,分类可进行无限级分类\r', '1', '1494259006', '1494259006', '0', 'normal'), ('10492', 'file', '10491', '/admin/category/index', '查看', 'fa fa-circle-o', '', '', '0', '1494259006', '1494259006', '0', 'normal'), ('10493', 'file', '10491', '/admin/category/add', '添加', 'fa fa-circle-o', '', '', '0', '1494259006', '1494259006', '0', 'normal'), ('10494', 'file', '10491', '/admin/category/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1494259006', '1494259006', '0', 'normal'), ('10495', 'file', '10491', '/admin/category/del', '删除', 'fa fa-circle-o', '', '', '0', '1494259006', '1494259006', '0', 'normal'), ('10496', 'file', '10491', '/admin/category/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1494259006', '1494259006', '0', 'normal');
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
  `flag` set('h','i','r') NOT NULL DEFAULT '',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='分类表';

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
INSERT INTO `fa_configvalue` VALUES ('basic', '常规配置', '{\"test\":\"测试\",\"content\":\"内容\",\"weigh\":\"权重\"}', '1493090807', '1493090807', '1', 'normal'), ('qqun', 'QQ群: 636393962', '{\"qqun\":\"636393962\"}', '1493475993', '1493475993', '2', 'normal'), ('service', '客服配置', '{\"onlinetime\":\"09:00-18:00\",\"offlinemsg\":\"请在工作时间联系客服！\",\"nosessionmsg\":\"当前没有客服在线！请稍后重试！\",\"waitformsg\":\"请问有什么可以帮到您？\"}', '1493994362', '1493994362', '3', 'normal'), ('wechat', '微信菜单', '{\"menu\":[{\"name\":\"FastAdmin\",\"sub_button\":[{\"name\":\"官网\",\"type\":\"view\",\"url\":\"http:\\/\\/www.fastadmin.net\"},{\"name\":\"在线演示\",\"type\":\"view\",\"url\":\"http:\\/\\/demo.fastadmin.net\"},{\"name\":\"文档\",\"type\":\"view\",\"url\":\"http:\\/\\/doc.fastadmin.net\"}]},{\"name\":\"在线客服\",\"type\":\"click\",\"key\":\"58cb852984970\"},{\"name\":\"关于我们\",\"type\":\"click\",\"key\":\"58bf944aa0777\"}],\"config\":[{\"id\":\"default.subscribe.message\",\"name\":\"关注后自动推送内容\",\"value\":\"欢迎关注我们！\"}]}', '1491646847', '1494257295', '4', 'locked');
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
--  Table structure for `fa_page`
-- ----------------------------
DROP TABLE IF EXISTS `fa_page`;
CREATE TABLE `fa_page` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) NOT NULL DEFAULT '0' COMMENT '分类ID',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `flag` set('h','i','s') NOT NULL DEFAULT '' COMMENT '标志',
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='单页表';

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
  `attachfile` varchar(100) NOT NULL DEFAULT '' COMMENT '附件',
  `keywords` varchar(100) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `price` float(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '价格',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `startdate` date DEFAULT NULL COMMENT '开始日期',
  `activitydate` datetime DEFAULT NULL COMMENT '活动时间(datetime)',
  `year` year(4) DEFAULT NULL COMMENT '年',
  `times` time DEFAULT NULL COMMENT '时间',
  `refreshtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '刷新时间(int)',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='测试表';

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员签到表';

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信上下文表';

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='微信资源表';

-- ----------------------------
--  Records of `fa_wechat_response`
-- ----------------------------
BEGIN;
INSERT INTO `fa_wechat_response` VALUES ('1', '签到送积分', '58adaf7876aab', 'app', '{\"app\":\"signin\"}', '', '1487777656', '1487777656', 'normal'), ('2', '关于我们', '58bf944aa0777', 'app', '{\"app\":\"page\",\"id\":\"1\"}', '', '1488950346', '1488950346', 'normal'), ('3', '自动回复1', '58c7d908c4570', 'text', '{\"content\":\"world\"}', '', '1489492232', '1489492232', 'normal'), ('4', '联系客服', '58cb852984970', 'app', '{\"app\":\"service\"}', '', '1489732905', '1489732905', 'normal'), ('5', '自动回复2', '58fdfaa9e1965', 'text', '{\"content\":\"我是FastAdmin!\"}', '', '1493039785', '1493039785', 'normal');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
