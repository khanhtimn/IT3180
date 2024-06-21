-- DropForeignKey
ALTER TABLE `Resident` DROP FOREIGN KEY `Resident_addressId_fkey`;

-- AddForeignKey
ALTER TABLE `Resident` ADD CONSTRAINT `Resident_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
