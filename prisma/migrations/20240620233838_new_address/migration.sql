/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_apartmentId_fkey`;

-- AlterTable
ALTER TABLE `Address` DROP COLUMN `apartmentId`,
    ADD COLUMN `apartmentNo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_apartmentNo_fkey` FOREIGN KEY (`apartmentNo`) REFERENCES `Apartment`(`apartmentNo`) ON DELETE SET NULL ON UPDATE CASCADE;
