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

 Date: 02/03/2023 06:27:41
*/


-- ----------------------------
-- Sequence for tbl_appointments
-- ----------------------------
CREATE SEQUENCE "public"."tbl_appointments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_appointments_id_seq"', 6, true);

-- ----------------------------
-- Table structure for tbl_appointments
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_appointments";
CREATE TABLE "public"."tbl_appointments" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_appointments_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "month" int4,
  "day" int4,
  "year" int4,
  "slot" int4,
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
-- Records of tbl_appointments
-- ----------------------------
INSERT INTO "public"."tbl_appointments" VALUES (2, 'PBBYUGG', 2, 27, 2023, 5, 1, 1, NULL, NULL, '2023-02-26 20:46:37.794538+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (3, 'TEEEBUU', 2, 28, 2023, 5, 1, 1, NULL, NULL, '2023-02-26 20:48:21.82969+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (4, 'KL2XHIA', 3, 1, 2023, 5, 1, 1, NULL, NULL, '2023-02-26 20:48:37.265233+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (5, 'K4TMHO8', 3, 2, 2023, 5, 1, 1, NULL, NULL, '2023-02-26 20:48:43.303494+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (6, 'OBMVHY2', 3, 3, 2023, 5, 1, 1, NULL, NULL, '2023-02-26 20:48:50.088724+08', NULL, NULL);

-- ----------------------------
-- Primary Key structure for table tbl_appointments
-- ----------------------------
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_appointments
-- ----------------------------
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
