-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `Color` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `Statut` VARCHAR(191) NOT NULL,
    `TaskInfo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
