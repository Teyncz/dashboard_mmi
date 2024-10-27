-- CreateTable
CREATE TABLE `MCC` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ects` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MCC_ects_key`(`ects`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoefUE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEcts` INTEGER NOT NULL,
    `idUE` VARCHAR(191) NOT NULL,
    `coef` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
