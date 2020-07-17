/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : koaproj

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 09/03/2020 21:30:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `parent_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '节点',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文显示名',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级菜单图表',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `status` int(11) NULL DEFAULT NULL COMMENT '是否启动   1开启   0关闭',
  `type` int(11) NULL DEFAULT 0 COMMENT '类型： 一菜单无子集（0）|一级菜单有子集（1）|二级菜单无子集（2）|二级菜单有子集（3）',
  `order` int(11) NULL DEFAULT NULL COMMENT '菜单顺序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 143 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES (124, '0', '系统设置', '', '', 1, 0, 4);
INSERT INTO `system_menu` VALUES (125, '124', '菜单管理', '', '/page_menu', 1, 0, 1);
INSERT INTO `system_menu` VALUES (126, '124', '用户管理', '', '/page_user', 1, 0, 1);
INSERT INTO `system_menu` VALUES (127, '124', '角色管理', '', '/page_role', 1, 0, 1);
INSERT INTO `system_menu` VALUES (131, '0', '开票管理', '', '', 1, 0, 2);
INSERT INTO `system_menu` VALUES (132, '131', '财务日对账', '', '/cwrdz', 1, 0, 1);
INSERT INTO `system_menu` VALUES (133, '131', '结账情况查询', '', '/jzqkcx', 1, 0, 1);
INSERT INTO `system_menu` VALUES (134, '131', '开票授权', '', '/kpsq', 1, 0, 1);
INSERT INTO `system_menu` VALUES (135, '131', '手开红票', '', '/skhp', 1, 0, 1);
INSERT INTO `system_menu` VALUES (136, '131', '手开正票', '', '/skzp', 1, 0, 1);
INSERT INTO `system_menu` VALUES (137, '0', '票据管理', '', '', 1, 0, 3);
INSERT INTO `system_menu` VALUES (138, '137', '网点授权', '', '/wdsq', 1, 0, 1);
INSERT INTO `system_menu` VALUES (139, '0', '信息查询', '', '', 1, 0, 1);
INSERT INTO `system_menu` VALUES (140, '139', '开票查询', '', '/kpcx', 1, 0, 1);
INSERT INTO `system_menu` VALUES (141, '139', '票据信息', '', '/pjxx', 1, 0, 1);
INSERT INTO `system_menu` VALUES (142, '0', '首页', '', '/flower', 1, 1, 0);

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色显示名',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '角色创建时间',
  `updatetime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '角色修改时间',
  `createname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启动（0禁用/1启动）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES (40, '开发', '2019-02-26 10:14:52', '2020-02-28 21:53:05', 'ssss', '1');
INSERT INTO `system_role` VALUES (46, '开发中', '2019-03-01 11:27:36', '2020-02-14 11:35:08', '开发人员', '1');
INSERT INTO `system_role` VALUES (62, '用户角色', '2020-02-29 19:53:02', '2020-02-29 19:53:02', '开发人员', '1');

-- ----------------------------
-- Table structure for system_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE `system_role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `rid` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `mid` int(11) NULL DEFAULT NULL COMMENT '菜单id',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `status` int(11) NULL DEFAULT NULL COMMENT '是否启动（0禁用/1启动）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3537 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role_menu
-- ----------------------------
INSERT INTO `system_role_menu` VALUES (3452, 50, 126, '2020-02-14 16:39:41', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3453, 50, 127, '2020-02-14 16:39:41', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3454, 52, 125, '2020-02-14 16:40:04', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3455, 52, 126, '2020-02-14 16:40:04', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3456, 53, 125, '2020-02-14 16:40:43', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3457, 53, 126, '2020-02-14 16:40:43', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3458, 55, 125, '2020-02-14 16:41:26', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3459, 55, 126, '2020-02-14 16:41:26', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3460, 56, 125, '2020-02-14 16:42:00', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3461, 56, 126, '2020-02-14 16:42:00', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3462, 57, 125, '2020-02-14 16:44:01', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3463, 57, 126, '2020-02-14 16:44:01', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3468, 61, 125, '2020-02-14 16:52:20', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3469, 61, 126, '2020-02-14 16:52:20', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3470, 61, 127, '2020-02-14 16:52:20', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3484, 46, 130, '2020-02-15 16:02:56', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3485, 46, 125, '2020-02-15 16:02:56', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3486, 46, 126, '2020-02-15 16:02:56', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3487, 46, 127, '2020-02-15 16:02:56', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3488, 46, 129, '2020-02-15 16:02:56', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3511, 62, 130, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3512, 62, 132, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3513, 62, 133, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3514, 62, 134, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3515, 62, 135, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3516, 62, 136, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3517, 62, 138, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3518, 62, 140, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3519, 62, 141, '2020-02-29 21:25:27', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3533, 40, 142, '2020-02-29 21:26:24', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3534, 40, 125, '2020-02-29 21:26:24', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3535, 40, 126, '2020-02-29 21:26:24', '开发人员', 1);
INSERT INTO `system_role_menu` VALUES (3536, 40, 127, '2020-02-29 21:26:24', '开发人员', 1);

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户显示名',
  `loginname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户登录名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启动',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES (20, '开发', 'admins', 'E10ADC3949BA59ABBE56E057F20F883E', '2019-01-24 14:07:16', '2020-02-15 14:12:24', '1');
INSERT INTO `system_user` VALUES (21, 'user001', 'user001', 'E10ADC3949BA59ABBE56E057F20F883E', '2019-01-24 14:08:49', '2020-02-15 14:12:28', '1');
INSERT INTO `system_user` VALUES (38, '张三', 'username', 'E10ADC3949BA59ABBE56E057F20F883E', '2020-02-29 19:52:15', '2020-02-29 19:52:15', '1');

-- ----------------------------
-- Table structure for system_user_role
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `rid` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `eid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `createtime` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `createname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否启动（0禁用/1启动）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 141 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO `system_user_role` VALUES (138, 40, 20, '2020-02-15 16:10:12', '开发者001', '1');
INSERT INTO `system_user_role` VALUES (139, 40, 21, '2020-02-28 17:35:58', '开发者001', '1');
INSERT INTO `system_user_role` VALUES (140, 62, 38, '2020-02-29 19:53:17', '开发者001', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别 0男 1女 2保密',
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日',
  `face` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `register_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册来源（手机号,QQ....）',
  `createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册日期',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态  0关闭  1开启（正常）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (13, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', '皮宜豪', '女', '2019-07-26 13:39:35', 'http://127.0.0.1:3000/public/images/face/face06.jpeg', 'local', '2019-07-26 13:39:35', '1');
INSERT INTO `user` VALUES (14, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', '岑国贤', '男', '2019-07-26 16:03:02', 'http://127.0.0.1:3000/public/images/face/face02.jpeg', 'qq', '2019-07-26 16:03:02', '1');
INSERT INTO `user` VALUES (23, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', '喻佳钰', '男', '2019-07-26 16:39:17', 'http://127.0.0.1:3000/public/images/face/face11.png', 'qq', '2019-07-26 16:39:17', '1');
INSERT INTO `user` VALUES (24, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', '朱添昊', '男', '2019-07-29 17:11:57', 'http://127.0.0.1:3000/public/images/face/face02.jpeg', 'local', '2019-07-29 17:11:57', '1');
INSERT INTO `user` VALUES (26, '52fd2180-b266-11e9-a3e2-c5f72dffd416', '黄若萌', '女', '2019-07-30 09:06:56', 'http://127.0.0.1:3000/public/images/face/face04.png', 'local', '2019-07-30 09:06:56', '1');
INSERT INTO `user` VALUES (27, '2ff2da60-b2aa-11e9-91ab-9d6646191c68', '皮昕蕊', '男', '2019-07-30 17:12:43', 'http://127.0.0.1:3000/public/images/face/face05.png', 'local', '2019-07-30 17:12:43', '1');

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `identity_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 登录类型（手机号 邮箱 qq...）',
  `identifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标识 openid等唯一标识',
  `credential` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码凭证(三方登录填token,本地就是密码)',
  `createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建完成',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'IP地址',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态  0关闭  1开启（正常）',
  `extend1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段1',
  `extend2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段2',
  `extend3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段3',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_auths
-- ----------------------------
INSERT INTO `user_auths` VALUES (12, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', 'admins', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-26 13:39:35', '127.0.0.1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (13, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '79914A61428954E0CE6CD47989EF36AF', '92683DE071CEF2D7EA7F0CE84B2B762F', '2019-07-26 16:03:02', '::1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (22, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '04AC1015F4BDEF2D2B7C6539A842CA42', '', '2019-07-26 16:39:17', '::1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (23, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', 'username', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-29 17:11:57', '127.0.0.1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (25, '52fd2180-b266-11e9-a3e2-c5f72dffd416', 'local', 'usernames', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-30 09:06:56', '127.0.0.1', '1', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_token
-- ----------------------------
DROP TABLE IF EXISTS `user_token`;
CREATE TABLE `user_token`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `identity_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录类型（手机号 邮箱 qq...）',
  `logintime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录时间',
  `randomkey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录随机字符串',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 129 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_token
