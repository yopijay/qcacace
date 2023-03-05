/*
 Navicat Premium Data Transfer

 Source Server         : freelance
 Source Server Type    : PostgreSQL
 Source Server Version : 150001
 Source Host           : localhost:5432
 Source Catalog        : db_qcacac
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001
 File Encoding         : 65001

 Date: 02/03/2023 06:29:58
*/


-- ----------------------------
-- Sequence for tbl_subscribers
-- ----------------------------
CREATE SEQUENCE "public"."tbl_subscribers_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_subscribers_id_seq"', 1, true);


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

-- ----------------------------
-- Primary Key structure for table tbl_subscribers
-- ----------------------------
ALTER TABLE "public"."tbl_subscribers" ADD CONSTRAINT "tbl_subscribers_pkey" PRIMARY KEY ("id");
