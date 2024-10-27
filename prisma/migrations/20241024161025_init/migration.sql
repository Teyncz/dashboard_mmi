/*
  Warnings:

  - Added the required column `Hour` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `Hour` VARCHAR(191) NOT NULL;
