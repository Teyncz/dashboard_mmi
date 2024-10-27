/*
  Warnings:

  - You are about to drop the column `student_number` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_student_number_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `student_number`,
    ADD COLUMN `studentNumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_studentNumber_key` ON `User`(`studentNumber`);
