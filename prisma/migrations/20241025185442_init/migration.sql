/*
  Warnings:

  - Added the required column `fname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pp` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `color` VARCHAR(191) NOT NULL DEFAULT '#2D55FF',
    ADD COLUMN `fname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lname` VARCHAR(191) NOT NULL,
    ADD COLUMN `pp` VARCHAR(191) NOT NULL;
