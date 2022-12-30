/*
  Warnings:

  - Added the required column `bookId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ListItem_title_key";

-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "bookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
