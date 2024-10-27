/*
  Warnings:

  - A unique constraint covering the columns `[student_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `student_number` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_student_number_key` ON `User`(`student_number`);
