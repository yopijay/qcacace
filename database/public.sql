/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : PostgreSQL
 Source Server Version : 150001
 Source Host           : localhost:5432
 Source Catalog        : db_qcacac
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001
 File Encoding         : 65001

 Date: 23/05/2023 00:57:55
*/


-- ----------------------------
-- Sequence structure for tbl_animal_care_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_animal_care_id_seq";
CREATE SEQUENCE "public"."tbl_animal_care_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_appointments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_appointments_id_seq";
CREATE SEQUENCE "public"."tbl_appointments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_breed_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_breed_id_seq";
CREATE SEQUENCE "public"."tbl_breed_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_category_id_seq";
CREATE SEQUENCE "public"."tbl_category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_coat_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_coat_id_seq";
CREATE SEQUENCE "public"."tbl_coat_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_documents_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_documents_id_seq";
CREATE SEQUENCE "public"."tbl_documents_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_furr_parent_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_furr_parent_id_seq";
CREATE SEQUENCE "public"."tbl_furr_parent_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_life_stages_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_life_stages_id_seq";
CREATE SEQUENCE "public"."tbl_life_stages_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_missing_pets_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_missing_pets_id_seq";
CREATE SEQUENCE "public"."tbl_missing_pets_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_payments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_payments_id_seq";
CREATE SEQUENCE "public"."tbl_payments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_pets_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_pets_id_seq";
CREATE SEQUENCE "public"."tbl_pets_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_programs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_programs_id_seq";
CREATE SEQUENCE "public"."tbl_programs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_schedule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_schedule_id_seq";
CREATE SEQUENCE "public"."tbl_schedule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_services_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_services_id_seq";
CREATE SEQUENCE "public"."tbl_services_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_subscribers_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_subscribers_id_seq";
CREATE SEQUENCE "public"."tbl_subscribers_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_tags_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_tags_id_seq";
CREATE SEQUENCE "public"."tbl_tags_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_users_id_seq";
CREATE SEQUENCE "public"."tbl_users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_users_info_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_users_info_id_seq";
CREATE SEQUENCE "public"."tbl_users_info_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for tbl_animal_care
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_animal_care";
CREATE TABLE "public"."tbl_animal_care" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_animal_care_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "title" text COLLATE "pg_catalog"."default",
  "subtitle" text COLLATE "pg_catalog"."default",
  "date" varchar(50) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
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
-- Records of tbl_animal_care
-- ----------------------------

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
INSERT INTO "public"."tbl_appointments" VALUES (1, '6P1AH04', 5, 22, 2023, 4, 1, 1, NULL, NULL, '2023-05-22 16:37:29.204295+08', NULL, NULL);

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
-- Table structure for tbl_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_category";
CREATE TABLE "public"."tbl_category" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_category_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
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
-- Records of tbl_category
-- ----------------------------
INSERT INTO "public"."tbl_category" VALUES (1, '9NYMQ1X', 'CAT', 1, 1, NULL, NULL, '2023-02-10 20:28:52.913433+08', NULL, NULL);
INSERT INTO "public"."tbl_category" VALUES (2, 'EGHM0Q9', 'DOG', 1, 1, NULL, NULL, '2023-02-10 20:28:57.838493+08', NULL, NULL);

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
-- Table structure for tbl_documents
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_documents";
CREATE TABLE "public"."tbl_documents" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_documents_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "valid_id" text COLLATE "pg_catalog"."default",
  "picture" text COLLATE "pg_catalog"."default",
  "pet_cage" text COLLATE "pg_catalog"."default",
  "evaluated_by" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6),
  "proof_billing" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tbl_documents
-- ----------------------------

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
  "street" text COLLATE "pg_catalog"."default",
  "contact_no" varchar(20) COLLATE "pg_catalog"."default",
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6),
  "birthdate" varchar(20) COLLATE "pg_catalog"."default",
  "barangay" varchar(100) COLLATE "pg_catalog"."default",
  "city" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tbl_furr_parent
