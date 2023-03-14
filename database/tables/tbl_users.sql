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

 Date: 14/03/2023 20:05:27
*/


-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_users";
CREATE TABLE "public"."tbl_users" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_users_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "password" varchar(250) COLLATE "pg_catalog"."default",
  "contact_no" varchar(20) COLLATE "pg_catalog"."default",
  "is_email_verified" int4,
  "is_contact_no_verified" int4,
  "user_level" varchar(10) COLLATE "pg_catalog"."default",
  "is_logged" int4,
  "code" varchar(10) COLLATE "pg_catalog"."default",
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
-- Records of tbl_users
-- ----------------------------
INSERT INTO "public"."tbl_users" VALUES (2, '3RCRB99', 'jhon.renel.fabula@gmail.com', 'ZmZmYWFhYmJi', NULL, 1, NULL, 'admin', 0, '0N47O5', 1, 1, 1, NULL, '2023-03-10 22:51:40.245732+08', '2023-03-10 22:52:12.573844+08', NULL);
INSERT INTO "public"."tbl_users" VALUES (1, '0000000', 'superadmin@qcacac.com.ph', 'QFN1cGVyYWRtaW4wMDAw', NULL, 1, 1, 'superadmin', 0, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."tbl_users" VALUES (3, 'XTFQ3HK', 'devie.mercado11132000@gmail.com', 'ZGRkZWVlYmJi', NULL, 1, NULL, 'evaluator', 0, '4L1XKB', 1, 1, 1, NULL, '2023-03-10 22:52:53.411886+08', '2023-03-10 22:53:43.398748+08', NULL);
INSERT INTO "public"."tbl_users" VALUES (4, 'EGWBZZK', 'eugenetamidles@gmail.com', 'ZXVnZW5lcG9naTIxMw==', NULL, 1, NULL, 'admin', 1, 'S1WKOP', 1, 1, 1, NULL, '2023-03-10 22:53:28.350562+08', '2023-03-10 22:53:47.837174+08', NULL);

-- ----------------------------
-- Primary Key structure for table tbl_users
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_users
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
