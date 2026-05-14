-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "serviceCategories" TEXT[] DEFAULT ARRAY[]::TEXT[];
