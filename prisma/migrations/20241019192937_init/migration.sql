/*
  Warnings:

  - You are about to drop the `grade2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gradelink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gradeLink` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradeName` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Grade_studentNumber_key` ON `grade`;

-- AlterTable
ALTER TABLE `grade` ADD COLUMN `gradeLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `gradeName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `grade2`;

-- DropTable
DROP TABLE `gradelink`;
