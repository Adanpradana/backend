/*
  Warnings:

  - You are about to drop the column `bookId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_studentId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "bookId",
DROP COLUMN "studentId",
ADD COLUMN     "book_id" TEXT,
ADD COLUMN     "student_id" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
