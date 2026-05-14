"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface PlanLimits {
  planName: string | null;
  plan: any | null;
  services: { used: number; max: number | null; atLimit: boolean; nearLimit: boolean };
  team: { used: number; max: number | null; atLimit: boolean; nearLimit: boolean };
  isLoading: boolean;
}

function limitStatus(used: number, max: number | null) {
  return {
    used,
    max,
    atLimit: max != null && used >= max,
    nearLimit: max != null && used >= max - 1 && used < max,
  };
}

/** Teto de serviços no tenant conforme plano (TENANT vs PER_BARBER). */
export function servicesCapFromPlan(plan: any | null, teamMemberCount: number): number | null {
  if (!plan) return null;
  const n = Math.max(1, teamMemberCount);
  if (plan.limitsScope === "PER_BARBER") {
    const per = plan.maxServicesPerBarber ?? plan.maxServices;
    if (per == null) return null;
    return per * n;
  }
  return plan.maxServices ?? null;
}

export function usePlanLimits(): PlanLimits {
  const { data: tenantData, isLoading: loadingTenant } = useQuery({
    queryKey: ["tenant-me"],
    queryFn: async () => (await api.get("/tenants/me")).data,
    staleTime: 60_000,
  });

  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data,
    staleTime: 30_000,
  });

  const { data: team, isLoading: loadingTeam } = useQuery({
    queryKey: ["equipe"],
    queryFn: async () => (await api.get("/tenant-users/equipe")).data,
    staleTime: 30_000,
  });

  const plan = tenantData?.plan ?? null;
  const teamCount = team?.length ?? 0;
  const maxServices = servicesCapFromPlan(plan, teamCount);

  return {
    planName: plan?.name ?? null,
    plan,
    services: limitStatus(services?.length ?? 0, maxServices),
    team: limitStatus(teamCount, plan?.maxTeamMembers ?? null),
    isLoading: loadingTenant || loadingServices || loadingTeam,
  };
}
