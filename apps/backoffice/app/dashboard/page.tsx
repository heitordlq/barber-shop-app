"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Store,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Users,
  Activity,
} from "lucide-react";

interface DashboardData {
  totalTenants: number;
  activeTenants: number;
  delinquentTenants: number;
  totalTransactionVolume: number;
  totalPlatformFees: number;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
  loading,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  accent?: "green" | "amber" | "red" | "blue";
  loading?: boolean;
}) {
  const accentMap = {
    green: "from-emerald-600 to-emerald-400 border-emerald-500/30 text-emerald-100 shadow-emerald-500/20",
    amber: "from-amber-600 to-amber-400 border-amber-500/30 text-amber-100 shadow-amber-500/20",
    red: "from-red-600 to-red-400 border-red-500/30 text-red-100 shadow-red-500/20",
    blue: "from-blue-600 to-blue-400 border-blue-500/30 text-blue-100 shadow-blue-500/20",
  };

  const colors = accentMap[accent || "green"];

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colors.split(' ').slice(0,2).join(' ')} opacity-[0.03] -mr-8 -mt-8 rounded-full blur-2xl group-hover:opacity-[0.07] transition-opacity`} />
      
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em] mb-1.5">{title}</p>
            {loading ? (
              <Skeleton className="h-9 w-24 bg-zinc-800" />
            ) : (
              <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
            )}
            {subtitle && (
              <p className="text-[11px] text-zinc-500 mt-2 font-medium flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-zinc-700" /> {subtitle}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br border shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${colors}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard");
      return res.data;
    },
    refetchInterval: 30000, // refetch a cada 30s
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Visão geral da plataforma em tempo real</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total de Barbearias"
          value={data?.totalTenants ?? 0}
          subtitle="cadastradas na plataforma"
          icon={Store}
          accent="blue"
          loading={isLoading}
        />
        <StatCard
          title="Barbearias Ativas"
          value={data?.activeTenants ?? 0}
          subtitle="com assinaturas em dia"
          icon={Activity}
          accent="green"
          loading={isLoading}
        />
        <StatCard
          title="Inadimplentes"
          value={data?.delinquentTenants ?? 0}
          subtitle="com agendamentos bloqueados"
          icon={AlertTriangle}
          accent="red"
          loading={isLoading}
        />
        <StatCard
          title="Volume Total de Transações"
          value={isLoading ? "..." : formatCurrency(data?.totalTransactionVolume ?? 0)}
          subtitle="total processado via plataforma"
          icon={DollarSign}
          accent="green"
          loading={isLoading}
        />
        <StatCard
          title="Receita da Plataforma"
          value={isLoading ? "..." : formatCurrency(data?.totalPlatformFees ?? 0)}
          subtitle="taxas retidas de agendamentos"
          icon={TrendingUp}
          accent="amber"
          loading={isLoading}
        />
        <StatCard
          title="Taxa de Adimplência"
          value={
            data
              ? `${Math.round((data.activeTenants / (data.totalTenants || 1)) * 100)}%`
              : "0%"
          }
          subtitle="barbearias com pagamentos em dia"
          icon={Users}
          accent="blue"
          loading={isLoading}
        />
      </div>

      {/* Delinquent Alert */}
      {(data?.delinquentTenants ?? 0) > 0 && (
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">
                {data!.delinquentTenants} barbearia{data!.delinquentTenants > 1 ? "s" : ""} com assinatura vencida
              </p>
              <p className="text-xs text-red-400/70 mt-0.5">
                As páginas públicas dessas barbearias estão exibindo mensagem de manutenção.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