-- ----------------------------

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
-- Table structure for tbl_missing_pets
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_missing_pets";
CREATE TABLE "public"."tbl_missing_pets" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_missing_pets_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "category_id" int4,
  "breed_id" int4,
  "coat_id" int4,
  "life_stages_id" int4,
  "gender" varchar(10) COLLATE "pg_catalog"."default",
  "color" varchar(50) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "owner_contact_no" varchar(20) COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
  "created_by" int4,
  "updated_by" int4,
  "deleted_by" int4,
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6),
  "date_deleted" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_missing_pets
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_payments
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_payments";
CREATE TABLE "public"."tbl_payments" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_payments_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "method" varchar(30) COLLATE "pg_catalog"."default",
  "transaction_no" varchar(100) COLLATE "pg_catalog"."default",
  "evaluated_by" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6),
  "payment_date" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tbl_payments
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_pets
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_pets";
CREATE TABLE "public"."tbl_pets" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_pets_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "category_id" int4,
  "breed_id" int4,
  "coat_id" int4,
  "life_stages_id" int4,
  "gender" varchar(20) COLLATE "pg_catalog"."default",
  "sterilization" varchar(20) COLLATE "pg_catalog"."default",
  "energy_level" varchar(20) COLLATE "pg_catalog"."default",
  "weight" varchar(50) COLLATE "pg_catalog"."default",
  "color" text COLLATE "pg_catalog"."default",
  "tags" text COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
  "is_adopt" int4,
  "status" int4,
  "created_by" int4,
  "updated_by" int4,
  "date_created" timestamptz(6),
  "date_updated" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_pets
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_programs
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_programs";
CREATE TABLE "public"."tbl_programs" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_programs_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "title" text COLLATE "pg_catalog"."default",
  "subtitle" text COLLATE "pg_catalog"."default",
  "date" varchar(50) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "photo" text COLLATE "pg_catalog"."default",
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
-- Records of tbl_programs
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_schedule
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_schedule";
CREATE TABLE "public"."tbl_schedule" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_schedule_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "furr_parent_id" int4,
  "appointment_id" int4,
  "evaluated_by" int4,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "date_filed" timestamptz(6),
  "date_evaluated" timestamptz(6),
  "q1" int4,
  "q2" int4,
  "q3" int4,
  "q4" int4,
  "q5" int4
)
;

-- ----------------------------
-- Records of tbl_schedule
-- ----------------------------

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
  "date_evaluated" timestamptz(6),
  "reason" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tbl_services
-- ----------------------------

-- ----------------------------
-- Table structure for tbl_subscribers
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_subscribers";
CREATE TABLE "public"."tbl_subscribers" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_subscribers_id_seq'::regclass),
  "series_no" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(100) COLLATE "pg_catalog"."default",
  "is_subscribe" int4,
  "date_subscribe" timestamptz(6),
  "date_unsubscribe" timestamptz(6)
)
;

-- ----------------------------
-- Records of tbl_subscribers
-- ----------------------------

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
INSERT INTO "public"."tbl_users" VALUES (1, '0000000', 'superadmin@qcacac.com.ph', 'QFN1cGVyYWRtaW4wMDAw', NULL, 1, 1, 'superadmin', 1, NULL, 1, NULL, 1, NULL, NULL, '2023-04-06 14:24:55.876215+08', NULL);

