/*
  Warnings:

  - Added the required column `skill` to the `GradesList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `GradesList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gradeslist` ADD COLUMN `skill` VARCHAR(191) NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL;
