/*
  Warnings:

  - You are about to drop the column `itemsPrice` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `taxPrice` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "itemsPrice",
DROP COLUMN "taxPrice",
DROP COLUMN "totalPrice";
