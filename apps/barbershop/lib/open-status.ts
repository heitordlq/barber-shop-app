/**
 * Calcula se a barbearia está aberta agora com base nos workingHours.
 */
export function getOpenStatus(tenant: {
  workingHours?: any;
  temporarilyClosed?: boolean;
}): {
  isOpen: boolean;
  reason: "open" | "closed_emergency" | "closed_schedule" | "no_hours";
  openTime?: string;
  closeTime?: string;
  todayLabel?: string;
} {
  const days: Record<number, string> = {
    0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat",
  };
  const dayLabels: Record<string, string> = {
    sun: "Domingo", mon: "Segunda", tue: "Terça", wed: "Quarta",
    thu: "Quinta", fri: "Sexta", sat: "Sábado",
  };

  if (tenant.temporarilyClosed) {
    return { isOpen: false, reason: "closed_emergency" };
  }

  let wh = tenant.workingHours;
  if (!wh || (typeof wh === "object" && Object.keys(wh).length === 0)) {
    return { isOpen: false, reason: "no_hours" };
  }
  if (typeof wh === "string") {
    try { wh = JSON.parse(wh); } catch { return { isOpen: false, reason: "no_hours" }; }
  }

  const now = new Date();
  const dayKey = days[now.getDay()];
  const dayConfig = wh[dayKey];

  if (!dayConfig || !dayConfig.open || !dayConfig.close) {
    return { isOpen: false, reason: "closed_schedule", todayLabel: dayLabels[dayKey] };
  }

  const [openH, openM] = dayConfig.open.split(":").map(Number);
  const [closeH, closeM] = dayConfig.close.split(":").map(Number);

  const openDate = new Date(now);
  openDate.setHours(openH, openM, 0, 0);
  const closeDate = new Date(now);
  closeDate.setHours(closeH, closeM, 0, 0);

  const isOpen = now >= openDate && now < closeDate;
  return {
    isOpen,
    reason: isOpen ? "open" : "closed_schedule",
    openTime: dayConfig.open,
    closeTime: dayConfig.close,
    todayLabel: dayLabels[dayKey],
  };
}
