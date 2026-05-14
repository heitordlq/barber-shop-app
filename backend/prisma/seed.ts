import path from "path";
import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

config({ path: path.resolve(__dirname, "../.env") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL não definido (ex.: copie backend/.env.example para backend/.env).");
}

const pool = new Pool({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const DEFAULT_ADMIN_EMAIL = "admin@barbearia.app";

async function main() {
  const passwordPlain =
    process.env.ADMIN_SEED_PASSWORD?.trim() || "Admin@barbearia123";

  const existing = await prisma.user.findUnique({
    where: { email: DEFAULT_ADMIN_EMAIL },
  });

  if (existing) {
    console.log(
      `Usuário admin já existe (${DEFAULT_ADMIN_EMAIL}). Nada alterado.`,
    );
    return;
  }

  const password = await bcrypt.hash(passwordPlain, 10);

  await prisma.user.create({
    data: {
      email: DEFAULT_ADMIN_EMAIL,
      name: "Administrador",
      password,
      role: "ADMIN",
      tenantId: null,
    },
  });

  console.log(`Admin criado: ${DEFAULT_ADMIN_EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
