/*
  Warnings:

  - You are about to drop the `grade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `grade`;

-- CreateTable
CREATE TABLE `Grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gradeName` VARCHAR(191) NOT NULL,
    `studentNumber` VARCHAR(191) NOT NULL,
    `studentGrade` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `gradeLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
