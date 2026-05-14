"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Plus,
  Pencil,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Loader2,
  Users,
  Bot,
  MessageSquare,
  Star,
  Palette,
  Megaphone,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  pixFeePercent: number;
  creditCardFeePercent: number;
  platformFeeFixed: number;
  maxServices?: number;
  maxTeamMembers?: number;
  hasLoyaltyPlans: boolean;
  hasAiAgent: boolean;
  hasChatBot: boolean;
  canDisableOnlinePayment: boolean;
  canCustomizeAppearance: boolean;
  hasMarketingSystem: boolean;
  active: boolean;
  _count?: {
    tenants: number;
  };
}

interface PlanFormData {
  name: string;
  description: string;
  monthlyPrice: string;
  pixFeePercent: string;
  creditCardFeePercent: string;
  platformFeeFixed: string;
  maxServices: string;
  maxTeamMembers: string;
  hasLoyaltyPlans: boolean;
  hasAiAgent: boolean;
  hasChatBot: boolean;
  canDisableOnlinePayment: boolean;
  canCustomizeAppearance: boolean;
  hasMarketingSystem: boolean;
  active: boolean;
}

const emptyForm: PlanFormData = {
  name: "",
  description: "",
  monthlyPrice: "",
  pixFeePercent: "",
  creditCardFeePercent: "",
  platformFeeFixed: "",
  maxServices: "",
  maxTeamMembers: "",
  hasLoyaltyPlans: true,
  hasAiAgent: false,
  hasChatBot: false,
  canDisableOnlinePayment: false,
  canCustomizeAppearance: false,
  hasMarketingSystem: false,
  active: true,
};

function planToForm(p: Plan): PlanFormData {
  return {
    name: p.name,
    description: p.description ?? "",
    monthlyPrice: String(p.monthlyPrice),
    pixFeePercent: String(p.pixFeePercent ?? 0),
    creditCardFeePercent: String(p.creditCardFeePercent ?? 0),
    platformFeeFixed: String(p.platformFeeFixed ?? 0),
    maxServices: p.maxServices != null ? String(p.maxServices) : "",
    maxTeamMembers: p.maxTeamMembers != null ? String(p.maxTeamMembers) : "",
    hasLoyaltyPlans: p.hasLoyaltyPlans ?? true,
    hasAiAgent: p.hasAiAgent ?? false,
    hasChatBot: p.hasChatBot ?? false,
    canDisableOnlinePayment: p.canDisableOnlinePayment ?? false,
    canCustomizeAppearance: p.canCustomizeAppearance ?? false,
    hasMarketingSystem: p.hasMarketingSystem ?? false,
    active: p.active,
  };
}

