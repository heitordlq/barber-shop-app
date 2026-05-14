"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  format, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  eachDayOfInterval, addWeeks, subWeeks, addMonths, subMonths, addDays, subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, User, X, Check, Ghost, ChevronLeft, ChevronRight, LayoutGrid, AlignJustify, CalendarRange, Plus, Star, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import {
  formatBrazilPhone,
  phoneDigitsForApi,
  phoneDigitsMatchNormalized,
  phoneHaystackIncludesQuery,
} from "@barbearia/phone-br";
import { DailyGrid } from "./DailyGrid";

type ViewMode = "day" | "week" | "month";

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  NO_SHOW: "bg-red-500/10 text-red-400 border-red-500/20",
  CANCELLED: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};
const statusLabels: Record<string, string> = {
  CONFIRMED: "Confirmado", PENDING: "Pendente", COMPLETED: "Concluído", NO_SHOW: "Faltou", CANCELLED: "Cancelado",
};

const APPOINTMENT_STATUS_ORDER = ["PENDING", "CONFIRMED", "COMPLETED", "NO_SHOW", "CANCELLED"] as const;
type AppointmentStatusKey = (typeof APPOINTMENT_STATUS_ORDER)[number];

function normalizeAppointmentStatus(s: string | undefined | null): AppointmentStatusKey {
  const u = String(s || "").toUpperCase();
  return (APPOINTMENT_STATUS_ORDER as readonly string[]).includes(u)
    ? (u as AppointmentStatusKey)
    : "CONFIRMED";
}

const holdKindLabels: Record<"NONE" | "LEAVE" | "BLOCK", string> = {
  NONE: "Atendimento normal",
  LEAVE: "Folga",
  BLOCK: "Bloqueio",
};

type ComandaLineEdit = { serviceId: string; barberId: string };

function linesFromApptForCompare(appt: any): { serviceId: string; barberId: string | null }[] {
  const anchor = (appt?.barberId || "").trim() || null;
  const raw = appt?.comandaLines;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((r: any) => ({
      serviceId: String(r.serviceId || "").trim(),
      barberId: r.barberId != null && String(r.barberId).trim() !== "" ? String(r.barberId).trim() : anchor,
    }));
  }
  const main = String(appt?.serviceId || appt?.service?.id || "").trim();
  const out: { serviceId: string; barberId: string | null }[] = [];
  if (main) out.push({ serviceId: main, barberId: anchor });
  for (const sid of appt?.additionalServiceIds || []) {
    const id = String(sid || "").trim();
    if (id && id !== main) out.push({ serviceId: id, barberId: anchor });
  }
  return out;
}

function normalizeComandaLinesForPayload(lines: ComandaLineEdit[]) {
  return lines
    .filter((l) => l.serviceId.trim())
    .map((l) => ({
      serviceId: l.serviceId.trim(),
      barberId: (l.barberId || "").trim() ? (l.barberId || "").trim() : null,
    }));
}

/** Mesma regra da API ao comparar com `linesFromApptForCompare` (barbeiro vazio = âncora). */
function normalizeComandaLinesForCompare(lines: ComandaLineEdit[], anchorBarberId: string | null) {
  return lines
    .filter((l) => l.serviceId.trim())
    .map((l) => {
      const trimmed = (l.barberId || "").trim();
      const bid = trimmed || (anchorBarberId || "").trim() || null;
      return { serviceId: l.serviceId.trim(), barberId: bid };
    });
}

function buildInitialComandaLines(appt: any): ComandaLineEdit[] {
  const anchorBid = String(appt?.barberId || "");
  const fromDb = appt?.comandaLines;
  if (Array.isArray(fromDb) && fromDb.length > 0) {
    return fromDb.map((r: any) => ({
      serviceId: String(r.serviceId || "").trim(),
      barberId:
        r.barberId != null && String(r.barberId).trim() !== "" ? String(r.barberId).trim() : anchorBid,
    }));
  }
  const main = String(appt?.serviceId || appt?.service?.id || "").trim();
  const extras: string[] = Array.isArray(appt?.additionalServiceIds)
    ? appt.additionalServiceIds.map((x: any) => String(x || "").trim()).filter(Boolean)
    : [];
  if (!main && extras.length === 0) return [{ serviceId: "", barberId: anchorBid }];
  const rows: ComandaLineEdit[] = [{ serviceId: main, barberId: anchorBid }];
  for (const sid of extras) {
    if (sid !== main) rows.push({ serviceId: sid, barberId: anchorBid });
  }
  return rows;
}

/** Iniciais do profissional: "Wenderson Belko" → WB; um nome só → 2 primeiras letras. */
function barberInitials(name: string | null | undefined): string {
  const n = name?.trim();
  if (!n) return "—";
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0][0];
  const b = parts[parts.length - 1][0];
  return `${a}${b}`.toUpperCase();
}

