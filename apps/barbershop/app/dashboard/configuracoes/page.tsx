"use client";

import { formatBrazilPhone, phoneDigitsForApi } from "@barbearia/phone-br";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, MapPin, Phone, Clock, Copy, Check, Percent } from "lucide-react";
import { Switch } from "@/components/ui/switch";

function normalizeGapMinutes(raw: unknown): number {
  if (raw == null || raw === "") return 5;
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n)) return 5;
  return Math.min(120, Math.max(0, n));
}

export default function ConfigPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState<any>({
    name: "",
    address: "",
    phone: "",
    description: "",
    workingHours: {},
    appointmentGapMinutes: 5,
  });
  const [copied, setCopied] = useState(false);
  const [billing, setBilling] = useState({
    billingModel: "LEGACY" as "LEGACY" | "OWNER_CUT_PERCENT",
    defaultOwnerCutPercent: 40,
    separateCashRegisterEnabled: false,
  });

  const { data: tenant, isLoading } = useQuery({
    queryKey: ["tenant-me"],
    queryFn: async () => {
      const res = await api.get("/tenants/me");
      return res.data;
    },
  });

  const publicUrl = typeof window !== 'undefined' 
    ? `${window.location.origin.replace('dashboard.', '')}/${tenant?.slug}`
    : `barberdash.com/${tenant?.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("URL copiada para a área de transferência!");
  };

  useEffect(() => {
    if (tenant) {
      setForm({
        name: tenant.name,
        address: tenant.address || "",
        phone: formatBrazilPhone(tenant.phone || ""),
        description: tenant.description || "",
        workingHours: tenant.workingHours || {},
        appointmentGapMinutes: normalizeGapMinutes(tenant.appointmentGapMinutes),
      });
      setBilling({
        billingModel: tenant.billingModel === "OWNER_CUT_PERCENT" ? "OWNER_CUT_PERCENT" : "LEGACY",
        defaultOwnerCutPercent: (() => {
          const raw = tenant.defaultOwnerCutPercent;
          if (raw == null || raw === "") return 40;
          const n = Math.floor(Number(raw));
          if (!Number.isFinite(n)) return 40;
          return Math.min(100, Math.max(0, n));
        })(),
        separateCashRegisterEnabled: !!tenant.separateCashRegisterEnabled,
      });
    }
  }, [tenant]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch("/tenants/me", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tenant-me"] });
      toast.success("Configurações atualizadas");
    },
  });

  const billingMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.patch("/tenants/me", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tenant-me"] });
      toast.success("Faturamento atualizado");
    },
  });

  const saveBilling = () => {
    const payload: Record<string, unknown> = {
      billingModel: billing.billingModel,
      separateCashRegisterEnabled: billing.separateCashRegisterEnabled,
    };
    if (billing.billingModel === "OWNER_CUT_PERCENT") {
      payload.defaultOwnerCutPercent = Math.min(100, Math.max(0, billing.defaultOwnerCutPercent));
    }
    billingMutation.mutate(payload);
  };

  if (isLoading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-zinc-500 text-sm mt-1">Dados públicos da sua barbearia</p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Store className="w-5 h-5 text-amber-500" />
            Perfil da Barbearia
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Estas informações aparecerão na sua página pública de agendamentos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-zinc-300">URL Pública</Label>
            <div className="flex gap-2">
              <Input 
                readOnly 
                value={publicUrl} 
                className="bg-zinc-950 border-zinc-800 text-zinc-100 font-medium h-10 flex-1 cursor-default focus-visible:ring-0" 
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleCopy}
                className="shrink-0 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 h-10 w-10"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-zinc-500 italic">Esta é a URL que você deve enviar para seus clientes realizarem agendamentos.</p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-zinc-300">Nome</Label>
            <Input 
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Endereço</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white" placeholder="Rua das Barbas, 123"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Telefone / WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatBrazilPhone(e.target.value) })}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                placeholder="(11) 9 9999-9999"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-zinc-950/50 border-t border-zinc-800 justify-end py-4">
          <Button
            onClick={() =>
              updateMutation.mutate({
                ...form,
                phone: phoneDigitsForApi(form.phone) || "",
                appointmentGapMinutes: form.appointmentGapMinutes,
              })
            }
            disabled={updateMutation.isPending}
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Percent className="w-5 h-5 text-amber-500" />
            Faturamento & caixa
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Modelo de repasse entre dono e barbeiros (opcional). No financeiro, barbeiros veem só o próprio caixa quando o filtro aplicar.
            Com caixa separado, cada assinatura de fidelidade fica na carteira de um barbeiro (listagens e balcão filtram por profissional). Se uma venda ainda não tiver profissional, o dono vê isso em Clientes e vincula ali. A configuração dos planos continua só com o dono.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="text-zinc-300">Modelo</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="radio"
                  name="billingModel"
                  className="accent-amber-500"
                  checked={billing.billingModel === "LEGACY"}
                  onChange={() => setBilling({ ...billing, billingModel: "LEGACY" })}
                />
                Clássico (sem divisão automática no painel)
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="radio"
                  name="billingModel"
                  className="accent-amber-500"
                  checked={billing.billingModel === "OWNER_CUT_PERCENT"}
                  onChange={() => setBilling({ ...billing, billingModel: "OWNER_CUT_PERCENT" })}
                />
                Repasse % do dono sobre o líquido (após taxas)
              </label>
            </div>
          </div>
          {billing.billingModel === "OWNER_CUT_PERCENT" && (
            <div className="space-y-2 max-w-xs">
              <Label className="text-zinc-300">% padrão para o dono (0–100)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={
                  Number.isFinite(billing.defaultOwnerCutPercent)
                    ? billing.defaultOwnerCutPercent
                    : 40
                }
                onChange={(e) => {
                  const raw = e.target.value;
                  const parsed = raw === "" ? 0 : Math.floor(Number(raw));
                  const next = !Number.isFinite(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
                  setBilling({ ...billing, defaultOwnerCutPercent: next });
                }}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <p className="text-[11px] text-zinc-500">
                O restante é atribuído ao barbeiro do atendimento. Você pode definir override por barbeiro em Equipe.
              </p>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
            <div>
              <p className="text-sm font-medium text-white">Caixa separado por profissional</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Permite marcar barbeiros com caixa próprio; no financeiro o dono pode filtrar por barbeiro. Assinaturas de fidelidade passam a ser por profissional; até vincular, o dono trata isso na área de Clientes (filtro sem profissional).
              </p>
            </div>
            <Switch
              checked={billing.separateCashRegisterEnabled}
              onCheckedChange={(v) => setBilling({ ...billing, separateCashRegisterEnabled: v })}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-zinc-950/50 border-t border-zinc-800 justify-end py-4">
          <Button
            onClick={saveBilling}
            disabled={billingMutation.isPending}
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Salvar faturamento
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-amber-500" />
            Horário de Funcionamento
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Define quais horários estarão disponíveis para reservas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
            <Label className="text-zinc-300">Intervalo entre atendimentos (minutos)</Label>
            <Input
              type="number"
              min={0}
              max={120}
              value={normalizeGapMinutes(form.appointmentGapMinutes)}
              onChange={(e) => {
                const raw = e.target.value;
                const parsed = raw === "" ? 0 : Math.floor(Number(raw));
                const next = !Number.isFinite(parsed) ? 0 : Math.min(120, Math.max(0, parsed));
                setForm({ ...form, appointmentGapMinutes: next });
              }}
              className="max-w-[8rem] bg-zinc-800 border-zinc-700 text-white"
            />
            <p className="text-[11px] text-zinc-500">
              Tempo livre após cada horário na agenda e nos slots do app público (0 = sem intervalo). Padrão: 5 min.
            </p>
          </div>
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayId) => {
            const labels: any = {
              mon: "Segunda-feira",
              tue: "Terça-feira",
              wed: "Quarta-feira",
              thu: "Quinta-feira",
              fri: "Sexta-feira",
              sat: "Sábado",
              sun: "Domingo"
            };
            const isOpen = !!form.workingHours?.[dayId];
            const setDay = (field: string, value: string) => {
               const dayObj = form.workingHours[dayId] || { open: "09:00", close: "18:00", breaks: [] };
               setForm({ ...form, workingHours: { ...form.workingHours, [dayId]: { ...dayObj, [field]: value } } });
            };
            const toggleDay = () => {
               const newWh = { ...form.workingHours };
               if (isOpen) {
                  delete newWh[dayId];
               } else {
                  newWh[dayId] = { open: "09:00", close: "18:00", breaks: [] };
               }
               setForm({ ...form, workingHours: newWh });
            };

            return (
              <div key={dayId} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-4 w-1/3">
                  <input type="checkbox" checked={isOpen} onChange={toggleDay} className="w-4 h-4 cursor-pointer accent-amber-500" />
                  <span className={`text-sm ${isOpen ? 'text-white font-medium' : 'text-zinc-500'}`}>{labels[dayId]}</span>
                </div>
                {isOpen ? (
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <Input type="time" value={form.workingHours[dayId]?.open || "09:00"} onChange={e => setDay("open", e.target.value)} className="w-24 h-8 bg-zinc-800 border-zinc-700 text-xs" />
                    <span className="text-zinc-500 text-sm">até</span>
                    <Input type="time" value={form.workingHours[dayId]?.close || "18:00"} onChange={e => setDay("close", e.target.value)} className="w-24 h-8 bg-zinc-800 border-zinc-700 text-xs" />
                  </div>
                ) : (
                  <span className="text-xs text-zinc-600 font-medium">FECHADO</span>
                )}
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="bg-zinc-950/50 border-t border-zinc-800 justify-end py-4">
          <Button
            onClick={() =>
              updateMutation.mutate({
                workingHours: form.workingHours,
                appointmentGapMinutes: form.appointmentGapMinutes,
              })
            }
            disabled={updateMutation.isPending}
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Salvar Horários
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
