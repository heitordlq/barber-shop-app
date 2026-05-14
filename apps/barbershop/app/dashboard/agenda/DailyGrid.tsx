"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatBrazilPhone } from "@barbearia/phone-br";
import { cn } from "@/lib/utils";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { MoreVertical, StickyNote } from "lucide-react";

type WorkingHoursDay = {
  open?: string; // "09:00"
  close?: string; // "18:00"
  closed?: boolean;
  breaks?: { start: string; end: string }[];
};

type WorkingHours = Partial<Record<"sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat", WorkingHoursDay>>;

function parseWorkingHours(raw: unknown): WorkingHours {
  let o: unknown = raw;
  if (typeof o === "string") {
    try {
      o = JSON.parse(o);
    } catch {
      o = {};
    }
  }
  if (!o || typeof o !== "object") return {};
  return o as WorkingHours;
}

function dayKeyFromDate(date: Date): keyof WorkingHours {
  const keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  return keys[date.getDay()];
}

function parseTimeOnDate(date: Date, hhmm: string): Date {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

function minutesBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 60000);
}

/** Há agendamento ocupando qualquer parte do intervalo [slotStart, slotStart+30min). */
function slotHasAppointment(slotStart: Date, colAppts: DailyGridAppointment[]): boolean {
  const slotEnd = new Date(slotStart);
  slotEnd.setMinutes(slotEnd.getMinutes() + 30);
  return colAppts.some((a) => {
    const s = new Date(a.startTime);
    const e = new Date(a.endTime);
    return s < slotEnd && e > slotStart;
  });
}

/** O intervalo de 30 min do slot cruza alguma pausa/almoço configurada no dia. */
function slotIntersectsBreak(
  slotStart: Date,
  calendarDay: Date,
  breaks: { start?: string; end?: string }[] | undefined,
): boolean {
  if (!breaks?.length) return false;
  const slotEnd = new Date(slotStart);
  slotEnd.setMinutes(slotEnd.getMinutes() + 30);
  for (const br of breaks) {
    const startStr = (br.start || "").trim();
    const endStr = (br.end || "").trim();
    if (!startStr || !endStr) continue;
    const bs = parseTimeOnDate(calendarDay, startStr);
    const be = parseTimeOnDate(calendarDay, endStr);
    if (bs.getTime() >= be.getTime()) continue;
    if (slotStart < be && slotEnd > bs) return true;
  }
  return false;
}

export type DailyGridTeamMember = {
  id: string;
  name: string;
  workingHours?: unknown;
  blocked?: boolean;
};

export type DailyGridAppointment = {
  id: string;
  clientName: string;
  startTime: string;
  endTime: string;
  status: string;
  type?: string;
  /** Canal/origem livre (App, Balcão, WhatsApp…). */
  bookingSource?: string | null;
  barberId?: string | null;
  barberName?: string | null;
  barber?: { name?: string | null } | null;
  serviceId?: string;
  service?: { name?: string | null; id?: string } | null;
  clientPhone?: string | null;
  clientEmail?: string | null;
  additionalServiceIds?: string[] | null;
  loyaltyUsage?: unknown;
  holdKind?: string | null;
  holdReason?: string | null;
  comandaLines?: unknown;
  userId?: string | null;
  /** Notas internas da equipe sobre o cliente (só com userId cadastrado). */
  clientTeamNotes?: { id: string; body: string; authorName: string; createdAt: string }[];
};

const STATUS_LABELS_PT: Record<string, string> = {
  CONFIRMED: "Confirmado",
  PENDING: "Pendente",
  COMPLETED: "Concluído",
  NO_SHOW: "Faltou",
  CANCELLED: "Cancelado",
};

function normalizeStatusKey(s: string | undefined | null): string {
  return String(s || "").toUpperCase();
}

function statusLabelPt(s: string | undefined | null): string {
  const k = normalizeStatusKey(s);
  return STATUS_LABELS_PT[k] || (s ? String(s) : "—");
}

function appointmentTypeLabel(type: string | undefined): string {
  if (type === "ONLINE") return "Online";
  return "Balcão";
}

/** Texto livre ou fallback &quot;App&quot; para reservas online sem campo preenchido. */
function bookingChannelLabel(a: DailyGridAppointment): string | null {
  const s = (a.bookingSource || "").trim();
  if (s) return s;
  if (a.type === "ONLINE") return "App";
  return null;
}

