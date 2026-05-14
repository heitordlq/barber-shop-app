const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://barbearia:barbearia123@localhost:5432/barbearia",
});

async function run() {
  await client.connect();
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  console.log('Tables:', res.rows.map(r => r.table_name).join(', '));
  await client.end();
}

run().catch(console.error);
