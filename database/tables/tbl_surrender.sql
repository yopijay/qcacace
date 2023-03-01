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

 Date: 02/03/2023 06:30:05
*/


-- ----------------------------
-- Sequence for tbl_surrender
-- ----------------------------
CREATE SEQUENCE "public"."tbl_surrender_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_surrender_id_seq"', 1, true);


-- ----------------------------
-- Table structure for tbl_surrender
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_surrender";
CREATE TABLE "public"."tbl_surrender" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_surrender_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
  "category_id" int4,
  "breed_id" int4,
  "coat_id" int4,
  "life_stages_id" int4,
  "gender" varchar(15) COLLATE "pg_catalog"."default",
  "sterilization" varchar(10) COLLATE "pg_catalog"."default",
  "energy_level" varchar(15) COLLATE "pg_catalog"."default",
  "weight" varchar(15) COLLATE "pg_catalog"."default",
  "color" varchar(100) COLLATE "pg_catalog"."default",
  "tags" text COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "fname" varchar(100) COLLATE "pg_catalog"."default",
  "mname" varchar(100) COLLATE "pg_catalog"."default",
  "lname" varchar(100) COLLATE "pg_catalog"."default",
  "contact_no" varchar(100) COLLATE "pg_catalog"."default",
  "owner_gender" varchar(10) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "reason" text COLLATE "pg_catalog"."default",
  "valid_id" text COLLATE "pg_catalog"."default",
  "reference_no" varchar(100) COLLATE "pg_catalog"."default",
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_created" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_surrender
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table tbl_surrender
-- ----------------------------
ALTER TABLE "public"."tbl_surrender" ADD CONSTRAINT "tbl_surrender_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_surrender
-- ----------------------------
ALTER TABLE "public"."tbl_surrender" ADD CONSTRAINT "tbl_surrender_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "public"."tbl_breed" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_surrender" ADD CONSTRAINT "tbl_surrender_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_surrender" ADD CONSTRAINT "tbl_surrender_coat_id_fkey" FOREIGN KEY ("coat_id") REFERENCES "public"."tbl_coat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_surrender" ADD CONSTRAINT "tbl_surrender_life_stages_id_fkey" FOREIGN KEY ("life_stages_id") REFERENCES "public"."tbl_life_stages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
