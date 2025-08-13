/*
  Warnings:

  - Added the required column `ownerId` to the `hotels` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `hotels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."hotels" ADD COLUMN     "ownerId" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."hotels" ADD CONSTRAINT "hotels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
