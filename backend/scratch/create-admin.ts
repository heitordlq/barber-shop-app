import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@barberdash.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Usuário ${email} já existe.`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: 'Administrador Sistema',
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin criado com sucesso:');
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${user.email}`);
  console.log(`Senha: ${password}`);
}

main()
  .catch((e) => {
    console.error('Erro ao criar admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
