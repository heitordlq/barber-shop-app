-- holdKind: NONE | LEAVE | BLOCK — folga / bloqueio na agenda
-- holdReason: motivo descritivo
-- comandaLines: [{ "serviceId": "...", "barberId": "..." | null }, ...] — comanda com profissional por serviço
--
-- pnpm exec prisma db execute --file prisma/migrations-tenant/20260419_appointment_hold_comanda.sql

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
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I TEXT NOT NULL DEFAULT ''NONE''',
      r.table_schema,
      'appointments',
      'holdKind'
    );
    EXECUTE format(
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I TEXT',
      r.table_schema,
      'appointments',
      'holdReason'
    );
    EXECUTE format(
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I JSONB',
      r.table_schema,
      'appointments',
      'comandaLines'
    );
  END LOOP;
END $$;