function AppointmentCard({
  app,
  onComplete,
  onNoShow,
  showBarberInitials,
}: {
  app: any;
  onComplete: () => void;
  onNoShow: () => void;
  showBarberInitials?: boolean;
}) {
  const isActive = app.status === "CONFIRMED" || app.status === "PENDING";
  const loyaltyPlanName = app?.loyaltyUsage?.subscription?.plan?.name as string | undefined;
  const isLoyalty = !!app?.loyaltyUsage;
  return (
    <Card className={cn("bg-zinc-900 border-zinc-800 overflow-hidden", !isActive && "opacity-60")}>
      <div className="flex flex-col sm:flex-row">
        <div className="bg-zinc-950 p-4 sm:w-28 flex sm:flex-col items-center justify-between sm:justify-center border-b sm:border-b-0 sm:border-r border-zinc-800 gap-2">
          <div className="text-center font-mono">
            <p className="text-lg font-bold text-white">{format(new Date(app.startTime), "HH:mm")}</p>
            <p className="text-xs text-zinc-500">até {format(new Date(app.endTime), "HH:mm")}</p>
          </div>
          <Badge className={cn("text-[10px] border-transparent", app.type === "ONLINE" ? "bg-indigo-500/10 text-indigo-400" : "bg-zinc-800 text-zinc-400")}>
            {app.type}
          </Badge>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 flex-wrap">
              {showBarberInitials && (
                <span
                  className="inline-flex items-center justify-center min-w-[2rem] h-7 px-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-amber-400 text-xs font-mono font-bold tracking-tight"
                  title={app.barber?.name || "Sem profissional"}
                >
                  {barberInitials(app.barber?.name)}
                </span>
              )}
              {showBarberInitials && <span className="text-zinc-600 font-normal select-none">|</span>}
              <User className="w-4 h-4 text-amber-500 shrink-0" />
              {app.clientName}
            </h3>
            <p className="text-sm text-zinc-400 mt-0.5">{app.service?.name}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={cn("text-xs font-medium border", statusColors[normalizeAppointmentStatus(app.status)])}>
                {statusLabels[normalizeAppointmentStatus(app.status)]}
              </Badge>
              <Badge
                className={cn(
                  "text-xs font-medium border",
                  isLoyalty
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                )}
                title={isLoyalty ? (loyaltyPlanName ? `Plano: ${loyaltyPlanName}` : "Plano") : "Pagamento normal"}
              >
                {isLoyalty ? "No plano" : "Pago"}
              </Badge>
              {isLoyalty && loyaltyPlanName && (
                <span className="text-[11px] text-zinc-500 truncate">
                  {loyaltyPlanName}
                </span>
              )}
            </div>
          </div>
          {isActive && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 shadow-none" onClick={onComplete}>
                <Check className="w-4 h-4 md:mr-1" /><span className="hidden md:inline">Concluir</span>
              </Button>
              <Button variant="outline" size="sm" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20 shadow-none" onClick={onNoShow}>
                <X className="w-4 h-4 md:mr-1" /><span className="hidden md:inline">Faltou</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="bg-zinc-900 border-dashed border-zinc-800">
      <CardContent className="flex flex-col items-center justify-center py-10 text-zinc-500">
        <Ghost className="w-10 h-10 mb-3 opacity-20" />
        <p className="text-sm">Nenhum agendamento para este período.</p>
      </CardContent>
    </Card>
  );
}

export default function AgendaPage() {
  const qc = useQueryClient();
  const authUser = useAuthStore((s) => s.user);
  const [view, setView] = useState<ViewMode>("day");
  const [date, setDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBarberId, setSelectedBarberId] = useState<string>("");
  const [newAppt, setNewAppt] = useState({
    serviceId: "",
    barberId: "",
    userId: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    time: "",
    paymentMode: "PAID" as "PAID" | "LOYALTY",
    loyaltyServiceId: "",
    bookingSource: "",
  });

  const [clientSearch, setClientSearch] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isNewClient, setIsNewClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", phone: "", email: "" });

  const [moveDraft, setMoveDraft] = useState<null | { appointmentId: string; barberId: string; startTime: string }>(null);
  const [moveReason, setMoveReason] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editAppt, setEditAppt] = useState<any>(null);
  const [editTime, setEditTime] = useState("");
  const [editBarberId, setEditBarberId] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");
  const [editReason, setEditReason] = useState("");
  const [editClientName, setEditClientName] = useState("");
  const [editClientPhone, setEditClientPhone] = useState("");
  const [editClientEmail, setEditClientEmail] = useState("");
  const [editComandaLines, setEditComandaLines] = useState<ComandaLineEdit[]>([{ serviceId: "", barberId: "" }]);
  const [editHoldKind, setEditHoldKind] = useState<"NONE" | "LEAVE" | "BLOCK">("NONE");
  const [editHoldReason, setEditHoldReason] = useState("");
  const [editBookingSource, setEditBookingSource] = useState("");
  const [newTeamNote, setNewTeamNote] = useState("");

  /** Largura e overflow alinhados entre criar e editar agendamento (evita barra de rolagem horizontal). */
  const agendaAppointmentDialogContentClass =
    "bg-zinc-900 border-zinc-800 text-white sm:max-w-3xl max-w-[min(48rem,calc(100vw-2rem))] w-full overflow-x-hidden";

  const { data: team } = useQuery({
    queryKey: ["equipe"],
    queryFn: async () => (await api.get("/tenant-users/equipe")).data,
  });

  const { data: clients } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => (await api.get("/tenant-users/clientes")).data,
    enabled: modalOpen,
  });

  const filteredClients = useMemo(() => {
    if (!clientSearch) return [];
    const q = clientSearch.toLowerCase();
    return (clients || [])
      .filter((c: any) => c.isRegistered)
      .filter(
        (c: any) =>
          c.name?.toLowerCase().includes(q) || phoneHaystackIncludesQuery(c.phone, clientSearch),
      )
      .slice(0, 6);
  }, [clients, clientSearch]);

  const selectedClient = useMemo(() => {
    if (!selectedClientId) return null;
    return (clients || []).find((c: any) => c.id === selectedClientId) || null;
  }, [clients, selectedClientId]);

  const { data: tenantMe } = useQuery({
    queryKey: ["tenant-me-agenda"],
    queryFn: async () => (await api.get("/tenants/me")).data,
    staleTime: 60_000,
  });
  const separateLoyaltyByBarber = !!tenantMe?.separateCashRegisterEnabled;

  const loyaltyBarberIdForSubs = useMemo(() => {
    if (!separateLoyaltyByBarber) return "";
    if (authUser?.role === "BARBER") return authUser.id;
    return newAppt.barberId || selectedBarberId || "";
  }, [separateLoyaltyByBarber, authUser?.role, authUser?.id, newAppt.barberId, selectedBarberId]);

  const { data: clientSubs } = useQuery({
    queryKey: ["client-subs", selectedClient?.id, separateLoyaltyByBarber, loyaltyBarberIdForSubs],
    queryFn: async () => {
      const qs = new URLSearchParams();
      qs.set("userId", selectedClient!.id);
      if (separateLoyaltyByBarber && loyaltyBarberIdForSubs) {
        qs.set("barberId", loyaltyBarberIdForSubs);
      }
      return (await api.get(`/loyalty/subscriptions?${qs.toString()}`)).data;
    },
    enabled: !!selectedClient?.id && (!separateLoyaltyByBarber || !!loyaltyBarberIdForSubs),
  });

  const activeSub = useMemo(() => {
    const subs = clientSubs || [];
    return subs.find((s: any) => s.status === "ACTIVE") || null;
  }, [clientSubs]);

  const loyaltyItems = useMemo(() => {
    if (!activeSub) return [];
    const items = activeSub?.plan?.items || [];
    const usages = activeSub?.usages || [];
    return items
      .map((it: any) => {
        const used = usages.filter((u: any) => u?.appointment?.serviceId === it.serviceId).length;
        const total = Number(it.quantity || 0);
        const remaining = Math.max(0, total - used);
        return {
          serviceId: it.serviceId,
          serviceName: it?.service?.name,
          used,
          total,
          remaining,
        };
      });
  }, [activeSub]);

  const availableLoyaltyItems = useMemo(
    () => loyaltyItems.filter((x: any) => x.remaining > 0),
    [loyaltyItems],
  );

  const selectedLoyaltyItem = useMemo(() => {
    if (!newAppt.loyaltyServiceId) return null;
    return availableLoyaltyItems.find((x: any) => x.serviceId === newAppt.loyaltyServiceId) || null;
  }, [availableLoyaltyItems, newAppt.loyaltyServiceId]);

  // Default: barbeiro vê só a própria agenda
  useEffect(() => {
    if (!authUser) return;
    if (authUser.role === "BARBER") {
      setSelectedBarberId(authUser.id);
      setNewAppt((s) => ({ ...s, barberId: authUser.id }));
    }
  }, [authUser]);

  // ── Date range based on view ───
  const rangeStart = view === "week" ? startOfWeek(date, { weekStartsOn: 0 })
    : view === "month" ? startOfMonth(date) : date;
  const rangeEnd = view === "week" ? endOfWeek(date, { weekStartsOn: 0 })
    : view === "month" ? endOfMonth(date) : date;

  const effectiveBarberFilterId =
    !selectedBarberId || selectedBarberId === "__all__" || selectedBarberId === "all"
      ? ""
      : selectedBarberId;

  const filterBarberSelectValue = effectiveBarberFilterId || "__all__";

  const selectedFilterBarberName = useMemo(() => {
    if (!effectiveBarberFilterId) return null;
    return team?.find((m: any) => m.id === effectiveBarberFilterId)?.name ?? null;
  }, [team, effectiveBarberFilterId]);

  const queryKey = [
    "appointments",
    "agenda",
    view,
    format(rangeStart, "yyyy-MM-dd"),
    format(rangeEnd, "yyyy-MM-dd"),
    format(date, "yyyy-MM-dd"),
    // Estado cru do filtro: qualquer troca no Select gera chave nova e nova chamada
    selectedBarberId || "__ALL__",
  ];

  const { data: appointments, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const barberQs = effectiveBarberFilterId
        ? `&barberId=${encodeURIComponent(effectiveBarberFilterId)}`
        : "";
      if (view === "day") {
        const res = await api.get(`/schedule?date=${format(date, "yyyy-MM-dd")}${barberQs}`);
        return res.data;
      }
      const res = await api.get(
        `/schedule?dateFrom=${format(rangeStart, "yyyy-MM-dd")}&dateTo=${format(rangeEnd, "yyyy-MM-dd")}${barberQs}`
      );
      return res.data;
    },
    staleTime: 0,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status, reason }: { id: string; status: string; reason: string }) =>
      api.patch(`/schedule/${id}/status`, { status, reason }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["appointments"] }); toast.success("Status atualizado"); },
    onError: (err: any) => toast.error(err.response?.data?.message || err.message || "Erro ao atualizar status"),
  });

  const reschedule = useMutation({
    mutationFn: async ({ id, barberId, startTime, reason }: { id: string; barberId: string; startTime: string; reason: string }) =>
      (await api.patch(`/schedule/${id}/reschedule`, { barberId, startTime, reason })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Horário atualizado");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || err.message || "Erro ao remarcar"),
  });

  const saveEditAppointment = useMutation({
    mutationFn: async () => {
      if (!editAppt) throw new Error("Agendamento inválido");
      const reason = editReason.trim();
      if (!reason) throw new Error("Informe o motivo da alteração.");

      const id = editAppt.id;
      const detailsPayload: Record<string, unknown> = { reason };
      const isLoyalty = !!editAppt.loyaltyUsage;
      const prevHold = String(editAppt.holdKind || "NONE") as "NONE" | "LEAVE" | "BLOCK";
      const statusNorm = normalizeAppointmentStatus(editStatus);
      const prevStatusNorm = normalizeAppointmentStatus(editAppt.status);

      if (!isLoyalty && (editHoldKind === "LEAVE" || editHoldKind === "BLOCK")) {
        const hr = editHoldReason.trim();
        if (!hr) throw new Error("Informe o motivo descritivo para folga ou bloqueio.");
        const prevHr = String(editAppt.holdReason || "").trim();
        if (editHoldKind !== prevHold || hr !== prevHr) {
          detailsPayload.holdKind = editHoldKind;
          detailsPayload.holdReason = hr;
        }
      } else if (!isLoyalty) {
        if (editHoldKind === "NONE" && prevHold !== "NONE") {
          detailsPayload.holdKind = "NONE";
        }

        if (editHoldKind === "NONE") {
          const apptName = (editAppt.clientName || "").trim();
          const apptEmail = (editAppt.clientEmail || "").trim();
          if ((editClientName || "").trim() !== apptName) detailsPayload.clientName = editClientName.trim();
          if (!phoneDigitsMatchNormalized(editClientPhone, editAppt.clientPhone)) {
            const p = phoneDigitsForApi(editClientPhone);
            detailsPayload.clientPhone = p || null;
          }
          if ((editClientEmail || "").trim() !== apptEmail) detailsPayload.clientEmail = editClientEmail.trim();

          const nextLines = normalizeComandaLinesForPayload(editComandaLines);
          if (nextLines.length === 0) throw new Error("Inclua ao menos um serviço na comanda.");
          const anchorCompare = ((editAppt.barberId || "") as string).trim() || null;
          const prevLinesJson = JSON.stringify(linesFromApptForCompare(editAppt));
          const nextLinesJson = JSON.stringify(
            normalizeComandaLinesForCompare(editComandaLines, anchorCompare),
          );
          if (prevLinesJson !== nextLinesJson) {
            detailsPayload.comandaLines = nextLines;
          }
        }
      }

      const prevBookingSrc = String(editAppt.bookingSource || "").trim();
      const nextBookingSrc = (editBookingSource || "").trim();
      if (nextBookingSrc !== prevBookingSrc) {
        detailsPayload.bookingSource = nextBookingSrc;
      }

      const hasDetailChanges = Object.keys(detailsPayload).some((k) => k !== "reason");

      const nextStart = (() => {
        if (!editTime) return null;
        const [hh, mm] = editTime.split(":").map(Number);
        const d = new Date(date);
        d.setHours(hh || 0, mm || 0, 0, 0);
        return d.toISOString();
      })();
      const changedTime = !!nextStart && nextStart !== editAppt.startTime;
      const anchorBarberReschedule = !isLoyalty
        ? (editComandaLines[0]?.barberId || "").trim() || (editAppt.barberId || "")
        : editBarberId || editAppt.barberId || "";
      const changedBarber =
        authUser?.role === "OWNER" &&
        (anchorBarberReschedule || "") !== (editAppt.barberId || "");
      const changedStatus = statusNorm !== prevStatusNorm;

      if (!hasDetailChanges && !changedTime && !changedBarber && !changedStatus) {
        throw new Error("Nada foi alterado.");
      }

      if (hasDetailChanges) {
        await api.patch(`/schedule/${id}/details`, detailsPayload);
      }
      if (changedTime || changedBarber) {
        const startTime = changedTime && nextStart ? nextStart : editAppt.startTime;
        await api.patch(`/schedule/${id}/reschedule`, {
          barberId: authUser?.role === "OWNER" ? anchorBarberReschedule || "" : editAppt.barberId || "",
          startTime,
          reason,
        });
      }
      if (changedStatus) {
        await api.patch(`/schedule/${id}/status`, { status: statusNorm, reason });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      setEditOpen(false);
      setEditAppt(null);
      toast.success("Agendamento atualizado");
    },
    onError: (err: any) =>
      toast.error(err.message || err.response?.data?.message || "Erro ao salvar alterações"),
  });

  const editClientUserId = editAppt?.userId ? String(editAppt.userId) : "";

  const { data: clientTeamNotes = [], isLoading: clientTeamNotesLoading } = useQuery({
    queryKey: ["client-team-notes", editClientUserId],
    queryFn: async () =>
      (await api.get(`/tenant-users/clientes/${editClientUserId}/notas-equipe`)).data,
    enabled: editOpen && !!editClientUserId,
  });

  const newApptModalClientId = modalOpen && selectedClientId ? selectedClientId : "";
  const { data: newApptClientTeamNotes = [], isLoading: newApptClientTeamNotesLoading } = useQuery({
    queryKey: ["client-team-notes", newApptModalClientId],
    queryFn: async () =>
      (await api.get(`/tenant-users/clientes/${newApptModalClientId}/notas-equipe`)).data,
    enabled: !!newApptModalClientId,
  });

  const addClientTeamNoteMut = useMutation({
    mutationFn: async ({ clientId, body }: { clientId: string; body: string }) =>
      (await api.post(`/tenant-users/clientes/${clientId}/notas-equipe`, { body })).data,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["client-team-notes", vars.clientId] });
      qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "appointments" });
      qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "clientes" });
      setNewTeamNote("");
      toast.success("Nota da equipe salva");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || err.message || "Erro ao salvar nota"),
  });

  const createAppt = useMutation({
    mutationFn: async () => {
      const serviceId =
        newAppt.paymentMode === "LOYALTY" ? newAppt.loyaltyServiceId : newAppt.serviceId;

      const missing: string[] = [];
      if (!newAppt.clientName?.trim()) missing.push("cliente");
      if (!newAppt.time?.trim()) missing.push("horário");
      if (newAppt.paymentMode === "LOYALTY") {
        if (!selectedClient?.id) missing.push("selecionar um cliente cadastrado");
        if (!activeSub?.id) missing.push("plano ativo do cliente");
        if (!newAppt.loyaltyServiceId?.trim()) missing.push("item do plano");
      } else {
        if (!newAppt.serviceId?.trim()) missing.push("serviço");
      }
      if (missing.length) {
        throw new Error(`Falta preencher: ${missing.join(", ")}.`);
      }

      const [hours, minutes] = newAppt.time.split(":");
      const startTime = new Date(date);
      startTime.setHours(Number(hours), Number(minutes), 0, 0);
      // Apenas campos do CreateManualAppointmentDto — o backend usa forbidNonWhitelisted
      const payload: Record<string, string> = {
        serviceId,
        clientName: newAppt.clientName.trim(),
        startTime: startTime.toISOString(),
      };
      const phoneOut = phoneDigitsForApi(newAppt.clientPhone);
      if (phoneOut) payload.clientPhone = phoneOut;
      if (newAppt.clientEmail?.trim()) payload.clientEmail = newAppt.clientEmail.trim();
      if (newAppt.barberId?.trim()) payload.barberId = newAppt.barberId.trim();
      if (newAppt.bookingSource?.trim()) payload.bookingSource = newAppt.bookingSource.trim().slice(0, 120);
      if (newAppt.paymentMode === "LOYALTY") {
        if (!selectedClient?.id) throw new Error("Para usar plano, selecione um cliente cadastrado.");
        if (!activeSub?.id) throw new Error("Cliente sem plano ativo.");
        if (!selectedLoyaltyItem) throw new Error("Item do plano inválido ou sem créditos restantes.");
        payload.userId = selectedClient.id;
        payload.loyaltySubscriptionId = activeSub.id;
      }
      return (await api.post("/schedule/manual", payload)).data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      setModalOpen(false);
      setSelectedClientId("");
      setClientSearch("");
      setIsNewClient(false);
      setNewClient({ name: "", phone: "", email: "" });
      setNewAppt({
        serviceId: "",
        barberId: effectiveBarberFilterId || "",
        userId: "",
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        time: "",
        paymentMode: "PAID",
        loyaltyServiceId: "",
        bookingSource: "",
      });
      toast.success("Agendamento criado!");
    },
    onError: (err: any) => toast.error(err.message || err.response?.data?.message || "Erro ao agendar"),
  });

  const createClient = useMutation({
    mutationFn: async () => {
      if (!newClient.name || (!phoneDigitsForApi(newClient.phone) && !newClient.email))
        throw new Error("Informe nome e contato");
      return (
        await api.post("/tenant-users/clientes", {
          ...newClient,
          phone: phoneDigitsForApi(newClient.phone) || undefined,
        })
      ).data;
    },
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: ["clientes"] });
      setIsNewClient(false);
      setSelectedClientId(created.id);
      setNewAppt((s) => ({
        ...s,
        userId: created.id,
        clientName: created.name,
        clientPhone: formatBrazilPhone(created.phone || ""),
        clientEmail: created.email || "",
      }));
      toast.success("Cliente criado");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || err.message || "Erro ao criar cliente"),
  });

  // ── Navigation ───
  const navigate = (dir: 1 | -1) => {
    if (view === "day") setDate(dir === 1 ? addDays(date, 1) : subDays(date, 1));
    else if (view === "week") setDate(dir === 1 ? addWeeks(date, 1) : subWeeks(date, 1));
    else setDate(dir === 1 ? addMonths(date, 1) : subMonths(date, 1));
  };

  const periodLabel = view === "day"
    ? format(date, "EEEE, d 'de' MMMM yyyy", { locale: ptBR })
    : view === "week"
    ? `${format(rangeStart, "d MMM", { locale: ptBR })} – ${format(rangeEnd, "d MMM yyyy", { locale: ptBR })}`
    : format(date, "MMMM yyyy", { locale: ptBR });

  // Group by day for week/month
  const daysInRange = (view === "day" ? [date] : eachDayOfInterval({ start: rangeStart, end: rangeEnd }));

  const getApptForDay = (d: Date) =>
    (appointments || []).filter((a: any) => isSameDay(new Date(a.startTime), d));

  return (
    <div className="p-6 flex flex-col h-full animate-fade-in">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-500" /> Agenda
          </h1>
          <p className="text-zinc-400 text-sm mt-0.5 capitalize">{periodLabel}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Barber filter (owner) */}
          {authUser?.role === "OWNER" && (
            <Select
              value={filterBarberSelectValue}
              onValueChange={(v) => {
                const raw = v ?? "__all__";
                const id = raw === "__all__" ? "" : raw;
                setSelectedBarberId(id);
                setNewAppt((s) => ({ ...s, barberId: id }));
              }}
            >
              <SelectTrigger className="bg-zinc-900 border border-zinc-800 h-8 text-zinc-200 min-w-[10rem]">
                <span className="truncate text-left text-sm">
                  {effectiveBarberFilterId
                    ? selectedFilterBarberName || "Barbeiro"
                    : "Todos os barbeiros"}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="__all__">Todos os barbeiros</SelectItem>
                {team?.map((m: any) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* View Toggle */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-1">
            {([["day", <AlignJustify className="w-4 h-4" />, "Dia"],
               ["week", <CalendarRange className="w-4 h-4" />, "Semana"],
               ["month", <LayoutGrid className="w-4 h-4" />, "Mês"]] as const).map(([v, icon, label]) => (
              <button
                key={v}
                onClick={() => setView(v as ViewMode)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  view === v ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-white"
                )}
              >
                {icon}{label}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setDate(new Date())} className="px-3 h-8 text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all">
              Hoje
            </button>
            <button onClick={() => navigate(1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* New Appointment */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger render={<Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold h-8" />}>
              + Novo
            </DialogTrigger>
            <DialogContent className={cn(agendaAppointmentDialogContentClass)}>
              <DialogHeader>
                <DialogTitle>Novo agendamento</DialogTitle>
                <p className="text-sm text-zinc-500 font-normal leading-snug">
                  Balcão / manual — mesma base de informações do modal de edição (resumo, origem, notas da equipe com
                  cliente cadastrado, contato completo).
                </p>
              </DialogHeader>
              <div className="max-h-[min(85vh,720px)] overflow-y-auto overflow-x-hidden pr-1 space-y-4 pt-1">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 space-y-2 text-sm">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Resumo</p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Data: </span>
                    {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Horário: </span>
                    {newAppt.time?.trim() ? newAppt.time : "—"}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Tipo: </span>
                    Balcão / manual
                    {newAppt.paymentMode === "LOYALTY" ? " • Fidelidade" : ""}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Status ao criar: </span>
                    Confirmado
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Origem / canal: </span>
                    {(newAppt.bookingSource || "").trim() || "—"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Origem / canal (texto livre)</Label>
                  <Input
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Ex.: Balcão, WhatsApp, Instagram, indicação, parceria…"
                    value={newAppt.bookingSource}
                    onChange={(e) => setNewAppt({ ...newAppt, bookingSource: e.target.value })}
                    maxLength={120}
                  />
                  <p className="text-[11px] text-zinc-500">
                    Reservas pelo app público entram como &quot;App&quot;; aqui você registra canais do balcão.
                  </p>
                </div>

                {authUser?.role === "OWNER" && (
                  <div className="space-y-2">
                    <Label>Barbeiro</Label>
                    <Select
                      value={newAppt.barberId}
                      onValueChange={(v) => setNewAppt({ ...newAppt, barberId: v ?? "" })}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        {newAppt.barberId ? (
                          <span className="truncate">{team?.find((m: any) => m.id === newAppt.barberId)?.name}</span>
                        ) : (
                          <SelectValue placeholder="Selecione..." />
                        )}
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        {team?.map((m: any) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Cliente */}
                {!isNewClient ? (
                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    {!selectedClientId ? (
                      <>
                        <Input
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Buscar por nome ou telefone..."
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                        />
                        {filteredClients.length > 0 && (
                          <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                            {filteredClients.map((c: any) => (
                              <button
                                key={c.id}
                                type="button"
                                className="w-full px-3 py-2 text-left hover:bg-zinc-800 border-b border-zinc-800 last:border-0"
                                onClick={() => {
                                  setSelectedClientId(c.id);
                                  setClientSearch("");
                                  setNewAppt((s) => ({
                                    ...s,
                                    userId: c.id,
                                    clientName: c.name,
                                    clientPhone: formatBrazilPhone(c.phone || ""),
                                    clientEmail: c.email || "",
                                  }));
                                }}
                              >
                                <p className="text-sm font-medium text-white">{c.name}</p>
                                <p className="text-xs text-zinc-500">
                                  {c.phone ? formatBrazilPhone(c.phone) : c.email}
                                </p>
                              </button>
                            ))}
                          </div>
                        )}
                        <Button
                          type="button"
                          onClick={() => setIsNewClient(true)}
                          className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold"
                        >
                          <Plus className="w-4 h-4 mr-2" /> Criar novo cliente
                        </Button>
                      </>
                    ) : (
                      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Cliente selecionado</p>
                          <p className="text-sm font-bold text-white">{selectedClient?.name}</p>
                          <p className="text-xs text-zinc-500">
                            {selectedClient?.phone
                              ? formatBrazilPhone(selectedClient.phone)
                              : selectedClient?.email}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-zinc-400 hover:text-white"
                          onClick={() => {
                            setSelectedClientId("");
                            setNewAppt((s) => ({
                              ...s,
                              userId: "",
                              clientName: "",
                              clientPhone: "",
                              clientEmail: "",
                            }));
                          }}
                        >
                          Alterar
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Novo cliente</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2 col-span-2">
                        <Input
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Nome"
                          value={newClient.name}
                          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Telefone"
                          value={newClient.phone}
                          onChange={(e) =>
                            setNewClient({ ...newClient, phone: formatBrazilPhone(e.target.value) })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          className="bg-zinc-800 border-zinc-700"
                          placeholder="Email (opcional)"
                          value={newClient.email}
                          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => createClient.mutate()}
                        disabled={
                          createClient.isPending ||
                          !newClient.name ||
                          (!phoneDigitsForApi(newClient.phone) && !newClient.email)
                        }
                        className="flex-1 bg-amber-500 text-black hover:bg-amber-600 font-bold"
                      >
                        {createClient.isPending ? "Criando..." : "Criar cliente"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                        onClick={() => setIsNewClient(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                {selectedClientId ? (
                  <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 space-y-3">
                    <div className="flex items-start gap-2">
                      <StickyNote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-amber-100">Notas internas da equipe</p>
                        <p className="text-[11px] text-amber-200/80">
                          Visíveis para dono e barbeiros nesta agenda e em Clientes. O cliente não vê isto no app.
                        </p>
                      </div>
                    </div>
                    {newApptClientTeamNotesLoading ? (
                      <p className="text-xs text-zinc-500">Carregando notas…</p>
                    ) : (
                      <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                        {newApptClientTeamNotes.length === 0 ? (
                          <p className="text-xs text-zinc-500">Nenhuma nota ainda — use o campo abaixo.</p>
                        ) : (
                          newApptClientTeamNotes.map((n: any) => (
                            <div
                              key={n.id}
                              className="rounded-md border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-2 text-xs"
                            >
                              <p className="text-zinc-200 whitespace-pre-wrap">{n.body}</p>
                              <p className="text-[10px] text-zinc-500 mt-1">
                                {n.authorName} · {format(new Date(n.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-amber-100/90">Nova nota</Label>
                      <textarea
                        className="flex w-full min-h-[72px] rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                        placeholder="Ex.: prefere máquina baixa, alérgico a determinada pomada, chega atrasado com frequência…"
                        value={newTeamNote}
                        onChange={(e) => setNewTeamNote(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-amber-500/40 text-amber-100 hover:bg-amber-500/15"
                        disabled={!newTeamNote.trim() || addClientTeamNoteMut.isPending || !selectedClientId}
                        onClick={() =>
                          addClientTeamNoteMut.mutate({
                            clientId: selectedClientId,
                            body: newTeamNote.trim(),
                          })
                        }
                      >
                        {addClientTeamNoteMut.isPending ? "Salvando…" : "Adicionar nota"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Notas da equipe:</span> ficam disponíveis ao selecionar
                      um <span className="text-zinc-300">cliente cadastrado</span> (ou após criar um novo cliente).
                    </p>
                  </div>
                )}

                {separateLoyaltyByBarber &&
                  authUser?.role === "OWNER" &&
                  !!selectedClient?.id &&
                  !loyaltyBarberIdForSubs && (
                    <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                      Selecione o <b className="text-white">profissional</b> do atendimento (barbeiro) para carregar o plano de fidelidade vinculado a ele.
                    </div>
                  )}

                {/* Plano do cliente */}
                {activeSub && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-3">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Plano ativo</p>
                      <p className="text-sm text-white font-semibold truncate">{activeSub.plan?.name}</p>
                      <p className="text-xs text-zinc-400">
                        Expira em: {activeSub.endDate ? format(new Date(activeSub.endDate), "dd/MM/yyyy") : "—"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Serviço</Label>
                  <Select
                    onValueChange={(v) => setNewAppt({ ...newAppt, serviceId: v ?? "" })}
                    value={newAppt.serviceId}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      {newAppt.serviceId ? (
                        <span className="truncate">
                          {services?.find((s: any) => s.id === newAppt.serviceId)?.name}
                        </span>
                      ) : (
                        <SelectValue placeholder="Selecione..." />
                      )}
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      {services?.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.duration} min)</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Escolha: Pago x Plano */}
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 space-y-3">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Forma</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "border-zinc-800",
                        newAppt.paymentMode === "PAID"
                          ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/30"
                          : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800",
                      )}
                      onClick={() => setNewAppt({ ...newAppt, paymentMode: "PAID", loyaltyServiceId: "" })}
                    >
                      Pago
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={
                        !selectedClient?.id ||
                        !activeSub ||
                        availableLoyaltyItems.length === 0 ||
                        (separateLoyaltyByBarber && !loyaltyBarberIdForSubs)
                      }
                      className={cn(
                        "border-zinc-800",
                        newAppt.paymentMode === "LOYALTY"
                          ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/20 border-amber-500/30"
                          : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800",
                      )}
                      onClick={() => setNewAppt({ ...newAppt, paymentMode: "LOYALTY" })}
                    >
                      Plano
                    </Button>
                  </div>

                  {newAppt.paymentMode === "LOYALTY" && (
                    <div className="space-y-2">
                      {!selectedClient?.id ? (
                        <p className="text-xs text-zinc-500">Selecione um cliente cadastrado para usar plano.</p>
                      ) : !activeSub ? (
                        <p className="text-xs text-zinc-500">Este cliente não possui plano ativo.</p>
                      ) : availableLoyaltyItems.length === 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs text-zinc-500">Plano ativo, mas já foi totalmente consumido.</p>
                          <div className="rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">Consumo por item</p>
                            <div className="space-y-1">
                              {loyaltyItems.map((it: any) => (
                                <div key={it.serviceId} className="flex items-center justify-between text-xs">
                                  <span className="text-zinc-300 truncate pr-2">{it.serviceName}</span>
                                  <span className="text-zinc-500 shrink-0">{it.used}/{it.total}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Label>Item do plano</Label>
                          <Select
                            value={newAppt.loyaltyServiceId}
                            onValueChange={(v) => setNewAppt({ ...newAppt, loyaltyServiceId: v ?? "" })}
                          >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              {selectedLoyaltyItem ? (
                                <span className="truncate">
                                  {selectedLoyaltyItem.serviceName} · {selectedLoyaltyItem.remaining} restante(s)
                                </span>
                              ) : (
                                <SelectValue placeholder="Selecione um item..." />
                              )}
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                              {availableLoyaltyItems.map((it: any) => (
                                <SelectItem key={it.serviceId} value={it.serviceId}>
                                  {it.serviceName} — {it.remaining} restante(s) ({it.used}/{it.total})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Nome do cliente</Label>
                    <Input
                      placeholder="Nome"
                      className="bg-zinc-800 border-zinc-700"
                      value={newAppt.clientName}
                      onChange={(e) => setNewAppt({ ...newAppt, clientName: e.target.value })}
                      disabled={!!selectedClientId}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário (início)</Label>
                    <Input
                      type="time"
                      className="bg-zinc-800 border-zinc-700"
                      value={newAppt.time}
                      onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Telefone</Label>
                    <Input
                      placeholder="(11) 9 9999-9999"
                      className="bg-zinc-800 border-zinc-700"
                      value={newAppt.clientPhone}
                      onChange={(e) =>
                        setNewAppt({ ...newAppt, clientPhone: formatBrazilPhone(e.target.value) })
                      }
                      disabled={!!selectedClientId}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="cliente@email.com"
                      className="bg-zinc-800 border-zinc-700"
                      value={newAppt.clientEmail}
                      onChange={(e) => setNewAppt({ ...newAppt, clientEmail: e.target.value })}
                      disabled={!!selectedClientId}
                    />
                  </div>
                </div>
                <Button onClick={() => createAppt.mutate()} disabled={createAppt.isPending} className="w-full bg-amber-500 text-black hover:bg-amber-600 mt-2">
                  Confirmar Agendamento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full bg-zinc-900 border border-zinc-800 rounded-xl" />)}</div>
      ) : view === "day" ? (
        /* DAY VIEW */
        <>
        <DailyGrid
          date={date}
          team={
            effectiveBarberFilterId
              ? (team || []).filter((m: any) => m.id === effectiveBarberFilterId)
              : (team || [])
          }
          appointments={appointments || []}
          services={(services || []).map((s: any) => ({ id: s.id, name: s.name }))}
          onMove={({ appointmentId, barberId, startTime }) => {
            setMoveDraft({ appointmentId, barberId, startTime });
            setMoveReason("");
          }}
          onEdit={(appt) => {
            setEditAppt(appt);
            setEditOpen(true);
            setEditReason("");
            setEditStatus(normalizeAppointmentStatus(appt?.status));
            setEditBarberId(appt?.barberId || "");
            setEditTime(format(new Date(appt.startTime), "HH:mm"));
            setEditClientName(appt.clientName || "");
            setEditClientPhone(formatBrazilPhone(appt.clientPhone || ""));
            setEditClientEmail(appt.clientEmail || "");
            const hk = String(appt?.holdKind || "NONE");
            setEditHoldKind(hk === "LEAVE" || hk === "BLOCK" ? hk : "NONE");
            setEditHoldReason(appt?.holdReason ? String(appt.holdReason) : "");
            setEditComandaLines(buildInitialComandaLines(appt));
            setEditBookingSource(String(appt?.bookingSource ?? ""));
          }}
          onQuickAddSlot={({ barberId, timeHHmm }) => {
            setModalOpen(true);
            setNewAppt((s) => ({ ...s, time: timeHHmm, barberId }));
          }}
        />
        {/* Dialog: motivo do drag and drop */}
        <Dialog open={!!moveDraft} onOpenChange={(open) => { if (!open) setMoveDraft(null); }}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Motivo da remarcação</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Motivo (obrigatório)</Label>
                <Input
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Ex.: cliente pediu para trocar / encaixe extra / reagendamento"
                  value={moveReason}
                  onChange={(e) => setMoveReason(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-amber-500 text-black hover:bg-amber-600"
                disabled={!moveDraft || !moveReason.trim() || reschedule.isPending}
                onClick={() => {
                  if (!moveDraft) return;
                  reschedule.mutate({
                    id: moveDraft.appointmentId,
                    barberId: moveDraft.barberId,
                    startTime: moveDraft.startTime,
                    reason: moveReason.trim(),
                  }, {
                    onSuccess: () => setMoveDraft(null),
                  } as any);
                }}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog: menu de edição */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className={cn(agendaAppointmentDialogContentClass)}>
            <DialogHeader><DialogTitle>Editar agendamento</DialogTitle></DialogHeader>
            {!editAppt ? (
              <p className="text-sm text-zinc-500">—</p>
            ) : (
              <div className="space-y-4 max-h-[min(85vh,720px)] overflow-y-auto overflow-x-hidden pr-1">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 space-y-2 text-sm">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Resumo</p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Horário atual: </span>
                    {format(new Date(editAppt.startTime), "HH:mm")} – {format(new Date(editAppt.endTime), "HH:mm")}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Tipo: </span>
                    {editAppt.type === "ONLINE" ? "Online" : "Balcão"}
                    {editAppt.loyaltyUsage ? " • Fidelidade" : ""}
                  </p>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500">Origem / canal: </span>
                    {(editAppt.bookingSource || "").trim() ||
                      (editAppt.type === "ONLINE" ? "App" : "—")}
                  </p>
                  {(editAppt.holdKind === "LEAVE" || editAppt.holdKind === "BLOCK") && (
                    <p className="text-zinc-300">
                      <span className="text-zinc-500">Reserva: </span>
                      {holdKindLabels[editAppt.holdKind as "LEAVE" | "BLOCK"]}
                      {editAppt.holdReason ? ` — ${editAppt.holdReason}` : ""}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Origem / canal (texto livre)</Label>
                  <Input
                    className="bg-zinc-800 border-zinc-700"
                    placeholder="Ex.: Balcão, WhatsApp, Instagram, indicação, parceria…"
                    value={editBookingSource}
                    onChange={(e) => setEditBookingSource(e.target.value)}
                    maxLength={120}
                  />
                  <p className="text-[11px] text-zinc-500">
                    Reservas pelo app público entram como &quot;App&quot;; você pode trocar ou detalhar aqui.
                  </p>
                </div>

                {editClientUserId ? (
                  <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 space-y-3">
                    <div className="flex items-start gap-2">
                      <StickyNote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-amber-100">Notas internas da equipe</p>
                        <p className="text-[11px] text-amber-200/80">
                          Visíveis para dono e barbeiros nesta agenda e em Clientes. O cliente não vê isto no app.
                        </p>
                      </div>
                    </div>
                    {clientTeamNotesLoading ? (
                      <p className="text-xs text-zinc-500">Carregando notas…</p>
                    ) : (
                      <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                        {clientTeamNotes.length === 0 ? (
                          <p className="text-xs text-zinc-500">Nenhuma nota ainda — use o campo abaixo.</p>
                        ) : (
                          clientTeamNotes.map((n: any) => (
                            <div
                              key={n.id}
                              className="rounded-md border border-zinc-700/80 bg-zinc-950/70 px-2.5 py-2 text-xs"
                            >
                              <p className="text-zinc-200 whitespace-pre-wrap">{n.body}</p>
                              <p className="text-[10px] text-zinc-500 mt-1">
                                {n.authorName} · {format(new Date(n.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-amber-100/90">Nova nota</Label>
                      <textarea
                        className="flex w-full min-h-[72px] rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                        placeholder="Ex.: prefere máquina baixa, alérgico a determinada pomada, chega atrasado com frequência…"
                        value={newTeamNote}
                        onChange={(e) => setNewTeamNote(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-amber-500/40 text-amber-100 hover:bg-amber-500/15"
                        disabled={
                          !newTeamNote.trim() || addClientTeamNoteMut.isPending || !editClientUserId
                        }
                        onClick={() =>
                          addClientTeamNoteMut.mutate({
                            clientId: editClientUserId,
                            body: newTeamNote.trim(),
                          })
                        }
                      >
                        {addClientTeamNoteMut.isPending ? "Salvando…" : "Adicionar nota"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Notas da equipe:</span> só ficam disponíveis quando o
                      agendamento está vinculado a um{" "}
                      <span className="text-zinc-300">cliente cadastrado</span> (balcão com cadastro ou fidelidade).
                      Agendamentos só com nome avulso não guardam histórico por cliente aqui.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Nome do cliente</Label>
                    <Input
                      className="bg-zinc-800 border-zinc-700"
                      value={editClientName}
                      onChange={(e) => setEditClientName(e.target.value)}
                      disabled={
                        !!editAppt.loyaltyUsage ||
                        editHoldKind === "LEAVE" ||
                        editHoldKind === "BLOCK"
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      className="bg-zinc-800 border-zinc-700"
                      value={editClientPhone}
                      onChange={(e) => setEditClientPhone(formatBrazilPhone(e.target.value))}
                      disabled={
                        !!editAppt.loyaltyUsage ||
                        editHoldKind === "LEAVE" ||
                        editHoldKind === "BLOCK"
                      }
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      className="bg-zinc-800 border-zinc-700"
                      value={editClientEmail}
                      onChange={(e) => setEditClientEmail(e.target.value)}
                      disabled={
                        !!editAppt.loyaltyUsage ||
                        editHoldKind === "LEAVE" ||
                        editHoldKind === "BLOCK"
                      }
                    />
                  </div>
                </div>
                {!!editAppt.loyaltyUsage && (
                  <p className="text-xs text-amber-500/90">
                    Dados do cliente bloqueados aqui porque o atendimento usa plano de fidelidade.
                  </p>
                )}
                {!editAppt.loyaltyUsage && (editHoldKind === "LEAVE" || editHoldKind === "BLOCK") && (
                  <p className="text-xs text-zinc-500">
                    Em folga ou bloqueio o nome na grade vira &quot;Folga&quot; ou &quot;Bloqueio&quot;; use o motivo descritivo abaixo.
                  </p>
                )}

                {!editAppt.loyaltyUsage && (
                  <div className="space-y-2">
                    <Label>Tipo de horário na grade</Label>
                    {(editAppt.holdKind === "LEAVE" || editAppt.holdKind === "BLOCK") &&
                      editHoldKind === "NONE" && (
                        <p className="text-xs text-amber-500/90">
                          Ao voltar para atendimento normal, confira o nome do cliente — antes podia aparecer como
                          Folga/Bloqueio.
                        </p>
                      )}
                    <Select
                      value={editHoldKind}
                      onValueChange={(v) => {
                        const nk = (v === "LEAVE" || v === "BLOCK" ? v : "NONE") as "NONE" | "LEAVE" | "BLOCK";
                        setEditHoldKind(nk);
                      }}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 w-full min-w-0">
                        <span>{holdKindLabels[editHoldKind]}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {(["NONE", "LEAVE", "BLOCK"] as const).map((k) => (
                          <SelectItem key={k} value={k}>
                            {holdKindLabels[k]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!editAppt.loyaltyUsage && (editHoldKind === "LEAVE" || editHoldKind === "BLOCK") && (
                  <div className="space-y-2">
                    <Label>Motivo descritivo (folga / bloqueio)</Label>
                    <textarea
                      className="flex w-full min-h-[80px] rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
                      value={editHoldReason}
                      onChange={(e) => setEditHoldReason(e.target.value)}
                      placeholder="Ex.: consulta médica, curso, manutenção do espaço, horário reservado internamente…"
                    />
                  </div>
                )}

                {!!editAppt.loyaltyUsage && (
                  <div className="space-y-2">
                    <Label>Serviço (plano)</Label>
                    <p className="text-sm text-zinc-300 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                      {editAppt.service?.name ||
                        services?.find((s: any) => s.id === editComandaLines[0]?.serviceId)?.name ||
                        "—"}
                    </p>
                  </div>
                )}

                {!editAppt.loyaltyUsage && editHoldKind === "NONE" && (
                  <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-zinc-200">Comanda (serviços em sequência)</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-200"
                        onClick={() => {
                          const anchor = (
                            editComandaLines[0]?.barberId ||
                            editAppt.barberId ||
                            ""
                          ).trim();
                          setEditComandaLines((xs) => [...xs, { serviceId: "", barberId: anchor }]);
                        }}
                      >
                        + Serviço
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {editComandaLines.map((line, idx) => (
                        <div
                          key={idx}
                          className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
                        >
                          <div className="space-y-1">
                            <span className="text-[11px] text-zinc-500">Serviço {idx + 1}</span>
                            <Select
                              value={line.serviceId}
                              onValueChange={(v) => {
                                const nv = v ?? "";
                                setEditComandaLines((xs) =>
                                  xs.map((row, i) => (i === idx ? { ...row, serviceId: nv } : row)),
                                );
                              }}
                            >
                              <SelectTrigger className="bg-zinc-800 border-zinc-700 w-full min-w-0">
                                {line.serviceId ? (
                                  <span className="truncate">
                                    {services?.find((s: any) => s.id === line.serviceId)?.name ||
                                      "Serviço"}
                                  </span>
                                ) : (
                                  <span className="text-zinc-500">Selecione…</span>
                                )}
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                {(services || [])
                                  .filter((s: any) => s.active !== false)
                                  .map((s: any) => (
                                    <SelectItem key={s.id} value={s.id}>
                                      {s.name} ({s.duration} min)
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] text-zinc-500">Profissional</span>
                            <Select
                              value={line.barberId || "__none__"}
                              onValueChange={(v) => {
                                const bid = v === "__none__" ? "" : (v ?? "");
                                setEditComandaLines((xs) => {
                                  const next = xs.map((row, i) =>
                                    i === idx ? { ...row, barberId: bid } : row,
                                  );
                                  if (idx === 0 && authUser?.role === "OWNER") {
                                    setEditBarberId(bid);
                                  }
                                  return next;
                                });
                              }}
                            >
                              <SelectTrigger className="bg-zinc-800 border-zinc-700 w-full min-w-0">
                                {line.barberId ? (
                                  <span className="truncate text-left">
                                    {team?.find((m: any) => m.id === line.barberId)?.name ||
                                      editAppt.barberName ||
                                      line.barberId}
                                  </span>
                                ) : (
                                  <span className="text-zinc-500">Padrão (1.ª linha / coluna)</span>
                                )}
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="__none__">Padrão (âncora)</SelectItem>
                                {line.barberId &&
                                  !(team || []).some((m: any) => m.id === line.barberId) && (
                                    <SelectItem value={line.barberId}>
                                      {editAppt.barberName || line.barberId} (fora da lista)
                                    </SelectItem>
                                  )}
                                {(team || []).map((m: any) => (
                                  <SelectItem key={m.id} value={m.id}>
                                    {m.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end pb-0.5">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-zinc-500 hover:text-red-400"
                              disabled={editComandaLines.length <= 1}
                              onClick={() =>
                                setEditComandaLines((xs) => xs.filter((_, i) => i !== idx))
                              }
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Cada serviço segue na sequência; profissional vazio usa o da primeira linha. Duração e valor
                      (balcão) são recalculados ao salvar.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Horário (início)</Label>
                    <Input
                      type="time"
                      className="bg-zinc-800 border-zinc-700"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={normalizeAppointmentStatus(editStatus)}
                      onValueChange={(v) => setEditStatus(normalizeAppointmentStatus(v))}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 w-full min-w-0">
                        <span className="truncate">
                          {statusLabels[normalizeAppointmentStatus(editStatus)]}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {APPOINTMENT_STATUS_ORDER.map((k) => (
                          <SelectItem key={k} value={k}>
                            {statusLabels[k]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {authUser?.role === "OWNER" && !!editAppt.loyaltyUsage && (
                  <div className="space-y-2">
                    <Label>Profissional</Label>
                    <Select
                      value={editBarberId || "__none__"}
                      onValueChange={(v) => setEditBarberId(v === "__none__" ? "" : (v ?? ""))}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 w-full min-w-0">
                        {editBarberId ? (
                          <span className="truncate text-left">
                            {team?.find((m: any) => m.id === editBarberId)?.name ||
                              editAppt.barberName ||
                              editBarberId}
                          </span>
                        ) : (
                          <span className="text-zinc-500">Sem profissional</span>
                        )}
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="__none__">Sem profissional</SelectItem>
                        {editBarberId &&
                          !(team || []).some((m: any) => m.id === editBarberId) && (
                            <SelectItem value={editBarberId}>
                              {editAppt.barberName || editBarberId} (fora da lista atual)
                            </SelectItem>
                          )}
                        {(team || []).map((m: any) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Motivo (obrigatório)</Label>
                  <Input
                    className="bg-zinc-800 border-zinc-700"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    placeholder="Ex.: cliente pediu ajuste / barbeiro trocado / encaixe"
                  />
                </div>

                <Button
                  className="w-full bg-amber-500 text-black hover:bg-amber-600"
                  disabled={
                    !editReason.trim() ||
                    saveEditAppointment.isPending ||
                    (!!editAppt &&
                      !editAppt.loyaltyUsage &&
                      (editHoldKind === "LEAVE" || editHoldKind === "BLOCK") &&
                      !editHoldReason.trim())
                  }
                  onClick={() => saveEditAppointment.mutate()}
                >
                  {saveEditAppointment.isPending ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
        </>
      ) : view === "week" ? (
        /* WEEK VIEW */
        <div className="grid grid-cols-7 gap-2">
          {daysInRange.map((day) => {
            const dayAppts = getApptForDay(day);
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toISOString()} className={cn("min-h-[120px] rounded-xl border p-2", isToday ? "border-amber-500/30 bg-amber-500/5" : "border-zinc-800 bg-zinc-900/50")}>
                <button
                  onClick={() => { setDate(day); setView("day"); }}
                  className={cn("w-full text-center mb-2 hover:opacity-80 transition-opacity")}
                >
                  <p className="text-[11px] text-zinc-500 uppercase">{format(day, "EEE", { locale: ptBR })}</p>
                  <p className={cn("text-lg font-bold", isToday ? "text-amber-400" : "text-white")}>{format(day, "d")}</p>
                </button>
                <div className="space-y-1">
                  {dayAppts.length === 0 ? (
                    <p className="text-[10px] text-zinc-600 text-center">—</p>
                  ) : dayAppts.map((app: any) => (
                    <div
                      key={app.id}
                      className={cn(
                        "text-[10px] rounded px-1.5 py-1 truncate",
                        statusColors[normalizeAppointmentStatus(app.status)],
                        "border",
                      )}
                    >
                      {!effectiveBarberFilterId && (
                        <span className="font-mono font-bold text-amber-500/90 mr-0.5">{barberInitials(app.barber?.name)}</span>
                      )}
                      {!effectiveBarberFilterId && <span className="text-zinc-600">| </span>}
                      {format(new Date(app.startTime), "HH:mm")} {app.clientName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* MONTH VIEW */
        <div className="grid grid-cols-7 gap-1">
          {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => (
            <div key={d} className="text-center text-xs text-zinc-600 font-medium py-1">{d}</div>
          ))}
          {/* Pad start */}
          {Array.from({ length: rangeStart.getDay() }).map((_, i) => <div key={`pad-${i}`} />)}
          {daysInRange.map((day) => {
            const dayAppts = getApptForDay(day);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, date);
            return (
              <button
                key={day.toISOString()}
                onClick={() => { setDate(day); setView("day"); }}
                className={cn(
                  "min-h-[64px] rounded-lg border p-1.5 text-left transition-all hover:border-amber-500/30",
                  isToday ? "border-amber-500/40 bg-amber-500/5" : "border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900"
                )}
              >
                <p className={cn("text-xs font-bold mb-1", isToday ? "text-amber-400" : "text-zinc-300")}>{format(day, "d")}</p>
                <div className="space-y-0.5">
                  {dayAppts.slice(0, 2).map((app: any) => (
                    <div
                      key={app.id}
                      className={cn(
                        "text-[9px] rounded px-1 py-0.5 truncate border",
                        statusColors[normalizeAppointmentStatus(app.status)],
                      )}
                    >
                      {!effectiveBarberFilterId && (
                        <span className="font-mono font-bold text-amber-500/90">{barberInitials(app.barber?.name)}</span>
                      )}
                      {!effectiveBarberFilterId && <span className="text-zinc-600">| </span>}
                      {format(new Date(app.startTime), "HH:mm")} {app.clientName}
                    </div>
                  ))}
                  {dayAppts.length > 2 && (
                    <p className="text-[9px] text-zinc-500 pl-1">+{dayAppts.length - 2} mais</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
