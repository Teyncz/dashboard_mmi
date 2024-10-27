/*
  Warnings:

  - You are about to drop the column `date` on the `grades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `grades` DROP COLUMN `date`;

-- CreateTable
CREATE TABLE `GradesList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gradeName` VARCHAR(191) NOT NULL,
    `gradeLink` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GradesList_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