function loyaltyPlanLabel(a: DailyGridAppointment): string | null {
  const u = a.loyaltyUsage as { subscription?: { plan?: { name?: string } } } | undefined;
  const name = u?.subscription?.plan?.name?.trim();
  return name || (a.loyaltyUsage ? "Plano" : null);
}

function buildAppointmentTooltip(
  a: DailyGridAppointment,
  s: Date,
  e: Date,
  services: { id: string; name: string }[] | undefined,
  durationMin: number,
): string {
  const parts = [
    `${format(s, "HH:mm")} – ${format(e, "HH:mm")} (${durationMin} min)`,
    a.clientName,
    statusLabelPt(a.status),
    appointmentTypeLabel(a.type),
  ];
  const plan = loyaltyPlanLabel(a);
  if (plan) parts.push(`Fidelidade: ${plan}`);
  const ch = bookingChannelLabel(a);
  if (ch) parts.push(`Origem: ${ch}`);
  const sub = appointmentSubtitle(a, services);
  if (sub) parts.push(sub);
  const ph = a.clientPhone?.trim();
  if (ph) parts.push(`Tel. ${formatBrazilPhone(ph)}`);
  const em = a.clientEmail?.trim();
  if (em) parts.push(`Email: ${em}`);
  const notes = a.clientTeamNotes;
  if (Array.isArray(notes) && notes.length > 0) {
    parts.push("Notas internas da equipe:");
    for (const n of notes.slice(0, 8)) {
      const snippet = (n.body || "").replace(/\s+/g, " ").trim().slice(0, 220);
      parts.push(`• ${n.authorName}: ${snippet}${(n.body || "").length > 220 ? "…" : ""}`);
    }
    if (notes.length > 8) parts.push(`(+${notes.length - 8} notas no painel do agendamento)`);
  }
  return parts.join("\n");
}

function appointmentSubtitle(
  a: DailyGridAppointment,
  services?: { id: string; name: string }[],
): string {
  const hk = a.holdKind;
  if (hk === "LEAVE" || hk === "BLOCK") {
    const kind = hk === "LEAVE" ? "Folga" : "Bloqueio";
    const r = (a.holdReason || "").trim();
    return r ? `${kind}: ${r}` : kind;
  }
  const raw = a.comandaLines;
  if (Array.isArray(raw) && raw.length > 0 && services?.length) {
    const names = raw
      .map((row: any) => services.find((sv) => sv.id === row?.serviceId)?.name)
      .filter(Boolean);
    if (names.length) return names.join(" → ");
  }
  const base = a.service?.name ?? "Serviço";
  if (Array.isArray(a.additionalServiceIds) && a.additionalServiceIds.length > 0 && services?.length) {
    const extra = a.additionalServiceIds
      .map((sid) => services.find((sv) => sv.id === sid)?.name)
      .filter(Boolean)
      .join(", ");
    return extra ? `${base} + ${extra}` : base;
  }
  return base;
}

const ROW_HEIGHT = 48; // px per 30min

function SlotCell({
  id,
  disabled,
  style,
  children,
  quickAdd,
}: {
  id: string;
  disabled?: boolean;
  style: CSSProperties;
  children?: ReactNode;
  /** Clique em horário livre: abre novo agendamento com horário/barbeiro pré-preenchidos. */
  quickAdd?: { title: string; onPick: () => void; tone?: "normal" | "extraordinary" };
}) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  const interactive = !!quickAdd;
  const extraordinary = quickAdd?.tone === "extraordinary";
  return (
    <div
      ref={setNodeRef}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      title={interactive ? quickAdd!.title : undefined}
      onKeyDown={
        interactive && quickAdd
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                quickAdd.onPick();
              }
            }
          : undefined
      }
      onClick={(e) => {
        if (!interactive || !quickAdd) return;
        e.stopPropagation();
        quickAdd.onPick();
      }}
      className={cn(
        "absolute left-0 right-0",
        isOver && !disabled && "bg-amber-500/10",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
        interactive &&
          (extraordinary
            ? "hover:bg-red-500/15 focus-visible:ring-red-500/40"
            : "hover:bg-emerald-500/[0.07] focus-visible:ring-emerald-500/35"),
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function DraggableAppt({
  id,
  disabled,
  style,
  className,
  children,
  title,
}: {
  id: string;
  disabled?: boolean;
  style: CSSProperties;
  className: string;
  children: ReactNode;
  title?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });
  const t = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(className, isDragging && "opacity-60")}
      style={{ ...style, transform: t }}
      title={title}
    >
      {children}
    </div>
  );
}

