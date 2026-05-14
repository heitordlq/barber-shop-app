"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
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
  Store,
  CreditCard,
  BarChart3,
  LogOut,
  Scissors,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/tenants", icon: Store, label: "Barbearias" },
  { href: "/dashboard/plans", icon: CreditCard, label: "Planos" },
  { href: "/dashboard/financeiro", icon: BarChart3, label: "Financeiro" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    router.push("/login");
  };

  return (
    <Sidebar className="border-r border-zinc-800 bg-zinc-950">
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white tracking-tight truncate">BarberDash</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Backoffice</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-600 text-xs uppercase tracking-wider">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
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
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8 bg-zinc-800">
            <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
        </div>
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
