/*
  Warnings:

  - You are about to drop the column `mccId` on the `gradeslist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `gradeslist` DROP FOREIGN KEY `GradesList_mccId_fkey`;

-- AlterTable
ALTER TABLE `gradeslist` DROP COLUMN `mccId`,
    ADD COLUMN `avg` VARCHAR(191) NOT NULL DEFAULT '';
