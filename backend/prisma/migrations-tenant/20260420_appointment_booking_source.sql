-- Origem do agendamento (texto livre: App, Balcão, WhatsApp, etc.)
-- pnpm exec prisma db execute --file prisma/migrations-tenant/20260420_appointment_booking_source.sql

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
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I TEXT',
      r.table_schema,
      'appointments',
      'bookingSource'
    );
  END LOOP;
END $$;
