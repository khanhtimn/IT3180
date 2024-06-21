/*
  Warnings:

  - Made the column `addressId` on table `Resident` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Resident` DROP FOREIGN KEY `Resident_addressId_fkey`;

-- AlterTable
ALTER TABLE `Resident` MODIFY `addressId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Resident` ADD CONSTRAINT `Resident_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
