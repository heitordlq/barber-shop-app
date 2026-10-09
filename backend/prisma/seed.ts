import path from "path";
import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
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
  // Sem senha padrão no código: se ADMIN_SEED_PASSWORD não existir, gera uma aleatória e mostra uma única vez.
  const fromEnv = process.env.ADMIN_SEED_PASSWORD?.trim();
  const passwordPlain = fromEnv || randomBytes(15).toString("base64url");

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
  if (!fromEnv) {
    console.log(`Senha gerada (guarde agora, ela não será mostrada de novo): ${passwordPlain}`);
  }
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
