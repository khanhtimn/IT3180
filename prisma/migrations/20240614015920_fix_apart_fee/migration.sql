/*
  Warnings:

  - Made the column `size` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apartmentNo` on table `Fee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Fee` DROP FOREIGN KEY `Fee_apartmentNo_fkey`;

-- AlterTable
ALTER TABLE `Apartment` MODIFY `size` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Fee` MODIFY `apartmentNo` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Fee` ADD CONSTRAINT `Fee_apartmentNo_fkey` FOREIGN KEY (`apartmentNo`) REFERENCES `Apartment`(`apartmentNo`) ON DELETE CASCADE ON UPDATE CASCADE;
