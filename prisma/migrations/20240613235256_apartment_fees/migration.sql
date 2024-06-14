/*
  Warnings:

  - You are about to drop the column `residentId` on the `Fee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Fee_residentId_idx` ON `Fee`;

-- AlterTable
ALTER TABLE `Fee` DROP COLUMN `residentId`;
