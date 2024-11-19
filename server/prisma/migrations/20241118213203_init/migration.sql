-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
