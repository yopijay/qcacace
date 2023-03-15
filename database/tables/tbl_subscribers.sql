/*
 Navicat Premium Data Transfer

 Source Server         : qcu
 Source Server Type    : PostgreSQL
 Source Server Version : 150001
 Source Host           : localhost:5432
 Source Catalog        : db_qcacac
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001
 File Encoding         : 65001

 Date: 15/03/2023 19:56:53
*/


-- ----------------------------
-- Table structure for tbl_subscribers
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_subscribers";
CREATE TABLE "public"."tbl_subscribers" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_subscribers_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "is_subscribe" int4,
  "date_subscribe" timestamptz(6),
  "date_unsubscribe" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_subscribers
-- ----------------------------
INSERT INTO "public"."tbl_subscribers" VALUES (3, 'WHT3E84', 'conane108@gmail.com', 1, '2023-03-10 22:08:07.584095+08', NULL);
INSERT INTO "public"."tbl_subscribers" VALUES (4, 'HXGNLMC', 'eugene.laganzo.tamidles@gmail.com', 1, '2023-03-11 08:47:15.694502+08', NULL);

-- ----------------------------
-- Primary Key structure for table tbl_subscribers
-- ----------------------------
ALTER TABLE "public"."tbl_subscribers" ADD CONSTRAINT "tbl_subscribers_pkey" PRIMARY KEY ("id");
