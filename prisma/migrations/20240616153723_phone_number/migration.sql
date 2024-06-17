-- AlterTable
ALTER TABLE `Resident` ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    MODIFY `national_id` VARCHAR(191) NOT NULL;
