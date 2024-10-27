/*
  Warnings:

  - You are about to alter the column `student_number` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `student_number` VARCHAR(191) NOT NULL;
