/*
  Warnings:

  - You are about to alter the column `national_id` on the `Resident` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Resident` MODIFY `national_id` INTEGER NOT NULL;
