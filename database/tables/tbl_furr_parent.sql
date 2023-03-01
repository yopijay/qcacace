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

 Date: 02/03/2023 06:29:02
*/


-- ----------------------------
-- Sequence for tbl_furr_parent
-- ----------------------------
CREATE SEQUENCE "public"."tbl_furr_parent_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

SELECT setval('"public"."tbl_furr_parent_id_seq"', 2, true);


-- ----------------------------
-- Table structure for tbl_furr_parent
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_furr_parent";
CREATE TABLE "public"."tbl_furr_parent" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_furr_parent_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "code" varchar(20) COLLATE "pg_catalog"."default",
  "fname" varchar(100) COLLATE "pg_catalog"."default",
  "mname" varchar(100) COLLATE "pg_catalog"."default",
  "lname" varchar(100) COLLATE "pg_catalog"."default",
  "gender" varchar(20) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "contact_no" varchar(20) COLLATE "pg_catalog"."default",
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_furr_parent
-- ----------------------------
INSERT INTO "public"."tbl_furr_parent" VALUES (1, '0VE0Z6E', 'judan.pauljohn@gmail.com', NULL, 'PAUL JOHN', 'SOLANO', 'JUDAN', 'male', '#364 RIVERA ST. BRGY. SANGANDAAN, QUEZON CITY, 1116', '09502099508', '2023-03-01 23:47:39.467781+08', '2023-03-02 00:16:38.078044+08');
INSERT INTO "public"."tbl_furr_parent" VALUES (2, 'T27HN49', 'madroniohazel12@gmail.com', NULL, 'HAZEL', 'RANARA', 'MADRONIO', 'female', '#2 DOÑA ADELLA ST. SANTIAGO SUBD., NOVALICHES, QUEZOM CITY', '09503726254', '2023-03-02 01:38:50.725078+08', NULL);

-- ----------------------------
-- Primary Key structure for table tbl_furr_parent
-- ----------------------------
ALTER TABLE "public"."tbl_furr_parent" ADD CONSTRAINT "tbl_furr_parent_pkey" PRIMARY KEY ("id");
