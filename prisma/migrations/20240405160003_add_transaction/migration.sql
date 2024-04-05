/*
  Warnings:

  - A unique constraint covering the columns `[nim]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nim` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "nim" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nim_key" ON "Student"("nim");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
