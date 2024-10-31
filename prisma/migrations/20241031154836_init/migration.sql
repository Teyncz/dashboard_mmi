-- CreateTable
CREATE TABLE `coefue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEcts` INTEGER NOT NULL,
    `idUE` VARCHAR(191) NOT NULL,
    `coef` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentNumber` VARCHAR(191) NOT NULL,
    `studentGrade` VARCHAR(191) NOT NULL,
    `gradeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gradeslist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gradeName` VARCHAR(191) NOT NULL,
    `gradeLink` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `skill` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `avg` VARCHAR(191) NOT NULL DEFAULT '',
    `last_modified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ects` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `Color` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `Hour` VARCHAR(191) NOT NULL,
    `Statut` VARCHAR(191) NOT NULL DEFAULT 'toDo',
    `TaskInfo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `studentNumber` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NULL,
    `pp` VARCHAR(191) NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#2D55FF',
    `tp` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_studentNumber_key`(`studentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentNumber` VARCHAR(20) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `groupTp` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `students_studentNumber_key`(`studentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `gradeslist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
