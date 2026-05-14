const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://barbearia:barbearia123@localhost:5432/barbearia",
});

async function run() {
  await client.connect();
  const res = await client.query('SELECT email, role FROM "User" WHERE email = $1', ['admin@barberdash.com']);
  console.log('Result:', JSON.stringify(res.rows));
  await client.end();
}

run().catch(console.error);
