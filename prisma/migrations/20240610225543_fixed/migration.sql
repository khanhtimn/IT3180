/*
  Warnings:

  - You are about to drop the column `last_name` on the `Resident` table. All the data in the column will be lost.
  - Added the required column `name` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resident` DROP COLUMN `last_name`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
