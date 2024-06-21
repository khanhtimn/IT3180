/*
  Warnings:

  - Made the column `addressId` on table `DateRange` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `DateRange` DROP FOREIGN KEY `DateRange_addressId_fkey`;

-- AlterTable
ALTER TABLE `DateRange` MODIFY `addressId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DateRange` ADD CONSTRAINT `DateRange_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