-- ----------------------------
INSERT INTO `user_token` VALUES (128, '20', 'local', '2020-02-29 21:04:21', 'shWyMyyYlgZnyWhD', '127.0.0.1');

-- ----------------------------
-- Procedure structure for p_system_menu
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_menu`;
delimiter ;;
CREATE PROCEDURE `p_system_menu`()
BEGIN



select * from (select 
id,parent_id,title,ifnull(icon,'') as icon,ifnull(path,'') as path,`status`,type,ifnull(`order`,999) as `order`
from system_menu where parent_id =0 and `status`=1 order by `order` limit 9999999999999) u union all

-- 查询所有 有效（当前一级菜单未  停用或删除下的子集）的子集项
select * from (select 
b.id,b.parent_id,b.title,ifnull(b.icon,'') as icon,ifnull(b.path,'') as path,b.`status`,b.type,ifnull(b.`order`,999) as `order`
from system_menu a INNER  join system_menu b  where a.id=b.parent_id 
and a.`status`=1 and b.`status`=1 
order by a.`order`,b.`order`  limit 9999999999999) i;




END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_menu_sort
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_menu_sort`;
delimiter ;;
CREATE PROCEDURE `p_system_menu_sort`(IN `_dq_id` int,IN `_dq_order` int,IN `_th_id` int,IN `_th_order` int)
BEGIN

