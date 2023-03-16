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

 Date: 15/03/2023 19:55:25
*/


-- ----------------------------
-- Sequence structure for tbl_coat
-- ----------------------------
CREATE SEQUENCE "public"."tbl_coat_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_coat_id_seq"', 6, true);


-- ----------------------------
-- Table structure for tbl_coat
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_coat";
CREATE TABLE "public"."tbl_coat" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_coat_id_seq'::regclass),
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
-- Records of tbl_coat
-- ----------------------------
INSERT INTO "public"."tbl_coat" VALUES (1, 'PE27SLW', 1, 'SHORT HAIR', 1, 1, NULL, NULL, '2023-02-10 20:33:49.241517+08', NULL, NULL);
INSERT INTO "public"."tbl_coat" VALUES (2, 'KFPF0KA', 1, 'MEDIUM HAIR', 1, 1, NULL, NULL, '2023-02-10 20:33:57.390557+08', NULL, NULL);
INSERT INTO "public"."tbl_coat" VALUES (3, '5VU2RJL', 1, 'LONG HAIR', 1, 1, NULL, NULL, '2023-02-10 20:34:04.102123+08', NULL, NULL);
INSERT INTO "public"."tbl_coat" VALUES (4, 'BZ1VFPW', 2, 'SHORT COATED', 1, 1, NULL, NULL, '2023-02-10 20:34:13.700931+08', NULL, NULL);
INSERT INTO "public"."tbl_coat" VALUES (5, 'MCFBDMK', 2, 'SMOOTH COATED', 1, 1, NULL, NULL, '2023-02-10 20:34:20.848938+08', NULL, NULL);
INSERT INTO "public"."tbl_coat" VALUES (6, 'HE1CWQ9', 2, 'MEDIUM COATED', 1, 1, 1, NULL, '2023-02-10 20:34:31.022647+08', '2023-02-10 20:34:49.853655+08', NULL);

-- ----------------------------
-- Primary Key structure for table tbl_coat
-- ----------------------------
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_coat
-- ----------------------------
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
