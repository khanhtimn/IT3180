/*
  Warnings:

  - Added the required column `vehicleFee` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fee` ADD COLUMN `vehicleFee` INTEGER NOT NULL;
