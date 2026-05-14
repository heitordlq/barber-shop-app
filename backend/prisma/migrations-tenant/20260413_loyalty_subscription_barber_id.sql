-- =============================================================================
-- Migração: loyalty_subscriptions.barberId (caixa separado / fidelidade por profissional)
-- =============================================================================
-- O Prisma do tenant já espera esta coluna; tenants criados antes precisam do ALTER.
--
-- Como aplicar: no mesmo banco de DATABASE_URL (psql, DBeaver, etc.):
--   psql "$DATABASE_URL" -f prisma/migrations-tenant/20260413_loyalty_subscription_barber_id.sql
--
-- O bloco abaixo percorre todo schema que tenha a tabela loyalty_subscriptions
-- (exceto backoffice) e adiciona a coluna + índice se ainda não existirem.
-- =============================================================================

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT t.table_schema
    FROM information_schema.tables t
    WHERE t.table_name = 'loyalty_subscriptions'
      AND t.table_type = 'BASE TABLE'
      AND t.table_schema NOT IN (
        'pg_catalog',
        'information_schema',
        'backoffice'
      )
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I TEXT',
      r.table_schema,
      'loyalty_subscriptions',
      'barberId'
    );

    EXECUTE format(
      'CREATE INDEX IF NOT EXISTS %I ON %I.%I (%I)',
      'loyalty_subscriptions_barberId_idx',
      r.table_schema,
      'loyalty_subscriptions',
      'barberId'
    );
  END LOOP;
END $$;
