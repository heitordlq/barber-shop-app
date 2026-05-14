// ============================================================
// ENUMS
// ============================================================

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELINQUENT = 'DELINQUENT',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  BARBER = 'BARBER',
  CLIENT = 'CLIENT',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  COMPLETED = 'COMPLETED',
}

export enum AppointmentType {
  ONLINE = 'ONLINE',
  MANUAL = 'MANUAL',
}

// ============================================================
// AUTH
// ============================================================

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  barbershopName: string;
  barbershopSlug: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  tenantId: string | null;
}

// ============================================================
// TENANT
// ============================================================

export interface WorkingHoursDay {
  open: string;   // "09:00"
  close: string;  // "18:00"
  breaks: { start: string; end: string }[];
}

export interface WorkingHours {
  mon?: WorkingHoursDay;
  tue?: WorkingHoursDay;
  wed?: WorkingHoursDay;
  thu?: WorkingHoursDay;
  fri?: WorkingHoursDay;
  sat?: WorkingHoursDay;
  sun?: WorkingHoursDay;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  logoUrl?: string;
  photos: string[];
  status: TenantStatus;
  stripeAccountId?: string;
  stripeOnboardingComplete: boolean;
  workingHours: WorkingHours;
  planId?: string;
  subscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// SERVICE
// ============================================================

export interface Service {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // minutos
  active: boolean;
  createdAt: string;
}

export interface CreateServiceDto {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {
  active?: boolean;
}

// ============================================================
// APPOINTMENT / SCHEDULE
// ============================================================

export interface TimeSlot {
  start: string; // ISO 8601
  end: string;   // ISO 8601
  available: boolean;
}

export interface Appointment {
  id: string;
  tenantId: string;
  serviceId: string;
  service?: Service;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  type: AppointmentType;
  paymentIntentId?: string;
  platformFee?: number;
  netAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOnlineAppointmentDto {
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  startTime: string;
  paymentMethodId: string;
}

export interface CreateManualAppointmentDto {
  serviceId: string;
  clientName: string;
  clientPhone?: string;
  startTime: string;
  notes?: string;
}

// ============================================================
// PLAN (SaaS)
// ============================================================

export interface Plan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  pixFeePercent: number;
  creditCardFeePercent: number;
  platformFeeFixed: number;
  maxServices?: number;
  maxTeamMembers?: number;
  hasAiAgent: boolean;
  hasChatBot: boolean;
  canDisableOnlinePayment: boolean;
  active: boolean;
  stripePriceId?: string;
}

export interface CreatePlanDto {
  name: string;
  description?: string;
  monthlyPrice: number;
  pixFeePercent: number;
  creditCardFeePercent: number;
  platformFeeFixed: number;
  maxServices?: number;
  maxTeamMembers?: number;
  hasAiAgent?: boolean;
  hasChatBot?: boolean;
  canDisableOnlinePayment?: boolean;
  stripePriceId?: string;
}

// ============================================================
// FINANCEIRO / DASHBOARD
// ============================================================

export interface DailyFinancialSummary {
  date: string;
  onlineRevenue: number;
  manualRevenue: number;
  totalAppointments: number;
  onlineAppointments: number;
  manualAppointments: number;
  noShows: number;
  platformFees: number;
}

export interface AdminDashboard {
  totalTenants: number;
  activeTenants: number;
  delinquentTenants: number;
  mrr: number;
  totalTransactionVolume: number;
  totalPlatformFees: number;
}

// ============================================================
// API RESPONSES
// ============================================================

export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
