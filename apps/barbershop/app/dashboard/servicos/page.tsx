"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Scissors, Edit, Plus, Clock } from "lucide-react";
import { usePlanLimits } from "@/hooks/use-plan-limits";
import { PlanBlockedBanner } from "@/components/plan-limit-banner";

export default function ServicesPage() {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const planLimits = usePlanLimits();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      return res.data;
    },
  });

  const [form, setForm] = useState({
    id: "", name: "", price: 0, duration: 30, description: ""
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post("/services", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["tenant-me"] });
      setModalOpen(false);
      toast.success("Serviço criado");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Erro ao criar serviço");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.patch(`/services/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      setModalOpen(false);
      toast.success("Serviço atualizado");
    },
  });

  const handleSubmit = () => {
    const { id, ...data } = form;
    if (isEdit) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (s: any) => {
    setIsEdit(true);
    setForm({ id: s.id, name: s.name, price: Number(s.price), duration: s.duration, description: s.description || "" });
    setModalOpen(true);
  };

  const handleCreate = () => {
    setIsEdit(false);
    setForm({ id: "", name: "", price: 40, duration: 45, description: "" });
    setModalOpen(true);
  };

  const canCreate = !planLimits.services.atLimit;

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white">Serviços</h1>
          <p className="text-zinc-500 text-sm mt-1">Gerencie os cortes e serviços da sua barbearia</p>
          {planLimits.services.max != null && (
            <p className="text-xs text-zinc-500 mt-1">
              {planLimits.services.used} de {planLimits.services.max} serviço{planLimits.services.max !== 1 ? "s" : ""} usados
            </p>
          )}
        </div>
        <Dialog open={modalOpen} onOpenChange={canCreate ? setModalOpen : undefined}>
          <DialogTrigger render={
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={canCreate ? handleCreate : undefined}
              disabled={!canCreate}
              title={!canCreate ? `Limite de ${planLimits.services.max} serviços atingido` : undefined}
            >
              <Plus className="w-4 h-4 mr-2" /> Novo Serviço
            </Button>
          } />
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>{isEdit ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nome do Serviço</Label>
                <Input 
                  placeholder="Corte Degradê" className="bg-zinc-800 border-zinc-700"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preço (R$)</Label>
                  <Input 
                    type="number" className="bg-zinc-800 border-zinc-700"
                    value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duração (minutos)</Label>
                  <Input 
                    type="number" className="bg-zinc-800 border-zinc-700" step="15"
                    value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descrição (Opcional)</Label>
                <Input 
                  placeholder="Máquina zero nas laterais..." className="bg-zinc-800 border-zinc-700"
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <Button 
                onClick={handleSubmit} 
                disabled={createMutation.isPending || updateMutation.isPending}
                className="w-full bg-amber-500 text-black hover:bg-amber-600 mt-4"
              >
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {planLimits.services.atLimit && (
        <PlanBlockedBanner
          resource="serviço"
          used={planLimits.services.used}
          max={planLimits.services.max!}
          planName={planLimits.planName}
        />
      )}

      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500">Serviço</TableHead>
              <TableHead className="text-zinc-500">Preço</TableHead>
              <TableHead className="text-zinc-500">Duração</TableHead>
              <TableHead className="text-zinc-500">Status</TableHead>
              <TableHead className="text-zinc-500 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i} className="border-zinc-800">
                  <TableCell colSpan={5}><Skeleton className="h-6 bg-zinc-800" /></TableCell>
                </TableRow>
              ))
            ) : services?.map((s: any) => (
              <TableRow key={s.id} className="border-zinc-800 hover:bg-zinc-800/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                      <Scissors className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{s.name}</p>
                      <p className="text-xs text-zinc-500 truncate max-w-[200px]">{s.description || "—"}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-emerald-400 font-mono">R$ {Number(s.price).toFixed(2)}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{s.duration} min</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={s.active ? "border-emerald-500/30 text-emerald-400" : "border-zinc-500/30 text-zinc-400"}>
                    {s.active ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(s)} className="text-zinc-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