export function DailyGrid({
  date,
  team,
  appointments,
  onMove,
  onEdit,
  onQuickAddSlot,
  services,
  className,
}: {
  date: Date;
  team: DailyGridTeamMember[];
  appointments: DailyGridAppointment[];
  onMove?: (args: { appointmentId: string; barberId: string; startTime: string }) => void;
  onEdit?: (appt: DailyGridAppointment) => void;
  /** Clique em intervalo de 30 min livre (dentro do expediente): abre fluxo de novo agendamento. */
  onQuickAddSlot?: (args: { barberId: string; timeHHmm: string }) => void;
  /** Para exibir nomes dos serviços extras na célula. */
  services?: { id: string; name: string }[];
  className?: string;
}) {
  const dayKey = dayKeyFromDate(date);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const columns = useMemo(() => {
    return (team || []).filter((m) => !m.blocked);
  }, [team]);

  const hoursByBarber = useMemo(() => {
    return new Map(
      columns.map((m) => {
        const wh = parseWorkingHours(m.workingHours);
        const day = wh[dayKey];
        const open = day?.open?.trim();
        const close = day?.close?.trim();
        const isClosed = day?.closed === true || !open || !close;
        const openAt = !isClosed ? parseTimeOnDate(date, open) : null;
        const closeAt = !isClosed ? parseTimeOnDate(date, close) : null;
        return [m.id, { day, isClosed, openAt, closeAt }] as const;
      }),
    );
  }, [columns, dayKey, date]);

  const window = useMemo(() => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(24, 0, 0, 0);
    return { start, end };
  }, [date]);

  const slots = useMemo(() => {
    if (!window.start || !window.end) return [];
    const out: Date[] = [];
    const cursor = new Date(window.start);
    while (cursor < window.end) {
      out.push(new Date(cursor));
      cursor.setMinutes(cursor.getMinutes() + 30);
    }
    return out;
  }, [window.start, window.end]);

  const apptsByBarber = useMemo(() => {
    const map = new Map<string, DailyGridAppointment[]>();
    for (const m of columns) map.set(m.id, []);
    for (const a of appointments || []) {
      const bid = a.barberId || "";
      if (!bid) continue;
      if (!map.has(bid)) map.set(bid, []);
      map.get(bid)!.push(a);
    }
    for (const [k, list] of map) {
      list.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      map.set(k, list);
    }
    return map;
  }, [appointments, columns]);

  if (!columns.length) {
    return (
      <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-sm text-zinc-500", className)}>
        Nenhum profissional disponível.
      </div>
    );
  }

  // janela sempre existe (00:00–24:00)

  const totalMinutes = minutesBetween(window.start, window.end);
  const totalHeight = Math.max(1, Math.ceil(totalMinutes / 30)) * ROW_HEIGHT;

  const handleDragEnd = (ev: DragEndEvent) => {
    const activeId = String(ev.active.id || "");
    const overId = ev.over?.id ? String(ev.over.id) : "";
    if (!activeId.startsWith("appt:")) return;
    if (!overId.startsWith("slot:")) return;
    const appointmentId = activeId.slice("appt:".length);
    const rest = overId.slice("slot:".length);
    const [barberId, startTime] = rest.split("|");
    if (!barberId || !startTime) return;
    onMove?.({ appointmentId, barberId, startTime });
  };

  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden", className)}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="overflow-auto">
          <div
            className="min-w-[900px] grid"
            style={{
              gridTemplateColumns: `8rem repeat(${columns.length}, minmax(220px, 1fr))`,
            }}
          >
            {/* Header row */}
            <div className="sticky top-0 z-20 bg-zinc-950 border-b border-zinc-800 h-12 flex items-center px-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Horário
            </div>
            {columns.map((m) => (
              <div
                key={m.id}
                className="sticky top-0 z-20 bg-zinc-950 border-b border-zinc-800 h-12 flex items-center px-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{m.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate">
                    {hoursByBarber.get(m.id)?.isClosed
                      ? "Fechado"
                      : `${hoursByBarber.get(m.id)?.day?.open ?? "—"}–${hoursByBarber.get(m.id)?.day?.close ?? "—"}`}
                  </p>
                </div>
              </div>
            ))}

            {/* Body */}
            <div className="border-r border-zinc-800 bg-zinc-950/40">
              <div style={{ height: totalHeight }} className="relative">
                {slots.map((t) => (
                  <div
                    key={t.toISOString()}
                    className="absolute left-0 right-0 flex items-start px-3 text-xs text-zinc-500"
                    style={{
                      top: (minutesBetween(window.start!, t) / 30) * ROW_HEIGHT - 6,
                      height: ROW_HEIGHT,
                    }}
                  >
                    <span className="font-mono">{format(t, "HH:mm")}</span>
                  </div>
                ))}
              </div>
            </div>

            {columns.map((m) => {
              const colAppts = apptsByBarber.get(m.id) || [];
              const h = hoursByBarber.get(m.id);
              const isClosed = !!h?.isClosed || !h?.openAt || !h?.closeAt;
              return (
                <div key={m.id} className="border-r last:border-r-0 border-zinc-800 bg-zinc-900/20">
                  <div style={{ height: totalHeight }} className="relative">
                    {/* droppable slots */}
                    {slots.map((t) => {
                      const slotId = `slot:${m.id}|${t.toISOString()}`;
                      const top = (minutesBetween(window.start!, t) / 30) * ROW_HEIGHT;
                      const isOutside =
                        isClosed ||
                        (h?.openAt ? t < h.openAt : true) ||
                        (h?.closeAt ? t >= h.closeAt : true);
                      /** Soltar arrasto em qualquer faixa (extraordinário / fora do expediente). */
                      const disabled = false;
                      const isFree = !slotHasAppointment(t, colAppts);
                      const isInBreak =
                        !isClosed &&
                        !!h?.openAt &&
                        !!h?.closeAt &&
                        t >= h.openAt &&
                        t < h.closeAt &&
                        slotIntersectsBreak(t, date, h.day?.breaks);
                      const isExtraordinary = isOutside || isInBreak;
                      const timeHHmm = format(t, "HH:mm");
                      const quickAdd =
                        onQuickAddSlot && isFree
                          ? {
                              tone: isExtraordinary ? ("extraordinary" as const) : ("normal" as const),
                              title: isExtraordinary
                                ? `Fora do expediente ou em pausa (${timeHHmm}) — clique para novo agendamento extraordinário`
                                : `Novo agendamento às ${timeHHmm} — clique para abrir`,
                              onPick: () => onQuickAddSlot({ barberId: m.id, timeHHmm }),
                            }
                          : undefined;
                      return (
                        <SlotCell
                          key={slotId}
                          id={slotId}
                          disabled={disabled}
                          style={{ top, height: ROW_HEIGHT }}
                          quickAdd={quickAdd}
                        />
                      );
                    })}

                    {/* grid lines */}
                    {slots.map((t) => (
                      <div
                        key={t.toISOString()}
                        className={cn(
                          "absolute left-0 right-0 border-t border-zinc-800/60 pointer-events-none",
                          format(t, "mm") === "00" && "border-zinc-700/70",
                        )}
                        style={{
                          top: (minutesBetween(window.start!, t) / 30) * ROW_HEIGHT,
                        }}
                      />
                    ))}

                    {/* outside working hours overlay */}
                    {!isClosed ? (
                      <>
                        {h!.openAt! > window.start! && (
                          <div
                            className="absolute left-0 right-0 bg-zinc-950/50 pointer-events-none"
                            style={{
                              top: 0,
                              height: (minutesBetween(window.start!, h!.openAt!) / 30) * ROW_HEIGHT,
                            }}
                          />
                        )}
                        {h!.closeAt! < window.end! && (
                          <div
                            className="absolute left-0 right-0 bg-zinc-950/50 pointer-events-none"
                            style={{
                              top: (minutesBetween(window.start!, h!.closeAt!) / 30) * ROW_HEIGHT,
                              height: (minutesBetween(h!.closeAt!, window.end!) / 30) * ROW_HEIGHT,
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-600 pointer-events-none">
                        Fechado
                      </div>
                    )}

                    {/* appointments */}
                    {colAppts.map((a) => {
                      const s = new Date(a.startTime);
                      const e = new Date(a.endTime);
                      const top = (minutesBetween(window.start!, s) / 30) * ROW_HEIGHT + 4;
                      const height = Math.max(1, Math.ceil(minutesBetween(s, e) / 30)) * ROW_HEIGHT - 8;
                      const isHold = a.holdKind === "LEAVE" || a.holdKind === "BLOCK";
                      const isActive =
                        !isHold && (a.status === "CONFIRMED" || a.status === "PENDING");
                      const sub = appointmentSubtitle(a, services);
                      const durationMin = Math.max(0, minutesBetween(s, e));
                      const phoneShort = !isHold && a.clientPhone?.trim() ? formatBrazilPhone(a.clientPhone) : null;
                      const planLabel = loyaltyPlanLabel(a);
                      const channel = bookingChannelLabel(a);
                      const metaParts = [
                        statusLabelPt(a.status),
                        appointmentTypeLabel(a.type),
                        ...(channel ? [`Origem: ${channel}`] : []),
                        planLabel,
                      ].filter(Boolean);
                      const metaLine = metaParts.join(" · ");
                      const teamNotes = a.clientTeamNotes ?? [];
                      const hasTeamNotes =
                        !isHold && !!a.userId && teamNotes.length > 0;
                      return (
                        <DraggableAppt
                          key={a.id}
                          id={`appt:${a.id}`}
                          disabled={!isActive}
                          className={cn(
                            "absolute left-2 right-2 rounded-lg border px-2 py-1.5 overflow-hidden cursor-grab active:cursor-grabbing flex flex-col gap-0.5 min-h-0",
                            hasTeamNotes && "ring-2 ring-amber-500/55 shadow-[0_0_12px_rgba(245,158,11,0.12)]",
                            isHold && "bg-violet-500/10 border-violet-500/25 text-zinc-100",
                            !isHold &&
                              isActive &&
                              "bg-amber-500/10 border-amber-500/25 text-zinc-100",
                            !isHold &&
                              !isActive &&
                              "bg-zinc-800/40 border-zinc-700/40 text-zinc-300 opacity-70 cursor-not-allowed",
                          )}
                          style={{ top, height }}
                          title={buildAppointmentTooltip(a, s, e, services, durationMin)}
                        >
                          {hasTeamNotes ? (
                            <div className="shrink-0 rounded-md border border-amber-500/50 bg-amber-500/25 px-1.5 py-1">
                              <p className="text-[9px] font-bold uppercase tracking-wide text-amber-100 flex items-center gap-0.5">
                                <StickyNote className="w-3 h-3 shrink-0" aria-hidden />
                                Nota da equipe
                              </p>
                              <p className="text-[10px] text-amber-50/95 leading-snug line-clamp-2 mt-0.5">
                                {teamNotes[0]?.body}
                              </p>
                              {teamNotes.length > 1 ? (
                                <p className="text-[9px] text-amber-200/80 mt-0.5">
                                  +{teamNotes.length - 1} nota(s) — abra o agendamento para ver todas
                                </p>
                              ) : null}
                            </div>
                          ) : null}
                          <div className="flex items-start justify-between gap-1 shrink-0">
                            <p className="text-xs font-bold truncate min-w-0 leading-tight">{a.clientName}</p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 shrink-0 -mr-1 -mt-0.5 text-zinc-400 hover:text-white"
                              onClick={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                onEdit?.(a);
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-mono tabular-nums leading-tight truncate shrink-0">
                            {format(s, "HH:mm")}–{format(e, "HH:mm")}
                            {durationMin > 0 ? ` · ${durationMin} min` : null}
                          </p>
                          {isHold ? (
                            <p className="text-[10px] text-zinc-500 leading-tight truncate shrink-0">
                              {statusLabelPt(a.status)}
                            </p>
                          ) : metaLine ? (
                            <p className="text-[10px] text-zinc-500 leading-tight line-clamp-2">{metaLine}</p>
                          ) : null}
                          <p className="text-[11px] text-zinc-400 leading-tight line-clamp-2 min-h-0">{sub}</p>
                          {!isHold && phoneShort ? (
                            <p className="text-[10px] text-zinc-500 truncate shrink-0">{phoneShort}</p>
                          ) : null}
                        </DraggableAppt>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DndContext>
    </div>
  );
}