-- ----------------------------
-- Table structure for tbl_users_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_users_info";
CREATE TABLE "public"."tbl_users_info" (
  "id" int4 NOT NULL DEFAULT nextval('tbl_users_info_id_seq'::regclass),
  "user_id" int4,
  "fname" varchar(100) COLLATE "pg_catalog"."default",
  "mname" varchar(100) COLLATE "pg_catalog"."default",
  "lname" varchar(100) COLLATE "pg_catalog"."default",
  "gender" varchar(20) COLLATE "pg_catalog"."default",
  "address" varchar(1000) COLLATE "pg_catalog"."default",
  "avatar" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tbl_users_info
-- ----------------------------
INSERT INTO "public"."tbl_users_info" VALUES (1, 1, 'QCACAC', NULL, 'ADMIN', '', '', '"data:image/png;base64,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"');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."tbl_animal_care_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_appointments_id_seq"
OWNED BY "public"."tbl_appointments"."id";
SELECT setval('"public"."tbl_appointments_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_breed_id_seq"
OWNED BY "public"."tbl_breed"."id";
SELECT setval('"public"."tbl_breed_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_category_id_seq"
OWNED BY "public"."tbl_category"."id";
SELECT setval('"public"."tbl_category_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_coat_id_seq"
OWNED BY "public"."tbl_coat"."id";
SELECT setval('"public"."tbl_coat_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_documents_id_seq"
OWNED BY "public"."tbl_documents"."id";
SELECT setval('"public"."tbl_documents_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_furr_parent_id_seq"
OWNED BY "public"."tbl_furr_parent"."id";
SELECT setval('"public"."tbl_furr_parent_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_life_stages_id_seq"
OWNED BY "public"."tbl_life_stages"."id";
SELECT setval('"public"."tbl_life_stages_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_missing_pets_id_seq"
OWNED BY "public"."tbl_missing_pets"."id";
SELECT setval('"public"."tbl_missing_pets_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_payments_id_seq"
OWNED BY "public"."tbl_payments"."id";
SELECT setval('"public"."tbl_payments_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_pets_id_seq"
OWNED BY "public"."tbl_pets"."id";
SELECT setval('"public"."tbl_pets_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_programs_id_seq"
OWNED BY "public"."tbl_programs"."id";
SELECT setval('"public"."tbl_programs_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_schedule_id_seq"
OWNED BY "public"."tbl_schedule"."id";
SELECT setval('"public"."tbl_schedule_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_services_id_seq"
OWNED BY "public"."tbl_services"."id";
SELECT setval('"public"."tbl_services_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_subscribers_id_seq"
OWNED BY "public"."tbl_subscribers"."id";
SELECT setval('"public"."tbl_subscribers_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_tags_id_seq"
OWNED BY "public"."tbl_tags"."id";
SELECT setval('"public"."tbl_tags_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_users_id_seq"
OWNED BY "public"."tbl_users"."id";
SELECT setval('"public"."tbl_users_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_users_info_id_seq"
OWNED BY "public"."tbl_users_info"."id";
SELECT setval('"public"."tbl_users_info_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table tbl_animal_care
-- ----------------------------
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_appointments
-- ----------------------------
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_breed
-- ----------------------------
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_category
-- ----------------------------
ALTER TABLE "public"."tbl_category" ADD CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_coat
-- ----------------------------
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_documents
-- ----------------------------
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_furr_parent
-- ----------------------------
ALTER TABLE "public"."tbl_furr_parent" ADD CONSTRAINT "tbl_furr_parent_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_life_stages
-- ----------------------------
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_missing_pets
-- ----------------------------
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_payments
-- ----------------------------
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_pets
-- ----------------------------
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_programs
-- ----------------------------
ALTER TABLE "public"."tbl_programs" ADD CONSTRAINT "tbl_programs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_schedule
-- ----------------------------
ALTER TABLE "public"."tbl_schedule" ADD CONSTRAINT "tbl_schedule_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_services
-- ----------------------------
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_subscribers
-- ----------------------------
ALTER TABLE "public"."tbl_subscribers" ADD CONSTRAINT "tbl_subscribers_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_tags
-- ----------------------------
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_users
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_users_info
-- ----------------------------
ALTER TABLE "public"."tbl_users_info" ADD CONSTRAINT "tbl_users_info_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table tbl_animal_care
-- ----------------------------
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_animal_care" ADD CONSTRAINT "tbl_animal_care_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_appointments
-- ----------------------------
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_appointments" ADD CONSTRAINT "tbl_appointments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_breed
-- ----------------------------
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_breed" ADD CONSTRAINT "tbl_breed_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_category
-- ----------------------------
ALTER TABLE "public"."tbl_category" ADD CONSTRAINT "tbl_category_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_category" ADD CONSTRAINT "tbl_category_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_category" ADD CONSTRAINT "tbl_category_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_coat
-- ----------------------------
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_coat" ADD CONSTRAINT "tbl_coat_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_documents
-- ----------------------------
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_evaluated_by_fkey" FOREIGN KEY ("evaluated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_documents" ADD CONSTRAINT "tbl_documents_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_life_stages
-- ----------------------------
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_life_stages" ADD CONSTRAINT "tbl_life_stages_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_missing_pets
-- ----------------------------
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "public"."tbl_breed" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_coat_id_fkey" FOREIGN KEY ("coat_id") REFERENCES "public"."tbl_coat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_life_stages_id_fkey" FOREIGN KEY ("life_stages_id") REFERENCES "public"."tbl_life_stages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_missing_pets" ADD CONSTRAINT "tbl_missing_pets_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_payments
-- ----------------------------
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_evaluated_by_fkey" FOREIGN KEY ("evaluated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_payments" ADD CONSTRAINT "tbl_payments_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_pets
-- ----------------------------
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "public"."tbl_breed" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."tbl_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_coat_id_fkey" FOREIGN KEY ("coat_id") REFERENCES "public"."tbl_coat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_life_stages_id_fkey" FOREIGN KEY ("life_stages_id") REFERENCES "public"."tbl_life_stages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_pets" ADD CONSTRAINT "tbl_pets_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_programs
-- ----------------------------
ALTER TABLE "public"."tbl_programs" ADD CONSTRAINT "tbl_programs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_programs" ADD CONSTRAINT "tbl_programs_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_programs" ADD CONSTRAINT "tbl_programs_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_schedule
-- ----------------------------
ALTER TABLE "public"."tbl_schedule" ADD CONSTRAINT "tbl_schedule_evaluated_by_fkey" FOREIGN KEY ("evaluated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_schedule" ADD CONSTRAINT "tbl_schedule_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_services
-- ----------------------------
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_docu_id_fkey" FOREIGN KEY ("docu_id") REFERENCES "public"."tbl_documents" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_furr_parent_id_fkey" FOREIGN KEY ("furr_parent_id") REFERENCES "public"."tbl_furr_parent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."tbl_pets" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_services" ADD CONSTRAINT "tbl_services_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."tbl_schedule" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_tags
-- ----------------------------
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_tags" ADD CONSTRAINT "tbl_tags_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_users
-- ----------------------------
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tbl_users" ADD CONSTRAINT "tbl_users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tbl_users_info
-- ----------------------------
ALTER TABLE "public"."tbl_users_info" ADD CONSTRAINT "tbl_users_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
