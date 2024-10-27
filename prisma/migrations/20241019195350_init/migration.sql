/*
  Warnings:

  - You are about to alter the column `gradeId` on the `grades` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `grades` MODIFY `gradeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Grades` ADD CONSTRAINT `Grades_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `GradesList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
