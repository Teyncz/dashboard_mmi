-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `gradeslist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
