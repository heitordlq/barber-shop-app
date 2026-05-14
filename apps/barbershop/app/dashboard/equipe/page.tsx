"use client";

import { formatBrazilPhone, phoneDigitsForApi } from "@barbearia/phone-br";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Loader2,
  BadgeCheck,
  Pencil,
  KeyRound,
  Ban,
  Unlock,
  Clock,
  Plus,
  Trash2,
  Percent,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { usePlanLimits } from "@/hooks/use-plan-limits";
import { PlanBlockedBanner } from "@/components/plan-limit-banner";

const DAY_IDS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_LABELS: Record<(typeof DAY_IDS)[number], string> = {
  mon: "Segunda-feira",
  tue: "Terça-feira",
  wed: "Quarta-feira",
  thu: "Quinta-feira",
  fri: "Sexta-feira",
  sat: "Sábado",
  sun: "Domingo",
};

type DayDraft = {
  works: boolean;
  tenantClosed: boolean;
  open: string;
  close: string;
  breaks: { start: string; end: string }[];
};

type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  blocked?: boolean;
  createdAt: string;
  ownerCutPercentOverride?: number | string | null;
  /** % sobre o líquido total dos atendimentos da barbearia (contrato / gerência). */
  tenantRevenueSharePercent?: number | string | null;
  separateCashRegister?: boolean;
  workingHours?: Record<string, { open?: string; close?: string; closed?: boolean; breaks?: { start: string; end: string }[] }>;
};

function buildHoursDraft(member: TeamMember, tenantWh: Record<string, any> | null | undefined): Record<string, DayDraft> {
  const tw = tenantWh || {};
  const mw = member.workingHours || {};
  const draft: Record<string, DayDraft> = {} as Record<string, DayDraft>;
  for (const dayId of DAY_IDS) {
    const t = tw[dayId];
    const m = mw[dayId];
    const tenantOk = !!(t?.open && t?.close);
    if (!tenantOk) {
      draft[dayId] = { works: false, tenantClosed: true, open: "09:00", close: "18:00", breaks: [] };
      continue;
    }
    if (m?.closed === true) {
      draft[dayId] = { works: false, tenantClosed: false, open: t.open, close: t.close, breaks: [] };
    } else if (m?.open && m?.close) {
      draft[dayId] = {
        works: true,
        tenantClosed: false,
        open: m.open,
        close: m.close,
        breaks: Array.isArray(m.breaks) ? m.breaks.map((x) => ({ start: x.start || "12:00", end: x.end || "13:00" })) : [],
      };
    } else {
      draft[dayId] = {
        works: true,
        tenantClosed: false,
        open: t.open,
        close: t.close,
        breaks: Array.isArray(t.breaks) ? t.breaks.map((x: any) => ({ start: x.start || "12:00", end: x.end || "13:00" })) : [],
      };
    }
  }
  return draft;
}

