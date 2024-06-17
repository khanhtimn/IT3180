/*
  Warnings:

  - Made the column `phoneNumber` on table `Resident` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationalId` on table `Resident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Resident` MODIFY `phoneNumber` VARCHAR(191) NOT NULL,
    MODIFY `nationalId` VARCHAR(191) NOT NULL;
