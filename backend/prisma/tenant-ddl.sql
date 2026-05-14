-- DDL executed when a new tenant registers.
-- {{SCHEMA}} is replaced at runtime with the tenant's slug.

CREATE SCHEMA IF NOT EXISTS "{{SCHEMA}}";

CREATE TYPE "{{SCHEMA}}"."AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE "{{SCHEMA}}"."AppointmentType" AS ENUM ('ONLINE', 'MANUAL');
CREATE TYPE "{{SCHEMA}}"."TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'COMMISSION');
CREATE TYPE "{{SCHEMA}}"."NotificationType" AS ENUM ('BOOKING_CONFIRMATION', 'BOOKING_REMINDER', 'BOOKING_CANCELLATION', 'PAYMENT_RECEIVED', 'SYSTEM');
CREATE TYPE "{{SCHEMA}}"."LoyaltyPlanInterval" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY');

CREATE TABLE "{{SCHEMA}}"."services" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."appointments" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tenantSlug" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "additionalServiceIds" TEXT[] NOT NULL DEFAULT '{}',
    "userId" TEXT,
    "barberId" TEXT,
    "barberName" TEXT,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT,
    "clientPhone" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "{{SCHEMA}}"."AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "type" "{{SCHEMA}}"."AppointmentType" NOT NULL DEFAULT 'ONLINE',
    "paymentIntentId" TEXT,
    "platformFee" DECIMAL(10,2),
    "netAmount" DECIMAL(10,2),
    "notes" TEXT,
    "bookingSource" TEXT,
    "holdKind" TEXT NOT NULL DEFAULT 'NONE',
    "holdReason" TEXT,
    "comandaLines" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."products" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."transactions" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "type" "{{SCHEMA}}"."TransactionType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barberId" TEXT,
    "appointmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_programs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pointsRequired" INTEGER NOT NULL DEFAULT 10,
    "reward" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "loyalty_programs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_cards" (
    "id" TEXT NOT NULL,
    "loyaltyProgramId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "loyalty_cards_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "{{SCHEMA}}"."NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_plans" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "interval" "{{SCHEMA}}"."LoyaltyPlanInterval" NOT NULL DEFAULT 'MONTHLY',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "loyalty_plans_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_plan_items" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "allowedDays" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "loyalty_plan_items_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_subscriptions" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "barberId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "loyalty_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "{{SCHEMA}}"."loyalty_usages" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "loyalty_usages_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX "appointments_tenantId_startTime_idx" ON "{{SCHEMA}}"."appointments"("tenantId", "startTime");
CREATE INDEX "appointments_tenantId_status_idx" ON "{{SCHEMA}}"."appointments"("tenantId", "status");
CREATE INDEX "transactions_tenantId_date_idx" ON "{{SCHEMA}}"."transactions"("tenantId", "date");
CREATE UNIQUE INDEX "loyalty_cards_userId_loyaltyProgramId_key" ON "{{SCHEMA}}"."loyalty_cards"("userId", "loyaltyProgramId");
CREATE INDEX "notifications_userId_read_idx" ON "{{SCHEMA}}"."notifications"("userId", "read");
CREATE UNIQUE INDEX "loyalty_usages_appointmentId_key" ON "{{SCHEMA}}"."loyalty_usages"("appointmentId");
CREATE INDEX "loyalty_subscriptions_barberId_idx" ON "{{SCHEMA}}"."loyalty_subscriptions"("barberId");

-- Foreign keys (within the same schema)
ALTER TABLE "{{SCHEMA}}"."appointments" ADD CONSTRAINT "appointments_serviceId_fkey"
    FOREIGN KEY ("serviceId") REFERENCES "{{SCHEMA}}"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_cards" ADD CONSTRAINT "loyalty_cards_loyaltyProgramId_fkey"
    FOREIGN KEY ("loyaltyProgramId") REFERENCES "{{SCHEMA}}"."loyalty_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_plan_items" ADD CONSTRAINT "loyalty_plan_items_planId_fkey"
    FOREIGN KEY ("planId") REFERENCES "{{SCHEMA}}"."loyalty_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_plan_items" ADD CONSTRAINT "loyalty_plan_items_serviceId_fkey"
    FOREIGN KEY ("serviceId") REFERENCES "{{SCHEMA}}"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_subscriptions" ADD CONSTRAINT "loyalty_subscriptions_planId_fkey"
    FOREIGN KEY ("planId") REFERENCES "{{SCHEMA}}"."loyalty_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_usages" ADD CONSTRAINT "loyalty_usages_subscriptionId_fkey"
    FOREIGN KEY ("subscriptionId") REFERENCES "{{SCHEMA}}"."loyalty_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "{{SCHEMA}}"."loyalty_usages" ADD CONSTRAINT "loyalty_usages_appointmentId_fkey"
    FOREIGN KEY ("appointmentId") REFERENCES "{{SCHEMA}}"."appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
