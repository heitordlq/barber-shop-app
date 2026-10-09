"use client";

import { formatBrazilPhone } from "@barbearia/phone-br";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Search, Store, MoreHorizontal, CheckCircle, XCircle, AlertTriangle,
  Eye, CalendarDays, Star, DollarSign, CreditCard, ClipboardList,
  Loader2, CreditCard as PlanIcon, MapPin, Users,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type TenantStatus = "ACTIVE" | "INACTIVE" | "DELINQUENT";

interface ActionPayload {
  type: "status" | "plan";
  tenantId: string;
  tenantName: string;
  // para status
  newStatus?: TenantStatus;
  // para plano
  currentPlanId?: string | null;
  currentPlanName?: string | null;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const statusMap: Record<TenantStatus, { label: string; color: string }> = {
  ACTIVE:     { label: "Ativa",         color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  INACTIVE:   { label: "Inativa",       color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  DELINQUENT: { label: "Inadimplente",  color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const apptStatusColors: Record<string, string> = {
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PENDING:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  NO_SHOW:   "bg-red-500/10 text-red-400 border-red-500/20",
  CANCELLED: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const apptStatusLabels: Record<string, string> = {
  CONFIRMED: "Confirmado", PENDING: "Pendente", COMPLETED: "Concluído",
  NO_SHOW: "Faltou", CANCELLED: "Cancelado",
};

const intervalLabels: Record<string, string> = {
  WEEKLY: "Semanal", MONTHLY: "Mensal", YEARLY: "Anual",
};

const actionLabels: Record<TenantStatus, { label: string; color: string }> = {
  ACTIVE:     { label: "Ativar",              color: "text-emerald-400" },
  INACTIVE:   { label: "Desativar",           color: "text-zinc-400" },
  DELINQUENT: { label: "Marcar Inadimplente", color: "text-red-400" },
};

const logActionLabels: Record<string, { label: string; color: string }> = {
  STATUS_CHANGE: { label: "Status alterado", color: "text-blue-400" },
  PLAN_CHANGE:   { label: "Plano alterado",  color: "text-amber-400" },
};

function formatCurrency(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

// ─── Modal de Confirmação com Motivo ─────────────────────────────────────────

function ActionModal({
  payload,
  onClose,
}: {
  payload: ActionPayload | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [reason, setReason] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    payload?.currentPlanId ?? "__none__"
  );

  const { data: plans } = useQuery<any[]>({
    queryKey: ["plans"],
    queryFn: async () => (await api.get("/plans")).data,
    enabled: payload?.type === "plan",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!payload) return;
      if (payload.type === "status") {
        return api.patch(`/admin/tenants/${payload.tenantId}/status`, {
          status: payload.newStatus,
          reason,
        });
      }
      return api.patch(`/admin/tenants/${payload.tenantId}/plan`, {
        planId: selectedPlanId === "__none__" ? null : selectedPlanId,
        reason,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tenants"] });
      qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
      qc.invalidateQueries({ queryKey: ["tenant-detail", payload?.tenantId] });
      toast.success(payload?.type === "plan" ? "Plano atualizado" : "Status atualizado");
      setReason("");
      onClose();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Erro ao executar ação"),
  });

  if (!payload) return null;

  const isStatus = payload.type === "status";
  const title = isStatus
    ? `${actionLabels[payload.newStatus!]?.label} — ${payload.tenantName}`
    : `Alterar Plano — ${payload.tenantName}`;

  const canConfirm = reason.trim().length >= 5 &&
    (!isStatus || true) &&
    (isStatus || selectedPlanId !== undefined);

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Resumo da ação */}
          {isStatus ? (
            <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 flex items-center gap-3">
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Novo status</p>
                <Badge className={`${statusMap[payload.newStatus!].color} border text-xs`}>
                  {statusMap[payload.newStatus!].label}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Plano</Label>
              <Select value={selectedPlanId} onValueChange={(v) => setSelectedPlanId(v ?? "")}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <span className="truncate text-sm text-left">
                    {selectedPlanId === "__none__"
                      ? <span className="text-zinc-400">Sem plano</span>
                      : plans?.find((p: any) => p.id === selectedPlanId)?.name
                        ?? <span className="text-zinc-500">Selecione um plano...</span>}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="__none__">
                    <span className="text-zinc-400">Sem plano</span>
                  </SelectItem>
                  {plans?.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                      {payload.currentPlanId === p.id && (
                        <span className="ml-1 text-zinc-500 text-xs">(atual)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Motivo */}
          <div className="space-y-2">
            <Label>
              Motivo <span className="text-red-400">*</span>
              <span className="text-zinc-500 text-xs font-normal ml-1">(mín. 5 caracteres)</span>
            </Label>
            <textarea
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-zinc-600"
              rows={3}
              placeholder="Descreva o motivo desta ação..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <p className="text-xs text-zinc-600">{reason.trim().length} caracteres</p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            disabled={!canConfirm || mutation.isPending}
            onClick={() => mutation.mutate()}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
          >
            {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Drawer de Detalhe ────────────────────────────────────────────────────────

function TenantDetailDrawer({
  tenantId, open, onClose,
}: { tenantId: string | null; open: boolean; onClose: () => void }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tenant-detail", tenantId],
    queryFn: async () => (await api.get(`/admin/tenants/${tenantId}`)).data,
    enabled: !!tenantId && open,
  });

  const tenant = data?.tenant;
  const contact = data?.contact as
    | {
        shopPhone: string | null;
        shopWhatsapp: string | null;
        shopAddress: string | null;
        owners: { id: string; name: string; email: string; phone: string | null; role: string }[];
        barbers: { id: string; name: string; email: string; phone: string | null; role: string }[];
      }
    | undefined;
  const recentAppointments: any[] = data?.recentAppointments ?? [];
  const loyaltySubs: any[] = data?.loyaltySubscriptions ?? [];
  const adminLogs: any[] = data?.adminLogs ?? [];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="bg-zinc-950 border-zinc-800 text-white w-full sm:max-w-xl overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-500" />
            {isLoading ? "Carregando…" : tenant?.name ?? "—"}
          </SheetTitle>
          {tenant && <p className="text-sm text-zinc-500 font-mono">/{tenant.slug}</p>}
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 bg-zinc-900 rounded-xl" />)}
          </div>
        ) : !tenant ? (
          <p className="text-zinc-500 text-sm">Não foi possível carregar os dados.</p>
        ) : (
          <div className="space-y-8">
            {/* Info */}
            <section>
              <SectionTitle>Informações</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                <InfoItem label="Status">
                  <Badge className={`${statusMap[tenant.status as TenantStatus]?.color ?? ""} border text-xs`}>
                    {statusMap[tenant.status as TenantStatus]?.label ?? tenant.status}
                  </Badge>
                </InfoItem>
                <InfoItem label="Plano SaaS">
                  <span className="text-sm text-white font-medium">
                    {tenant.plan?.name ?? <span className="text-zinc-600">Sem plano</span>}
                  </span>
                </InfoItem>
                <InfoItem label="Telefone">
                  <span className="text-sm text-zinc-300">
                    {tenant.phone ? formatBrazilPhone(tenant.phone) : "—"}
                  </span>
                </InfoItem>
                <InfoItem label="Stripe Onboarding">
                  <Badge className={tenant.stripeOnboardingComplete
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 border text-xs"
                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20 border text-xs"}>
                    {tenant.stripeOnboardingComplete ? "Completo" : "Pendente"}
                  </Badge>
                </InfoItem>
                <InfoItem label="Criado em">
                  <span className="text-sm text-zinc-300">
                    {format(new Date(tenant.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </InfoItem>
                <InfoItem label="Total agendamentos">
                  <span className="text-sm text-white font-bold">{tenant._count?.appointments ?? 0}</span>
                </InfoItem>
              </div>
            </section>

            {/* Contato — barbearia + proprietário / barbeiros */}
            <section>
              <SectionTitle icon={<Users className="w-3.5 h-3.5 text-amber-500" />}>
                Contato
              </SectionTitle>
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 space-y-3">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Barbearia</p>
                  <div className="space-y-2 text-sm">
                    {contact?.shopPhone ? (
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Telefone</p>
                        <p className="text-zinc-200">{formatBrazilPhone(contact.shopPhone)}</p>
                      </div>
                    ) : null}
                    {contact?.shopWhatsapp ? (
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">WhatsApp</p>
                        <p className="text-zinc-200">{formatBrazilPhone(contact.shopWhatsapp)}</p>
                      </div>
                    ) : null}
                  </div>
                  {contact?.shopAddress ? (
                    <p className="flex items-start gap-2 text-xs text-zinc-400 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      <span>{contact.shopAddress}</span>
                    </p>
                  ) : null}
                  {!contact?.shopPhone && !contact?.shopWhatsapp && !contact?.shopAddress && (
                    <p className="text-xs text-zinc-600">Sem telefone, WhatsApp ou endereço cadastrados.</p>
                  )}
                </div>

                {(contact?.owners?.length ?? 0) > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      Proprietário{contact!.owners.length > 1 ? "s" : ""}
                    </p>
                    {contact!.owners.map((o) => (
                      <ContactPersonCard key={o.id} person={o} subtitle="Proprietário" />
                    ))}
                  </div>
                )}

                {(contact?.barbers?.length ?? 0) > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Barbeiros</p>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {contact!.barbers.map((b) => (
                        <ContactPersonCard key={b.id} person={b} subtitle="Barbeiro" />
                      ))}
                    </div>
                  </div>
                )}

                {(contact?.owners?.length ?? 0) === 0 && (contact?.barbers?.length ?? 0) === 0 && (
                  <p className="text-xs text-zinc-600">
                    Nenhum proprietário ou barbeiro ativo vinculado a esta barbearia no sistema.
                  </p>
                )}
              </div>
            </section>

            {/* Receita */}
            <section>
              <SectionTitle>Receita Total (agend. online)</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-500">Volume processado</p>
                      <p className="text-base font-bold text-white">{formatCurrency(data?.totalRevenue ?? 0)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-500">Taxas retidas</p>
                      <p className="text-base font-bold text-white">{formatCurrency(data?.totalFees ?? 0)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Assinaturas */}
            <section>
              <SectionTitle icon={<Star className="w-3.5 h-3.5 text-amber-500" />}>
                Assinaturas de Fidelidade Ativas ({loyaltySubs.length})
              </SectionTitle>
              {loyaltySubs.length === 0 ? (
                <p className="text-sm text-zinc-600">Nenhuma assinatura ativa.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {loyaltySubs.map((sub: any) => (
                    <div key={sub.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {sub.user?.name ?? sub.user?.email ?? "—"}
                        </p>
                        <p className="text-xs text-zinc-500">{sub.plan?.name}</p>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border text-[10px] shrink-0 ml-2">
                        {intervalLabels[sub.plan?.interval] ?? sub.plan?.interval}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Últimos agendamentos */}
            <section>
              <SectionTitle icon={<CalendarDays className="w-3.5 h-3.5 text-amber-500" />}>
                Últimos Agendamentos ({recentAppointments.length})
              </SectionTitle>
              {recentAppointments.length === 0 ? (
                <p className="text-sm text-zinc-600">Nenhum agendamento registrado.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {recentAppointments.map((a: any) => (
                    <div key={a.id} className="flex items-start justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{a.clientName}</p>
                        <p className="text-xs text-zinc-500">
                          {a.service?.name} · {format(new Date(a.startTime), "dd/MM/yy HH:mm", { locale: ptBR })}
                        </p>
                        {a.barber?.name && <p className="text-xs text-zinc-600">{a.barber.name}</p>}
                      </div>
                      <Badge className={`${apptStatusColors[a.status] ?? ""} border text-[10px] shrink-0`}>
                        {apptStatusLabels[a.status] ?? a.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Histórico de ações admin */}
            <section>
              <SectionTitle icon={<ClipboardList className="w-3.5 h-3.5 text-amber-500" />}>
                Histórico de Ações Administrativas ({adminLogs.length})
              </SectionTitle>
              {adminLogs.length === 0 ? (
                <p className="text-sm text-zinc-600">Nenhuma ação registrada.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {adminLogs.map((log: any) => {
                    const meta = logActionLabels[log.action] ?? { label: log.action, color: "text-zinc-400" };
                    return (
                      <div key={log.id} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold uppercase tracking-wider ${meta.color}`}>
                            {meta.label}
                          </span>
                          <span className="text-[10px] text-zinc-600 shrink-0">
                            {format(new Date(log.createdAt), "dd/MM/yy HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                          {log.oldValue && (
                            <>
                              <span className="line-through text-zinc-600">{log.oldValue}</span>
                              <span className="text-zinc-600">→</span>
                            </>
                          )}
                          <span className="text-white font-medium">{log.newValue}</span>
                        </div>
                        <p className="text-xs text-zinc-500 italic">&ldquo;{log.reason}&rdquo;</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── Helpers visuais ─────────────────────────────────────────────────────────

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
      {icon}{children}
    </p>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">{label}</p>
      {children}
    </div>
  );
}

type ContactPerson = { id: string; name: string; email: string; phone: string | null };

function ContactPersonCard({ person, subtitle }: { person: ContactPerson; subtitle: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 space-y-2">
      <div>
        <p className="text-sm font-medium text-white">{person.name}</p>
        <p className="text-[10px] text-zinc-600 uppercase tracking-wider">{subtitle}</p>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">E-mail</p>
          <p className="text-zinc-200 break-all">{person.email}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Telefone</p>
          <p className="text-zinc-200">
            {person.phone ? formatBrazilPhone(person.phone) : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────

export default function TenantsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [drawerTenantId, setDrawerTenantId] = useState<string | null>(null);
  const [actionPayload, setActionPayload] = useState<ActionPayload | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["tenants", page, statusFilter],
    queryFn: async () => {
      const params: any = { page, pageSize: 20 };
      if (statusFilter !== "all") params.status = statusFilter;
      return (await api.get("/admin/tenants", { params })).data;
    },
  });

  const filteredData = data?.data?.filter((t: any) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.slug.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const triggerStatus = (tenant: any, newStatus: TenantStatus) => {
    setActionPayload({
      type: "status",
      tenantId: tenant.id,
      tenantName: tenant.name,
      newStatus,
    });
  };

  const triggerPlan = (tenant: any) => {
    setActionPayload({
      type: "plan",
      tenantId: tenant.id,
      tenantName: tenant.name,
      currentPlanId: tenant.plan?.id ?? null,
      currentPlanName: tenant.plan?.name ?? null,
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Barbearias</h1>
        <p className="text-zinc-500 text-sm mt-1">Gerencie todos os tenants da plataforma</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Buscar por nome ou slug..."
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? "all"); setPage(1); }}>
          <SelectTrigger className="w-44 bg-zinc-900 border-zinc-800 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="all" className="text-white">Todos</SelectItem>
            <SelectItem value="ACTIVE" className="text-white">Ativas</SelectItem>
            <SelectItem value="DELINQUENT" className="text-white">Inadimplentes</SelectItem>
            <SelectItem value="INACTIVE" className="text-white">Inativas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Barbearia</TableHead>
                <TableHead className="text-zinc-500">Slug / URL</TableHead>
                <TableHead className="text-zinc-500">Plano</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500">Agendamentos</TableHead>
                <TableHead className="text-zinc-500 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-zinc-800">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 bg-zinc-800 rounded" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredData.length === 0 ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={6} className="text-center py-12 text-zinc-600">
                    <Store className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>Nenhuma barbearia encontrada</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((tenant: any) => {
                  const st = statusMap[tenant.status as TenantStatus];
                  return (
                    <TableRow
                      key={tenant.id}
                      className="border-zinc-800 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                      onClick={() => setDrawerTenantId(tenant.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                            <Store className="w-4 h-4 text-zinc-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{tenant.name}</p>
                            <p className="text-xs text-zinc-600">
                              {tenant.phone ? formatBrazilPhone(tenant.phone) : "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-zinc-400 font-mono">/{tenant.slug}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-zinc-400">
                          {tenant.plan?.name ?? <span className="text-zinc-600">Sem plano</span>}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${st?.color} border text-xs`}>{st?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-zinc-400">{tenant._count?.appointments ?? 0}</span>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"
                              className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                            <DropdownMenuItem
                              className="text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                              onClick={() => setDrawerTenantId(tenant.id)}
                            >
                              <Eye className="w-4 h-4 mr-2" /> Ver detalhes
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-zinc-800" />

                            <DropdownMenuItem
                              className="text-amber-400 hover:bg-amber-500/10 cursor-pointer"
                              onClick={() => triggerPlan(tenant)}
                            >
                              <PlanIcon className="w-4 h-4 mr-2" /> Alterar Plano
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-zinc-800" />

                            <DropdownMenuItem
                              className="text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                              onClick={() => triggerStatus(tenant, "ACTIVE")}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Ativar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                              onClick={() => triggerStatus(tenant, "DELINQUENT")}
                            >
                              <AlertTriangle className="w-4 h-4 mr-2" /> Marcar Inadimplente
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem
                              className="text-zinc-400 hover:bg-zinc-800 cursor-pointer"
                              onClick={() => triggerStatus(tenant, "INACTIVE")}
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Desativar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-zinc-500">
            {data.total} barbearia{data.total !== 1 ? "s" : ""} no total
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800">
              Anterior
            </Button>
            <Button variant="outline" size="sm"
              onClick={() => setPage((p) => p + 1)} disabled={page >= data.totalPages}
              className="bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800">
              Próxima
            </Button>
          </div>
        </div>
      )}

      <TenantDetailDrawer
        tenantId={drawerTenantId}
        open={!!drawerTenantId}
        onClose={() => setDrawerTenantId(null)}
      />

      <ActionModal
        payload={actionPayload}
        onClose={() => setActionPayload(null)}
      />
    </div>
  );
}
