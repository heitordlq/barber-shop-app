-- CreateEnum
CREATE TYPE "PlanLimitsScope" AS ENUM ('TENANT', 'PER_BARBER');

-- CreateEnum
CREATE TYPE "BillingModel" AS ENUM ('LEGACY', 'OWNER_CUT_PERCENT');

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "limitsScope" "PlanLimitsScope" NOT NULL DEFAULT 'TENANT',
ADD COLUMN     "maxServicesPerBarber" INTEGER;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "billingModel" "BillingModel" NOT NULL DEFAULT 'LEGACY',
ADD COLUMN     "defaultOwnerCutPercent" DECIMAL(5,2),
ADD COLUMN     "separateCashRegisterEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ownerCutPercentOverride" DECIMAL(5,2),
ADD COLUMN     "separateCashRegister" BOOLEAN NOT NULL DEFAULT false;
