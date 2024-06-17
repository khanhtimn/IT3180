/*
  Warnings:

  - You are about to drop the column `national_id` on the `Resident` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalId]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Resident_national_id_key` ON `Resident`;

-- AlterTable
ALTER TABLE `Resident` DROP COLUMN `national_id`,
    ADD COLUMN `nationalId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Resident_nationalId_key` ON `Resident`(`nationalId`);
