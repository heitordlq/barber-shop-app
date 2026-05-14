"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle, CalendarDays, DollarSign, TrendingUp,
  Users, ChevronLeft, ChevronRight, AlignJustify,
  CalendarRange, LayoutGrid,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import {
  format, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  addDays, subDays, addWeeks, subWeeks, addMonths, subMonths,
  eachDayOfInterval, isSameDay
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

type ViewMode = "day" | "week" | "month";

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: "day", label: "Dia", icon: <AlignJustify className="w-4 h-4" /> },
  { id: "week", label: "Semana", icon: <CalendarRange className="w-4 h-4" /> },
  { id: "month", label: "Mês", icon: <LayoutGrid className="w-4 h-4" /> },
];

function StatCard({
  label, value, sub, icon, color, isLoading,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: string;
  isLoading: boolean;
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{label}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-28 bg-zinc-800" />
            ) : (
              <>
                <p className="text-3xl font-bold text-white">{value}</p>
                {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
              </>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { tenant } = useAuthStore();
  const [view, setView] = useState<ViewMode>("month");
  const [date, setDate] = useState(new Date());

  const rangeStart = view === "week" ? startOfWeek(date, { weekStartsOn: 0 })
    : view === "month" ? startOfMonth(date) : date;
  const rangeEnd = view === "week" ? endOfWeek(date, { weekStartsOn: 0 })
    : view === "month" ? endOfMonth(date) : date;

  const { data, isLoading } = useQuery({
    queryKey: ["financial-summary", view, format(rangeStart, "yyyy-MM-dd"), format(rangeEnd, "yyyy-MM-dd")],
    queryFn: async () => {
      if (view === "day") {
        const res = await api.get(`/payments/summary?date=${format(date, "yyyy-MM-dd")}`);
        return res.data;
      }
      const res = await api.get(
        `/payments/summary?dateFrom=${format(rangeStart, "yyyy-MM-dd")}&dateTo=${format(rangeEnd, "yyyy-MM-dd")}`
      );
      return res.data;
    },
    refetchInterval: 60000,
  });

  // Appointments per day (for mini bar chart)
  const { data: appointments } = useQuery({
    queryKey: ["appointments-range", format(rangeStart, "yyyy-MM-dd"), format(rangeEnd, "yyyy-MM-dd")],
    queryFn: async () => {
      if (view === "day") {
        const res = await api.get(`/schedule?date=${format(date, "yyyy-MM-dd")}`);
        return res.data;
      }
      const res = await api.get(
        `/schedule?dateFrom=${format(rangeStart, "yyyy-MM-dd")}&dateTo=${format(rangeEnd, "yyyy-MM-dd")}`
      );
      return res.data;
    },
  });

  const navigate = (dir: 1 | -1) => {
    if (view === "day") setDate(dir === 1 ? addDays(date, 1) : subDays(date, 1));
    else if (view === "week") setDate(dir === 1 ? addWeeks(date, 1) : subWeeks(date, 1));
    else setDate(dir === 1 ? addMonths(date, 1) : subMonths(date, 1));
  };

  const periodLabel = view === "day"
    ? format(date, "EEEE, d 'de' MMMM yyyy", { locale: ptBR })
    : view === "week"
    ? `${format(rangeStart, "d MMM", { locale: ptBR })} – ${format(rangeEnd, "d MMM yyyy", { locale: ptBR })}`
    : format(date, "MMMM 'de' yyyy", { locale: ptBR });

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);

  const totalRevenue = (data?.onlineRevenue || 0) + (data?.manualRevenue || 0) + (data?.subscriptionRevenue || 0);

  // Bar chart data for week/month
  const daysInRange = view !== "day" ? eachDayOfInterval({ start: rangeStart, end: rangeEnd }) : [];
  const maxAppts = daysInRange.reduce((max, d) => {
    const count = (appointments || []).filter((a: any) => isSameDay(new Date(a.startTime), d)).length;
    return Math.max(max, count);
  }, 1);

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white capitalize">
            {view === "month"
              ? `${format(date, "MMMM", { locale: ptBR })}, olá ${tenant?.name?.split(" ")[0] || ""}`
              : `Olá, ${tenant?.name?.split(" ")[0] || ""}`}
          </h1>
          <p className="text-zinc-500 text-sm mt-1 capitalize">{periodLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-1">
            {VIEW_OPTIONS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  view === id ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-white"
                )}
              >
                {icon}{label}
              </button>
            ))}
          </div>
          {/* Nav */}
          <div className="flex items-center gap-1">
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setDate(new Date())} className="px-3 h-8 text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-all">
              Hoje
            </button>
            <button onClick={() => navigate(1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Alert */}
      {tenant?.status === "DELINQUENT" && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-red-400 font-bold mb-0.5">Pagamento da Assinatura Pendente</h3>
              <p className="text-sm text-red-400/80">Sua página de agendamentos está indisponível. Regularize no menu Financeiro.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Receita Total"
          value={formatCurrency(totalRevenue)}
          sub={`Online: ${formatCurrency(data?.onlineRevenue)} · Local: ${formatCurrency(data?.manualRevenue)} · Planos: ${formatCurrency(data?.subscriptionRevenue)}`}
          icon={<DollarSign className="w-5 h-5 text-amber-400" />}
          color="bg-amber-500/10 border-amber-500/20"
          isLoading={isLoading}
        />
        <StatCard
          label="Agendamentos"
          value={String(data?.totalAppointments || 0)}
          sub={`Online: ${data?.onlineAppointments || 0} · Local: ${data?.manualAppointments || 0}`}
          icon={<CalendarDays className="w-5 h-5 text-blue-400" />}
          color="bg-blue-500/10 border-blue-500/20"
          isLoading={isLoading}
        />
        <StatCard
          label="Faltas (No-Show)"
          value={String(data?.noShows || 0)}
          sub={data?.totalAppointments ? `${Math.round(((data?.noShows || 0) / data.totalAppointments) * 100)}% do total` : undefined}
          icon={<Users className="w-5 h-5 text-red-400" />}
          color="bg-red-500/10 border-red-500/20"
          isLoading={isLoading}
        />
        <StatCard
          label="Taxas da Plataforma"
          value={formatCurrency(data?.platformFees || 0)}
          sub="Descontadas automaticamente"
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
          color="bg-emerald-500/10 border-emerald-500/20"
          isLoading={isLoading}
        />
      </div>

      {/* Mini bar chart for week/month */}
      {view !== "day" && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            {/* Header + Legend */}
            <div className="flex items-start justify-between mb-5">
              <p className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-500" />
                Distribuição de Agendamentos
              </p>
              <div className="flex items-center gap-4 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Hoje
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-zinc-700 inline-block" /> Outros dias
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-zinc-700 opacity-30 inline-block" /> Sem agend.
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="flex gap-3">
              {/* Y-axis */}
              <div className="flex flex-col justify-between text-[10px] text-zinc-600 text-right shrink-0 pb-5" style={{ height: 104 }}>
                <span>{maxAppts}</span>
                <span>{Math.round(maxAppts / 2)}</span>
                <span>0</span>
              </div>
              {/* Bars + X-axis */}
              <div className="flex-1">
                <div className="flex items-end gap-1" style={{ height: 96 }}>
                  {daysInRange.map((d) => {
                    const count = (appointments || []).filter((a: any) => isSameDay(new Date(a.startTime), d)).length;
                    const barH = count === 0 ? 3 : Math.max(10, (count / maxAppts) * 90);
                    const isToday = isSameDay(d, new Date());
                    return (
                      <div
                        key={d.toISOString()}
                        className="group flex-1 flex flex-col items-center justify-end gap-0.5"
                        style={{ height: 96 }}
                        title={`${format(d, "EEEE, dd/MM", { locale: ptBR })} — ${count} agendamento${count !== 1 ? "s" : ""}`}
                      >
                        {count > 0 && (
                          <span className={cn("text-[9px] font-bold transition-opacity opacity-0 group-hover:opacity-100", isToday ? "text-amber-400" : "text-zinc-400")}>
                            {count}
                          </span>
                        )}
                        <div
                          className={cn("w-full rounded-t transition-all", isToday ? "bg-amber-500" : "bg-zinc-700", count === 0 && "opacity-30")}
                          style={{ height: barH }}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* X-axis */}
                <div className="flex gap-1 border-t border-zinc-800 pt-1.5 mt-0.5">
                  {daysInRange.map((d, i) => {
                    const isToday = isSameDay(d, new Date());
                    const label = view === "week"
                      ? format(d, "EEE d", { locale: ptBR })
                      : format(d, "d");
                    const show = view === "week" || i === 0 || isToday || i === daysInRange.length - 1 || (i + 1) % 7 === 0;
                    return (
                      <div key={d.toISOString()} className="flex-1 text-center">
                        {show && (
                          <span className={cn("text-[9px] uppercase leading-none", isToday ? "text-amber-400 font-bold" : "text-zinc-600")}>
                            {label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer summary */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
              <span>Total no período: <strong className="text-zinc-300">{(appointments || []).length} agendamento{(appointments || []).length !== 1 ? "s" : ""}</strong></span>
              <span>Pico diário: <strong className="text-amber-400">{maxAppts} ag/dia</strong></span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day view: appointment list */}
      {view === "day" && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6 space-y-3">
            <p className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              Agendamentos do dia
            </p>
            {!appointments?.length ? (
              <p className="text-zinc-600 text-sm text-center py-4">Nenhum agendamento hoje.</p>
            ) : appointments.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-white">{a.clientName}</p>
                  <p className="text-xs text-zinc-500">{a.service?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-zinc-300">{format(new Date(a.startTime), "HH:mm")}</p>
                  <p className="text-xs text-zinc-500">{a.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
