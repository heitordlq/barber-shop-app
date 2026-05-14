"use client";

import { formatBrazilPhone, phoneDigitsForApi, phoneHaystackIncludesQuery } from "@barbearia/phone-br";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone, Loader2, Calendar, Hash, Star, CheckCircle, XCircle, AlertCircle, TrendingUp, Plus, Search, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Filtro do dono: assinaturas com barberId null (ainda sem profissional na carteira). */
const UNASSIGNED_SUBS_FILTER = "__unassigned__";
/** Lista todas as assinaturas (sem filtrar por barbeiro). */
const ALL_SUBS_FILTER = "__all__";
const SEM_PROFISSIONAL_LABEL = "Sem profissional vinculado";
/** Placeholder interno dos Selects de equipe (sempre controlado no Base UI). */
const TEAM_PICK_NONE = "__team_pick_none__";

export default function ClientesPage() {
  const qc = useQueryClient();
  const authUser = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState<"clientes" | "assinantes">("clientes");
  const [search, setSearch] = useState("");
  const [subsBarberFilter, setSubsBarberFilter] = useState<string>(ALL_SUBS_FILTER);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSub, setAssignSub] = useState<any | null>(null);
  const [assignBarberId, setAssignBarberId] = useState(TEAM_PICK_NONE);
  
  // Modals state
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [teamNotesClientId, setTeamNotesClientId] = useState<string | null>(null);
  const [newTeamNoteClientes, setNewTeamNoteClientes] = useState("");

  // Form states
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "" });
  const [newSub, setNewSub] = useState({ 
    searchClient: "", 
    selectedClientId: "", 
    selectedPlanId: "",
    isNewClient: false,
    newName: "",
    newEmail: "",
    newPhone: "",
    barberId: TEAM_PICK_NONE,
  });

  const { data: clients, isLoading: loadingClients, refetch: refetchClients } = useQuery({
    queryKey: ["clientes", search],
    queryFn: async () => {
      const qs = search ? `?search=${search}` : "";
      const res = await api.get(`/tenant-users/clientes${qs}`);
      return res.data;
    },
    enabled: activeTab === "clientes" || isAddingSub
  });

  const { data: teamNotesDialog = [], isLoading: teamNotesDialogLoading } = useQuery({
    queryKey: ["client-team-notes", teamNotesClientId],
    queryFn: async () =>
      (await api.get(`/tenant-users/clientes/${teamNotesClientId}/notas-equipe`)).data,
    enabled: !!teamNotesClientId,
  });

  const addTeamNoteClientesMut = useMutation({
    mutationFn: async ({ clientId, body }: { clientId: string; body: string }) =>
      (await api.post(`/tenant-users/clientes/${clientId}/notas-equipe`, { body })).data,
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["client-team-notes", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["clientes"] });
      qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "appointments" });
      setNewTeamNoteClientes("");
      toast.success("Nota salva");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || err.message || "Erro ao salvar nota"),
  });

  const { data: plans } = useQuery({
    queryKey: ["loyalty-plans-dashboard"],
    queryFn: async () => {
      const res = await api.get("/loyalty/plans");
      return res.data;
    },
    enabled: isAddingSub
  });

  const selectedPlan = useMemo(() => {
    if (!plans || !newSub.selectedPlanId) return null;
    return plans.find((p: any) => p.id === newSub.selectedPlanId) || null;
  }, [plans, newSub.selectedPlanId]);

  const { data: tenantMe } = useQuery({
    queryKey: ["tenant-me"],
    queryFn: async () => (await api.get("/tenants/me")).data,
    staleTime: 60_000,
  });
  const separateLoyaltyByBarber = !!tenantMe?.separateCashRegisterEnabled;

  const { data: team } = useQuery({
    queryKey: ["equipe-clientes"],
    queryFn: async () => (await api.get("/tenant-users/equipe")).data,
    enabled:
      separateLoyaltyByBarber &&
      (activeTab === "clientes" || activeTab === "assinantes" || isAddingSub),
  });

  /** Dono + caixa separado + aba Lista: todas as assinaturas para resumo (planos / barbeiros) nos cards. */
  const { data: subsOverview, refetch: refetchSubsOverview } = useQuery({
    queryKey: ["loyalty-subscriptions-overview", separateLoyaltyByBarber],
    queryFn: async () => (await api.get("/loyalty/subscriptions")).data,
    enabled:
      activeTab === "clientes" &&
      separateLoyaltyByBarber &&
      authUser?.role === "OWNER",
    staleTime: 30_000,
  });

  const { data: subscriptions, isLoading: loadingSubs, refetch: refetchSubs } = useQuery({
    queryKey: ["loyalty-subscriptions", subsBarberFilter, separateLoyaltyByBarber, authUser?.id, authUser?.role],
    queryFn: async () => {
      const qs = new URLSearchParams();
      if (separateLoyaltyByBarber && authUser?.role === "OWNER") {
        if (subsBarberFilter === UNASSIGNED_SUBS_FILTER) {
          qs.set("unassigned", "1");
        } else if (subsBarberFilter && subsBarberFilter !== ALL_SUBS_FILTER) {
          qs.set("barberId", subsBarberFilter);
        }
      }
      const suffix = qs.toString() ? `?${qs.toString()}` : "";
      const res = await api.get(`/loyalty/subscriptions${suffix}`);
      return res.data;
    },
    enabled:
      (activeTab === "assinantes" || activeTab === "clientes") &&
      (!separateLoyaltyByBarber || authUser?.role !== "OWNER" || !!subsBarberFilter),
  });

  const subscriptionsForClientCards = useMemo(() => {
    const subs = (subscriptions || []) as any[];
    if (!separateLoyaltyByBarber) return subs;
    if (authUser?.role === "BARBER") return subs;
    if (authUser?.role === "OWNER") return subs;
    return [];
  }, [subscriptions, separateLoyaltyByBarber, authUser?.role]);

  const teamMembers = (team || []) as { id: string; name: string; role: string }[];
  const barberNameById = useMemo(() => {
    const m = new Map<string, string>();
    for (const mbr of teamMembers) {
      if (mbr?.id && mbr?.name) m.set(mbr.id, mbr.name);
    }
    return m;
  }, [teamMembers]);

  const barberFilterOptions = useMemo(() => {
    const opts: { id: string; label: string }[] = [];
    if (!separateLoyaltyByBarber || authUser?.role !== "OWNER") return opts;
    opts.push({ id: ALL_SUBS_FILTER, label: "Todos" });
    opts.push({ id: UNASSIGNED_SUBS_FILTER, label: SEM_PROFISSIONAL_LABEL });
    const owners = teamMembers.filter((m) => m.role === "OWNER");
    const barbers = teamMembers.filter((m) => m.role === "BARBER");
    const ownerIds = new Set(owners.map((o) => o.id));
    for (const m of owners) {
      opts.push({ id: m.id, label: `${m.name} (proprietário)` });
    }
    for (const m of barbers) {
      if (ownerIds.has(m.id)) continue;
      opts.push({ id: m.id, label: m.name });
    }
    return opts;
  }, [separateLoyaltyByBarber, authUser, teamMembers]);

  /** Valor sempre definido para o Select (evita uncontrolled → controlled no Base UI). */
  const subsFilterSelectValue =
    !subsBarberFilter || subsBarberFilter === "" ? ALL_SUBS_FILTER : subsBarberFilter;

  const subsFilterDisplayLabel = useMemo(() => {
    const hit = barberFilterOptions.find((o) => o.id === subsFilterSelectValue);
    if (hit) return hit.label;
    return barberNameById.get(subsFilterSelectValue) || subsFilterSelectValue;
  }, [barberFilterOptions, barberNameById, subsFilterSelectValue]);

  /** Dono + barbeiros para vincular assinatura (PATCH /subscriptions/:id/barber). */
  const assignBarberOptions = useMemo(() => {
    const opts: { id: string; label: string }[] = [];
    const owners = teamMembers.filter((m) => m.role === "OWNER");
    const barbers = teamMembers.filter((m) => m.role === "BARBER");
    const ownerIds = new Set(owners.map((o) => o.id));
    for (const m of owners) {
      opts.push({ id: m.id, label: `${m.name} (proprietário)` });
    }
    for (const m of barbers) {
      if (ownerIds.has(m.id)) continue;
      opts.push({ id: m.id, label: m.name });
    }
    return opts;
  }, [teamMembers]);

  /** Resumo por cliente: planos ativos e com quais profissionais (visão do dono, caixa separado). */
  const loyaltySummaryByUserId = useMemo(() => {
    type Summary = {
      planNames: string[];
      barberLabels: string[];
      unassignedSubscriptionIds: string[];
    };
    const map = new Map<string, Summary>();
    if (!separateLoyaltyByBarber || authUser?.role !== "OWNER") return map;

    const subs = (subsOverview || []) as any[];
    for (const s of subs) {
      if (s.status !== "ACTIVE") continue;
      const uid = s.userId || s.user?.id;
      if (!uid) continue;
      const pname = s.plan?.name as string | undefined;
      const bid = s.barberId as string | null | undefined;
      const barberLabel = bid ? barberNameById.get(bid) || "Profissional" : SEM_PROFISSIONAL_LABEL;

      let row = map.get(uid);
      if (!row) {
        row = { planNames: [], barberLabels: [], unassignedSubscriptionIds: [] };
        map.set(uid, row);
      }
      if (pname && !row.planNames.includes(pname)) row.planNames.push(pname);
      if (!row.barberLabels.includes(barberLabel)) row.barberLabels.push(barberLabel);
      if (!bid && s.id && !row.unassignedSubscriptionIds.includes(s.id)) {
        row.unassignedSubscriptionIds.push(s.id);
      }
    }
    return map;
  }, [subsOverview, separateLoyaltyByBarber, authUser?.role, barberNameById]);

  useEffect(() => {
    if (!isAddingSub || !separateLoyaltyByBarber) return;
    if (authUser?.role !== "BARBER") return;
    setNewSub((s) => (s.barberId === authUser.id ? s : { ...s, barberId: authUser.id }));
  }, [isAddingSub, separateLoyaltyByBarber, authUser?.role, authUser?.id]);

  useEffect(() => {
    if (separateLoyaltyByBarber && authUser?.role === "OWNER" && subsBarberFilter === "") {
      setSubsBarberFilter(ALL_SUBS_FILTER);
    }
  }, [separateLoyaltyByBarber, authUser?.role, subsBarberFilter]);

  const activeSubByUserId = useMemo(() => {
    const subs = subscriptionsForClientCards;
    const map = new Map<string, any>();
    for (const s of subs) {
      const uid = s?.userId || s?.user?.id;
      if (!uid) continue;
      if (s.status !== "ACTIVE") continue;
      // se houver mais de um, pega o mais recente
      const prev = map.get(uid);
      if (!prev) map.set(uid, s);
      else {
        const a = new Date(prev.createdAt || prev.startDate || 0).getTime();
        const b = new Date(s.createdAt || s.startDate || 0).getTime();
        if (b > a) map.set(uid, s);
      }
    }
    return map;
  }, [subscriptionsForClientCards]);

  function subUsageSummary(sub: any) {
    const items = sub?.plan?.items || [];
    const usages = sub?.usages || [];
    const total = items.reduce((acc: number, it: any) => acc + Number(it.quantity || 0), 0);
    const used = items.reduce((acc: number, it: any) => {
      const u = usages.filter((x: any) => x?.appointment?.serviceId === it.serviceId).length;
      return acc + u;
    }, 0);
    return { used, total, remaining: Math.max(0, total - used) };
  }

  const handleAddClient = async () => {
    try {
      await api.post("/tenant-users/clientes", {
        ...newClient,
        phone: phoneDigitsForApi(newClient.phone) || undefined,
      });
      toast.success("Cliente cadastrado com sucesso!");
      setIsAddingClient(false);
      setNewClient({ name: "", email: "", phone: "" });
      refetchClients();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao cadastrar cliente");
    }
  };

  const handleCreateSub = async () => {
    try {
      if (separateLoyaltyByBarber) {
        const bid =
          authUser?.role === "BARBER"
            ? authUser.id
            : newSub.barberId;
        if (!bid || bid === TEAM_PICK_NONE) {
          toast.error("Selecione o barbeiro responsável por esta assinatura.");
          return;
        }
      }

      const payload: any = newSub.isNewClient
        ? {
            planId: newSub.selectedPlanId,
            name: newSub.newName,
            email: newSub.newEmail,
            phone: phoneDigitsForApi(newSub.newPhone) || undefined,
          }
        : {
            planId: newSub.selectedPlanId,
            email: clients?.find((c: any) => c.id === newSub.selectedClientId)?.email,
            phone: clients?.find((c: any) => c.id === newSub.selectedClientId)?.phone,
          };

      if (separateLoyaltyByBarber) {
        payload.barberId =
          authUser?.role === "BARBER" ? authUser.id : newSub.barberId;
      }

      await api.post("/loyalty/subscriptions/manual", payload);
      toast.success("Assinatura criada com sucesso!");
      setIsAddingSub(false);
      setNewSub({
        searchClient: "",
        selectedClientId: "",
        selectedPlanId: "",
        isNewClient: false,
        newName: "",
        newEmail: "",
        newPhone: "",
        barberId: TEAM_PICK_NONE,
      });
      refetchSubs();
      refetchSubsOverview();
      refetchClients();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao criar assinatura");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/loyalty/subscriptions/${id}/status`, { status });
      toast.success(`Status atualizado para ${status}`);
      refetchSubs();
      refetchSubsOverview();
    } catch (err) {
      toast.error("Erro ao atualizar status");
    }
  };

  const openAssignForClient = (clientId: string) => {
    const leg = (subsOverview || []).filter(
      (s: any) =>
        s.status === "ACTIVE" &&
        (s.userId || s.user?.id) === clientId &&
        (s.barberId == null || s.barberId === ""),
    );
    if (!leg.length) return;
    setAssignSub(leg[0]);
    setAssignBarberId(TEAM_PICK_NONE);
    setAssignOpen(true);
  };

  const submitAssignBarber = async () => {
    if (!assignSub?.id || !assignBarberId || assignBarberId === TEAM_PICK_NONE) {
      toast.error("Selecione o profissional.");
      return;
    }
    try {
      await api.patch(`/loyalty/subscriptions/${assignSub.id}/barber`, { barberId: assignBarberId });
      toast.success("Plano vinculado ao profissional.");
      setAssignOpen(false);
      setAssignSub(null);
      setAssignBarberId(TEAM_PICK_NONE);
      refetchSubs();
      refetchSubsOverview();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Não foi possível atualizar a assinatura.");
    }
  };

  const isPendingReturn = (client: any) => {
    if (!client.lastVisit) return false;
    if (client.lastStatus !== "COMPLETED") return false;
    const diff = Date.now() - new Date(client.lastVisit).getTime();
    return diff > 30 * 24 * 60 * 60 * 1000;
  };

  const filteredSearchClients = useMemo(() => {
    if (!newSub.searchClient) return [];
    return clients
      ?.filter(
        (c: any) =>
          c.name.toLowerCase().includes(newSub.searchClient.toLowerCase()) ||
          phoneHaystackIncludesQuery(c.phone, newSub.searchClient),
      )
      .slice(0, 5);
  }, [clients, newSub.searchClient]);

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            Gestão de Clientes
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            {activeTab === "clientes" 
              ? (clients ? `${clients.length} cliente${clients.length !== 1 ? "s" : ""} encontrado${clients.length !== 1 ? "s" : ""}` : "Buscando...")
              : (subscriptions ? `${subscriptions.length} assinatura${subscriptions.length !== 1 ? "s" : ""} encontrada${subscriptions.length !== 1 ? "s" : ""}` : "Buscando...")
            }
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Quick Actions */}
          <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
            <DialogTrigger render={<Button variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Plus className="w-4 h-4 mr-2" /> Novo Cliente
              </Button>} />
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    placeholder="Ex: João Silva" 
                    className="bg-zinc-900 border-zinc-800"
                    value={newClient.name}
                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone (WhatsApp)</Label>
                  <Input
                    placeholder="(11) 9 9999-9999"
                    className="bg-zinc-900 border-zinc-800"
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, phone: formatBrazilPhone(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail (Opcional)</Label>
                  <Input 
                    type="email" 
                    placeholder="joao@email.com" 
                    className="bg-zinc-900 border-zinc-800"
                    value={newClient.email}
                    onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddClient} className="bg-amber-500 text-black hover:bg-amber-600">Salvar Cliente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingSub} onOpenChange={setIsAddingSub}>
            <DialogTrigger render={<Button className="bg-amber-500 text-black hover:bg-amber-600 shadow-lg shadow-amber-500/10">
                <Star className="w-4 h-4 mr-2" /> Vender plano (assinatura)
              </Button>} />
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
              <DialogHeader>
                <DialogTitle>Vender Plano de Fidelidade</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 py-4">
                {/* Step 1: Client Selection */}
                {!newSub.selectedClientId && !newSub.isNewClient ? (
                  <div className="space-y-3">
                    <Label>Buscar Cliente</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input 
                        placeholder="Nome ou Telefone..." 
                        className="bg-zinc-900 border-zinc-800 pl-9"
                        value={newSub.searchClient}
                        onChange={e => setNewSub({ ...newSub, searchClient: e.target.value })}
                      />
                    </div>
                    {filteredSearchClients.length > 0 && (
                      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                        {filteredSearchClients.map((c: any) => (
                          <button
                            key={c.id}
                            className="w-full px-4 py-3 text-left hover:bg-zinc-800 border-b border-zinc-800/50 last:border-0 transition-colors"
                            onClick={() => setNewSub({ ...newSub, selectedClientId: c.id, searchClient: "" })}
                          >
                            <p className="font-medium text-sm">{c.name}</p>
                            <p className="text-xs text-zinc-500">
                              {c.phone ? formatBrazilPhone(c.phone) : c.email}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full text-amber-500 hover:text-amber-400 hover:bg-amber-500/5"
                      onClick={() => setNewSub({ ...newSub, isNewClient: true })}
                    >
                      + Cadastrar novo cliente
                    </Button>
                  </div>
                ) : (
                  <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Cliente Selecionado</p>
                      <p className="font-medium">{newSub.isNewClient ? newSub.newName : clients?.find((c: any) => c.id === newSub.selectedClientId)?.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setNewSub({ ...newSub, selectedClientId: "", isNewClient: false })} className="text-zinc-500">Alterar</Button>
                  </div>
                )}

                {/* New Client Form if selected */}
                {newSub.isNewClient && (
                  <div className="space-y-3 p-4 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-800">
                    <div className="space-y-2">
                       <Label className="text-[11px] text-zinc-500">Nome do Novo Cliente</Label>
                       <Input 
                        placeholder="Nome..." 
                        className="bg-zinc-900 border-zinc-800 h-9 text-sm"
                        value={newSub.newName}
                        onChange={e => setNewSub({ ...newSub, newName: e.target.value })}
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[11px] text-zinc-500">Telefone</Label>
                       <Input
                        placeholder="(11) 9 9999-9999"
                        className="bg-zinc-900 border-zinc-800 h-9 text-sm"
                        value={newSub.newPhone}
                        onChange={(e) =>
                          setNewSub({ ...newSub, newPhone: formatBrazilPhone(e.target.value) })
                        }
                       />
                    </div>
                  </div>
                )}

                {separateLoyaltyByBarber && authUser?.role === "OWNER" && (
                  <div className="space-y-2">
                    <Label>Barbeiro da assinatura</Label>
                    <p className="text-[11px] text-zinc-500">
                      Com caixa separado, cada assinatura fica vinculada ao profissional que recebe o pagamento.
                    </p>
                    <Select
                      value={newSub.barberId === "" ? TEAM_PICK_NONE : newSub.barberId}
                      onValueChange={(val) =>
                        setNewSub({ ...newSub, barberId: val === TEAM_PICK_NONE || !val ? TEAM_PICK_NONE : val })
                      }
                    >
                      <SelectTrigger className="bg-zinc-900 border-zinc-800">
                        <span className="truncate">
                          {newSub.barberId === TEAM_PICK_NONE || newSub.barberId === ""
                            ? "Selecione o profissional"
                            : assignBarberOptions.find((o) => o.id === newSub.barberId)?.label ||
                              barberNameById.get(newSub.barberId) ||
                              newSub.barberId}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value={TEAM_PICK_NONE}>Selecione…</SelectItem>
                        {assignBarberOptions.map((o) => (
                          <SelectItem key={o.id} value={o.id}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Step 2: Plan Selection */}
                <div className="space-y-2">
                  <Label>Escolha o Plano</Label>
                  <Select
                    value={newSub.selectedPlanId}
                    onValueChange={(val) => setNewSub({ ...newSub, selectedPlanId: val ?? "" })}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                      {selectedPlan ? (
                        <span className="truncate">
                          {selectedPlan.name} - R$ {Number(selectedPlan.price).toFixed(2)}
                        </span>
                      ) : (
                        <SelectValue placeholder="Selecione um plano" />
                      )}
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {plans?.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>{p.name} - R$ {Number(p.price).toFixed(2)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleCreateSub} 
                  disabled={
                    !newSub.selectedPlanId ||
                    (!newSub.selectedClientId && !newSub.isNewClient) ||
                    (separateLoyaltyByBarber &&
                      authUser?.role === "OWNER" &&
                      (!newSub.barberId || newSub.barberId === TEAM_PICK_NONE))
                  }
                  className="w-full bg-amber-500 text-black hover:bg-amber-600"
                >
                  Confirmar venda do plano
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="h-8 w-[1px] bg-zinc-800 hidden md:block mx-1" />

          {/* Tabs */}
          <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button 
              onClick={() => setActiveTab("clientes")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "clientes" ? "bg-amber-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
            >
              Lista
            </button>
            <button 
              onClick={() => setActiveTab("assinantes")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "assinantes" ? "bg-amber-500 text-black shadow-lg" : "text-zinc-400 hover:text-white"}`}
            >
              Assinantes
            </button>
          </div>
        </div>
      </div>

      {activeTab === "clientes" ? (
        <>
          {separateLoyaltyByBarber && authUser?.role === "OWNER" && (
            <div className="mb-4 flex flex-col sm:flex-row sm:items-end gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs text-zinc-400">Plano ativo por profissional</Label>
                <p className="text-[11px] text-zinc-500">
                  Em &quot;Todos&quot; vê todas as assinaturas; em &quot;Sem profissional vinculado&quot;, só as que ainda precisam de barbeiro; depois filtre por proprietário ou barbeiro para ver o consumo na lista.
                </p>
              </div>
              <div className="w-full sm:w-64 space-y-1.5">
                <Label className="text-[11px] text-zinc-500">Barbeiro</Label>
                <Select
                  value={subsFilterSelectValue}
                  onValueChange={(v) => setSubsBarberFilter(v && v.length > 0 ? v : ALL_SUBS_FILTER)}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 w-full min-w-0">
                    <span className="truncate text-left text-white">{subsFilterDisplayLabel}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    {barberFilterOptions.length === 0 ? (
                      <div className="px-2 py-2 text-xs text-zinc-500">Carregando equipe…</div>
                    ) : (
                      barberFilterOptions.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="mb-6 max-w-md relative group">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              className="border-zinc-800 bg-zinc-900 text-white w-full h-11 pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loadingClients ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!clients || clients.length === 0 ? (
                <p className="text-zinc-500 col-span-full text-center py-12">
                  Nenhum cliente encontrado.
                </p>
              ) : (
                clients.map((client: any) => {
                  const pending = isPendingReturn(client);
                  const loyaltySummary = client?.id ? loyaltySummaryByUserId.get(client.id) : undefined;
                  const activeSub = client?.id ? activeSubByUserId.get(client.id) : null;
                  const usage = activeSub ? subUsageSummary(activeSub) : null;
                  const hasPlanHighlight =
                    !!activeSub ||
                    (!!loyaltySummary &&
                      (loyaltySummary.planNames.length > 0 || loyaltySummary.barberLabels.length > 0));
                  return (
                    <Card
                      key={client.id}
                      className={`bg-zinc-900 transition-all ${
                        pending
                          ? "border-l-4 border-l-red-500 border-zinc-800"
                          : "border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-base truncate">
                              {client.name}
                            </h3>
                            {client.phone && (
                              <p className="text-sm text-zinc-400 flex items-center gap-1 mt-0.5">
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                {formatBrazilPhone(client.phone)}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {pending && (
                              <Badge className="shrink-0 bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                                Retorno Pendente
                              </Badge>
                            )}
                            {client.isRegistered && (
                               <Badge className="shrink-0 bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">
                                Cadastrado
                             </Badge>
                            )}
                            {hasPlanHighlight && (
                              <Badge className="shrink-0 bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">
                                Plano ativo
                              </Badge>
                            )}
                          </div>
                        </div>

                        {client.isRegistered && !String(client.id).startsWith("virtual-") && (
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {(client.teamNotesCount ?? 0) > 0 && (
                              <Badge className="shrink-0 bg-amber-500/15 text-amber-300 border-amber-500/35 text-[10px]">
                                {client.teamNotesCount} nota(s) interna(s)
                              </Badge>
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs border-zinc-600 text-zinc-200 hover:bg-zinc-800"
                              onClick={() => {
                                setTeamNotesClientId(client.id);
                                setNewTeamNoteClientes("");
                              }}
                            >
                              <StickyNote className="w-3.5 h-3.5 mr-1 shrink-0" aria-hidden />
                              Notas da equipe
                            </Button>
                          </div>
                        )}

                        {separateLoyaltyByBarber &&
                          authUser?.role === "OWNER" &&
                          loyaltySummary &&
                          (loyaltySummary.planNames.length > 0 ||
                            loyaltySummary.barberLabels.length > 0) && (
                            <div className="rounded-lg border border-zinc-700/80 bg-zinc-950/60 px-3 py-2 mb-3">
                              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                                Fidelidade (visão geral)
                              </p>
                              {loyaltySummary.planNames.length > 0 && (
                                <p className="text-xs text-zinc-200 mt-1">
                                  <span className="text-zinc-500">Planos:</span>{" "}
                                  <span className="text-white font-medium">
                                    {loyaltySummary.planNames.join(", ")}
                                  </span>
                                </p>
                              )}
                              {loyaltySummary.barberLabels.length > 0 && (
                                <p className="text-xs text-zinc-200 mt-0.5">
                                  <span className="text-zinc-500">Profissionais:</span>{" "}
                                  <span className="text-white">{loyaltySummary.barberLabels.join(", ")}</span>
                                </p>
                              )}
                              {(loyaltySummary.unassignedSubscriptionIds?.length ?? 0) > 0 && (
                                <p className="text-[10px] text-amber-500/90 mt-1.5">
                                  Há plano sem profissional na carteira — use o botão abaixo ou a aba Assinantes para vincular.
                                </p>
                              )}
                            </div>
                          )}

                        {separateLoyaltyByBarber &&
                          authUser?.role === "OWNER" &&
                          (loyaltySummary?.unassignedSubscriptionIds?.length ?? 0) > 0 && (
                            <div className="mb-3 flex flex-col gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full border-amber-500/30 text-amber-200 hover:bg-amber-500/10 text-xs"
                                onClick={() => openAssignForClient(client.id)}
                              >
                                Vincular plano a um profissional
                              </Button>
                              {(loyaltySummary?.unassignedSubscriptionIds?.length ?? 0) > 1 && (
                                <p className="text-[10px] text-zinc-500">
                                  Este cliente tem mais de um plano sem vínculo — após vincular um, repita na aba Assinantes se precisar.
                                </p>
                              )}
                            </div>
                          )}

                        {activeSub && (
                          <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 mb-3">
                            <p className="text-[10px] text-amber-500 uppercase font-bold tracking-wider">
                              {`Consumo (${subsFilterDisplayLabel})`}
                            </p>
                            <p className="text-xs text-amber-200/90 font-medium mt-0.5 truncate">
                              {activeSub.plan?.name}
                            </p>
                            {usage && (
                              <p className="text-xs text-zinc-200 mt-0.5">
                                Consumido: <b className="text-white">{usage.used}</b> de <b className="text-white">{usage.total}</b>{" "}
                                · Restantes: <b className="text-white">{usage.remaining}</b>
                              </p>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800">
                          <div>
                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Última visita
                            </p>
                            <p className="text-sm font-medium text-zinc-200">
                              {client.lastVisit
                                ? formatDistanceToNow(new Date(client.lastVisit), {
                                    addSuffix: true,
                                    locale: ptBR,
                                  })
                                : "—"}
                            </p>
                            {client.lastVisit && (
                              <p className="text-[11px] text-zinc-500">
                                {format(new Date(client.lastVisit), "dd/MM/yyyy")}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Hash className="w-3 h-3" /> Total de visitas
                            </p>
                            <p className="text-sm font-medium text-zinc-200">
                              {client.totalVisits} visita{client.totalVisits !== 1 ? "s" : ""}
                            </p>
                            <p className={`text-[11px] ${client.lastStatus === "COMPLETED" ? "text-emerald-500" : client.lastStatus === "NO_SHOW" ? "text-red-400" : "text-zinc-500"}`}>
                              último: {client.lastStatus === "COMPLETED" ? "Concluído" : "Faltou"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          {separateLoyaltyByBarber && authUser?.role === "OWNER" && (
            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex-1 space-y-1">
                <Label className="text-xs text-zinc-400">Filtrar por barbeiro</Label>
                <p className="text-[11px] text-zinc-500">
                  Em &quot;Sem profissional vinculado&quot; aparecem assinaturas que ainda não foram atribuídas a um barbeiro.
                </p>
              </div>
              <div className="w-full sm:w-72">
                <Select
                  value={subsFilterSelectValue}
                  onValueChange={(v) => setSubsBarberFilter(v && v.length > 0 ? v : ALL_SUBS_FILTER)}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-800 w-full min-w-0">
                    <span className="truncate text-left text-white">{subsFilterDisplayLabel}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    {barberFilterOptions.length === 0 ? (
                      <div className="px-2 py-2 text-xs text-zinc-500">Carregando equipe…</div>
                    ) : (
                      barberFilterOptions.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {loadingSubs ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : !subscriptions || subscriptions.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">Nenhuma assinatura encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {subscriptions.map((sub: any) => (
                <Card key={sub.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-3">
                           <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                           </div>
                           <div>
                              <h3 className="font-bold text-white text-lg leading-none mb-1">{sub.user.name}</h3>
                              <p className="text-zinc-400 text-sm">{sub.plan.name}</p>
                              {separateLoyaltyByBarber && (
                                <p className="text-[11px] text-zinc-500 mt-1">
                                  Profissional:{" "}
                                  <span className="text-zinc-300">
                                    {sub.barberId
                                      ? barberNameById.get(sub.barberId) || "—"
                                      : SEM_PROFISSIONAL_LABEL}
                                  </span>
                                </p>
                              )}
                           </div>
                        </div>
                        <Badge 
                          className={`${
                            sub.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                            sub.status === 'DELINQUENT' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                            'bg-zinc-800 text-zinc-500 border-zinc-700'
                          }`}
                        >
                          {sub.status === 'ACTIVE' ? 'Ativo' : sub.status === 'DELINQUENT' ? 'Inadimplente' : sub.status}
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-6">
                         {sub.plan.items.map((it: any) => {
                            const used = sub.usages.filter((u: any) => u.appointment.serviceId === it.serviceId).length;
                            const percentage = Math.min((used / it.quantity) * 100, 100);
                            return (
                               <div key={it.id} className="space-y-1.5">
                                  <div className="flex justify-between text-xs">
                                     <span className="text-zinc-300 font-medium">{it.service.name}</span>
                                     <span className="text-zinc-500">{used} de {it.quantity} usados</span>
                                  </div>
                                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                     <div 
                                      className={`h-full transition-all duration-500 ${percentage >= 100 ? 'bg-red-500' : 'bg-amber-500'}`}
                                      style={{ width: `${percentage}%` }}
                                     />
                                  </div>
                               </div>
                            );
                         })}
                      </div>

                      <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
                        {separateLoyaltyByBarber &&
                          authUser?.role === "OWNER" &&
                          sub.status === "ACTIVE" &&
                          (sub.barberId == null || sub.barberId === "") && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="w-full border-amber-500/30 text-amber-200 hover:bg-amber-500/10 text-xs"
                              onClick={() => {
                                setAssignSub(sub);
                                setAssignBarberId(TEAM_PICK_NONE);
                                setAssignOpen(true);
                              }}
                            >
                              Vincular a um profissional
                            </Button>
                          )}
                      <div className="flex items-center justify-between">
                         <div className="text-xs">
                            <p className="text-zinc-500 uppercase tracking-widest text-[10px] mb-0.5">Expira em</p>
                            <p className="text-zinc-300 font-medium">{sub.endDate ? format(new Date(sub.endDate), "dd/MM/yyyy") : "—"}</p>
                         </div>
                         <div className="flex gap-2">
                            {sub.status === 'ACTIVE' ? (
                               <Button 
                                variant="outline" size="sm" 
                                className="h-8 border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs"
                                onClick={() => updateStatus(sub.id, 'DELINQUENT')}
                               >
                                 Marcar Inadimplente
                               </Button>
                            ) : sub.status === 'DELINQUENT' ? (
                               <Button 
                                variant="outline" size="sm" 
                                className="h-8 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 text-xs"
                                onClick={() => updateStatus(sub.id, 'ACTIVE')}
                               >
                                 Marcar Pago
                               </Button>
                            ) : null}
                            <Button 
                              variant="ghost" size="sm" 
                              className="h-8 text-zinc-500 hover:text-zinc-300 text-xs"
                              onClick={() => updateStatus(sub.id, 'CANCELED')}
                            >
                              Cancelar
                            </Button>
                         </div>
                      </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      <Dialog
        open={assignOpen}
        onOpenChange={(o) => {
          setAssignOpen(o);
          if (!o) {
            setAssignSub(null);
            setAssignBarberId(TEAM_PICK_NONE);
          }
        }}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Vincular plano a um profissional</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-xs text-zinc-400">
              Plano: <span className="text-white font-medium">{assignSub?.plan?.name ?? "—"}</span>
              {assignSub?.user?.name && (
                <>
                  {" "}
                  · Cliente: <span className="text-white font-medium">{assignSub.user.name}</span>
                </>
              )}
            </p>
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">Profissional</Label>
              <Select
                value={assignBarberId}
                onValueChange={(v) => setAssignBarberId(v ?? TEAM_PICK_NONE)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <span className="truncate text-left">
                    {assignBarberId === TEAM_PICK_NONE
                      ? "Selecione o profissional"
                      : assignBarberOptions.find((o) => o.id === assignBarberId)?.label ||
                        barberNameById.get(assignBarberId) ||
                        assignBarberId}
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value={TEAM_PICK_NONE}>Selecione…</SelectItem>
                  {assignBarberOptions.length === 0 ? (
                    <div className="px-2 py-2 text-xs text-zinc-500">
                      Nenhum proprietário ou barbeiro na equipe.
                    </div>
                  ) : (
                    assignBarberOptions.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" className="text-zinc-400" onClick={() => setAssignOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-amber-500 text-black hover:bg-amber-600" onClick={() => submitAssignBarber()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!teamNotesClientId}
        onOpenChange={(o) => {
          if (!o) {
            setTeamNotesClientId(null);
            setNewTeamNoteClientes("");
          }
        }}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-lg max-h-[min(90vh,560px)] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-400" aria-hidden />
              Notas internas da equipe
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-zinc-500 -mt-1">
            Só a equipe vê isto. Aparecem na agenda nos agendamentos deste cliente.
          </p>
          <div className="flex-1 min-h-0 overflow-y-auto space-y-2 py-2 pr-1">
            {teamNotesDialogLoading ? (
              <p className="text-sm text-zinc-500">Carregando…</p>
            ) : teamNotesDialog.length === 0 ? (
              <p className="text-sm text-zinc-500">Nenhuma nota ainda.</p>
            ) : (
              teamNotesDialog.map((n: any) => (
                <div key={n.id} className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3 text-sm">
                  <p className="text-zinc-200 whitespace-pre-wrap">{n.body}</p>
                  <p className="text-[11px] text-zinc-500 mt-2">
                    {n.authorName} · {format(new Date(n.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="space-y-2 border-t border-zinc-800 pt-3 shrink-0">
            <Label className="text-xs text-zinc-400">Nova nota</Label>
            <textarea
              className="flex w-full min-h-[80px] rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30"
              placeholder="Observação para a equipe…"
              value={newTeamNoteClientes}
              onChange={(e) => setNewTeamNoteClientes(e.target.value)}
            />
            <Button
              className="w-full bg-amber-500 text-black hover:bg-amber-600"
              disabled={!newTeamNoteClientes.trim() || !teamNotesClientId || addTeamNoteClientesMut.isPending}
              onClick={() => {
                if (!teamNotesClientId) return;
                addTeamNoteClientesMut.mutate({
                  clientId: teamNotesClientId,
                  body: newTeamNoteClientes.trim(),
                });
              }}
            >
              {addTeamNoteClientesMut.isPending ? "Salvando…" : "Adicionar nota"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
