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

 Date: 15/03/2023 19:55:44
*/


-- ----------------------------
-- Table structure for tbl_furr_parent
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_furr_parent";
CREATE TABLE "public"."tbl_furr_parent" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_furr_parent_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "code" varchar(20) COLLATE "pg_catalog"."default",
  "fname" varchar(100) COLLATE "pg_catalog"."default",
  "mname" varchar(100) COLLATE "pg_catalog"."default",
  "lname" varchar(100) COLLATE "pg_catalog"."default",
  "gender" varchar(20) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "contact_no" varchar(20) COLLATE "pg_catalog"."default",
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_furr_parent
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table tbl_furr_parent
-- ----------------------------
ALTER TABLE "public"."tbl_furr_parent" ADD CONSTRAINT "tbl_furr_parent_pkey" PRIMARY KEY ("id");
