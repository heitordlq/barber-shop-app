"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/booking.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CalendarDays, Clock, Store, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { api } from "@/lib/api";

type AppointmentSummary = {
  serviceName: string;
  startTime: string;
  barberName: string | null;
  tenantName: string;
};

export default function ConfirmadoPage() {
  const { date, time, serviceName, barberName, reset } = useBookingStore();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const appointmentId = searchParams.get("id");
  const [summary, setSummary] = useState<AppointmentSummary | null>(null);

  useEffect(() => {
    if (!slug || !appointmentId) return;
    api
      .get(`/tenants/${slug}/public/appointments/${appointmentId}`)
      .then((res) => setSummary(res.data))
      .catch(() => setSummary(null));
  }, [slug, appointmentId]);

  const displayService = summary?.serviceName ?? serviceName ?? "Serviço";
  const displayDate = summary?.startTime
    ? format(new Date(summary.startTime), "EEEE, d 'de' MMMM", { locale: ptBR })
    : date
      ? format(new Date(date), "EEEE, d 'de' MMMM", { locale: ptBR })
      : "";
  const displayTime = summary?.startTime
    ? format(new Date(summary.startTime), "HH:mm")
    : time ?? "";
  const displayTenant = summary?.tenantName ?? "";
  const displayBarber = summary?.barberName ?? barberName ?? null;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">Reserva Confirmada!</h1>
        <p className="text-zinc-400 text-center mb-8">
          Seu horário está garantido. Você receberá os detalhes por e-mail quando disponível.
        </p>

        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Serviço</p>
                <p className="font-bold text-white text-lg">{displayService}</p>
              </div>
              <p className="text-zinc-400 text-sm font-mono opacity-50">#{appointmentId?.slice(0, 8) || '00000000'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Data</p>
                <p className="font-semibold text-white capitalize">{displayDate}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Horário</p>
                <p className="font-semibold text-white">{displayTime}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3 h-3" /> Profissional
              </p>
              <p className="font-semibold text-white">
                {displayBarber || "A combinar na barbearia"}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Store className="w-3 h-3" /> Local</p>
              <p className="font-semibold text-white">{displayTenant || "Barbearia"}</p>
            </div>
          </CardContent>
        </Card>

        <Button 
          render={<Link href={`/${slug}`} />}
          nativeButton={false}
          onClick={() => reset()}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium h-12"
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
}
