"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign, ExternalLink, TrendingUp, CalendarDays,
  ChevronLeft, ChevronRight, Users, AlertCircle,
  AlignJustify, CalendarRange, LayoutGrid, CalendarClock,
} from "lucide-react";
import {
  format, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  startOfYear, endOfYear, addDays, subDays, addWeeks, subWeeks,
  addMonths, subMonths, addYears, subYears, eachMonthOfInterval, isSameMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

type ViewMode = "day" | "week" | "month" | "year";

type ContractualRevenueShareRow = {
  memberId: string;
  memberName: string;
  role: string;
  percent: number;
  estimatedAmount: number;
};

type PaymentsSummaryExtras = {
  contractRevenueBase?: number;
  contractualRevenueShares?: ContractualRevenueShareRow[];
};

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: "day", label: "Dia", icon: <AlignJustify className="w-4 h-4" /> },
  { id: "week", label: "Semana", icon: <CalendarRange className="w-4 h-4" /> },
  { id: "month", label: "Mês", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "year", label: "Ano", icon: <CalendarClock className="w-4 h-4" /> },
];

export default function FinanceiroPage() {
  const authUser = useAuthStore((s) => s.user);
  const [view, setView] = useState<ViewMode>("month");
  const [date, setDate] = useState(new Date());
  const [barberFilter, setBarberFilter] = useState("");

  const { data: team } = useQuery({
    queryKey: ["equipe"],
    queryFn: async () => (await api.get("/tenant-users/equipe")).data as { id: string; name: string; role: string }[],
    enabled: authUser?.role === "OWNER",
    staleTime: 60_000,
  });

  const barberQs =
    authUser?.role === "OWNER" && barberFilter
      ? `&barberId=${encodeURIComponent(barberFilter)}`
      : "";

  const rangeStart =
    view === "week" ? startOfWeek(date, { weekStartsOn: 0 }) :
    view === "month" ? startOfMonth(date) :
    view === "year" ? startOfYear(date) : date;

  const rangeEnd =
    view === "week" ? endOfWeek(date, { weekStartsOn: 0 }) :
    view === "month" ? endOfMonth(date) :
    view === "year" ? endOfYear(date) : date;

  const navigate = (dir: 1 | -1) => {
    if (view === "day") setDate(dir === 1 ? addDays(date, 1) : subDays(date, 1));
    else if (view === "week") setDate(dir === 1 ? addWeeks(date, 1) : subWeeks(date, 1));
    else if (view === "month") setDate(dir === 1 ? addMonths(date, 1) : subMonths(date, 1));
    else setDate(dir === 1 ? addYears(date, 1) : subYears(date, 1));
  };

  const periodLabel =
    view === "day" ? format(date, "EEEE, d 'de' MMMM yyyy", { locale: ptBR }) :
    view === "week" ? `${format(rangeStart, "d MMM", { locale: ptBR })} – ${format(rangeEnd, "d MMM yyyy", { locale: ptBR })}` :
    view === "month" ? format(date, "MMMM 'de' yyyy", { locale: ptBR }) :
    format(date, "yyyy");

  // Main summary query
  const { data, isLoading } = useQuery({
    queryKey: [
      "financial-summary",
      view,
      format(rangeStart, "yyyy-MM-dd"),
      format(rangeEnd, "yyyy-MM-dd"),
      barberFilter,
      authUser?.role,
    ],
    queryFn: async () => {
      if (view === "day") {
        const res = await api.get(`/payments/summary?date=${format(date, "yyyy-MM-dd")}${barberQs}`);
        return res.data;
      }
      const res = await api.get(
        `/payments/summary?dateFrom=${format(rangeStart, "yyyy-MM-dd")}&dateTo=${format(rangeEnd, "yyyy-MM-dd")}${barberQs}`
      );
      return res.data;
    },
  });

  // Year view: monthly breakdown
  const monthsInYear = view === "year" ? eachMonthOfInterval({ start: rangeStart, end: rangeEnd }) : [];

  const { data: monthlyData } = useQuery({
    queryKey: ["financial-monthly-breakdown", format(rangeStart, "yyyy-MM-dd"), barberFilter, authUser?.role],
    enabled: view === "year",
    queryFn: async () => {
      const promises = monthsInYear.map((m) =>
        api
          .get(
            `/payments/summary?dateFrom=${format(startOfMonth(m), "yyyy-MM-dd")}&dateTo=${format(endOfMonth(m), "yyyy-MM-dd")}${barberQs}`
          )
          .then((r) => ({ month: m, ...r.data }))
      );
      return Promise.all(promises);
    },
  });

  const { data: onboarding } = useQuery({
    queryKey: ["stripe-status"],
    queryFn: () => api.get("/payments/onboarding/status").then(r => r.data),
  });

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);

  const totalRevenue = (data?.onlineRevenue || 0) + (data?.manualRevenue || 0);
  const yearTotalRevenue = monthlyData?.reduce((s: number, m: any) => s + (m.onlineRevenue || 0) + (m.manualRevenue || 0), 0) || 0;
  const maxMonthRevenue = Math.max(...(monthlyData?.map((m: any) => (m.onlineRevenue || 0) + (m.manualRevenue || 0)) ?? [1]), 1);

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financeiro</h1>
          <p className="text-zinc-500 text-sm mt-1 capitalize">{periodLabel}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {authUser?.role === "OWNER" && (
            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1.5">
              <span className="text-[10px] uppercase tracking-wide text-zinc-500 shrink-0">Caixa</span>
              <select
                value={barberFilter}
                onChange={(e) => setBarberFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-700 rounded-md text-xs text-white px-2 py-1 max-w-[160px]"
              >
                <option value="">Todos os profissionais</option>
                {(team ?? [])
                  .filter((m) => m.role === "OWNER" || m.role === "BARBER")
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {authUser?.role === "BARBER" && (
            <span className="text-[11px] text-zinc-500 border border-zinc-800 rounded-lg px-2 py-1.5 bg-zinc-900">
              Visão: seus atendimentos
            </span>
          )}
          {/* View toggle */}
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
          {/* Navigation */}
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

      {/* KPI Cards */}
      {view !== "year" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Receita Total", value: formatCurrency(totalRevenue), icon: <DollarSign className="w-5 h-5 text-amber-400" />, color: "bg-amber-500/10 border-amber-500/20", sub: `${data?.totalAppointments || 0} atendimentos` },
            { label: "Online (Stripe)", value: formatCurrency(data?.onlineRevenue || 0), icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, color: "bg-emerald-500/10 border-emerald-500/20", sub: `${data?.onlineAppointments || 0} pagamentos` },
            { label: "Local (Balcão)", value: formatCurrency(data?.manualRevenue || 0), icon: <CalendarDays className="w-5 h-5 text-blue-400" />, color: "bg-blue-500/10 border-blue-500/20", sub: `${data?.manualAppointments || 0} atendimentos` },
            { label: "Taxas Plataforma", value: formatCurrency(data?.platformFees || 0), icon: <Users className="w-5 h-5 text-red-400" />, color: "bg-red-500/10 border-red-500/20", sub: "Descontadas do repasse" },
          ].map(card => (
            <Card key={card.label} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">{card.label}</p>
                    {isLoading ? (
                      <div className="h-7 w-24 bg-zinc-800 animate-pulse rounded" />
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-white">{card.value}</p>
                        <p className="text-xs text-zinc-500 mt-1">{card.sub}</p>
                      </>
                    )}
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.color}`}>
                    {card.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {view !== "year" && data?.billingModel === "OWNER_CUT_PERCENT" && data?.ownerShare != null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-zinc-900 border-zinc-800 border-violet-500/20">
            <CardContent className="p-5">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Estimativa — repasse dono
              </p>
              {isLoading ? (
                <div className="h-7 w-24 bg-zinc-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-violet-300">{formatCurrency(data.ownerShare)}</p>
              )}
              <p className="text-xs text-zinc-500 mt-1">Sobre o líquido dos atendimentos listados (conforme % configurada).</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800 border-teal-500/20">
            <CardContent className="p-5">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
                Estimativa — repasse barbeiros
              </p>
              {isLoading ? (
                <div className="h-7 w-24 bg-zinc-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-teal-300">{formatCurrency(data.barberShare)}</p>
              )}
              <p className="text-xs text-zinc-500 mt-1">Somatório do que fica com os profissionais nos cortes filtrados.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {view !== "year" &&
        authUser?.role === "OWNER" &&
        !barberFilter &&
        data?.billingModel === "OWNER_CUT_PERCENT" &&
        Array.isArray(data?.barberBreakdown) &&
        data.barberBreakdown.length > 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Repasse por profissional (estimativa)</CardTitle>
              <CardDescription className="text-zinc-400">
                No período selecionado, após taxas da plataforma nos pagamentos online e locais.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="text-left p-4">Profissional</th>
                    <th className="text-right p-4">Repasse estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.barberBreakdown.map((row: { barberId: string; barberName: string; barberShare: number }) => (
                    <tr key={row.barberId} className="border-b border-zinc-800/50 last:border-0">
                      <td className="p-4 text-white font-medium">{row.barberName}</td>
                      <td className="p-4 text-right text-teal-300 font-semibold">{formatCurrency(row.barberShare)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

      {view !== "year" &&
        authUser?.role === "OWNER" &&
        (() => {
          const contract = data as typeof data & PaymentsSummaryExtras;
          const rows = contract?.contractualRevenueShares;
          if (!Array.isArray(rows) || rows.length === 0) return null;
          return (
          <Card className="bg-zinc-900 border-zinc-800 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white text-base">Participação contratual (sobre o total da barbearia)</CardTitle>
              <CardDescription className="text-zinc-400">
                Estimativa no período: {formatCurrency(contract.contractRevenueBase ?? 0)} de base (soma do líquido de
                todos os atendimentos, sem filtrar por profissional).
                {barberFilter
                  ? " Os valores abaixo continuam usando o total da loja, mesmo com filtro de caixa ativo."
                  : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="text-left p-4">Profissional</th>
                    <th className="text-right p-4">%</th>
                    <th className="text-right p-4">Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                      <tr key={row.memberId} className="border-b border-zinc-800/50 last:border-0">
                        <td className="p-4 text-white font-medium">
                          {row.memberName}
                          <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">
                            {row.role === "OWNER" ? "Proprietário" : "Equipe"}
                          </span>
                        </td>
                        <td className="p-4 text-right text-zinc-300">{row.percent}%</td>
                        <td className="p-4 text-right text-cyan-300 font-semibold">{formatCurrency(row.estimatedAmount)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          );
        })()}

      {/* Year view: monthly bar chart */}
      {view === "year" && (
        <div className="space-y-6">
          {/* Year KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">Receita Total do Ano</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(yearTotalRevenue)}</p>
                <p className="text-xs text-zinc-500 mt-1">{monthlyData?.reduce((s: number, m: any) => s + (m.totalAppointments || 0), 0) || 0} atendimentos no ano</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">Melhor Mês</p>
                {(() => {
                  const best = monthlyData?.reduce((best: any, m: any) => {
                    const total = (m.onlineRevenue || 0) + (m.manualRevenue || 0);
                    return total > ((best?.onlineRevenue || 0) + (best?.manualRevenue || 0)) ? m : best;
                  }, null);
                  return best ? (
                    <>
                      <p className="text-3xl font-bold text-white">{formatCurrency((best.onlineRevenue || 0) + (best.manualRevenue || 0))}</p>
                      <p className="text-xs text-zinc-500 mt-1 capitalize">{format(new Date(best.month), "MMMM", { locale: ptBR })}</p>
                    </>
                  ) : <p className="text-2xl font-bold text-zinc-600">—</p>;
                })()}
              </CardContent>
            </Card>
          </div>

          {/* Monthly bar chart */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-amber-500" />
                Receita por Mês — {format(date, "yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!monthlyData ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex gap-3">
                  {/* Y-axis */}
                  <div className="flex flex-col justify-between text-[10px] text-zinc-600 text-right shrink-0 pb-5" style={{ height: 120 }}>
                    <span>{formatCurrency(maxMonthRevenue)}</span>
                    <span>{formatCurrency(maxMonthRevenue / 2)}</span>
                    <span>R$ 0</span>
                  </div>
                  {/* Bars */}
                  <div className="flex-1">
                    <div className="flex items-end gap-2" style={{ height: 104 }}>
                      {monthlyData.map((m: any) => {
                        const total = (m.onlineRevenue || 0) + (m.manualRevenue || 0);
                        const barH = total === 0 ? 4 : Math.max(8, (total / maxMonthRevenue) * 104);
                        const isCurrent = isSameMonth(new Date(m.month), new Date());
                        return (
                          <div
                            key={m.month.toString()}
                            className="group flex-1 flex flex-col items-center justify-end gap-1 h-full"
                            title={`${format(new Date(m.month), "MMMM", { locale: ptBR })}: ${formatCurrency(total)}`}
                          >
                            {total > 0 && (
                              <span className={cn("text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity", isCurrent ? "text-amber-400" : "text-zinc-400")}>
                                {formatCurrency(total).replace("R$\u00a0", "")}
                              </span>
                            )}
                            <div
                              className={cn("w-full rounded-t transition-all", isCurrent ? "bg-amber-500" : "bg-zinc-700", total === 0 && "opacity-30")}
                              style={{ height: barH }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {/* X-axis */}
                    <div className="flex gap-2 border-t border-zinc-800 pt-1.5">
                      {monthlyData.map((m: any) => {
                        const isCurrent = isSameMonth(new Date(m.month), new Date());
                        return (
                          <div key={m.month.toString()} className="flex-1 text-center">
                            <span className={cn("text-[10px] uppercase", isCurrent ? "text-amber-400 font-bold" : "text-zinc-600")}>
                              {format(new Date(m.month), "MMM", { locale: ptBR })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly table breakdown */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Detalhamento Mensal</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-wider">
                    <th className="text-left p-4">Mês</th>
                    <th className="text-right p-4">Atend.</th>
                    <th className="text-right p-4">Online</th>
                    <th className="text-right p-4">Local</th>
                    <th className="text-right p-4 font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData?.map((m: any) => {
                    const total = (m.onlineRevenue || 0) + (m.manualRevenue || 0);
                    const isCurrent = isSameMonth(new Date(m.month), new Date());
                    return (
                      <tr key={m.month.toString()} className={cn("border-b border-zinc-800/50 last:border-0 transition-colors hover:bg-zinc-800/30", isCurrent && "bg-amber-500/5")}>
                        <td className={cn("p-4 font-medium capitalize", isCurrent ? "text-amber-400" : "text-white")}>
                          {format(new Date(m.month), "MMMM", { locale: ptBR })}
                          {isCurrent && <span className="ml-2 text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">Atual</span>}
                        </td>
                        <td className="p-4 text-right text-zinc-400">{m.totalAppointments || 0}</td>
                        <td className="p-4 text-right text-emerald-400">{formatCurrency(m.onlineRevenue || 0)}</td>
                        <td className="p-4 text-right text-blue-400">{formatCurrency(m.manualRevenue || 0)}</td>
                        <td className="p-4 text-right font-bold text-white">{formatCurrency(total)}</td>
                      </tr>
                    );
                  })}
                  {/* Totals row */}
                  <tr className="bg-zinc-800/40 border-t border-zinc-700">
                    <td className="p-4 font-bold text-zinc-300">Total {format(date, "yyyy")}</td>
                    <td className="p-4 text-right font-bold text-zinc-300">{monthlyData?.reduce((s: number, m: any) => s + (m.totalAppointments || 0), 0) || 0}</td>
                    <td className="p-4 text-right font-bold text-emerald-400">{formatCurrency(monthlyData?.reduce((s: number, m: any) => s + (m.onlineRevenue || 0), 0) || 0)}</td>
                    <td className="p-4 text-right font-bold text-blue-400">{formatCurrency(monthlyData?.reduce((s: number, m: any) => s + (m.manualRevenue || 0), 0) || 0)}</td>
                    <td className="p-4 text-right font-bold text-amber-400">{formatCurrency(yearTotalRevenue)}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stripe Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#635BFF]" /> Dashboard Stripe
            </CardTitle>
            <CardDescription className="text-zinc-400">Acesse repasses e cobranças no painel da Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[#635BFF] hover:bg-[#4B45FF] text-white"
              onClick={() => window.open("https://dashboard.stripe.com/", "_blank")}
              disabled={!onboarding?.complete}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Acessar Dashboard Stripe
            </Button>
            <p className="text-xs text-center text-zinc-500 mt-3">Repasse automático para sua conta bancária</p>
          </CardContent>
        </Card>

        {onboarding?.complete === false && (
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-5 flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <p className="text-amber-400 font-bold mb-1">Configuração de Pagamento Pendente</p>
                <p className="text-sm text-amber-400/80">Sua conta Stripe não está configurada para receber pagamentos online.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
