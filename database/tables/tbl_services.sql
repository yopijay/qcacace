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

 Date: 02/03/2023 06:29:52
*/


-- ----------------------------
-- Sequence for tbl_services
-- ----------------------------
CREATE SEQUENCE "public"."tbl_services_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_services_id_seq"', 2, true);


-- ----------------------------
-- Table structure for tbl_services
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_services";
CREATE TABLE "public"."tbl_services" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_services_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "pet_id" int4,
  "docu_id" int4,
  "payment_id" int4,
  "schedule_id" int4,
  "type" varchar(50) COLLATE "pg_catalog"."default",
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_services
-- ----------------------------
INSERT INTO "public"."tbl_services" VALUES (1, 'NH92YB7', 1, NULL, NULL, NULL, NULL, 'adoption', 'pending', '2023-03-01 23:47:39.476051+08', NULL);
INSERT INTO "public"."tbl_services" VALUES (2, 'TSEWSO1', 2, NULL, NULL, NULL, NULL, 'adoption', 'pending', '2023-03-02 01:38:50.727773+08', NULL);

-- ----------------------------
-- Primary Key structure for table tbl_services
-- ----------------------------
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_services
-- ----------------------------
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_docu_id_fkey" FOREIGN KEY ("docu_id") REFERENCES "public"."tbl_documents" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."tbl_pets" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."tbl_schedule" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
