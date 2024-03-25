/*
  Warnings:

  - You are about to drop the column `account_id` on the `deposits` table. All the data in the column will be lost.
  - You are about to drop the column `origin_account_id` on the `transfers` table. All the data in the column will be lost.
  - You are about to drop the column `target_account` on the `transfers` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `withidrawals` table. All the data in the column will be lost.
  - Added the required column `account_number` to the `deposits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_account_number` to the `transfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_account_number` to the `transfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_number` to the `withidrawals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `deposits` DROP FOREIGN KEY `deposits_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transfers` DROP FOREIGN KEY `transfers_origin_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transfers` DROP FOREIGN KEY `transfers_target_account_fkey`;

-- DropForeignKey
ALTER TABLE `withidrawals` DROP FOREIGN KEY `withidrawals_account_id_fkey`;

-- AlterTable
ALTER TABLE `deposits` DROP COLUMN `account_id`,
    ADD COLUMN `account_number` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transfers` DROP COLUMN `origin_account_id`,
    DROP COLUMN `target_account`,
    ADD COLUMN `origin_account_number` INTEGER NOT NULL,
    ADD COLUMN `target_account_number` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `withidrawals` DROP COLUMN `account_id`,
    ADD COLUMN `account_number` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `deposits` ADD CONSTRAINT `deposits_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `accounts`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withidrawals` ADD CONSTRAINT `withidrawals_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `accounts`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfers` ADD CONSTRAINT `transfers_origin_account_number_fkey` FOREIGN KEY (`origin_account_number`) REFERENCES `accounts`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfers` ADD CONSTRAINT `transfers_target_account_number_fkey` FOREIGN KEY (`target_account_number`) REFERENCES `accounts`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
