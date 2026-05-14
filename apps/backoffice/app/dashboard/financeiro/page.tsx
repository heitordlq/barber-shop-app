"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  BarChart2,
  CalendarDays,
  Store,
} from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatCurrency(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function buildMonthOptions() {
  const opts: { label: string; dateFrom: string; dateTo: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = subMonths(new Date(), i);
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    opts.push({
      label: format(d, "MMMM 'de' yyyy", { locale: ptBR }),
      dateFrom: format(start, "yyyy-MM-dd"),
      dateTo: format(end, "yyyy-MM-dd"),
    });
  }
  return opts;
}

const monthOptions = buildMonthOptions();

export default function FinanceiroPage() {
  const [selectedMonth, setSelectedMonth] = useState(0); // índice em monthOptions

  const opt = monthOptions[selectedMonth];

  const { data, isLoading } = useQuery({
    queryKey: ["admin-financeiro", opt.dateFrom, opt.dateTo],
    queryFn: async () => {
      const res = await api.get("/admin/financeiro", {
        params: { dateFrom: opt.dateFrom, dateTo: opt.dateTo },
      });
      return res.data;
    },
  });

  const rows: any[] = data?.rows ?? [];
  const totals = data?.totals ?? {
    onlineRevenue: 0,
    manualRevenue: 0,
    fees: 0,
    totalAppointments: 0,
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financeiro Global</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Receitas e volume transacional por barbearia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-zinc-500 shrink-0" />
          <Select
            value={String(selectedMonth)}
            onValueChange={(v) => setSelectedMonth(Number(v))}
          >
            <SelectTrigger className="w-56 bg-zinc-900 border-zinc-800 text-white capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 max-h-64">
              {monthOptions.map((o, i) => (
                <SelectItem key={i} value={String(i)} className="text-white capitalize">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Receita Online (GMV)"
          value={formatCurrency(totals.onlineRevenue)}
          icon={<TrendingUp className="w-6 h-6" />}
          loading={isLoading}
          accent="amber"
        />
        <KpiCard
          label="Receita Manual"
          value={formatCurrency(totals.manualRevenue)}
          icon={<Wallet className="w-6 h-6" />}
          loading={isLoading}
          accent="blue"
        />
        <KpiCard
          label="Taxas Retidas (Fees)"
          value={formatCurrency(totals.fees)}
          icon={<DollarSign className="w-6 h-6" />}
          loading={isLoading}
          accent="green"
        />
        <KpiCard
          label="Total de Agendamentos"
          value={totals.totalAppointments}
          icon={<BarChart2 className="w-6 h-6" />}
          loading={isLoading}
          accent="zinc"
        />
      </div>

      {/* Tabela por tenant */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-500" />
            Breakdown por Barbearia
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Período: {opt.label}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Barbearia</TableHead>
                <TableHead className="text-zinc-500 text-right">Online (GMV)</TableHead>
                <TableHead className="text-zinc-500 text-right">Manual</TableHead>
                <TableHead className="text-zinc-500 text-right">Fees</TableHead>
                <TableHead className="text-zinc-500 text-right">Agendamentos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-zinc-800">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 bg-zinc-800 rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : rows.length === 0 ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={5} className="text-center py-12 text-zinc-600">
                    <BarChart2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>Sem transações no período selecionado.</p>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {rows.map((row: any) => (
                    <TableRow
                      key={row.tenantId}
                      className="border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
                            <Store className="w-3.5 h-3.5 text-zinc-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{row.name}</p>
                            <p className="text-xs text-zinc-600 font-mono">/{row.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm text-amber-400 font-medium">
                          {formatCurrency(row.onlineRevenue)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm text-zinc-300">
                          {formatCurrency(row.manualRevenue)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm text-emerald-400 font-medium">
                          {formatCurrency(row.fees)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 border text-xs">
                          {row.totalAppointments}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  <TableRow className="border-zinc-800 border-t-2 border-t-zinc-700 bg-zinc-900/80">
                    <TableCell className="font-bold text-zinc-400 text-xs uppercase tracking-wider">
                      Total do período
                    </TableCell>
                    <TableCell className="text-right font-bold text-amber-400">
                      {formatCurrency(totals.onlineRevenue)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-white">
                      {formatCurrency(totals.manualRevenue)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-emerald-400">
                      {formatCurrency(totals.fees)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-white">
                      {totals.totalAppointments}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon,
  loading,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  loading?: boolean;
  accent: "amber" | "blue" | "green" | "zinc";
}) {
  const accentClasses = {
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-500",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    zinc: "bg-zinc-800 border-zinc-700 text-zinc-400",
  };
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${accentClasses[accent]}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider truncate">
            {label}
          </p>
          {loading ? (
            <Skeleton className="h-7 w-24 bg-zinc-800 mt-1" />
          ) : (
            <p className="text-xl font-extrabold text-white truncate">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
