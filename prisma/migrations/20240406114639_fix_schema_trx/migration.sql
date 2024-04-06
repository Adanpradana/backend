/*
  Warnings:

  - The `book_id` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_book_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "book_id",
ADD COLUMN     "book_id" TEXT[];

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
