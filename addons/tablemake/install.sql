CREATE TABLE IF NOT EXISTS `__PREFIX__tablemake_fields`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL COMMENT '所属模型',
  `category` tinyint(2) NOT NULL COMMENT '字段类型',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '字段标题',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '字段名称',
  `field` varchar(50) NOT NULL DEFAULT '' COMMENT '字段名',
  `special` varchar(50) NOT NULL DEFAULT '' COMMENT '特殊字段',
  `suffix` varchar(50) NOT NULL DEFAULT '' COMMENT '字段后缀',
  `type` varchar(50) NOT NULL DEFAULT '' COMMENT '字段类型',
  `length` varchar(10) NOT NULL COMMENT '字段长度',
  `default` varchar(255) NOT NULL COMMENT '默认值',
  `comment` varchar(2000) NOT NULL COMMENT '字段备注',
  `createtime` int(11) NOT NULL COMMENT '创建时间',
  `updatetime` int(11) NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字段管理表' ROW_FORMAT = Compact;


CREATE TABLE IF NOT EXISTS `__PREFIX__tablemake_tables`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '模型名称',
  `table` varchar(20) NOT NULL COMMENT '表名称',
  `desc` varchar(150) DEFAULT NULL COMMENT '简介',
  `createtime` int(11) NOT NULL COMMENT '创建时间',
  `updatetime` int(11) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '模型管理表' ROW_FORMAT = Compact;


