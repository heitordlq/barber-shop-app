"use client";

import { useBookingStore } from "@/store/booking.store";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format, addDays, startOfDay, isBefore, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Loader2, Clock, CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatBrazilPhone, phoneDigitsForApi } from "@barbearia/phone-br";
import { cn } from "@/lib/utils";

function isSlotBookable(slot: { start: string; available: boolean }) {
  if (!slot.available) return false;
  return new Date(slot.start).getTime() > Date.now();
}

export default function AgendarPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { 
    serviceId, serviceName, servicePrice, 
    setDateTime, date, time,
    barberId, barberName, setBarber,
    clientName, clientEmail, clientPhone, setClientDetails
  } = useBookingStore();
  
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = date ? new Date(date + "T12:00:00") : new Date();
    const today = startOfDay(new Date());
    return isBefore(startOfDay(d), today) ? today : d;
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(time);
  const [showIdentificacao, setShowIdentificacao] = useState(!clientEmail && !clientPhone);
  const [tempName, setTempName] = useState(clientName);
  const [tempEmail, setTempEmail] = useState(clientEmail);
  const [tempPhone, setTempPhone] = useState(clientPhone);

  useEffect(() => {
    if (!serviceId) {
      router.push(`/${slug}`);
    }
  }, [serviceId, slug, router]);

  // Identificação do Usuário
  const { data: userData, isLoading: loadingUser } = useQuery({
    queryKey: ["identify-user", clientEmail, clientPhone],
    queryFn: async () => {
      if (!clientEmail && !clientPhone) return null;
      const res = await api.post("/loyalty/identify", {
        email: clientEmail || undefined,
        phone: phoneDigitsForApi(clientPhone) || undefined,
      });
      return res.data;
    },
    enabled: !!(clientEmail || clientPhone)
  });

  useEffect(() => {
    if (!userData?.id) return;
    const s = useBookingStore.getState();
    if (s.clientId !== userData.id) {
      s.setClientDetails(s.clientName, s.clientEmail, s.clientPhone, userData.id);
    }
  }, [userData?.id]);

  const { data: barbers, isLoading: loadingBarbers } = useQuery({
    queryKey: ["public-barbers", slug],
    queryFn: async () => {
      const res = await api.get(`/tenants/${slug}/public/barbers`);
      return res.data as Array<{ id: string; name: string; role: string }>;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (!barberId && barbers?.length) {
      const first = barbers[0];
      setBarber(first.id, first.name);
    }
  }, [barberId, barbers, setBarber]);

  const slotsQueryEnabled =
    !!slug &&
    !!serviceId &&
    !loadingBarbers &&
    Array.isArray(barbers) &&
    (barbers.length === 0 || !!barberId);

  const { data: slotData, isLoading: loadingSlots } = useQuery({
    queryKey: [
      "slots",
      slug,
      format(selectedDate, "yyyy-MM-dd"),
      userData?.id,
      barberId,
      serviceId,
    ],
    queryFn: async () => {
      const url = `/schedule/slots/${slug}?serviceId=${serviceId}&date=${format(selectedDate, "yyyy-MM-dd")}${userData?.id ? `&userId=${userData.id}` : ""}${barberId ? `&barberId=${barberId}` : ""}`;
      const res = await api.get(url);
      return res.data;
    },
    enabled: slotsQueryEnabled,
    staleTime: 0,
  });

  const slots = slotData?.slots || [];
  const membership = slotData?.membershipContext;
  const gapMinutes =
    typeof slotData?.appointmentGapMinutes === "number" && !Number.isNaN(slotData.appointmentGapMinutes)
      ? slotData.appointmentGapMinutes
      : null;
  const serviceDurationMinutes =
    typeof slotData?.serviceDurationMinutes === "number" &&
    !Number.isNaN(slotData.serviceDurationMinutes) &&
    slotData.serviceDurationMinutes > 0
      ? slotData.serviceDurationMinutes
      : null;

  useEffect(() => {
    if (!selectedTime || !slots.length) return;
    const match = slots.find((s: { start: string }) => format(new Date(s.start), "HH:mm") === selectedTime);
    if (!match || !isSlotBookable(match as { start: string; available: boolean })) {
      setSelectedTime(null);
    }
  }, [slots, selectedTime]);

  if (!serviceId) return null;

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
      // Se falhar a identificação mas temos os dados, apenas prosseguimos (o backend criará o user depois)
      setClientDetails(tempName, tempEmail, formatBrazilPhone(tempPhone), null);
      setShowIdentificacao(false);
    }
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione um horário");
      return;
    }
    
    const [hours, minutes] = selectedTime.split(":");
    const startIso = new Date(selectedDate);
    startIso.setHours(Number(hours), Number(minutes), 0, 0);

    setDateTime(
      format(selectedDate, "yyyy-MM-dd"),
      selectedTime,
      startIso.toISOString()
    );

    // Se estiver coberto por plano, redireciona para confirmação direta (simulado por enquanto ou nova tela)
    if (membership?.isCovered) {
       router.push(`/${slug}/pagamento?loyalty=true&subId=${membership.subscriptionId}`);
    } else {
       router.push(`/${slug}/pagamento`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <div className="container max-w-xl mx-auto py-8 animate-fade-in">
        <Link href={`/${slug}`} className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Link>

        <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-amber-500" />
          Escolha um horário
        </h1>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500 mb-1">Serviço Selecionado</p>
            <div className="flex justify-between items-center gap-2">
              <span className="font-medium text-white">{serviceName}</span>
              <div className="text-right shrink-0">
                {membership?.isCovered ? (
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-bold text-emerald-400">R$ 0,00</span>
                    <span className="text-[10px] text-zinc-500">
                      Cortesia do plano · referência R$ {servicePrice?.toFixed(2)}
                    </span>
                    <Badge className="mt-0.5 bg-amber-500 text-black border-none animate-pulse">
                      Plano Ativo
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-400">R$ {servicePrice?.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-500 mb-2">Escolha o barbeiro</p>
            {loadingBarbers ? (
              <div className="h-10 bg-zinc-800 animate-pulse rounded" />
            ) : (
              <Select
                value={barberId || ""}
                onValueChange={(v) => {
                  const id = v ?? "";
                  const b = barbers?.find((x) => x.id === id);
                  setBarber(id || null, b?.name || null);
                  setSelectedTime(null);
                }}
              >
                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white w-full">
                  {barberName ? <span className="truncate">{barberName}</span> : <SelectValue placeholder="Selecione..." />}
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  {barbers?.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardContent className="p-4 flex flex-col md:flex-row gap-8">
            <div className="md:w-auto w-full flex justify-center border-b md:border-b-0 md:border-r border-zinc-800 pb-6 md:pb-0 md:pr-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => {
                  if (!d) return;
                  const today = startOfDay(new Date());
                  if (isBefore(startOfDay(d), today)) return;
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
                locale={ptBR}
                disabled={(d) => {
                  if (!d) return true;
                  const today = startOfDay(new Date());
                  const max = addDays(today, 30);
                  return isBefore(startOfDay(d), today) || isAfter(startOfDay(d), max);
                }}
                className="text-white"
                classNames={{
                  vhidden: "hidden",
                  caption: "flex justify-center pt-1 relative items-center mb-2",
                  caption_label: "text-sm font-medium",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  head_cell: "text-zinc-500 font-normal text-[0.8rem] w-9",
                  cell: "text-center text-sm p-0 border border-transparent hover:border-zinc-800 transition-all",
                  day: "h-9 w-9 p-0 font-normal hover:bg-zinc-800",
                  today: "bg-zinc-800/50 text-white border border-zinc-700",
                  selected: "bg-amber-500 text-black hover:bg-amber-500 hover:text-black focus:bg-amber-500 focus:text-black font-bold !opacity-100",
                  outside: "text-zinc-600 opacity-50",
                  range_start: "rounded-l-md",
                  range_end: "rounded-r-md",
                  range_middle: "rounded-none",
                }}
              />
            </div>
            
            <div className="flex-1">
              <div className="mb-4 space-y-1">
                <p className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Horários disponíveis
                </p>
                {serviceDurationMinutes != null && gapMinutes != null && gapMinutes > 0 ? (
                  <p className="text-[11px] text-zinc-500">
                    Cada horário reserva <span className="text-zinc-400 font-medium">{serviceDurationMinutes} min</span>{" "}
                    (duração do serviço) e, após o fim, mais{" "}
                    <span className="text-zinc-400 font-medium">{gapMinutes} min</span> livres antes de outro
                    atendimento na mesma agenda.
                  </p>
                ) : serviceDurationMinutes != null ? (
                  <p className="text-[11px] text-zinc-500">
                    Cada horário reserva <span className="text-zinc-400 font-medium">{serviceDurationMinutes} min</span>{" "}
                    de atendimento.
                  </p>
                ) : null}
              </div>

              {loadingSlots || loadingUser || loadingBarbers ? (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-10 bg-zinc-800 animate-pulse rounded" />
                  ))}
                </div>
              ) : slots?.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">
                  Nenhum horário disponível para esta data.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot: { start: string; end: string; available: boolean }) => {
                    const timeString = format(new Date(slot.start), "HH:mm");
                    const bookable = isSlotBookable(slot);
                    return (
                      <Button
                        key={slot.start}
                        type="button"
                        variant="outline"
                        disabled={!bookable}
                        title={
                          !bookable
                            ? slot.available
                              ? "Horário já passou"
                              : "Indisponível: já existe reserva nesse período ou não cabe a duração do serviço + o intervalo entre atendimentos"
                            : undefined
                        }
                        className={cn(
                          "h-10 px-2",
                          bookable && selectedTime === timeString
                            ? "bg-amber-500 hover:bg-amber-600 text-black border-amber-500"
                            : bookable
                              ? "bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                              : "bg-zinc-900/50 border-zinc-800/80 text-zinc-600 cursor-not-allowed opacity-60",
                        )}
                        onClick={() => bookable && setSelectedTime(timeString)}
                      >
                        {timeString}
                      </Button>
                    );
                  })}
                </div>
              )}

              {membership?.isCovered && (
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-3">
                   <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                   <div>
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Benefício do Plano</p>
                      <p className="text-sm text-white">Este agendamento no valor de <b>R$ {servicePrice?.toFixed(2)}</b> será gratuito pelo seu plano <b>{membership.planName}</b>.</p>
                   </div>
                </div>
              )}

              {!!membership && !membership?.isCovered && membership?.isExhausted && (
                <div className="mt-4 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Plano consumido</p>
                  <p className="text-sm text-zinc-300">
                    Seu plano <b className="text-white">{membership.planName}</b> já foi totalmente consumido para este serviço
                    ({membership.usedCredits}/{membership.totalCredits}). Você ainda pode agendar normalmente seguindo para o pagamento.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 text-lg"
          onClick={handleContinue}
          disabled={!selectedTime}
        >
          Continuar
        </Button>

        <Dialog open={showIdentificacao} onOpenChange={setShowIdentificacao}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                Identificação
              </DialogTitle>
              <DialogDescription className="text-zinc-500">
                Informe seus dados para verificarmos seus planos e benefícios.
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
                Confirmar meus dados
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
