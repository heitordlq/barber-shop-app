"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Calendar, Star, Users, Trash, Lock } from "lucide-react";
import { usePlanLimits } from "@/hooks/use-plan-limits";

const DAYS = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];

const INTERVAL_LABELS: Record<string, string> = {
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
};

export default function PlansPage() {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { plan: tenantPlan, isLoading: planLoading } = usePlanLimits();

  // Queries
  const { data: plans, isLoading: loadingPlans } = useQuery({
    queryKey: ["loyalty-plans"],
    queryFn: async () => (await api.get("/loyalty/plans")).data,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get("/services")).data,
  });

  // State
  const [form, setForm] = useState<any>({
    id: "",
    name: "",
    description: "",
    price: 0,
    interval: "MONTHLY",
    items: []
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => api.post("/loyalty/plans", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loyalty-plans"] });
      setModalOpen(false);
      toast.success("Plano de fidelidade criado!");
    },
    onError: (err: any) => {
       console.error(err);
       toast.error(err.response?.data?.message || "Erro ao criar plano. Verifique os dados.");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.patch(`/loyalty/plans/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loyalty-plans"] });
      setModalOpen(false);
      toast.success("Plano atualizado!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Erro ao atualizar plano"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/loyalty/plans/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loyalty-plans"] });
      toast.success("Plano desativado!");
    },
  });

  const handleSubmit = () => {
    if (!form.name || form.items.length === 0) {
      toast.error("Preencha o nome e adicione pelo menos um serviço ao plano");
      return;
    }

    const { id, ...data } = form;
    if (isEdit) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        { serviceId: "", quantity: 4, allowedDays: [1, 2, 3, 4, 5, 6] }
      ]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...form.items];
    newItems.splice(index, 1);
    setForm({ ...form, items: newItems });
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [key]: value };
    setForm({ ...form, items: newItems });
  };

  const toggleDay = (itemIndex: number, day: number) => {
    const item = form.items[itemIndex];
    let newDays = [...item.allowedDays];
    if (newDays.includes(day)) {
      newDays = newDays.filter(d => d !== day);
    } else {
      newDays.push(day);
    }
    updateItem(itemIndex, "allowedDays", newDays);
  };

  const handleEdit = (p: any) => {
    setIsEdit(true);
    setForm({
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: Number(p.price),
      interval: p.interval,
      items: p.items.map((it: any) => ({
        serviceId: it.serviceId,
        quantity: it.quantity,
        allowedDays: it.allowedDays
      }))
    });
    setModalOpen(true);
  };

  // Proteção de acesso: plano do tenant não inclui fidelidade
  if (!planLoading && tenantPlan != null && tenantPlan.hasLoyaltyPlans === false) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Recurso não incluso no plano</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Planos de fidelidade para clientes não estão disponíveis no seu plano atual{" "}
            <span className="text-white font-medium">({tenantPlan.name})</span>.
            Entre em contato com o suporte para fazer um upgrade.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500" />
            Planos de Fidelidade
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Crie "Clubes de Assinatura" para seus clientes fiéis</p>
        </div>
        
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger
            render={
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                onClick={() => {
                  setIsEdit(false);
                  setForm({ name: "", description: "", price: 200, interval: "MONTHLY", items: [] });
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Novo Plano
              </Button>
            }
          />
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Editar Plano" : "Criar Novo Plano de Assinatura"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Plano</Label>
                  <Input 
                    placeholder="Assinatura Mensal VIP"
                    className="bg-zinc-800 border-zinc-700"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preço (R$)</Label>
                  <Input 
                    type="number"
                    className="bg-zinc-800 border-zinc-700"
                    value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Periodicidade</Label>
                <Select value={form.interval} onValueChange={val => setForm({...form, interval: val})}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <span className="flex-1 text-left">
                      {INTERVAL_LABELS[form.interval] || "Selecione..."}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="WEEKLY">Semanal</SelectItem>
                    <SelectItem value="MONTHLY">Mensal</SelectItem>
                    <SelectItem value="YEARLY">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-amber-500 font-bold">Serviços e Regras</Label>
                  <Button variant="outline" size="sm" onClick={addItem} className="h-8 border-zinc-700 hover:bg-zinc-800 text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Serviço
                  </Button>
                </div>

                {form.items.map((item: any, idx: number) => (
                  <Card key={idx} className="bg-zinc-800/50 border-zinc-700 p-4 relative">
                    <Button 
                      variant="ghost" size="sm" 
                      className="absolute top-2 right-2 text-zinc-500 hover:text-red-400"
                      onClick={() => removeItem(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Serviço</Label>
                        <Select 
                          value={item.serviceId} 
                          onValueChange={val => updateItem(idx, "serviceId", val)}
                        >
                          <SelectTrigger className="bg-zinc-900 border-zinc-700 h-9">
                            <span className="flex-1 text-left truncate">
                               {services?.find((s: any) => s.id === item.serviceId)?.name || item.serviceId || "Selecione o serviço..."}
                            </span>
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            {services?.map((s: any) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Qtd. no Ciclo</Label>
                        <Input 
                          type="number" className="bg-zinc-900 border-zinc-700 h-9"
                          value={item.quantity} onChange={e => updateItem(idx, "quantity", Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-zinc-500">Dias da Semana Permitidos</Label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map(day => (
                          <button
                            key={day.value}
                            onClick={() => toggleDay(idx, day.value)}
                            className={`px-2 py-1 text-[10px] rounded uppercase font-bold transition-all border ${
                              item.allowedDays.includes(day.value)
                                ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                                : 'bg-zinc-900 text-zinc-600 border-zinc-800 hover:border-zinc-600'
                            }`}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-11"
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {isEdit ? "Salvar Alterações" : "Criar Plano de Fidelidade"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loadingPlans ? (
          [1,2].map(i => <Skeleton key={i} className="h-48 bg-zinc-900 rounded-xl" />)
        ) : plans?.length === 0 ? (
          <Card className="col-span-full bg-zinc-900 border-dashed border-zinc-800 py-12">
            <CardContent className="flex flex-col items-center text-center">
              <Star className="w-12 h-12 text-zinc-800 mb-4" />
              <h3 className="text-lg font-medium text-white">Nenhum plano criado</h3>
              <p className="text-zinc-500 max-w-xs mt-1">
                Crie planos como "Cabelo Livre" ou "VIP Mensal" para fidelizar seus clientes.
              </p>
            </CardContent>
          </Card>
        ) : plans?.map((plan: any) => (
          <Card key={plan.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500/30 transition-all">
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                </div>
                <CardDescription className="text-zinc-500">
                  {INTERVAL_LABELS[plan.interval as string] || plan.interval}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">R$ {Number(plan.price).toFixed(2)}</p>
                <div className="flex gap-2 mt-2 justify-end">
                   <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)} className="h-8 w-8 p-0 text-zinc-500 hover:text-amber-500">
                      <Edit className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(plan.id)} className="h-8 w-8 p-0 text-zinc-500 hover:text-red-500">
                      <Trash className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.items.map((it: any) => (
                  <div key={it.id} className="flex items-center justify-between text-sm p-2 bg-zinc-800/40 rounded border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-amber-500 border-amber-500/20">{it.quantity}x</Badge>
                      <span className="text-zinc-300">{it.service?.name || "Serviço não identificado"}</span>
                    </div>
                    <div className="flex gap-1">
                       {it.allowedDays.map((d: number) => (
                         <span key={d} className="text-[9px] uppercase text-zinc-600 font-bold">{DAYS.find(day => day.value === d)?.label.charAt(0)}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