export default function EquipePage() {
  const qc = useQueryClient();
  const authUser = useAuthStore((s) => s.user);
  const planLimits = usePlanLimits();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [editOpen, setEditOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

  const [pwdOpen, setPwdOpen] = useState(false);
  const [pwdMember, setPwdMember] = useState<TeamMember | null>(null);
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  const [hoursOpen, setHoursOpen] = useState(false);
  const [hoursMember, setHoursMember] = useState<TeamMember | null>(null);
  const [hoursDraft, setHoursDraft] = useState<Record<string, DayDraft> | null>(null);

  const [billingOpen, setBillingOpen] = useState(false);
  const [billingMember, setBillingMember] = useState<TeamMember | null>(null);
  /** Percentual do líquido para o barbeiro; vazio = usar padrão da barbearia (persistido como remoção do override do % dono). */
  const [billingForm, setBillingForm] = useState({ barberShare: "", contractOnShop: "", separate: false });

  const { data: team, isLoading } = useQuery({
    queryKey: ["equipe"],
    queryFn: async () => {
      const res = await api.get(`/tenant-users/equipe`);
      return res.data as TeamMember[];
    },
  });

  const { data: tenantMe, isLoading: tenantMeLoading } = useQuery({
    queryKey: ["tenant-me"],
    queryFn: async () => (await api.get("/tenants/me")).data,
    enabled: !!authUser && (authUser.role === "OWNER" || authUser.role === "BARBER"),
  });

  const addMember = useMutation({
    mutationFn: async () => {
      const res = await api.post("/tenant-users/equipe", {
        ...form,
        phone: phoneDigitsForApi(form.phone) || undefined,
        role: "BARBER",
      });
      return res.data as { user: any; tempPassword: string };
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      qc.invalidateQueries({ queryKey: ["tenant-me"] });
      setOpen(false);
      setForm({ name: "", email: "", phone: "" });
      toast.success(`Barbeiro adicionado. Senha temporária: ${data.tempPassword}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Erro ao adicionar membro");
    },
  });

  const updateMember = useMutation({
    mutationFn: async () => {
      if (!editMember) return;
      await api.patch(`/tenant-users/equipe/${editMember.id}`, {
        name: editForm.name,
        email: editForm.email,
        phone: phoneDigitsForApi(editForm.phone) || undefined,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      setEditOpen(false);
      setEditMember(null);
      toast.success("Dados atualizados");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Erro ao salvar"),
  });

  const resetPassword = useMutation({
    mutationFn: async () => {
      if (!pwdMember) return;
      if (pwdNew !== pwdConfirm) throw new Error("As senhas não coincidem");
      await api.patch(`/tenant-users/equipe/${pwdMember.id}/senha`, { newPassword: pwdNew });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      setPwdOpen(false);
      setPwdMember(null);
      setPwdNew("");
      setPwdConfirm("");
      toast.success("Senha alterada");
    },
    onError: (err: any) =>
      toast.error(err.message || err.response?.data?.message || "Erro ao alterar senha"),
  });

  const toggleBlocked = useMutation({
    mutationFn: async ({ id, blocked }: { id: string; blocked: boolean }) => {
      await api.patch(`/tenant-users/equipe/${id}/blocked`, { blocked });
    },
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      toast.success(v.blocked ? "Barbeiro bloqueado" : "Barbeiro desbloqueado");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Erro ao atualizar status"),
  });

  const saveBillingMember = useMutation({
    mutationFn: async () => {
      if (!billingMember) return;
      const trimmed = billingForm.barberShare.trim();
      let ownerCutPayload: number;
      if (trimmed === "") {
        ownerCutPayload = -1;
      } else {
        const barberPct = Number(trimmed);
        if (!Number.isFinite(barberPct) || barberPct < 0 || barberPct > 100) {
          throw new Error("Informe um percentual entre 0 e 100 para o barbeiro (por atendimento).");
        }
        ownerCutPayload = Math.min(100, Math.max(0, 100 - barberPct));
      }
      const cTrim = billingForm.contractOnShop.trim();
      let tenantRevPayload: number;
      if (cTrim === "") {
        tenantRevPayload = -1;
      } else {
        const shopPct = Number(cTrim);
        if (!Number.isFinite(shopPct) || shopPct < 0 || shopPct > 100) {
          throw new Error("Informe um percentual entre 0 e 100 sobre o faturamento total da barbearia.");
        }
        tenantRevPayload = Math.min(100, Math.max(0, shopPct));
      }
      await api.patch(`/tenant-users/equipe/${billingMember.id}`, {
        ownerCutPercentOverride: ownerCutPayload,
        tenantRevenueSharePercent: tenantRevPayload,
        separateCashRegister: billingForm.separate,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      setBillingOpen(false);
      setBillingMember(null);
      toast.success("Participação no faturamento e caixa atualizados");
    },
    onError: (err: any) =>
      toast.error(err.message || err.response?.data?.message || "Erro ao salvar"),
  });

  const saveWorkingHours = useMutation({
    mutationFn: async () => {
      if (!hoursMember || !hoursDraft) throw new Error("Dados incompletos");
      const payload: Record<string, { closed?: boolean; open?: string; close?: string; breaks?: { start: string; end: string }[] }> = {};
      for (const dayId of DAY_IDS) {
        const d = hoursDraft[dayId];
        if (d.tenantClosed || !d.works) {
          payload[dayId] = { closed: true };
        } else {
          payload[dayId] = {
            open: d.open,
            close: d.close,
            breaks: d.breaks.filter((b) => b.start && b.end),
          };
        }
      }
      await api.patch(`/tenant-users/equipe/${hoursMember.id}/working-hours`, { workingHours: payload });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["equipe"] });
      setHoursOpen(false);
      setHoursMember(null);
      setHoursDraft(null);
      toast.success("Horários salvos. A agenda do cliente usa estes horários dentro do funcionamento da barbearia.");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Erro ao salvar horários"),
  });

  const openHours = (m: TeamMember) => {
    setHoursMember(m);
    setHoursDraft(null);
    setHoursOpen(true);
  };

  useEffect(() => {
    if (!hoursOpen || !hoursMember || !tenantMe) return;
    setHoursDraft(buildHoursDraft(hoursMember, tenantMe.workingHours));
  }, [hoursOpen, hoursMember?.id, tenantMe]);

  const openEdit = (m: TeamMember) => {
    setEditMember(m);
    setEditForm({ name: m.name, email: m.email, phone: formatBrazilPhone(m.phone || "") });
    setEditOpen(true);
  };

  const openPwd = (m: TeamMember) => {
    setPwdMember(m);
    setPwdNew("");
    setPwdConfirm("");
    setPwdOpen(true);
  };

  const defaultOwnerPct = () => {
    const v = tenantMe?.defaultOwnerCutPercent;
    if (v == null || v === "") return 0;
    return Math.min(100, Math.max(0, Number(v)));
  };

  const effectiveBarberPct = (m: TeamMember) => {
    const o = m.ownerCutPercentOverride;
    const owner =
      o != null && o !== "" && !Number.isNaN(Number(o))
        ? Math.min(100, Math.max(0, Number(o)))
        : defaultOwnerPct();
    return 100 - owner;
  };

  const openBilling = (m: TeamMember) => {
    setBillingMember(m);
    const o = m.ownerCutPercentOverride;
    const hasOverride = o != null && o !== "" && !Number.isNaN(Number(o));
    const tr = m.tenantRevenueSharePercent;
    const hasContract =
      tr != null && tr !== "" && !Number.isNaN(Number(tr)) && Number(tr) > 0;
    setBillingForm({
      barberShare: hasOverride ? String(100 - Math.min(100, Math.max(0, Number(o)))) : "",
      contractOnShop: hasContract ? String(Number(tr)) : "",
      separate: !!m.separateCashRegister,
    });
    setBillingOpen(true);
  };

  const canManageBarber = authUser?.role === "OWNER";
  const canAddMember = canManageBarber && !planLimits.team.atLimit;

  const canEditMemberHours = (m: TeamMember) => {
    if (m.role !== "BARBER" && m.role !== "OWNER") return false;
    if (authUser?.role === "OWNER") return true;
    if (authUser?.role === "BARBER" && authUser.id === m.id) return true;
    return false;
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            Equipe
          </h1>
          <p className="text-zinc-400 mt-1">Gerencie os barbeiros e administradores do seu salão.</p>
          {canManageBarber &&
            tenantMe &&
            !tenantMeLoading &&
            tenantMe.billingModel === "LEGACY" && (
              <p className="text-xs text-amber-500/85 max-w-xl mt-2">
                Para configurar a porcentagem do faturamento líquido por barbeiro, ative o modelo de repasse por percentual em{" "}
                <span className="text-zinc-300">Configurações</span> da barbearia.
              </p>
            )}
          {planLimits.team.max != null && (
            <p className="text-xs text-zinc-500 mt-1">
              {planLimits.team.used} de {planLimits.team.max} membro{planLimits.team.max !== 1 ? "s" : ""} usados
            </p>
          )}
        </div>

        {canManageBarber && (
          <Dialog open={open} onOpenChange={canAddMember ? setOpen : undefined}>
            <DialogTrigger
              render={
                <Button
                  className="bg-amber-500 text-black hover:bg-amber-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!canAddMember}
                  title={!canAddMember && planLimits.team.atLimit ? `Limite de ${planLimits.team.max} membros atingido` : undefined}
                >
                  + Adicionar barbeiro
                </Button>
              }
            />
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo barbeiro</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    className="bg-zinc-900 border-zinc-800"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Carlos"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    className="bg-zinc-900 border-zinc-800"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone (opcional)</Label>
                  <Input
                    className="bg-zinc-900 border-zinc-800"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: formatBrazilPhone(e.target.value) })}
                    placeholder="(11) 9 9999-9999"
                  />
                </div>
                <p className="text-xs text-zinc-500">
                  Vamos gerar uma senha temporária para o primeiro acesso.
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => addMember.mutate()}
                  disabled={addMember.isPending || !form.name || !form.email}
                  className="bg-amber-500 text-black hover:bg-amber-600 font-bold"
                >
                  {addMember.isPending ? "Salvando..." : "Criar barbeiro"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar barbeiro</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                className="bg-zinc-900 border-zinc-800"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                className="bg-zinc-900 border-zinc-800"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                className="bg-zinc-900 border-zinc-800"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: formatBrazilPhone(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => updateMember.mutate()}
              disabled={updateMember.isPending || !editForm.name || !editForm.email}
              className="bg-amber-500 text-black hover:bg-amber-600 font-bold"
            >
              {updateMember.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={hoursOpen}
        onOpenChange={(v) => {
          setHoursOpen(v);
          if (!v) {
            setHoursMember(null);
            setHoursDraft(null);
          }
        }}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Agenda de {hoursMember?.name}
            </DialogTitle>
            <p className="text-sm text-zinc-400 font-normal pt-1">
              Horários visíveis ao cliente ficam sempre <strong className="text-zinc-300">dentro do horário da barbearia</strong> (Configurações).
              Marque folgas, ajuste entrada/saída e adicione bloqueios (almoço, pausa, imprevisto) — esses intervalos não aparecem para agendar.
            </p>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 min-h-0 space-y-3 pr-1 -mr-1">
            {(tenantMeLoading || !hoursDraft) && (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              </div>
            )}
            {hoursDraft &&
              DAY_IDS.map((dayId) => {
                const d = hoursDraft[dayId];
                return (
                  <div key={dayId} className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white">{DAY_LABELS[dayId]}</span>
                      {d.tenantClosed ? (
                        <span className="text-xs text-zinc-500">Barbearia fechada</span>
                      ) : (
                        <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                          <Checkbox
                            checked={d.works}
                            onChange={(e) => {
                              const on = e.target.checked;
                              setHoursDraft((prev) =>
                                prev ? { ...prev, [dayId]: { ...prev[dayId], works: on } } : prev
                              );
                            }}
                          />
                          Atende neste dia
                        </label>
                      )}
                    </div>
                    {!d.tenantClosed && d.works && (
                      <>
                        <div className="flex flex-wrap items-center gap-2">
                          <Input
                            type="time"
                            className="w-28 h-8 bg-zinc-800 border-zinc-700 text-xs"
                            value={d.open}
                            onChange={(e) =>
                              setHoursDraft((prev) =>
                                prev ? { ...prev, [dayId]: { ...prev[dayId], open: e.target.value } } : prev
                              )
                            }
                          />
                          <span className="text-zinc-500 text-xs">até</span>
                          <Input
                            type="time"
                            className="w-28 h-8 bg-zinc-800 border-zinc-700 text-xs"
                            value={d.close}
                            onChange={(e) =>
                              setHoursDraft((prev) =>
                                prev ? { ...prev, [dayId]: { ...prev[dayId], close: e.target.value } } : prev
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                          <p className="text-[11px] text-zinc-500 uppercase tracking-wide">Bloqueios (não aparecem na agenda do cliente)</p>
                          {d.breaks.map((br, idx) => (
                            <div key={idx} className="flex flex-wrap items-center gap-2">
                              <Input
                                type="time"
                                className="w-28 h-8 bg-zinc-800 border-zinc-700 text-xs"
                                value={br.start}
                                onChange={(e) =>
                                  setHoursDraft((prev) => {
                                    if (!prev) return prev;
                                    const breaks = [...prev[dayId].breaks];
                                    breaks[idx] = { ...breaks[idx], start: e.target.value };
                                    return { ...prev, [dayId]: { ...prev[dayId], breaks } };
                                  })
                                }
                              />
                              <span className="text-zinc-500 text-xs">—</span>
                              <Input
                                type="time"
                                className="w-28 h-8 bg-zinc-800 border-zinc-700 text-xs"
                                value={br.end}
                                onChange={(e) =>
                                  setHoursDraft((prev) => {
                                    if (!prev) return prev;
                                    const breaks = [...prev[dayId].breaks];
                                    breaks[idx] = { ...breaks[idx], end: e.target.value };
                                    return { ...prev, [dayId]: { ...prev[dayId], breaks } };
                                  })
                                }
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-zinc-500 hover:text-red-400"
                                onClick={() =>
                                  setHoursDraft((prev) => {
                                    if (!prev) return prev;
                                    const breaks = prev[dayId].breaks.filter((_, i) => i !== idx);
                                    return { ...prev, [dayId]: { ...prev[dayId], breaks } };
                                  })
                                }
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 border-zinc-700 bg-zinc-800/50 text-zinc-300"
                            onClick={() =>
                              setHoursDraft((prev) => {
                                if (!prev) return prev;
                                return {
                                  ...prev,
                                  [dayId]: {
                                    ...prev[dayId],
                                    breaks: [...prev[dayId].breaks, { start: "12:00", end: "13:00" }],
                                  },
                                };
                              })
                            }
                          >
                            <Plus className="w-3.5 h-3.5 mr-1" /> Intervalo
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
          <DialogFooter className="border-t border-zinc-800 pt-3 mt-2">
            <Button
              variant="outline"
              className="border-zinc-700"
              onClick={() => {
                setHoursOpen(false);
                setHoursMember(null);
                setHoursDraft(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="bg-amber-500 text-black hover:bg-amber-600"
              disabled={saveWorkingHours.isPending || !hoursDraft}
              onClick={() => saveWorkingHours.mutate()}
            >
              {saveWorkingHours.isPending ? "Salvando..." : "Salvar horários"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={billingOpen}
        onOpenChange={(v) => {
          setBillingOpen(v);
          if (!v) setBillingMember(null);
        }}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-amber-500" />
              Remuneração — {billingMember?.name}
            </DialogTitle>
            <p className="text-sm text-zinc-400 font-normal pt-1">
              Dois tipos de percentual: (1) por atendimento na cadeira dele — quando o repasse por percentual está ativo; (2) contrato sobre o faturamento líquido total da barbearia no período (ex.: gerência).
            </p>
          </DialogHeader>
          <div className="space-y-2 pt-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
            <Label>% sobre o faturamento líquido total da barbearia (contrato)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              step={0.25}
              placeholder="Ex.: 5 — gerente sobre o total da loja no mês"
              className="bg-zinc-900 border-zinc-800"
              value={billingForm.contractOnShop}
              onChange={(e) => setBillingForm({ ...billingForm, contractOnShop: e.target.value })}
            />
            <p className="text-xs text-zinc-500">
              Soma do líquido de <strong className="text-zinc-400">todos</strong> os atendimentos da barbearia no período (agenda), antes de filtrar por barbeiro no financeiro. Deixe em branco se não houver participação global no contrato.
            </p>
          </div>
          {tenantMe?.billingModel === "OWNER_CUT_PERCENT" && (
            <div className="space-y-2 pt-4 mt-2 border-t border-zinc-800">
              <Label className="text-zinc-300">% do líquido dos próprios atendimentos (cadeira)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                step={0.5}
                placeholder={
                  tenantMe?.defaultOwnerCutPercent != null && tenantMe?.defaultOwnerCutPercent !== ""
                    ? `Padrão da barbearia (${100 - Math.min(100, Math.max(0, Number(tenantMe.defaultOwnerCutPercent)))}% ao barbeiro)`
                    : "Padrão da barbearia (configurações)"
                }
                className="bg-zinc-900 border-zinc-800"
                value={billingForm.barberShare}
                onChange={(e) => setBillingForm({ ...billingForm, barberShare: e.target.value })}
              />
              <p className="text-xs text-zinc-500">
                O que a <strong className="text-zinc-400">barbearia retém</strong> fica implícito no complemento (100% menos o que este profissional leva em cada atendimento dele). Em branco = padrão em Configurações.
              </p>
            </div>
          )}
          {tenantMe?.separateCashRegisterEnabled && (
            <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 mt-4">
              <div>
                <p className="text-sm font-medium text-white">Caixa separado</p>
                <p className="text-xs text-zinc-500 mt-0.5">Marca este profissional com caixa próprio no painel.</p>
              </div>
              <Switch
                checked={billingForm.separate}
                onCheckedChange={(v) => setBillingForm({ ...billingForm, separate: v })}
              />
            </div>
          )}
          <DialogFooter className="pt-2">
            <Button
              className="bg-amber-500 text-black hover:bg-amber-600"
              disabled={saveBillingMember.isPending}
              onClick={() => saveBillingMember.mutate()}
            >
              {saveBillingMember.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nova senha — {pwdMember?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Nova senha</Label>
              <Input
                type="password"
                className="bg-zinc-900 border-zinc-800"
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirmar senha</Label>
              <Input
                type="password"
                className="bg-zinc-900 border-zinc-800"
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => resetPassword.mutate()}
              disabled={resetPassword.isPending || pwdNew.length < 6}
              className="bg-amber-500 text-black hover:bg-amber-600 font-bold"
            >
              {resetPassword.isPending ? "Salvando..." : "Definir senha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {planLimits.team.atLimit && canManageBarber && (
        <PlanBlockedBanner
          resource="membro de equipe"
          used={planLimits.team.used}
          max={planLimits.team.max!}
          planName={planLimits.planName}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team?.length === 0 ? (
            <p className="text-zinc-500 col-span-full">Nenhum membro na equipe.</p>
          ) : (
            team?.map((member) => (
              <Card
                key={member.id}
                className={`bg-zinc-900 border-zinc-800 ${member.blocked ? "opacity-70 border-red-500/30" : ""}`}
              >
                <CardContent className="p-4 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-amber-500 text-lg shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-lg leading-none truncate">{member.name}</h3>
                        <p className="text-sm text-zinc-400 mt-1">
                          {member.role === "OWNER" ? "Proprietário" : "Barbeiro"}
                        </p>
                        {member.role === "BARBER" && member.blocked && (
                          <Badge className="mt-2 bg-red-500/15 text-red-400 border-red-500/30 text-[10px]">
                            Bloqueado
                          </Badge>
                        )}
                      </div>
                      {member.role === "OWNER" && <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 truncate">{member.email}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      Desde {format(new Date(member.createdAt), "MMMM yyyy", { locale: ptBR })}
                    </p>

                    {canEditMemberHours(member) && (
                      <div className="mt-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/15 h-8 w-full sm:w-auto"
                          onClick={() => openHours(member)}
                        >
                          <Clock className="w-3.5 h-3.5 mr-1" /> Horários & bloqueios
                        </Button>
                      </div>
                    )}

                    {canManageBarber &&
                      member.role === "BARBER" &&
                      tenantMe?.billingModel === "OWNER_CUT_PERCENT" &&
                      !tenantMeLoading && (
                        <p className="text-xs text-zinc-500 mt-2">
                          Por atendimento (cadeira):{" "}
                          <span className="text-amber-400/90 font-medium">{effectiveBarberPct(member)}%</span>
                          {member.ownerCutPercentOverride == null ||
                          member.ownerCutPercentOverride === "" ||
                          Number.isNaN(Number(member.ownerCutPercentOverride)) ? (
                            <span className="text-zinc-600"> (padrão da barbearia)</span>
                          ) : (
                            <span className="text-zinc-600"> (personalizado)</span>
                          )}
                        </p>
                      )}

                    {canManageBarber &&
                      member.role === "BARBER" &&
                      !tenantMeLoading &&
                      member.tenantRevenueSharePercent != null &&
                      member.tenantRevenueSharePercent !== "" &&
                      !Number.isNaN(Number(member.tenantRevenueSharePercent)) &&
                      Number(member.tenantRevenueSharePercent) > 0 && (
                        <p className="text-xs text-zinc-500 mt-1">
                          Contrato sobre faturamento total da loja:{" "}
                          <span className="text-cyan-400/90 font-medium">
                            {Number(member.tenantRevenueSharePercent)}%
                          </span>
                        </p>
                      )}

                    {canManageBarber && member.role === "BARBER" && !tenantMeLoading && !!tenantMe && (
                      <div className="mt-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/15 h-8 w-full sm:w-auto"
                          onClick={() => openBilling(member)}
                        >
                          <Percent className="w-3.5 h-3.5 mr-1" /> Remuneração
                        </Button>
                      </div>
                    )}

                    {canManageBarber && member.role === "BARBER" && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800 h-8"
                          onClick={() => openEdit(member)}
                        >
                          <Pencil className="w-3.5 h-3.5 mr-1" /> Editar
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 bg-zinc-800/50 text-zinc-200 hover:bg-zinc-800 h-8"
                          onClick={() => openPwd(member)}
                        >
                          <KeyRound className="w-3.5 h-3.5 mr-1" /> Senha
                        </Button>
                        {member.blocked ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 h-8"
                            disabled={toggleBlocked.isPending}
                            onClick={() => toggleBlocked.mutate({ id: member.id, blocked: false })}
                          >
                            <Unlock className="w-3.5 h-3.5 mr-1" /> Desbloquear
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 h-8"
                            disabled={toggleBlocked.isPending}
                            onClick={() => toggleBlocked.mutate({ id: member.id, blocked: true })}
                          >
                            <Ban className="w-3.5 h-3.5 mr-1" /> Bloquear
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
