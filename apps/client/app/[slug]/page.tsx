import { phoneDigitsForApi } from "@barbearia/phone-br";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { Store, MapPin, AlertTriangle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOpenStatus, formatOpenTimeShort } from "@/lib/open-status";
import { TenantPublicContent } from "./tenant-public-content";
import { RecentBarbershopTracker } from "@/components/home/recent-barbershop-tracker";

export const revalidate = 60; // SSG com ISR de 60s

async function getTenant(slug: string) {
  try {
    const res = await api.get(`/tenants/${slug}/public`);
    return res.data;
  } catch (error) {
    return null;
  }
}

async function getServices(tenantId: string) {
  try {
    const res = await api.get(`/services/public/${tenantId}`);
    return res.data;
  } catch (error) {
    return [];
  }
}

async function getLoyaltyPlans(tenantId: string) {
  try {
    const res = await api.get(`/loyalty/public/${tenantId}/plans`);
    return res.data;
  } catch (error) {
    return [];
  }
}

export default async function TenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenant = await getTenant(slug);

  if (!tenant) {
    notFound();
  }

  if (tenant.status === "DELINQUENT" || tenant.status === "INACTIVE") {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Barbearia Indisponível</h1>
        <p className="text-zinc-400 text-center max-w-md">
          A página de agendamentos d{tenant.name} encontra-se temporariamente indisponível. Por favor, tente novamente mais tarde ou entre em contato diretamente com o estabelecimento.
        </p>
      </div>
    );
  }

  const [services, loyaltyPlans] = await Promise.all([
    getServices(tenant.id),
    getLoyaltyPlans(tenant.id)
  ]);

  const openStatus = getOpenStatus(tenant);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <RecentBarbershopTracker slug={slug} name={tenant.name} />
      {/* Banner / Header */}
      <div className="h-48 md:h-64 bg-zinc-900 border-b border-zinc-800 relative overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
        {/* Banner image or pattern can go here */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2674&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="container max-w-3xl mx-auto px-4 relative z-20 pb-6 flex items-end gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-950 border-4 border-zinc-950 shrink-0 rounded-2xl flex items-center justify-center shadow-lg">
            <Store className="w-8 h-8 text-amber-500" />
          </div>
          <div className="pb-2 flex-1">
            <div className="flex items-start gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{tenant.name}</h1>
              {/* Open/Closed Badge */}
              {openStatus.reason === "open" ? (
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-semibold mt-1">
                  ● Aberto agora · fecha às {openStatus.closeTime}
                </Badge>
              ) : openStatus.reason === "closed_emergency" ? (
                <Badge className="bg-red-500/15 text-red-400 border-red-500/30 font-semibold mt-1">
                  ● Fechado temporariamente
                </Badge>
              ) : openStatus.reason === "closed_schedule" ? (
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 mt-1">
                  {openStatus.nextOpenDayLabel && openStatus.nextOpenTime
                    ? `● Fechado · abre ${openStatus.nextOpenDayLabel} às ${formatOpenTimeShort(openStatus.nextOpenTime)}`
                    : "● Fechado · horário não informado"}
                </Badge>
              ) : openStatus.reason === "no_hours" ? (
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 mt-1">
                  ● Horário não informado
                </Badge>
              ) : null}
            </div>
            <p className="text-zinc-400 text-sm md:text-base flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" /> {tenant.address || "Endereço não informado"}
            </p>
          </div>
        </div>
      </div>

      <main className="container max-w-3xl mx-auto px-4 mt-8 space-y-12 animate-fade-in">
        <TenantPublicContent
          slug={slug}
          tenantId={tenant.id}
          services={services}
          loyaltyPlans={loyaltyPlans}
        />

        {/* Contact Section */}
        {(tenant.whatsapp || tenant.phone) && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-amber-500" />
              Entre em Contato
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {tenant.whatsapp && (
                <a
                  href={`https://wa.me/55${phoneDigitsForApi(tenant.whatsapp)}?text=Olá,%20gostaria%20de%20mais%20informações!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 h-14 text-lg">
                    <MessageCircle className="w-6 h-6" />
                    Chamar no WhatsApp
                  </Button>
                </a>
              )}
              {tenant.phone && tenant.phone !== tenant.whatsapp && (
                <a
                  href={`https://wa.me/55${phoneDigitsForApi(tenant.phone)}?text=Olá,%20gostaria%20de%20mais%20informações!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 h-14 text-lg">
                    <MessageCircle className="w-6 h-6" />
                    Chamar no WhatsApp
                  </Button>
                </a>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
