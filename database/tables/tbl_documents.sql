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

 Date: 02/03/2023 06:28:53
*/


-- ----------------------------
-- Sequence for tbl_documents
-- ----------------------------
CREATE SEQUENCE "public"."tbl_documents_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_documents_id_seq"', 1, false);


-- ----------------------------
-- Table structure for tbl_documents
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_documents";
CREATE TABLE "public"."tbl_documents" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_documents_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "valid_id" text COLLATE "pg_catalog"."default",
  "picture" text COLLATE "pg_catalog"."default",
  "pet_cage" text COLLATE "pg_catalog"."default",
  "evaluated_by" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_documents
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table tbl_documents
-- ----------------------------
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_documents
-- ----------------------------
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_evaluated_by_fkey" FOREIGN KEY ("evaluated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
