-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "canCustomizeAppearance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasMarketingSystem" BOOLEAN NOT NULL DEFAULT false;
