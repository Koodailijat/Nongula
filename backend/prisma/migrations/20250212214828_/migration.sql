-- DropForeignKey
ALTER TABLE "FoodLog" DROP CONSTRAINT "FoodLog_userId_fkey";

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
