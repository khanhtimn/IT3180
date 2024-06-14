/*
  Warnings:

  - You are about to drop the column `type` on the `Fee` table. All the data in the column will be lost.
  - Added the required column `electricityFee` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internetFee` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterFee` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fee` DROP COLUMN `type`,
    ADD COLUMN `contributionFee` INTEGER NULL,
    ADD COLUMN `electricityFee` INTEGER NOT NULL,
    ADD COLUMN `internetFee` INTEGER NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `waterFee` INTEGER NOT NULL;
