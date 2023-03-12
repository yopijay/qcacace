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

 Date: 12/03/2023 21:04:57
*/


-- ----------------------------
-- Sequence for tbl_appointments
-- ----------------------------
CREATE SEQUENCE "public"."tbl_animal_care_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;


-- ----------------------------
-- Table structure for tbl_animal_care
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_animal_care";
CREATE TABLE "public"."tbl_animal_care" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_animal_care_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "title" varchar(100) COLLATE "pg_catalog"."default",
  "subtitle" varchar(100) COLLATE "pg_catalog"."default",
  "date" varchar(50) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
  "status" int4,
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6),
  "date_deleted" timestamptz(6)
)
;

-- ----------------------------
-- Primary Key structure for table tbl_animal_care
-- ----------------------------
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_animal_care
-- ----------------------------
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
