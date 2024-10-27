/*
  Warnings:

  - You are about to drop the column `gradeName` on the `grades` table. All the data in the column will be lost.
  - Added the required column `gradeId` to the `Grades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `grades` DROP COLUMN `gradeName`,
    ADD COLUMN `gradeId` VARCHAR(191) NOT NULL;
