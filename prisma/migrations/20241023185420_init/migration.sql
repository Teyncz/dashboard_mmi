/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Grades_gradeId_fkey` ON `grades`;

-- DropIndex
DROP INDEX `userId` ON `tasks`;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `user_studentNumber_key` ON `user`(`studentNumber`);
