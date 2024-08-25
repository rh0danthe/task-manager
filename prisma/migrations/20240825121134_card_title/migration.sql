/*
  Warnings:

  - Added the required column `title` to the `TaskCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskCard" ADD COLUMN     "title" TEXT NOT NULL;
