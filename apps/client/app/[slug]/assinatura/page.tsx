"use client";

import { formatBrazilPhone, phoneDigitsForApi } from "@barbearia/phone-br";
import { useBookingStore } from "@/store/booking.store";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Star, CheckIcon, UserCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const TEAM_PICK_NONE = "__team_pick_none__";

const INTERVAL_LABELS: Record<string, string> = {
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
};

export default function AssinaturaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const slug = params.slug as string;
  const preSelectedPlanId = searchParams.get("planId");

  const { 
    clientName, clientEmail, clientPhone, setClientDetails 
  } = useBookingStore();
  
  const [showIdentificacao, setShowIdentificacao] = useState(!clientEmail && !clientPhone);
  const [tempName, setTempName] = useState(clientName);
  const [tempEmail, setTempEmail] = useState(clientEmail);
  const [tempPhone, setTempPhone] = useState(clientPhone);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [subscribeBarberId, setSubscribeBarberId] = useState(TEAM_PICK_NONE);

  useEffect(() => {
    setSubscribeBarberId(TEAM_PICK_NONE);
  }, [slug]);

  const { data: tenant } = useQuery({
    queryKey: ["tenant-public", slug],
    queryFn: async () => (await api.get(`/tenants/${slug}/public`)).data,
    enabled: !!slug,
  });

  const separateByBarber = !!tenant?.separateCashRegisterEnabled;

  const { data: publicBarbers } = useQuery({
    queryKey: ["public-barbers", slug, separateByBarber],
    queryFn: async () => {
      const res = await api.get(`/tenants/${slug}/public/barbers`);
      return res.data as Array<{ id: string; name: string; role: string }>;
    },
    enabled: !!slug && separateByBarber,
  });

  const subscribeBarberOptions = useMemo(() => {
    const list = publicBarbers ?? [];
    const opts: { id: string; label: string }[] = [];
    const owners = list.filter((b) => b.role === "OWNER");
    const barbers = list.filter((b) => b.role === "BARBER");
    const ownerIds = new Set(owners.map((o) => o.id));
    for (const m of owners) {
      opts.push({ id: m.id, label: `${m.name} (proprietário)` });
    }
    for (const m of barbers) {
      if (ownerIds.has(m.id)) continue;
      opts.push({ id: m.id, label: m.name });
    }
    return opts;
  }, [publicBarbers]);

  useEffect(() => {
    if (!separateByBarber) {
      setSubscribeBarberId(TEAM_PICK_NONE);
      return;
    }
    if (subscribeBarberOptions.length === 1) {
      setSubscribeBarberId(subscribeBarberOptions[0].id);
    }
  }, [separateByBarber, subscribeBarberOptions]);

  const { data: plans, isLoading: loadingPlans } = useQuery({
    queryKey: ["loyalty-plans", tenant?.id],
    queryFn: async () => (await api.get(`/loyalty/public/${tenant!.id}/plans`)).data,
    enabled: !!tenant?.id,
  });

  const selectedPlan = plans?.find((p: any) => p.id === preSelectedPlanId) || plans?.[0];

  const identifyReady =
    !!tenant?.id &&
    !!(clientEmail || phoneDigitsForApi(clientPhone)) &&
    (!separateByBarber || subscribeBarberId !== TEAM_PICK_NONE);

  const { data: loyaltyCtx } = useQuery({
    queryKey: [
      "loyalty-public-identify",
      tenant?.id,
      clientEmail,
      clientPhone,
      separateByBarber ? subscribeBarberId : "",
    ],
    queryFn: async () =>
      (
        await api.post(
          `/loyalty/public/${tenant!.id}/identify`,
          {
            email: clientEmail || undefined,
            phone: phoneDigitsForApi(clientPhone) || undefined,
          },
          separateByBarber && subscribeBarberId !== TEAM_PICK_NONE
            ? { params: { barberId: subscribeBarberId } }
            : undefined,
        )
      ).data,
    enabled: identifyReady,
  });

  const alreadyHasSelectedPlan =
    !!selectedPlan &&
    !!loyaltyCtx &&
    Array.isArray((loyaltyCtx as any).subscriptions) &&
    (loyaltyCtx as any).subscriptions.some((s: any) => s.planId === selectedPlan.id);

  const handleIdentify = async () => {
    const phoneApi = phoneDigitsForApi(tempPhone);
    if (!tempName || (!tempEmail && !phoneApi)) {
      toast.error("Por favor, preencha seu nome e pelo menos um contato (email ou celular)");
      return;
    }

    try {
      const res = await api.post("/loyalty/identify", {
        email: tempEmail || undefined,
        phone: phoneApi || undefined,
      });
      const user = res.data;
      setClientDetails(tempName, tempEmail, formatBrazilPhone(tempPhone), user?.id || null);
      setShowIdentificacao(false);
    } catch (err) {
      setClientDetails(tempName, tempEmail, formatBrazilPhone(tempPhone), null);
      setShowIdentificacao(false);
    }
  };

  const handleConfirmSubscription = async () => {
    if (!selectedPlan) return;
    if (separateByBarber && subscribeBarberId === TEAM_PICK_NONE) {
      toast.error("Selecione o profissional com quem deseja vincular esta assinatura.");
      return;
    }

    setIsSubscribing(true);
    try {
      // Primeiro buscar o tenant para ter o ID (repetido mas seguro)
      const tenantRes = await api.get(`/tenants/${slug}/public`);
      const tenant = tenantRes.data;

      await api.post(`/loyalty/public/${tenant.id}/subscribe`, {
        planId: selectedPlan.id,
        name: clientName,
        email: clientEmail,
        phone: phoneDigitsForApi(clientPhone) || undefined,
        ...(separateByBarber && subscribeBarberId !== TEAM_PICK_NONE
          ? { barberId: subscribeBarberId }
          : {}),
      });

      setSuccess(true);
      toast.success("Assinatura realizada com sucesso!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao realizar assinatura");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!tenant || loadingPlans) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="bg-zinc-900 border-zinc-800 max-w-md w-full text-center p-8 animate-in zoom-in-95 duration-300">
           <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
           </div>
           <h1 className="text-2xl font-bold text-white mb-2">Assinatura Confirmada!</h1>
           <p className="text-zinc-400 mb-8">
              Parabéns! Seu plano <b>{selectedPlan?.name}</b> agora está ativo. Você já pode aproveitar todos os benefícios em seu próximo agendamento.
           </p>
           <Link href={`/${slug}`}>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12">
                 Ver meus benefícios e agendar
              </Button>
           </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <div className="container max-w-xl mx-auto py-8 animate-fade-in">
        <Link href={`/${slug}`} className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
          Quase lá!
        </h1>
        <p className="text-zinc-400 mb-8">Confirme os detalhes da sua assinatura abaixo.</p>

        {selectedPlan && alreadyHasSelectedPlan && (
          <Card className="bg-emerald-500/10 border-emerald-500/30 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-200 font-medium">
                Você já possui este plano ativo nesta barbearia. Acompanhe seu consumo na página inicial ou agende com benefício do plano.
              </p>
              <Link href={`/${slug}`} className="inline-block mt-3">
                <Button variant="outline" className="border-emerald-500/40 text-emerald-400">
                  Voltar à página da barbearia
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {selectedPlan && (
          <Card className="bg-zinc-900 border-amber-500/20 shadow-xl shadow-amber-500/5 mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="text-2xl font-bold text-white mb-1">{selectedPlan.name}</h2>
                   <Badge className="bg-amber-500 text-black border-none font-bold">
                      {INTERVAL_LABELS[selectedPlan.interval]}
                   </Badge>
                </div>
                <div className="text-right">
                   <p className="text-3xl font-bold text-amber-500">R$ {Number(selectedPlan.price).toFixed(2)}</p>
                   <p className="text-xs text-zinc-500">pagamento recorrente</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">O que está incluído:</p>
                {selectedPlan.items.map((it: any) => (
                  <div key={it.id} className="flex items-start gap-3 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700">
                    <CheckIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-white font-medium">{it.quantity}x {it.service?.name}</p>
                        <p className="text-xs text-zinc-500">Válido para todo o ciclo {INTERVAL_LABELS[selectedPlan.interval]?.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-zinc-800">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <p className="text-sm text-zinc-500">Assinando como:</p>
                       <p className="text-white font-bold">{clientName}</p>
                       <p className="text-xs text-zinc-400">
                         {clientEmail || (clientPhone ? formatBrazilPhone(clientPhone) : "")}
                       </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowIdentificacao(true)} className="text-amber-500">
                       Alterar
                    </Button>
                 </div>

                 {separateByBarber && (
                   <div className="space-y-2 mb-6">
                     <Label className="text-sm font-medium text-zinc-100">
                       Profissional (plano vinculado à carteira)
                     </Label>
                     <Select
                       value={subscribeBarberId}
                       onValueChange={(v) => setSubscribeBarberId(v ?? TEAM_PICK_NONE)}
                     >
                       <SelectTrigger className="w-full h-11 border-zinc-600 bg-zinc-800/90 text-zinc-100 hover:bg-zinc-800 [&_svg]:text-zinc-300">
                         <span className="truncate text-left flex-1 text-[15px] text-zinc-50">
                           {subscribeBarberId === TEAM_PICK_NONE
                             ? "Selecione o profissional…"
                             : subscribeBarberOptions.find((o) => o.id === subscribeBarberId)?.label ||
                               "Profissional"}
                         </span>
                       </SelectTrigger>
                       <SelectContent className="border-zinc-600 bg-zinc-900 text-zinc-50 shadow-xl">
                         <SelectItem
                           value={TEAM_PICK_NONE}
                           className="cursor-pointer text-zinc-100 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white"
                         >
                           Selecione…
                         </SelectItem>
                         {subscribeBarberOptions.map((o) => (
                           <SelectItem
                             key={o.id}
                             value={o.id}
                             className="cursor-pointer text-zinc-100 focus:bg-zinc-800 focus:text-white data-[highlighted]:bg-zinc-800 data-[highlighted]:text-white"
                           >
                             {o.label}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                     <p className="text-xs leading-relaxed text-zinc-300">
                       Nesta barbearia o plano fica associado ao profissional escolhido para uso nos agendamentos com ele.
                     </p>
                   </div>
                 )}

                 <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 text-lg"
                    onClick={handleConfirmSubscription}
                    disabled={
                      isSubscribing ||
                      alreadyHasSelectedPlan ||
                      (separateByBarber && subscribeBarberId === TEAM_PICK_NONE)
                    }
                 >
                    {isSubscribing ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando...</>
                    ) : alreadyHasSelectedPlan ? (
                      "Plano já ativo"
                    ) : (
                      "Confirmar Assinatura"
                    )}
                 </Button>
                 <p className="text-center text-[10px] text-zinc-600 mt-4">
                    Ao confirmar, você concorda com os termos de uso e políticas da barbearia.
                 </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={showIdentificacao} onOpenChange={setShowIdentificacao}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                Sua Identificação
              </DialogTitle>
              <DialogDescription className="text-zinc-500">
                Precisamos saber quem você é para ativar seu plano.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input 
                  value={tempName} 
                  onChange={e => setTempName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700" 
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input 
                   value={tempEmail} 
                   onChange={e => setTempEmail(e.target.value)}
                   type="email" 
                   className="bg-zinc-800 border-zinc-700" 
                   placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Celular (WhatsApp)</Label>
                <Input
                  value={tempPhone}
                  onChange={(e) => setTempPhone(formatBrazilPhone(e.target.value))}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="(11) 9 9999-9999"
                />
              </div>
              <Button onClick={handleIdentify} className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold">
                Avançar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
