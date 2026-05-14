const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

const dayLabelsCap: Record<string, string> = {
  sun: "Domingo",
  mon: "Segunda",
  tue: "Terça",
  wed: "Quarta",
  thu: "Quinta",
  fri: "Sexta",
  sat: "Sábado",
};

function parseWh(raw: unknown): Record<string, any> {
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return raw as Record<string, any>;
}

function dayKeyFromDate(d: Date): string {
  return DAY_KEYS[d.getDay()];
}

function parseTimeOnDate(base: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const out = new Date(base);
  out.setHours(h, m, 0, 0);
  return out;
}

function hasDayHours(wh: Record<string, any>, key: string): { open: string; close: string } | null {
  const c = wh[key];
  if (!c?.open || !c?.close) return null;
  return { open: c.open, close: c.close };
}

/** Próximo instante de abertura depois de `from`. `startOffset` = dias a partir de hoje (0 = hoje). */
function findNextOpeningFrom(
  wh: Record<string, any>,
  from: Date,
  startOffset: number
): { opensAt: Date; dayKey: string; open: string; close: string } | null {
  for (let i = startOffset; i <= startOffset + 14; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const key = dayKeyFromDate(d);
    const cfg = hasDayHours(wh, key);
    if (!cfg) continue;
    const openAt = parseTimeOnDate(d, cfg.open);
    if (openAt.getTime() > from.getTime()) {
      return { opensAt: openAt, dayKey: key, open: cfg.open, close: cfg.close };
    }
  }
  return null;
}

/** Rótulo amigável para a próxima abertura (hoje / amanhã / dia da semana). */
export function nextOpenDayLabelForUi(opensAt: Date, now: Date): string {
  const startNext = new Date(opensAt);
  startNext.setHours(0, 0, 0, 0);
  const startNow = new Date(now);
  startNow.setHours(0, 0, 0, 0);
  const diff = Math.round((startNext.getTime() - startNow.getTime()) / (24 * 60 * 60 * 1000));
  const dk = DAY_KEYS[opensAt.getDay()];
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  return dayLabelsCap[dk] ?? dk;
}

/** "9h" ou "9h30" a partir de "09:00" ou "09:30". */
export function formatOpenTimeShort(time: string): string {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h)) return time;
  if (!m) return `${h}h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}

export function getOpenStatus(tenant: {
  workingHours?: any;
  temporarilyClosed?: boolean;
}): {
  isOpen: boolean;
  reason: "open" | "closed_emergency" | "closed_schedule" | "no_hours";
  openTime?: string;
  closeTime?: string;
  todayLabel?: string;
  /** Se hoje tem expediente: antes de abrir / aberto / já fechou hoje */
  todaySlot?: "before_open" | "open" | "after_close";
  /** Próxima vez que abre (para mensagem “abre segunda às 9h”) */
  nextOpenDayLabel?: string;
  nextOpenTime?: string;
} {
  if (tenant.temporarilyClosed) {
    return { isOpen: false, reason: "closed_emergency" };
  }

  const wh = parseWh(tenant.workingHours);
  if (!wh || Object.keys(wh).length === 0) {
    return { isOpen: false, reason: "no_hours" };
  }

  const now = new Date();
  const dayKey = dayKeyFromDate(now);
  const todayLabel = dayLabelsCap[dayKey];
  const todayCfg = hasDayHours(wh, dayKey);

  if (!todayCfg) {
    const next = findNextOpeningFrom(wh, now, 1);
    const nextLbl = next ? nextOpenDayLabelForUi(next.opensAt, now) : undefined;
    return {
      isOpen: false,
      reason: "closed_schedule",
      todayLabel,
      nextOpenDayLabel: nextLbl,
      nextOpenTime: next?.open,
    };
  }

  const openDate = parseTimeOnDate(now, todayCfg.open);
  const closeDate = parseTimeOnDate(now, todayCfg.close);
  const openTime = todayCfg.open;
  const closeTime = todayCfg.close;

  if (openDate.getTime() >= closeDate.getTime()) {
    return { isOpen: false, reason: "closed_schedule", todayLabel, openTime, closeTime };
  }

  if (now < openDate) {
    const nextLbl = nextOpenDayLabelForUi(openDate, now);
    return {
      isOpen: false,
      reason: "closed_schedule",
      openTime,
      closeTime,
      todayLabel,
      todaySlot: "before_open",
      nextOpenDayLabel: nextLbl,
      nextOpenTime: openTime,
    };
  }

  if (now >= openDate && now < closeDate) {
    return {
      isOpen: true,
      reason: "open",
      openTime,
      closeTime,
      todayLabel,
      todaySlot: "open",
    };
  }

  // Já passou do fechamento de hoje → próximo dia útil no calendário
  const next = findNextOpeningFrom(wh, now, 1);
  const nextLbl = next ? nextOpenDayLabelForUi(next.opensAt, now) : undefined;
  return {
    isOpen: false,
    reason: "closed_schedule",
    openTime,
    closeTime,
    todayLabel,
    todaySlot: "after_close",
    nextOpenDayLabel: nextLbl,
    nextOpenTime: next?.open,
  };
}
