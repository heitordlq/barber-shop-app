"use client";

import { phoneDigitsForApi } from "@barbearia/phone-br";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Scissors, SearchX, Star, Check as CheckIcon, Info } from "lucide-react";
import { ClientBookingButton } from "./client-button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const INTERVAL_LABELS: Record<string, string> = {
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
};

type SubItem = {
  planItemId: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  usedCount: number;
  remaining: number;
};

type Subscription = {
  id: string;
  planId: string;
  planName: string;
  items: SubItem[];
};

type IdentifyResponse =
  | { identified: false; subscriptions: [] }
  | { identified: true; userId: string; name: string; subscriptions: Subscription[] };

function readBookingContact(): { email: string; phone: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("booking-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { clientEmail?: string; clientPhone?: string } };
    const email = (parsed.state?.clientEmail ?? "").trim();
    const phone = (parsed.state?.clientPhone ?? "").trim();
    if (!email && !phone) return null;
    return { email, phone };
  } catch {
    return null;
  }
}

function serviceCoveredInfo(
  serviceId: string,
  subscriptions: Subscription[] | undefined,
): { planName: string; used: number; quantity: number; remaining: number } | null {
  if (!subscriptions?.length) return null;
  for (const sub of subscriptions) {
    const line = sub.items.find((i) => i.serviceId === serviceId && i.remaining > 0);
    if (line) {
      return {
        planName: sub.planName,
        used: line.usedCount,
        quantity: line.quantity,
        remaining: line.remaining,
      };
    }
  }
  return null;
}

function ClientPlanSubscribeButton({
  slug,
  planId,
  disabled,
}: {
  slug: string;
  planId: string;
  disabled: boolean;
}) {
  const router = useRouter();
  if (disabled) {
    return (
      <Button disabled className="w-full bg-zinc-800 text-zinc-500 font-bold h-10 mt-4 cursor-not-allowed border border-zinc-700">
        Plano ativo — você já assina este plano
      </Button>
    );
  }
  return (
    <Button
      onClick={() => router.push(`/${slug}/assinatura?planId=${planId}`)}
      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-10 mt-4"
    >
      Assinar
    </Button>
  );
}

export function TenantPublicContent({
  slug,
  tenantId,
  services,
  loyaltyPlans,
}: {
  slug: string;
  tenantId: string;
  services: any[];
  loyaltyPlans: any[];
}) {
  const [ctx, setCtx] = useState<IdentifyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contact = readBookingContact();
    if (!contact) {
      setCtx({ identified: false, subscriptions: [] });
      setLoading(false);
      return;
    }
    let cancelled = false;
    api
      .post(`/loyalty/public/${tenantId}/identify`, {
        email: contact.email || undefined,
        phone: phoneDigitsForApi(contact.phone) || undefined,
      })
      .then((res) => {
        if (!cancelled) setCtx(res.data as IdentifyResponse);
      })
      .catch(() => {
        if (!cancelled) setCtx({ identified: false, subscriptions: [] });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tenantId]);

  const subs: Subscription[] =
    ctx?.identified && "subscriptions" in ctx ? (ctx.subscriptions as Subscription[]) : [];

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scissors className="w-5 h-5 text-amber-500" />
            Nossos Serviços
          </h2>
        </div>

        {services.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <SearchX className="w-10 h-10 text-zinc-600 mb-3" />
              <p className="text-zinc-400 text-center">Nenhum serviço disponível no momento.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service: any) => {
              const listPrice = Number(service.price);
              const covered =
                !loading && ctx?.identified ? serviceCoveredInfo(service.id, subs) : null;

              return (
                <Card
                  key={service.id}
                  className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-bold text-white text-lg">{service.name}</h3>
                      <div className="text-right shrink-0">
                        {covered ? (
                          <div className="flex flex-col items-end gap-1 max-w-[11rem]">
                            <p className="font-bold text-emerald-400 text-lg">R$ {listPrice.toFixed(2)}</p>
                            <span
                              className="inline-flex items-start gap-1 text-[10px] text-amber-500/90 text-right leading-tight"
                              title={`Plano ${covered.planName}: gratuito só nos dias permitidos pelo plano; nos demais dias, valor cheio. ${covered.remaining} uso(s) restantes no ciclo (${covered.used}/${covered.quantity}).`}
                            >
                              <Info className="w-3 h-3 shrink-0 mt-0.5" />
                              Grátis nos dias do plano; fora deles, paga o valor acima.
                            </span>
                          </div>
                        ) : (
                          <p className="font-bold text-amber-500">R$ {listPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                    {service.description && (
                      <p className="text-sm text-zinc-500 mb-4 flex-1">{service.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 relative isolate">
                      <Badge variant="outline" className="text-zinc-400 border-zinc-700 font-normal">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {service.duration} min
                      </Badge>
                      <ClientBookingButton
                        tenantSlug={slug}
                        serviceId={service.id}
                        serviceName={service.name}
                        servicePrice={listPrice}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {loyaltyPlans.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Planos de Assinatura
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loyaltyPlans.map((plan: any) => {
              const activeHere = subs.some((s) => s.planId === plan.id);
              const activeSub = subs.find((s) => s.planId === plan.id);

              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "bg-zinc-900 border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-lg shadow-amber-500/5 relative overflow-hidden",
                    activeHere && "border-amber-500/50",
                  )}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Star className="w-12 h-12 text-amber-500" />
                  </div>
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] uppercase font-bold">
                        {INTERVAL_LABELS[plan.interval] || plan.interval}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-white">
                        R$ {Number(plan.price).toFixed(2)}
                      </span>
                      <span className="text-zinc-500 text-xs text-zinc-400">
                        /{INTERVAL_LABELS[plan.interval]?.toLowerCase() || "ciclo"}
                      </span>
                      {activeHere && (
                        <Badge className="ml-2 bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-[10px]">
                          Seu plano ativo
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      {plan.items.map((it: any) => (
                        <div key={it.id} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckIcon className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                          <span>
                            <strong className="text-zinc-200">{it.quantity}x</strong> {it.service?.name} por ciclo
                          </span>
                        </div>
                      ))}
                    </div>

                    {activeHere && activeSub && (
                      <div className="mt-3 p-3 rounded-lg bg-zinc-950/80 border border-zinc-800">
                        <p className="text-[11px] uppercase tracking-wide text-amber-500/90 font-semibold mb-2">
                          Consumo no ciclo
                        </p>
                        <ul className="space-y-1.5 text-xs text-zinc-300">
                          {activeSub.items.map((it) => (
                            <li key={it.planItemId} className="flex justify-between gap-2">
                              <span className="truncate">{it.serviceName}</span>
                              <span className="font-mono shrink-0 tabular-nums">
                                {it.usedCount}/{it.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <ClientPlanSubscribeButton slug={slug} planId={plan.id} disabled={activeHere} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
