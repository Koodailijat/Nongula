/*
  Warnings:

  - Added the required column `target_calories` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "target_calories" INTEGER NOT NULL;
