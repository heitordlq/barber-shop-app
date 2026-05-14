-- Notas internas da equipe sobre clientes cadastrados (não visíveis ao cliente).
CREATE TABLE "client_team_notes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clientUserId" TEXT NOT NULL,
    "authorUserId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_team_notes_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "client_team_notes_tenant_client_idx" ON "client_team_notes"("tenantId", "clientUserId");
CREATE INDEX "client_team_notes_tenant_created_idx" ON "client_team_notes"("tenantId", "createdAt");
