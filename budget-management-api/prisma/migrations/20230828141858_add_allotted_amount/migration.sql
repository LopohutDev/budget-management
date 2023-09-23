/*
  Warnings:

  - Added the required column `allottedAmount` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "allottedAmount" DOUBLE PRECISION NOT NULL;
