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

 Date: 02/03/2023 06:30:13
*/


-- ----------------------------
-- Sequence for tbl_tags
-- ----------------------------
CREATE SEQUENCE "public"."tbl_tags_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_tags_id_seq"', 3, true);


-- ----------------------------
-- Table structure for tbl_tags
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_tags";
CREATE TABLE "public"."tbl_tags" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_tags_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "name" varchar(20) COLLATE "pg_catalog"."default",
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
-- Records of tbl_tags
-- ----------------------------
INSERT INTO "public"."tbl_tags" VALUES (1, 'MBLEA05', 'CUTE', 1, 1, NULL, NULL, '2023-02-10 20:34:56.28989+08', NULL, NULL);
INSERT INTO "public"."tbl_tags" VALUES (2, '0Q0VOYM', 'SWEET', 1, 1, NULL, NULL, '2023-02-10 20:35:00.624157+08', NULL, NULL);
INSERT INTO "public"."tbl_tags" VALUES (3, 'O9UEB3B', 'SMART', 1, 1, NULL, NULL, '2023-02-10 20:35:03.860903+08', NULL, NULL);

-- ----------------------------
-- Primary Key structure for table tbl_tags
-- ----------------------------
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_tags
-- ----------------------------
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
