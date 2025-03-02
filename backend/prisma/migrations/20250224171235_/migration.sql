/*
  Warnings:

  - You are about to drop the column `target_calories` on the `User` table. All the data in the column will be lost.
  - Added the required column `target_calories_min` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "target_calories",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "target_calories_max" INTEGER,
ADD COLUMN     "target_calories_min" INTEGER NOT NULL;
