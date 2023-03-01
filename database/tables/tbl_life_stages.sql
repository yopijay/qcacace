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

 Date: 02/03/2023 06:29:08
*/


-- ----------------------------
-- Sequence for tbl_life_stages
-- ----------------------------
CREATE SEQUENCE "public"."tbl_life_stages_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_life_stages_id_seq"', 7, true);


-- ----------------------------
-- Table structure for tbl_life_stages
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_life_stages";
CREATE TABLE "public"."tbl_life_stages" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_life_stages_id_seq'::regclass),
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
-- Records of tbl_life_stages
-- ----------------------------
INSERT INTO "public"."tbl_life_stages" VALUES (1, 'WTWWXUE', 1, 'KITTENS (BIRTH UP TO 1 YEAR)', 1, 1, NULL, NULL, '2023-02-10 20:31:47.00505+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (2, 'NOW4A84', 1, 'YOUNG ADULT (1 YEAR TO 6 YEARS)', 1, 1, NULL, NULL, '2023-02-10 20:32:00.180646+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (3, 'THFU34N', 1, 'MATURE ADULT (7 YEARS TO 10 YEARS)', 1, 1, NULL, NULL, '2023-02-10 20:32:13.750786+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (4, 'NFLD1ZJ', 1, 'SENIOR (OVER 10 YEARS)', 1, 1, NULL, NULL, '2023-02-10 20:32:26.268405+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (5, 'W860O0O', 2, 'PUPPY (BIRTH UP TO 1 YEAR)', 1, 1, NULL, NULL, '2023-02-10 20:32:40.81656+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (6, 'IPOMY02', 2, 'ADULT DOG (1 YEAR TO 7 YEARS)', 1, 1, NULL, NULL, '2023-02-10 20:32:55.149203+08', NULL, NULL);
INSERT INTO "public"."tbl_life_stages" VALUES (7, 'KTHG80W', 2, 'SENIOR DOG (OVER 10 YEARS)', 1, 1, NULL, NULL, '2023-02-10 20:33:17.098302+08', NULL, NULL);

-- ----------------------------
-- Primary Key structure for table tbl_life_stages
-- ----------------------------
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_life_stages
-- ----------------------------
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