function PlanFormModal({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing: Plan | null;
}) {
  const qc = useQueryClient();
  const [form, setForm] = useState<PlanFormData>(editing ? planToForm(editing) : emptyForm);

  useEffect(() => {
    setForm(editing ? planToForm(editing) : emptyForm);
  }, [editing, open]);

  const upsert = useMutation({
    mutationFn: async (data: PlanFormData) => {
      const payload = {
        name: data.name.trim(),
        description: data.description.trim() || undefined,
        monthlyPrice: parseFloat(data.monthlyPrice),
        pixFeePercent: parseFloat(data.pixFeePercent || "0"),
        creditCardFeePercent: parseFloat(data.creditCardFeePercent || "0"),
        platformFeeFixed: parseFloat(data.platformFeeFixed || "0"),
        maxServices: data.maxServices ? parseInt(data.maxServices) : undefined,
        maxTeamMembers: data.maxTeamMembers ? parseInt(data.maxTeamMembers) : undefined,
        hasLoyaltyPlans: data.hasLoyaltyPlans,
        hasAiAgent: data.hasAiAgent,
        hasChatBot: data.hasChatBot,
        canDisableOnlinePayment: data.canDisableOnlinePayment,
        canCustomizeAppearance: data.canCustomizeAppearance,
        hasMarketingSystem: data.hasMarketingSystem,
        active: data.active,
      };
      if (editing) {
        return api.patch(`/plans/${editing.id}`, payload);
      }
      return api.post("/plans", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["plans"] });
      toast.success(editing ? "Plano atualizado" : "Plano criado");
      onClose();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Erro ao salvar plano"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.monthlyPrice) {
      toast.error("Preencha ao menos nome e preço mensal");
      return;
    }
    upsert.mutate(form);
  };

  const set = (field: keyof PlanFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Editar Plano" : "Novo Plano"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Nome do plano *</Label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              placeholder="Ex: Starter"
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              placeholder="Descrição opcional"
              value={form.description}
              onChange={set("description")}
            />
          </div>
          <div className="space-y-2">
            <Label>Preço mensal (R$) *</Label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              type="number"
              min="0"
              step="0.01"
              placeholder="97.00"
              value={form.monthlyPrice}
              onChange={set("monthlyPrice")}
            />
          </div>

          {/* Taxas */}
          <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3 space-y-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              Taxas por agendamento online
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Fee total = <span className="text-white">preço × % do método</span> + <span className="text-white">taxa fixa</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">% Pix</Label>
                <div className="relative">
                  <Input
                    className="bg-zinc-900 border-zinc-700 pr-7"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="1.5"
                    value={form.pixFeePercent}
                    onChange={set("pixFeePercent")}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">%</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">% Cartão de crédito</Label>
                <div className="relative">
                  <Input
                    className="bg-zinc-900 border-zinc-700 pr-7"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="3.5"
                    value={form.creditCardFeePercent}
                    onChange={set("creditCardFeePercent")}
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">%</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">Taxa fixa do app (R$ por agendamento)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">R$</span>
                <Input
                  className="bg-zinc-900 border-zinc-700 pl-8"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="2.00"
                  value={form.platformFeeFixed}
                  onChange={set("platformFeeFixed")}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Máx. serviços (vazio = ilimitado)</Label>
              <Input
                className="bg-zinc-800 border-zinc-700"
                type="number"
                min="1"
                placeholder="—"
                value={form.maxServices}
                onChange={set("maxServices")}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-zinc-400" /> Máx. profissionais na equipe
              </Label>
              <Input
                className="bg-zinc-800 border-zinc-700"
                type="number"
                min="1"
                placeholder="— (ilimitado)"
                value={form.maxTeamMembers}
                onChange={set("maxTeamMembers")}
              />
            </div>
          </div>

          {/* Features ativas */}
          <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3 space-y-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              Recursos inclusos no plano
            </p>
            <div className="flex items-center gap-3">
              <input
                id="loyalty-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.hasLoyaltyPlans}
                onChange={(e) => setForm((prev) => ({ ...prev, hasLoyaltyPlans: e.target.checked }))}
              />
              <Label htmlFor="loyalty-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <Star className="w-3.5 h-3.5 text-amber-400" /> Planos de fidelidade para clientes
              </Label>
            </div>
          </div>

          {/* Features futuras */}
          <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3 space-y-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              Features futuras (reservado)
            </p>
            <div className="flex items-center gap-3">
              <input
                id="ai-agent-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.hasAiAgent}
                onChange={(e) => setForm((prev) => ({ ...prev, hasAiAgent: e.target.checked }))}
              />
              <Label htmlFor="ai-agent-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <Bot className="w-3.5 h-3.5 text-amber-500" /> Agente de IA
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="chatbot-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.hasChatBot}
                onChange={(e) => setForm((prev) => ({ ...prev, hasChatBot: e.target.checked }))}
              />
              <Label htmlFor="chatbot-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Chat Bot
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="disable-payment-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.canDisableOnlinePayment}
                onChange={(e) => setForm((prev) => ({ ...prev, canDisableOnlinePayment: e.target.checked }))}
              />
              <Label htmlFor="disable-payment-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <XCircle className="w-3.5 h-3.5 text-red-400" /> Pode desativar pagamento online
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="appearance-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.canCustomizeAppearance}
                onChange={(e) => setForm((prev) => ({ ...prev, canCustomizeAppearance: e.target.checked }))}
              />
              <Label htmlFor="appearance-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <Palette className="w-3.5 h-3.5 text-purple-400" /> Personalização visual do link
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="marketing-toggle"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
                checked={form.hasMarketingSystem}
                onChange={(e) => setForm((prev) => ({ ...prev, hasMarketingSystem: e.target.checked }))}
              />
              <Label htmlFor="marketing-toggle" className="flex items-center gap-1.5 text-zinc-300">
                <Megaphone className="w-3.5 h-3.5 text-pink-400" /> Sistema de marketing
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="active-toggle"
              type="checkbox"
              className="w-4 h-4 accent-amber-500"
              checked={form.active}
              onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
            />
            <Label htmlFor="active-toggle">Plano ativo (visível para novas barbearias)</Label>
          </div>
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={upsert.isPending}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
            >
              {upsert.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {editing ? "Salvar alterações" : "Criar plano"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PlansPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);

  const { data: plans, isLoading } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await api.get("/plans");
      return res.data;
    },
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (plan: Plan) => {
    setEditing(plan);
    setModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Planos de Assinatura</h1>
          <p className="text-zinc-500 text-sm mt-1">Gerencie os modelos de negócio da plataforma</p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2"
        >
          <Plus className="w-4 h-4" /> Novo Plano
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-500" />
            Planos Ativos
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Configure preços, taxas e limites para cada nível de serviço
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Nome do Plano</TableHead>
                <TableHead className="text-zinc-500">Preço Mensal</TableHead>
                <TableHead className="text-zinc-500">Taxas</TableHead>
                <TableHead className="text-zinc-500">Limites</TableHead>
                <TableHead className="text-zinc-500">Barbearias</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-zinc-500 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-zinc-800">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 bg-zinc-800 rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !plans?.length ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={7} className="text-center py-12 text-zinc-600">
                    Nenhum plano cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                plans.map((plan) => (
                  <TableRow
                    key={plan.id}
                    className="border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                  >
                    <TableCell>
                      <div>
                        <span className="font-bold text-white">{plan.name}</span>
                        {plan.description && (
                          <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[14rem]">
                            {plan.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(Number(plan.monthlyPrice))}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 text-xs text-zinc-400 min-w-[9rem]">
                        <span className="flex items-center gap-1">
                          <span className="text-zinc-600">Pix</span>
                          <span className="text-white font-medium">{Number(plan.pixFeePercent).toFixed(2)}%</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-zinc-600">Cartão</span>
                          <span className="text-white font-medium">{Number(plan.creditCardFeePercent).toFixed(2)}%</span>
                        </span>
                        <span className="flex items-center gap-1 mt-0.5 pt-0.5 border-t border-zinc-800">
                          <TrendingUp className="w-3 h-3 text-amber-500" />
                          <span className="text-amber-400 font-medium">
                            + R$ {Number(plan.platformFeeFixed).toFixed(2)}
                          </span>
                          <span className="text-zinc-600">fixo</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 min-w-[9rem]">
                        <span className="flex items-center gap-1 text-xs text-zinc-400">
                          <Pencil className="w-3 h-3 text-zinc-600" />
                          Serviços:{" "}
                          <span className="text-white font-medium">
                            {plan.maxServices ?? "∞"}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-400">
                          <Users className="w-3 h-3 text-zinc-600" />
                          Equipe:{" "}
                          <span className="text-white font-medium">
                            {plan.maxTeamMembers ?? "∞"}
                          </span>
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.hasLoyaltyPlans
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Planos de fidelidade para clientes"
                          >
                            <Star className="w-2.5 h-2.5" /> Fidelidade
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.hasAiAgent
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Agente de IA"
                          >
                            <Bot className="w-2.5 h-2.5" /> IA
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.hasChatBot
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Chat Bot"
                          >
                            <MessageSquare className="w-2.5 h-2.5" /> Bot
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.canDisableOnlinePayment
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Pode desativar pagamento online"
                          >
                            <XCircle className="w-2.5 h-2.5" /> Pag.
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.canCustomizeAppearance
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Personalização visual do link"
                          >
                            <Palette className="w-2.5 h-2.5" /> Visual
                          </span>
                          <span
                            className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              plan.hasMarketingSystem
                                ? "bg-pink-500/10 text-pink-400 border-pink-500/20"
                                : "bg-zinc-800 text-zinc-600 border-zinc-700"
                            }`}
                            title="Sistema de marketing"
                          >
                            <Megaphone className="w-2.5 h-2.5" /> Mkt
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-zinc-400">{plan._count?.tenants ?? 0}</span>
                    </TableCell>
                    <TableCell>
                      {plan.active ? (
                        <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-bold uppercase">
                          <XCircle className="w-3.5 h-3.5" /> Inativo
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-zinc-800"
                        onClick={() => openEdit(plan)}
                        title="Editar plano"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <DollarSign className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Ticket Médio p/ Plano</p>
              <p className="text-2xl font-bold text-white">
                {plans?.length
                  ? formatCurrency(
                      plans.reduce((s, p) => s + Number(p.monthlyPrice), 0) / plans.length
                    )
                  : "R$ 0,00"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Receita Projetada</p>
              <p className="text-2xl font-bold text-white">
                {plans?.length
                  ? formatCurrency(
                      plans.reduce(
                        (s, p) => s + Number(p.monthlyPrice) * (p._count?.tenants || 0),
                        0
                      )
                    )
                  : "R$ 0,00"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <PlanFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </div>
  );
}
