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
  const { isAuthenticated, tenant, _hasHydrated } = useAuthStore();
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
    // Onboarding Stripe temporariamente desativado (bypass)
    // else if (tenant && !tenant.stripeOnboardingComplete && pathname !== "/onboarding") {
    //   router.push("/onboarding");
    // }
  }, [mounted, _hasHydrated, isAuthenticated, tenant, pathname, router]);

  if (!mounted || !_hasHydrated || !isAuthenticated) return null;

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const map: Record<string, string> = {
      dashboard: "Visão Geral",
      agenda: "Agenda",
      servicos: "Serviços",
      financeiro: "Financeiro",
      configuracoes: "Configurações",
    };
    return segments.map((s) => map[s] || s).join(" / ");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4 shrink-0 shadow-sm sticky top-0 z-10 w-full">
          <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-800" />
          <span className="text-sm text-zinc-400">{getBreadcrumb()}</span>
        </header>
        <main className="flex-1 bg-zinc-950 h-full overflow-y-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
