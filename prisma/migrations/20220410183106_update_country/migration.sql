/*
  Warnings:

  - Added the required column `color` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HistoricalEvent" ADD COLUMN     "countryId" TEXT;

-- AddForeignKey
ALTER TABLE "HistoricalEvent" ADD CONSTRAINT "HistoricalEvent_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
