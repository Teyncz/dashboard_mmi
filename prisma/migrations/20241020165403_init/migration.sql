-- AlterTable
ALTER TABLE `gradeslist` ADD COLUMN `mccId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `GradesList` ADD CONSTRAINT `GradesList_mccId_fkey` FOREIGN KEY (`mccId`) REFERENCES `MCC`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
