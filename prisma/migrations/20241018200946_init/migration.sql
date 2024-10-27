/*
  Warnings:

  - You are about to drop the column `student_number` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_student_number_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `student_number`;
