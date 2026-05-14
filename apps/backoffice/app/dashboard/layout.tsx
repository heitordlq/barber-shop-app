"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, _hasHydrated, isAuthenticated, router]);

  if (!mounted || !_hasHydrated || !isAuthenticated) return null;

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const map: Record<string, string> = {
      dashboard: "Dashboard",
      tenants: "Barbearias",
      plans: "Planos",
      financeiro: "Financeiro",
    };
    return segments.map((s) => map[s] || s).join(" / ");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4">
          <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-800" />
          <span className="text-sm text-zinc-400">{getBreadcrumb()}</span>
        </header>
        <main className="flex-1 bg-zinc-950 min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
