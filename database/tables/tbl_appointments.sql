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

 Date: 15/03/2023 19:54:56
*/


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
INSERT INTO "public"."tbl_appointments" VALUES (17, 'SC46KAW', 3, 20, 2023, 1, 1, 4, NULL, NULL, '2023-03-14 20:36:46.821677+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (18, 'MJ6UNTE', 3, 21, 2023, 1, 1, 4, NULL, NULL, '2023-03-14 20:36:57.877615+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (19, 'C2FVCM0', 3, 22, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:03.96417+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (20, 'IJEA30F', 3, 23, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:08.992046+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (21, '76LZEEG', 3, 24, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:13.956963+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (22, '15DFCKY', 3, 25, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:18.562473+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (23, 'L61Q4WX', 3, 26, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:23.464517+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (24, 'B1685LI', 3, 27, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:27.889622+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (25, 'ITDV7JG', 3, 28, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:33.937585+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (26, 'CP435CW', 3, 29, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:38.127011+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (28, 'U0GFRYP', 4, 1, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:50.660916+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (29, '9EZH9HQ', 4, 2, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:55.129642+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (30, 'E2YEZQT', 4, 3, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:37:59.136696+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (31, 'RSX817B', 4, 4, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:05.372815+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (32, '7PQEGD4', 4, 6, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:12.544114+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (33, 'DJ7VRI6', 4, 7, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:17.785007+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (34, 'BOGDZ46', 4, 8, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:22.626527+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (35, '9AV09CS', 4, 9, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:32.617437+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (36, 'KD9P69D', 4, 10, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:38.203945+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (37, 'RF0SV69', 4, 11, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:44.836535+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (38, 'KOKYZAG', 4, 12, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:51.201083+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (39, 'PF7UHIU', 4, 13, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:38:56.101195+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (40, '0V2TXHQ', 4, 14, 2023, 5, 1, 4, NULL, NULL, '2023-03-14 20:39:02.159663+08', NULL, NULL);
INSERT INTO "public"."tbl_appointments" VALUES (27, 'LVCA07V', 3, 30, 2023, 4, 1, 4, NULL, NULL, '2023-03-14 20:37:42.900877+08', NULL, NULL);

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
