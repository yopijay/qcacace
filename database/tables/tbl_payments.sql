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

 Date: 02/03/2023 06:29:24
*/


-- ----------------------------
-- Sequence for tbl_payments
-- ----------------------------
CREATE SEQUENCE "public"."tbl_payments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_payments_id_seq"', 1, false);


-- ----------------------------
-- Table structure for tbl_payments
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_payments";
CREATE TABLE "public"."tbl_payments" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_payments_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "method" varchar(30) COLLATE "pg_catalog"."default",
  "transaction_no" varchar(100) COLLATE "pg_catalog"."default",
  "evaluated_by" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_payments
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table tbl_payments
-- ----------------------------
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_payments
-- ----------------------------
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_evaluated_by_fkey" FOREIGN KEY ("evaluated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
