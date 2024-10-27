-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentNumber` VARCHAR(191) NOT NULL,
    `studentGrade` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Grade_studentNumber_key`(`studentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GradeLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gradeName` VARCHAR(191) NOT NULL,
    `gardeLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
