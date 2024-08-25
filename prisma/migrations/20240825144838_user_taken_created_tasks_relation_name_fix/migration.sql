/*
  Warnings:

  - You are about to drop the column `taskcard_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `_User_TakenTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taskcards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `task_card_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_User_TakenTasks" DROP CONSTRAINT "_User_TakenTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_TakenTasks" DROP CONSTRAINT "_User_TakenTasks_B_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_taskcard_id_fkey";

-- DropForeignKey
ALTER TABLE "taskcards" DROP CONSTRAINT "taskcards_column_id_fkey";

-- DropForeignKey
ALTER TABLE "taskcards" DROP CONSTRAINT "taskcards_creator_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "taskcard_id",
ADD COLUMN     "task_card_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_User_TakenTasks";

-- DropTable
DROP TABLE "taskcards";

-- CreateTable
CREATE TABLE "task_cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "column_id" INTEGER NOT NULL,

    CONSTRAINT "task_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_taken_tasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_taken_tasks_AB_unique" ON "_user_taken_tasks"("A", "B");

-- CreateIndex
CREATE INDEX "_user_taken_tasks_B_index" ON "_user_taken_tasks"("B");

-- AddForeignKey
ALTER TABLE "task_cards" ADD CONSTRAINT "task_cards_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_cards" ADD CONSTRAINT "task_cards_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_card_id_fkey" FOREIGN KEY ("task_card_id") REFERENCES "task_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_taken_tasks" ADD CONSTRAINT "_user_taken_tasks_A_fkey" FOREIGN KEY ("A") REFERENCES "task_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_taken_tasks" ADD CONSTRAINT "_user_taken_tasks_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
