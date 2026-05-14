import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient as TenantPrismaClient } from '../generated/tenant-client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TenantPrismaFactory implements OnModuleDestroy {
  private readonly logger = new Logger(TenantPrismaFactory.name);
  private readonly clients = new Map<string, TenantPrismaClient>();

  /**
   * Returns a cached TenantPrismaClient for the given slug.
   * The client connects to the PostgreSQL schema named after the slug.
   */
  getClient(slug: string): TenantPrismaClient {
    if (!this.clients.has(slug)) {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 2,
      });
      const adapter = new PrismaPg(pool, { schema: slug });
      const client = new TenantPrismaClient({ adapter } as any);
      this.clients.set(slug, client);
      this.logger.debug(`Created tenant client for schema: ${slug}`);
    }
    return this.clients.get(slug)!;
  }

  /**
   * Creates the PostgreSQL schema and all tenant tables for a new tenant.
   * Executes tenant-ddl.sql with the slug substituted for {{SCHEMA}}.
   */
  async provisionTenantSchema(slug: string, rawPrisma: any): Promise<void> {
    // __dirname in compiled code = dist/src/prisma → go up 3 levels to reach project root
    const ddlPath = path.join(__dirname, '..', '..', '..', 'prisma', 'tenant-ddl.sql');
    const ddlTemplate = fs.readFileSync(ddlPath, 'utf-8');
    const ddl = ddlTemplate.replace(/\{\{SCHEMA\}\}/g, slug);

    // Strip comment lines first, then split by semicolons
    const stripped = ddl
      .split('\n')
      .filter((line) => !line.trim().startsWith('--'))
      .join('\n');

    const statements = stripped
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      await rawPrisma.$executeRawUnsafe(statement);
    }

    this.logger.log(`Provisioned tenant schema: ${slug}`);
  }

  async onModuleDestroy() {
    for (const [slug, client] of this.clients.entries()) {
      await client.$disconnect().catch(() => null);
      this.logger.debug(`Disconnected tenant client for schema: ${slug}`);
    }
    this.clients.clear();
  }
}
