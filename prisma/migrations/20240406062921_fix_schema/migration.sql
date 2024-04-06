/*
  Warnings:

  - Made the column `book_id` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `student_id` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_student_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "is_return_book" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "book_id" SET NOT NULL,
ALTER COLUMN "student_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
