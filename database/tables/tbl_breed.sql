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

 Date: 15/03/2023 19:55:06
*/


-- ----------------------------
-- Table structure for tbl_breed
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_breed";
CREATE TABLE "public"."tbl_breed" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_breed_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "category_id" int4,
  "name" varchar(50) COLLATE "pg_catalog"."default",
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
-- Records of tbl_breed
-- ----------------------------
INSERT INTO "public"."tbl_breed" VALUES (1, 'XNTWQIG', 1, 'PUSPIN', 1, 1, NULL, NULL, '2023-02-10 20:31:19.01842+08', NULL, NULL);
INSERT INTO "public"."tbl_breed" VALUES (2, 'Z590YAV', 2, 'ASPIN', 1, 1, NULL, NULL, '2023-02-10 20:31:23.993573+08', NULL, NULL);

-- ----------------------------
-- Primary Key structure for table tbl_breed
-- ----------------------------
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_breed
-- ----------------------------
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
