import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Extrai o tenantId/slug de:
 * 1. Header X-Tenant-Id
 * 2. Subdomain (ex: ze.seusaas.com → ze)
 * 3. Query param ?tenant=ze
 */
@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request & { tenantSlug?: string }, res: Response, next: NextFunction) {
    // 1. Header
    const headerTenant = req.headers['x-tenant-id'] as string;
    if (headerTenant) {
      req.tenantSlug = headerTenant;
      return next();
    }

    // 2. Subdomain
    const host = req.hostname;
    const parts = host.split('.');
    if (parts.length > 2) {
      req.tenantSlug = parts[0];
      return next();
    }

    // 3. Query
    if (req.query.tenant) {
      req.tenantSlug = req.query.tenant as string;
      return next();
    }

    next();
  }
}