-- 这个是菜单页面的 上下移动排序的事务方法 
-- _dq_id  当前行的   id
-- _dq_order 当前行的 序号（order）
-- _th_id  要被替换行的 id
-- _th_order 要被替换行的 序号（order）

   start transaction; -- 开始事务
    update system_menu  set `order`=_th_order where id=_dq_id;
	 
	 
	 
  if row_count() < 1 then  
	 -- select row_count(); -- 查看受影响行数
    set @col1 = 0;   
    rollback;  -- 回滚
		else
		-- select row_count(); -- 查看受影响行数
		 set @col1 = 1;  
  end if;
   update system_menu  set `order`=_dq_order where id=_th_id ;

  if row_count() < 1 then  
	  -- select row_count(); -- 查看受影响行数
    set  @col2 = 0;  
    rollback;  -- 回滚
   else 
	 -- select row_count(); -- 查看受影响行数
	 set @col2 = 1;  
   COMMIT; -- 提交事务
  end if; 
	
  select @col1 as num1,@col2 as num2;-- 标识 是否成功
 
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_navs
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_navs`;
delimiter ;;
CREATE PROCEDURE `p_system_navs`(in _uid VARCHAR(225))
BEGIN
-- ------左侧菜单显示






-- select * from (select 
-- id ,parent_id, title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread 
-- from system_menu where parent_id =0 and `status`=1 order by `order` limit 9999999999999) u union all
-- -- 查询所有 有效（当前一级菜单未  停用或删除下的子集）的子集项
-- select * from (select 
-- b.id ,b.parent_id, b.title,'iconfont' as fontFamily,ifnull(b.icon,'') as icon, ifnull(b.path,'')  as href,IF(b.type=1, true, false) as isCheck,false  as spread
-- from system_menu a INNER  join system_menu b  where a.id=b.parent_id 
-- and a.`status`=1 and b.`status`=1 
-- order by a.`order`,b.`order`  limit 9999999999999) i;
-- 
-- 
-- 





--  select  * from (
-- 
--    select id ,parent_id, title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread  from system_menu where parent_id=0  and id in(
-- 	 
--  SELECT DISTINCT m.parent_id as parent_id from 
--  system_user  e left JOIN  system_user_role  re on e.id=re.eid   INNER JOIN  system_role r on re.rid=r.id  
--    INNER JOIN system_role_menu rm on rm.rid=r.id INNER JOIN system_menu m on rm.mid=m.id 
--   where e.id= _uid and r.status=1  and re.status=1 and rm.status=1 and m.status=1 GROUP BY mid  
-- 	
--  )
-- 
--  UNION  
--   (
--  SELECT  m.id ,m.parent_id, m.title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread   from 
-- 	system_user  e left JOIN  system_user_role  re on e.id=re.eid   INNER JOIN  system_role r  on re.rid=r.id  
--    INNER JOIN system_role_menu rm on rm.rid=r.id INNER JOIN system_menu m on rm.mid=m.id 
--   where e.id=_uid and r.status=1  and re.status=1 and rm.status=1 and m.status=1 GROUP BY mid  
--  ) 
--  ) a  order by id ;
-- 






 select  * from (
   select id ,parent_id, title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread  ,`order` from system_menu where parent_id=0  and id in(
	 
 SELECT DISTINCT m.parent_id as parent_id from 
 system_user  e left JOIN  system_user_role  re on e.id=re.eid   INNER JOIN  system_role r on re.rid=r.id  
   INNER JOIN system_role_menu rm on rm.rid=r.id INNER JOIN system_menu m on rm.mid=m.id 
  where e.id= _uid and r.status=1  and re.status=1 and rm.status=1 and m.status=1 GROUP BY mid  ORDER BY `order`
	
 ) 
 
 UNION  
  (
 SELECT  m.id ,m.parent_id, m.title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread  ,`order` from 
	system_user  e left JOIN  system_user_role  re on e.id=re.eid   INNER JOIN  system_role r  on re.rid=r.id  
   INNER JOIN system_role_menu rm on rm.rid=r.id INNER JOIN system_menu m on rm.mid=m.id 
  where e.id=_uid and r.status=1  and re.status=1 and rm.status=1 and m.status=1 GROUP BY mid  
 ) 
 ) a order by `order`;
 










END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role`;
delimiter ;;
CREATE PROCEDURE `p_system_role`(in _page VARCHAR(225),
in _limit VARCHAR(225))
BEGIN
 
 

