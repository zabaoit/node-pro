/*
  Warnings:

  - You are about to drop the `cartdetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartdetail` DROP FOREIGN KEY `CartDetail_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartdetail` DROP FOREIGN KEY `CartDetail_productId_fkey`;

-- DropTable
DROP TABLE `cartdetail`;

-- CreateTable
CREATE TABLE `cart_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `cartId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_detail` ADD CONSTRAINT `cart_detail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
