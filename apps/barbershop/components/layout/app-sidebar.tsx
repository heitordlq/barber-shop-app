"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Settings,
  DollarSign,
  LogOut,
  Store,
  ExternalLink,
  Users,
  Contact,
  AlertOctagon,
  Star,
  Lock,
} from "lucide-react";
import { PlanLimitBanner } from "@/components/plan-limit-banner";
import { usePlanLimits } from "@/hooks/use-plan-limits";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const baseNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Visão Geral", roles: ['OWNER', 'BARBER'] },
  { href: "/dashboard/agenda", icon: CalendarDays, label: "Agenda", roles: ['OWNER', 'BARBER'] },
  { href: "/dashboard/clientes", icon: Contact, label: "Clientes", roles: ['OWNER', 'BARBER'] },
  { href: "/dashboard/servicos", icon: Scissors, label: "Serviços", roles: ['OWNER'] },
  { href: "/dashboard/planos-fidelidade", icon: Star, label: "Fidelidade", roles: ['OWNER'], planFlag: 'hasLoyaltyPlans' as const },
  { href: "/dashboard/equipe", icon: Users, label: "Equipe", roles: ['OWNER'] },
  { href: "/dashboard/financeiro", icon: DollarSign, label: "Financeiro", roles: ['OWNER'] },
  { href: "/dashboard/configuracoes", icon: Settings, label: "Configurações", roles: ['OWNER'] },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, tenant, logout } = useAuthStore();
  const planLimits = usePlanLimits();
  const qc = useQueryClient();

  const navItems = baseNavItems.filter(item => item.roles.includes(user?.role || 'BARBER'));

  // Busca status atual do fechamento de emergência
  const { data: tenantStatus } = useQuery({
    queryKey: ['tenant-closed-status'],
    queryFn: async () => (await api.get('/tenants/me')).data,
    select: (d: any) => d.temporarilyClosed as boolean,
  });

  const toggleClosed = useMutation({
    mutationFn: () => api.post('/tenants/me/toggle-closed'),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['tenant-closed-status'] });
      toast.success(res.data.temporarilyClosed ? 'Barbearia fechada temporariamente' : 'Barbearia aberta novamente');
    },
    onError: () => toast.error('Não foi possível alterar o status'),
  });

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    router.push("/login");
  };

  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3004";

  return (
    <Sidebar className="border-r border-zinc-800 bg-zinc-950">
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
            <Store className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{tenant?.name || "Barbearia"}</p>
            {tenant && (
              <a 
                href={`${clientUrl}/${tenant.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-amber-500 hover:text-amber-400 flex items-center gap-1 group truncate"
              >
                /{tenant.slug}
                <ExternalLink className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </a>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-600 text-xs uppercase tracking-wider">
            Painel de Controle
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.href;
                const locked = item.planFlag
                  ? planLimits.plan != null && planLimits.plan[item.planFlag] === false
                  : false;

                return (
                  <SidebarMenuItem key={item.href}>
                    {locked ? (
                      <span
                        title="Não incluso no plano atual — faça um upgrade para acessar"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-not-allowed opacity-50 text-zinc-500 select-none"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    ) : (
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                          active
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4", active ? "text-amber-400" : "")} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user?.role === "OWNER" && (planLimits.planName || planLimits.services.max != null || planLimits.team.max != null) && (
        <div className="px-3 pb-3">
          <PlanLimitBanner
            planName={planLimits.planName}
            services={planLimits.services}
            team={planLimits.team}
          />
        </div>
      )}

      <SidebarFooter className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8 bg-zinc-800">
            <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || "B"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-zinc-500 truncate">{user?.role === 'OWNER' ? 'Proprietário' : 'Barbeiro'}</p>
          </div>
        </div>

        {/* Emergency close toggle */}
        <button
          onClick={() => toggleClosed.mutate()}
          disabled={toggleClosed.isPending}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 mb-1 font-medium border ${
            tenantStatus
              ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
              : 'text-zinc-400 border-zinc-800 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20'
          }`}
        >
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span className="truncate">{tenantStatus ? 'Reabrir barbearia' : 'Fechar temporariamente'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
