-- =============================================================================
-- Migração: appointments.additionalServiceIds (serviços extras no mesmo horário)
-- =============================================================================
-- Aplicar no mesmo banco de DATABASE_URL:
--   pnpm exec prisma db execute --file prisma/migrations-tenant/20260418_appointment_additional_service_ids.sql
-- =============================================================================

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT t.table_schema
    FROM information_schema.tables t
    WHERE t.table_name = 'appointments'
      AND t.table_type = 'BASE TABLE'
      AND t.table_schema NOT IN (
        'pg_catalog',
        'information_schema',
        'backoffice'
      )
  LOOP
    EXECUTE format(
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I TEXT[] NOT NULL DEFAULT ''{}''::text[]',
      r.table_schema,
      'appointments',
      'additionalServiceIds'
    );
  END LOOP;
END $$;
