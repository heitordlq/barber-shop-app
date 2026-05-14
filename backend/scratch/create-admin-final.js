const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: "postgresql://barbearia:barbearia123@localhost:5432/barbearia",
});

async function run() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados.');

    const email = 'admin@barberdash.com';
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 12);

    const check = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    
    if (check.rows.length > 0) {
      console.log('Usuário já existe. Atualizando senha...');
      await client.query('UPDATE users SET password = $1, role = $2 WHERE email = $3', [hash, 'ADMIN', email]);
    } else {
      console.log('Criando novo usuário administrador...');
      const id = 'admin-' + Math.random().toString(36).substr(2, 9);
      await client.query(
        'INSERT INTO users (id, name, email, password, role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW())',
        [id, 'Administrador Mestre', email, hash, 'ADMIN']
      );
    }

    console.log('Operação finalizada com sucesso!');
    console.log(`Email: ${email}`);
    console.log(`Senha: ${password}`);
  } catch (err) {
    console.error('Erro na execução:', err);
  } finally {
    await client.end();
  }
}

run();
