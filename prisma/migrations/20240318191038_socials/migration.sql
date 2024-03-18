/*
  Warnings:

  - You are about to drop the column `facebookLink` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `twetter` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `vkontakte` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contacts` DROP COLUMN `facebookLink`,
    DROP COLUMN `instagram`,
    DROP COLUMN `twetter`,
    DROP COLUMN `vkontakte`,
    DROP COLUMN `youtube`;

-- CreateTable
CREATE TABLE `Social` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Social_contactId_key`(`contactId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Social` ADD CONSTRAINT `Social_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
