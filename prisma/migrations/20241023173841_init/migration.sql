-- DropForeignKey
ALTER TABLE `grades` DROP FOREIGN KEY `Grades_gradeId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_ibfk_1`;

-- DropIndex
DROP INDEX `MCC_ects_key` ON `mcc`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- DropIndex
DROP INDEX `User_studentNumber_key` ON `user`;
