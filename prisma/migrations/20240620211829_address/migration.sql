/*
  Warnings:

  - The primary key for the `DateRange` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `residentId` on the `DateRange` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentNo` on the `Resident` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `DateRange` DROP FOREIGN KEY `DateRange_residentId_fkey`;

-- DropForeignKey
ALTER TABLE `Resident` DROP FOREIGN KEY `Resident_apartmentNo_fkey`;

-- AlterTable
ALTER TABLE `DateRange` DROP PRIMARY KEY,
    DROP COLUMN `residentId`,
    ADD COLUMN `addressId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Resident` DROP COLUMN `apartmentNo`,
    ADD COLUMN `addressId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NOT NULL,
    `permanentAddress` VARCHAR(191) NOT NULL,
    `currentAddress` VARCHAR(191) NOT NULL,
    `isStaying` BOOLEAN NOT NULL,

    UNIQUE INDEX `Address_apartmentId_key`(`apartmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Resident_addressId_key` ON `Resident`(`addressId`);

-- AddForeignKey
ALTER TABLE `Resident` ADD CONSTRAINT `Resident_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DateRange` ADD CONSTRAINT `DateRange_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
