/*
  Warnings:

  - Made the column `apartmentNo` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_apartmentNo_fkey`;

-- AlterTable
ALTER TABLE `Address` MODIFY `apartmentNo` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_apartmentNo_fkey` FOREIGN KEY (`apartmentNo`) REFERENCES `Apartment`(`apartmentNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
