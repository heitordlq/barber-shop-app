import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { email: true, name: true }
  });

  if (admins.length > 0) {
    console.log('Admins encontrados:');
    admins.forEach(admin => console.log(`- ${admin.name} (${admin.email})`));
  } else {
    console.log('Nenhum admin encontrado.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
