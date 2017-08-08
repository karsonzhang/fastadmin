/*
 FastAdmin Install SQL

 官网: http://www.fastadmin.net
 演示: http://demo.fastadmin.net

 Date: 08/08/2017 23:19:44 PM
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
INSERT INTO `fa_admin` VALUES ('1', 'admin', 'Admin', '075eaec83636846f51c152f29b98a2fd', 's4f3', '/assets/img/avatar.png', 'admin@fastadmin.net', '0', '1502029281', '1492186163', '1502029281', 'd3992c3b-5ecc-4ecb-9dc2-8997780fcadc', 'normal'), ('2', 'admin2', 'admin2', '9a28ce07ce875fbd14172a9ca5357d3c', '2dHDmj', '/assets/img/avatar.png', 'admin2@fastadmin.net', '0', '1502015003', '1492186163', '1502029266', '', 'normal'), ('3', 'admin3', 'admin3', '1c11f945dfcd808a130a8c2a8753fe62', 'WOKJEn', '/assets/img/avatar.png', 'admin3@fastadmin.net', '0', '1501980868', '1492186201', '1501982377', '', 'normal'), ('4', 'admin22', 'admin22', '1c1a0aa0c3c56a8c1a908aab94519648', 'Aybcn5', '/assets/img/avatar.png', 'admin22@fastadmin.net', '0', '0', '1492186240', '1492186240', '', 'normal'), ('5', 'admin32', 'admin32', 'ade94d5d7a7033afa7d84ac3066d0a02', 'FvYK0u', '/assets/img/avatar.png', 'admin32@fastadmin.net', '0', '0', '1492186263', '1492186263', '', 'normal');
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
) ENGINE=InnoDB AUTO_INCREMENT=1218 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员日志表';

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='附件表';

-- ----------------------------
--  Records of `fa_attachment`
-- ----------------------------
BEGIN;
INSERT INTO `fa_attachment` VALUES ('1', '/assets/img/qrcode.png', '150', '150', 'png', '0', '21859', 'image/png', '', '1499681848', '1499681848', '1499681848', 'local', '17163603d0263e4838b9387ff2cd4877e8b018f6');
COMMIT;

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
INSERT INTO `fa_auth_group` VALUES ('1', '0', '超级管理员', '*', '1490883540', '149088354', 'normal'), ('2', '1', '二级管理员', '1,2,4,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,40,41,42,43,44,45,46,47,48,49,50,55,56,57,58,59,60,61,62,63,64,65,5', '1490883540', '1502205308', 'normal'), ('3', '2', '三级管理员', '1,4,9,10,11,13,14,15,16,17,40,41,42,43,44,45,46,47,48,49,50,55,56,57,58,59,60,61,62,63,64,65,5', '1490883540', '1502205322', 'normal'), ('4', '1', '二级管理员2', '1,4,13,14,15,16,17,55,56,57,58,59,60,61,62,63,64,65', '1490883540', '1502205350', 'normal'), ('5', '2', '三级管理员2', '1,2,6,7,8,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34', '1490883540', '1502205344', 'normal');
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='节点表';

-- ----------------------------
--  Records of `fa_auth_rule`
-- ----------------------------
BEGIN;
INSERT INTO `fa_auth_rule` VALUES ('1', 'file', '0', 'dashboard', '控制台', 'fa fa-dashboard\r', '', '用于展示当前系统中的统计数据、统计报表及重要实时数据\r', '1', '1497429920', '1497429920', '143', 'normal'), ('2', 'file', '0', 'general', '常规管理', 'fa fa-cogs', '', '', '1', '1497429920', '1497430169', '137', 'normal'), ('3', 'file', '0', 'category', '分类管理', 'fa fa-list\r', '', '用于统一管理网站的所有分类,分类可进行无限级分类\r', '1', '1497429920', '1497429920', '119', 'normal'), ('4', 'file', '0', 'addon', '插件管理', 'fa fa-rocket', '', '可在线安装、卸载、禁用、启用插件，同时支持添加本地插件', '1', '1502035509', '1502035509', '0', 'normal'), ('5', 'file', '0', 'auth', '权限管理', 'fa fa-group', '', '', '1', '1497429920', '1497430092', '99', 'normal'), ('6', 'file', '2', 'general/config', '系统配置', 'fa fa-cog', '', '', '1', '1497429920', '1497430683', '60', 'normal'), ('7', 'file', '2', 'general/attachment', '附件管理', 'fa fa-file-image-o', '', '主要用于管理上传到又拍云的数据或上传至本服务的上传数据\r\n', '1', '1497429920', '1497430699', '53', 'normal'), ('8', 'file', '2', 'general/profile', '个人配置', 'fa fa-user\r', '', '', '1', '1497429920', '1497429920', '34', 'normal'), ('9', 'file', '5', 'auth/admin', '管理员管理', 'fa fa-user', '', '一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成', '1', '1497429920', '1497430320', '118', 'normal'), ('10', 'file', '5', 'auth/adminlog', '管理员日志', 'fa fa-list-alt', '', '管理员可以查看自己所拥有的权限的管理员日志', '1', '1497429920', '1497430307', '113', 'normal'), ('11', 'file', '5', 'auth/group', '角色组', 'fa fa-group', '', '角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别下级的角色组或管理员', '1', '1497429920', '1497429920', '109', 'normal'), ('12', 'file', '5', 'auth/rule', '规则管理', 'fa fa-bars', '', '规则通常对应一个控制器的方法,同时左侧的菜单栏数据也从规则中体现,通常建议通过控制台进行生成规则节点', '1', '1497429920', '1497430581', '104', 'normal'), ('13', 'file', '1', 'dashboard/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '136', 'normal'), ('14', 'file', '1', 'dashboard/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '135', 'normal'), ('15', 'file', '1', 'dashboard/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '133', 'normal'), ('16', 'file', '1', 'dashboard/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '134', 'normal'), ('17', 'file', '1', 'dashboard/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '132', 'normal'), ('18', 'file', '6', 'general/config/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '52', 'normal'), ('19', 'file', '6', 'general/config/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '51', 'normal'), ('20', 'file', '6', 'general/config/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '50', 'normal'), ('21', 'file', '6', 'general/config/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '49', 'normal'), ('22', 'file', '6', 'general/config/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '48', 'normal'), ('23', 'file', '7', 'general/attachment/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '59', 'normal'), ('24', 'file', '7', 'general/attachment/select', '选择附件', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '58', 'normal'), ('25', 'file', '7', 'general/attachment/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '57', 'normal'), ('26', 'file', '7', 'general/attachment/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '56', 'normal'), ('27', 'file', '7', 'general/attachment/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '55', 'normal'), ('28', 'file', '7', 'general/attachment/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '54', 'normal'), ('29', 'file', '8', 'general/profile/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '33', 'normal'), ('30', 'file', '8', 'general/profile/update', '更新个人信息', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '32', 'normal'), ('31', 'file', '8', 'general/profile/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '31', 'normal'), ('32', 'file', '8', 'general/profile/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '30', 'normal'), ('33', 'file', '8', 'general/profile/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '29', 'normal'), ('34', 'file', '8', 'general/profile/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '28', 'normal'), ('35', 'file', '3', 'category/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '142', 'normal'), ('36', 'file', '3', 'category/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '141', 'normal'), ('37', 'file', '3', 'category/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '140', 'normal'), ('38', 'file', '3', 'category/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '139', 'normal'), ('39', 'file', '3', 'category/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '138', 'normal'), ('40', 'file', '9', 'auth/admin/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '117', 'normal'), ('41', 'file', '9', 'auth/admin/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '116', 'normal'), ('42', 'file', '9', 'auth/admin/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '115', 'normal'), ('43', 'file', '9', 'auth/admin/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '114', 'normal'), ('44', 'file', '10', 'auth/adminlog/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '112', 'normal'), ('45', 'file', '10', 'auth/adminlog/detail', '详情', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '111', 'normal'), ('46', 'file', '10', 'auth/adminlog/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '110', 'normal'), ('47', 'file', '11', 'auth/group/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '108', 'normal'), ('48', 'file', '11', 'auth/group/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '107', 'normal'), ('49', 'file', '11', 'auth/group/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '106', 'normal'), ('50', 'file', '11', 'auth/group/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '105', 'normal'), ('51', 'file', '12', 'auth/rule/index', '查看', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '103', 'normal'), ('52', 'file', '12', 'auth/rule/add', '添加', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '102', 'normal'), ('53', 'file', '12', 'auth/rule/edit', '编辑', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '101', 'normal'), ('54', 'file', '12', 'auth/rule/del', '删除', 'fa fa-circle-o', '', '', '0', '1497429920', '1497429920', '100', 'normal'), ('55', 'file', '4', 'addon/index', '查看', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('56', 'file', '4', 'addon/add', '添加', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('57', 'file', '4', 'addon/edit', '修改', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('58', 'file', '4', 'addon/del', '删除', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('59', 'file', '4', 'addon/local', '本地安装', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('60', 'file', '4', 'addon/state', '禁用启用', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('61', 'file', '4', 'addon/install', '安装', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('62', 'file', '4', 'addon/uninstall', '卸载', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('63', 'file', '4', 'addon/config', '配置', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('64', 'file', '4', 'addon/refresh', '刷新', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal'), ('65', 'file', '4', 'addon/multi', '批量更新', 'fa fa-circle-o', '', '', '0', '1502035509', '1502035509', '0', 'normal');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='分类表';

-- ----------------------------
--  Records of `fa_category`
-- ----------------------------
BEGIN;
INSERT INTO `fa_category` VALUES ('1', '0', 'page', '官方新闻', 'news', 'recommend', '/assets/img/qrcode.png', '', '', 'news', '1495262190', '1495262190', '1', 'normal'), ('2', '0', 'page', '移动应用', 'mobileapp', 'hot', '/assets/img/qrcode.png', '', '', 'mobileapp', '1495262244', '1495262244', '2', 'normal'), ('3', '2', 'page', '微信公众号', 'wechatpublic', 'index', '/assets/img/qrcode.png', '', '', 'wechatpublic', '1495262288', '1495262288', '3', 'normal'), ('4', '2', 'page', 'Android开发', 'android', 'recommend', '/assets/img/qrcode.png', '', '', 'android', '1495262317', '1495262317', '4', 'normal'), ('5', '0', 'page', '软件产品', 'software', 'recommend', '/assets/img/qrcode.png', '', '', 'software', '1495262336', '1499681850', '5', 'normal'), ('6', '5', 'page', '网站建站', 'website', 'recommend', '/assets/img/qrcode.png', '', '', 'website', '1495262357', '1495262357', '6', 'normal'), ('7', '5', 'page', '企业管理软件', 'company', 'index', '/assets/img/qrcode.png', '', '', 'company', '1495262391', '1495262391', '7', 'normal'), ('8', '6', 'page', 'PC端', 'website-pc', 'recommend', '/assets/img/qrcode.png', '', '', 'website-pc', '1495262424', '1495262424', '8', 'normal'), ('9', '6', 'page', '移动端', 'website-mobile', 'recommend', '/assets/img/qrcode.png', '', '', 'website-mobile', '1495262456', '1495262456', '9', 'normal'), ('10', '7', 'page', 'CRM系统 ', 'company-crm', 'recommend', '/assets/img/qrcode.png', '', '', 'company-crm', '1495262487', '1495262487', '10', 'normal'), ('11', '7', 'page', 'SASS平台软件', 'company-sass', 'recommend', '/assets/img/qrcode.png', '', '', 'company-sass', '1495262515', '1495262515', '11', 'normal'), ('12', '0', 'test', '测试1', 'test1', 'recommend', '/assets/img/qrcode.png', '', '', 'test1', '1497015727', '1497015727', '12', 'normal'), ('13', '0', 'test', '测试2', 'test2', 'recommend', '/assets/img/qrcode.png', '', '', 'test2', '1497015738', '1497015738', '13', 'normal'), ('14', '0', 'page', '官方新闻', 'news', 'recommend', '/assets/img/qrcode.png', '', '', 'news', '1495262190', '1495262190', '1', 'normal'), ('15', '0', 'page', '移动应用', 'mobileapp', 'hot', '/assets/img/qrcode.png', '', '', 'mobileapp', '1495262244', '1495262244', '2', 'normal'), ('16', '2', 'page', '微信公众号', 'wechatpublic', 'index', '/assets/img/qrcode.png', '', '', 'wechatpublic', '1495262288', '1495262288', '3', 'normal'), ('17', '2', 'page', 'Android开发', 'android', 'recommend', '/assets/img/qrcode.png', '', '', 'android', '1495262317', '1495262317', '4', 'normal'), ('18', '0', 'page', '软件产品', 'software', 'recommend', '/assets/img/qrcode.png', '', '', 'software', '1495262336', '1499681850', '5', 'normal'), ('19', '5', 'page', '网站建站', 'website', 'recommend', '/assets/img/qrcode.png', '', '', 'website', '1495262357', '1495262357', '6', 'normal'), ('20', '5', 'page', '企业管理软件', 'company', 'index', '/assets/img/qrcode.png', '', '', 'company', '1495262391', '1495262391', '7', 'normal'), ('21', '6', 'page', 'PC端', 'website-pc', 'recommend', '/assets/img/qrcode.png', '', '', 'website-pc', '1495262424', '1495262424', '8', 'normal'), ('22', '6', 'page', '移动端', 'website-mobile', 'recommend', '/assets/img/qrcode.png', '', '', 'website-mobile', '1495262456', '1495262456', '9', 'normal'), ('23', '7', 'page', 'CRM系统 ', 'company-crm', 'recommend', '/assets/img/qrcode.png', '', '', 'company-crm', '1495262487', '1495262487', '10', 'normal'), ('24', '7', 'page', 'SASS平台软件', 'company-sass', 'recommend', '/assets/img/qrcode.png', '', '', 'company-sass', '1495262515', '1495262515', '11', 'normal'), ('25', '0', 'test', '测试1', 'test1', 'recommend', '/assets/img/qrcode.png', '', '', 'test1', '1497015727', '1497015727', '12', 'normal'), ('26', '0', 'test', '测试2', 'test2', 'recommend', '/assets/img/qrcode.png', '', '', 'test2', '1497015738', '1497015738', '13', 'normal');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='系统配置';

-- ----------------------------
--  Records of `fa_config`
-- ----------------------------
BEGIN;
INSERT INTO `fa_config` VALUES ('1', 'name', 'basic', '站点名称', '请填写站点名称', 'string', 'FastAdmin', '', 'required', ''), ('2', 'beian', 'basic', '备案号', '粤ICP备15054802号-4', 'string', '', '', '', ''), ('3', 'cdnurl', 'basic', 'CDN地址', '如果使用CDN云储存请配置该值', 'string', '', '', '', ''), ('4', 'version', 'basic', '版本号', '如果静态资源有变动请重新配置该值', 'string', '1.0.1', '', 'required', ''), ('5', 'timezone', 'basic', '时区', '', 'string', 'Asia/Shanghai', '', 'required', ''), ('6', 'forbiddenip', 'basic', '禁止访问IP', '一行一条记录', 'text', '', '', '', ''), ('7', 'languages', 'basic', '模块语言', '', 'array', '{\"backend\":\"zh-cn\",\"frontend\":\"zh-cn\"}', '', 'required', ''), ('8', 'fixedpage', 'basic', '后台默认页', '请尽量输入左侧菜单栏存在的链接', 'string', 'dashboard', '', 'required', ''), ('9', 'categorytype', 'dictionary', '分类类型', '', 'array', '{\"default\":\"默认\",\"page\":\"单页\",\"article\":\"文章\",\"test\":\"测试\"}', '', '', ''), ('10', 'configgroup', 'dictionary', '配置分组', '', 'array', '{\"basic\":\"基础配置\",\"email\":\"邮件配置\",\"dictionary\":\"字典配置\",\"user\":\"会员配置\",\"example\":\"示例分组\"}', '', '', ''), ('11', 'mail_type', 'email', '邮件发送方式', '选择邮件发送方式', 'select', '1', '[\"请选择\",\"SMTP\",\"mail()函数\"]', '', ''), ('12', 'mail_smtp_host', 'email', 'SMTP[服务器]', '错误的配置发送邮件会导致服务器超时', 'string', 'smtp.qq.com', '', '', ''), ('13', 'mail_smtp_port', 'email', 'SMTP[端口]', '(不加密默认25,SSL默认465,TLS默认587)', 'string', '465', '', '', ''), ('14', 'mail_smtp_user', 'email', 'SMTP[用户名]', '（填写完整用户名）', 'string', '10000', '', '', ''), ('15', 'mail_smtp_pass', 'email', 'SMTP[密码]', '（填写您的密码）', 'string', 'password', '', '', ''), ('16', 'mail_verify_type', 'email', 'SMTP验证方式', '（SMTP验证方式[推荐SSL]）', 'select', '2', '[\"无\",\"TLS\",\"SSL\"]', '', ''), ('17', 'mail_from', 'email', '发件人邮箱', '', 'string', '10000@qq.com', '', '', '');
COMMIT;

-- ----------------------------
--  Table structure for `fa_test`
-- ----------------------------
DROP TABLE IF EXISTS `fa_test`;
CREATE TABLE `fa_test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID(单选)',
  `category_ids` varchar(100) NOT NULL COMMENT '分类ID(多选)',
  `week` enum('monday','tuesday','wednesday') NOT NULL COMMENT '星期(单选):monday=星期一,tuesday=星期二,wednesday=星期三',
  `flag` set('hot','index','recommend') NOT NULL DEFAULT '' COMMENT '标志(多选):hot=热门,index=首页,recommend=推荐',
  `genderdata` enum('male','female') NOT NULL DEFAULT 'male' COMMENT '性别(单选):male=男,female=女',
  `hobbydata` set('music','reading','swimming') NOT NULL COMMENT '爱好(多选):music=音乐,reading=读书,swimming=游泳',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `image` varchar(100) NOT NULL DEFAULT '' COMMENT '图片',
  `images` varchar(1500) NOT NULL DEFAULT '' COMMENT '图片组',
  `attachfile` varchar(100) NOT NULL DEFAULT '' COMMENT '附件',
  `keywords` varchar(100) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `city` varchar(100) NOT NULL DEFAULT '' COMMENT '省市',
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
  `switch` tinyint(1) NOT NULL DEFAULT '0' COMMENT '开关',
  `status` enum('normal','hidden') NOT NULL DEFAULT 'normal' COMMENT '状态',
  `state` enum('0','1','2') NOT NULL DEFAULT '1' COMMENT '状态值:0=禁用,1=正常,2=推荐',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='测试表';

-- ----------------------------
--  Records of `fa_test`
-- ----------------------------
BEGIN;
INSERT INTO `fa_test` VALUES ('1', '12', '12,13', 'monday', 'hot,index', 'male', 'music,reading', '我是一篇测试文章', '<p>我是测试内容</p>', '/assets/img/avatar.png', '/assets/img/avatar.png,/assets/img/qrcode.png', '/assets/img/avatar.png', '关键字', '描述', '广西壮族自治区/百色市/平果县', '0.00', '0', '2017-07-10', '2017-07-10 18:24:45', '2017', '18:24:45', '1499682285', '1499682526', '1499682526', '0', '1', 'normal', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;