set @strsql1=concat("select 

id,
name,
date_format(createtime, '%Y-%m-%d %H:%i:%s') as createtime,
date_format(updatetime, '%Y-%m-%d %H:%i:%s') as updatetime,
createname,
status

from system_role  LIMIT ",_page * _limit -_limit ," , ",_limit );

set @strsql2=concat("select
       count(*) as num
       from system_role");
 prepare stmtsql1 from @strsql1; 
 execute stmtsql1; 
 deallocate prepare stmtsql1; 

 prepare stmtsql2 from @strsql2; 
 execute stmtsql2; 
 deallocate prepare stmtsql2; 
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_add
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_add`;
delimiter ;;
CREATE PROCEDURE `p_system_role_add`(in _username VARCHAR(225),
in _name VARCHAR(225),
in _creatname VARCHAR(225))
BEGIN
 select count(*) into @count from system_user where `name`=_name;
 if  @count>=1 then
 select 2 as res;
 else 
insert into system_role(name,createtime,updatetime,createname,isdel) values(_name,now(),now(),_creatname,'1');
if FOUND_ROWS()<=0 then 

select 0 as res;

else

select 1 as res;

end if;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_del
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_del`;
delimiter ;;
CREATE PROCEDURE `p_system_role_del`(in _id int)
BEGIN
 DELETE FROM system_role WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_edit`;
delimiter ;;
CREATE PROCEDURE `p_system_role_edit`(in _id int,
 in _name  varchar(200),
 in _createname  varchar(200),
 in _status int)
BEGIN
SELECT count(*) into @count FROM system_role WHERE name=_name ;
IF @count<=0 THEN
UPDATE system_role SET name=_name,createname=_createname,status=_status WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;
ELSE
SELECT count(*) into @count1 FROM system_role WHERE name=_name and id=_id;
IF @count1>0 THEN
UPDATE system_role SET name=_name,createname=_createname,status=_status WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;
ELSE
select 2 as res;
END IF;

END IF;



END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_menu
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_menu`;
delimiter ;;
CREATE PROCEDURE `p_system_role_menu`(in _rid int)
BEGIN

select 
id,
parent_id,
title,
icon,
path,
`status`,
type,
`order`
 from system_menu  order by parent_id ;
 
 
-- select id as mid from system_menu where parent_id=0  and id in(select DISTINCT m.parent_id  from system_menu m left join system_role_menu r on m.id=r.mid  where rid=_rid
-- ) union all select DISTINCT m.id as mid from  system_menu m left join system_role_menu r on m.id=r.mid  where rid=_rid;
-- 		

select id as mid from system_menu where parent_id=0  and id in(

select DISTINCT m.parent_id  from system_menu m left join system_role_menu r on m.id=r.mid  where rid=_rid

) union all select DISTINCT m.id as mid from  system_menu m left join system_role_menu r on m.id=r.mid  where rid=_rid;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_menu_del
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_menu_del`;
delimiter ;;
CREATE PROCEDURE `p_system_role_menu_del`(in _id int)
BEGIN




 select count(*) into @count from system_role_menu where rid=_id;
 if  @count>=1 then
 DELETE FROM system_role_menu WHERE rid=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;
 else 
 select 1 as res;
end if;




END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_role_status
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_role_status`;
delimiter ;;
CREATE PROCEDURE `p_system_role_status`(in _id int,
 in _status int)
BEGIN
UPDATE system_role SET status=_status WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user`;
delimiter ;;
CREATE PROCEDURE `p_system_user`(in _page VARCHAR(225),
in _limit VARCHAR(225))
BEGIN
 
 

set @strsql1=concat("select
       id,
       username,
       loginname,
       password,
       DATE_FORMAT(createtime,'%Y-%m-%d %H:%i:%s') as createtime,
       DATE_FORMAT(updatetime,'%Y-%m-%d %H:%i:%s') as updatetime,
       status
       from system_user  LIMIT ",_page * _limit -_limit ," , ",_limit );

set @strsql2=concat("select
       count(*) as num
       from system_user");
 prepare stmtsql1 from @strsql1; 
 execute stmtsql1; 
 deallocate prepare stmtsql1; 

 prepare stmtsql2 from @strsql2; 
 execute stmtsql2; 
 deallocate prepare stmtsql2; 
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_add
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_add`;
delimiter ;;
CREATE PROCEDURE `p_system_user_add`(in _username VARCHAR(225),
in _loginname VARCHAR(225),
in _pwd VARCHAR(225),
in _status VARCHAR(225))
BEGIN
 select count(*) into @count from system_user where loginname=_loginname;
 if  @count>=1 then
 select 2 as res;
 else 
insert into system_user(username,loginname,password,createtime,updatetime,status) values(_username,_loginname,_pwd,now(),now(),_status);
if FOUND_ROWS()<=0 then 

select 0 as res;

else

select 1 as res;

end if;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_del
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_del`;
delimiter ;;
CREATE PROCEDURE `p_system_user_del`(in _id int)
BEGIN
 DELETE FROM system_user WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_edit
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_edit`;
delimiter ;;
CREATE PROCEDURE `p_system_user_edit`(in _id int,
 in _username  varchar(200),
 in _loginname  varchar(200),
 in _password  varchar(200),
 in _status int)
BEGIN
UPDATE system_user SET username=_username,loginname=_loginname,password=_password,status=_status WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_roleedit
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_roleedit`;
delimiter ;;
CREATE PROCEDURE `p_system_user_roleedit`(in _id int)
BEGIN
select * from system_role;

select id,eid,rid,status from system_user_role where eid=_id;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_role_add_del
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_role_add_del`;
delimiter ;;
CREATE PROCEDURE `p_system_user_role_add_del`(in _flag varchar(200),
_rid int,
_eid int,
createname varchar(200),
_status int)
BEGIN
if _flag='true' then
INSERT INTO system_user_role(rid,eid,createtime,createname,status)values(_rid,_eid,now(),createname,_status);
if ROW_COUNT()>0 then
 select 1 as res;
else 
 select 0 as res;
end if;
elseif _flag='false' then
DELETE FROM system_user_role WHERE rid=_rid and eid=_eid;
if ROW_COUNT()>0 then
 select 1 as res;
else 
 select 0 as res;
end if ;
else
 select 0 as res;
end if ;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_user_status
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_user_status`;
delimiter ;;
CREATE PROCEDURE `p_system_user_status`(in _id int,
in _status int)
BEGIN
UPDATE system_user SET status=_status WHERE id=_id;
IF FOUND_ROWS()<=0 THEN 
select 0 as res;
else
select 1 as res;
end if;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_login
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_login`;
delimiter ;;
CREATE PROCEDURE `p_user_login`(in _sqlflag VARCHAR(225),
in _loginname VARCHAR(225),
in _password VARCHAR(225))
BEGIN

-- _sqlflag （local  qq wechat）三种


-- 检验账号是否第一次登入（第一次登录 则注册，否则验证账号）
select id,username,loginname from system_user where  loginname=_loginname ;
-- 登录 检验是否存在该账号 （前提是账号已经注册过）
 select id,username,loginname from system_user where loginname=_loginname and `password`=_password;



END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_register_verify
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_register_verify`;
delimiter ;;
CREATE PROCEDURE `p_user_register_verify`(in _identity_type VARCHAR(225),
in _identifier VARCHAR(225))
BEGIN

-- 验证该用户是否存在
select  * from user_auths where  identifier=_identifier and identity_type=_identity_type;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_token
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_token`;
delimiter ;;
CREATE PROCEDURE `p_user_token`(in _uid VARCHAR(225),
in _identity_type VARCHAR(225),
in _randomkey VARCHAR(225),
in _ip VARCHAR(225))
BEGIN

-- 得到登陆用户的最新 token(查询)
select  if(randomkey=_randomkey and ip=_ip ,1,0) as res from  user_token where uid=_uid and identity_type=_identity_type  order by id DESC limit 1;	

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_userinfo
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_userinfo`;
delimiter ;;
CREATE PROCEDURE `p_user_userinfo`(in _uid VARCHAR(225),
in _identity_type VARCHAR(225))
BEGIN
-- 用户信息
-- select u.id as id
-- ,u.uid as uid
-- ,u.nick_name as  nick_name
-- ,u.gender as  gender
-- ,u.birthday as birthday
-- ,u.face as face
-- ,ua.identity_type as identity_type
-- ,ua.identifier as identifier
-- ,ua.ip as ip
-- from  `user` u left join user_auths ua on u.uid=ua.uid where ua.uid=_uid and ua.identity_type=_identity_type;
-- 


SELECT * from  system_user where id=_uid;



END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
