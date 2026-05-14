"use client";

import { formatBrazilPhone, phoneDigitsForApi } from "@barbearia/phone-br";
import { useBookingStore } from "@/store/booking.store";

const syncClientIdFromIdentify = (email?: string, phone?: string) => {
  const phoneApi = phoneDigitsForApi(phone || "");
  if (!email?.trim() && !phoneApi) return;
  api
    .post("/loyalty/identify", {
      email: email?.trim() || undefined,
      phone: phoneApi || undefined,
    })
    .then((res) => {
      const id = res.data?.id;
      if (!id) return;
      const s = useBookingStore.getState();
      if (s.clientId !== id) {
        s.setClientDetails(s.clientName, s.clientEmail, s.clientPhone, id);
      }
    })
    .catch(() => {});
};
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Star, CheckCircle2 } from "lucide-react";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

function CheckoutForm({ clientSecret, tenantId, appointmentId }: { clientSecret: string, tenantId: string, appointmentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { serviceId, isoStartTime, clientName, clientPhone } = useBookingStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Confirm Payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // 2. Opcionalmente lidar caso o webhook demore (mas redirecionamos)
      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
        // 3. Redirect to success
        router.push(`/${slug}/confirmado?id=${appointmentId}`);
      }

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <PaymentElement />
      </div>
      <Button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 text-lg"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CreditCard className="w-5 h-5 mr-2" />}
        Pagar e Agendar
      </Button>
      <p className="text-center text-xs text-zinc-500">
        Seus dados de pagamento são processados com segurança pelo Stripe.
      </p>
    </form>
  );
}

export default function PagamentoPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const isLoyalty = searchParams.get("loyalty") === "true";
  const subscriptionId = searchParams.get("subId");

  const { 
    serviceId, serviceName, servicePrice, 
    date, time, isoStartTime, 
    barberId,
    clientName, clientEmail, clientPhone, clientId,
    setClientDetails 
  } = useBookingStore();
  
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [isProcessingLoyalty, setIsProcessingLoyalty] = useState(false);
  const [step, setStep] = useState(isLoyalty ? 3 : 1); // 1 = Details, 2 = Payment, 3 = Loyalty Confirm

  useEffect(() => {
    if (!serviceId || !isoStartTime) {
      router.push(`/${slug}`);
    }
  }, [serviceId, isoStartTime, slug, router]);

  useEffect(() => {
    if (!isLoyalty) return;
    syncClientIdFromIdentify(clientEmail, clientPhone);
  }, [isLoyalty, clientEmail, clientPhone]);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phoneDigitsForApi(clientPhone)) {
      toast.error("Preencha nome e telefone.");
      return;
    }
    
    setLoadingIntent(true);
    try {
      // 1. Get tenant details first
      const tenantRes = await api.get(`/tenants/${slug}/public`);
      setTenantId(tenantRes.data.id);

      // 2. Create Payment Intent
      const piRes = await api.post("/payments/intent", {
        tenantSlug: slug,
        serviceId,
        barberId,
        clientName,
        clientEmail: clientEmail || `${phoneDigitsForApi(clientPhone)}@example.com`,
        clientPhone: phoneDigitsForApi(clientPhone),
        startTime: isoStartTime
      });

      if (piRes.data.clientSecret === 'pi_dev_mode_secret') {
        toast.success("Reserva aprovada no modo desenvolvedor!");
        router.push(`/${slug}/confirmado?id=${piRes.data.appointmentId}`);
        return;
      }

      setClientSecret(piRes.data.clientSecret);
      setAppointmentId(piRes.data.appointmentId);
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao processar pagamento");
    } finally {
      setLoadingIntent(false);
    }
  };

  const handleLoyaltyConfirm = async () => {
    if (!subscriptionId) {
      toast.error("Sessão incompleta. Volte ao agendamento, escolha o horário e toque em Continuar de novo.");
      return;
    }
    if (!clientName || (!clientEmail?.trim() && !phoneDigitsForApi(clientPhone))) {
      toast.error("Preencha nome e e-mail ou WhatsApp (mesmos dados do plano).");
      return;
    }

    const emailForApi =
      clientEmail?.trim() || `${phoneDigitsForApi(clientPhone)}@cliente.agenda`;

    setIsProcessingLoyalty(true);
    try {
      const res = await api.post("/payments/loyalty", {
        tenantSlug: slug,
        serviceId,
        barberId: barberId || undefined,
        userId: clientId || undefined,
        subscriptionId,
        clientName,
        clientEmail: emailForApi,
        clientPhone: phoneDigitsForApi(clientPhone) || undefined,
        startTime: isoStartTime,
      });
      
      toast.success("Agendamento confirmado via plano!");
      router.push(`/${slug}/confirmado?id=${res.data.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao utilizar plano");
    } finally {
      setIsProcessingLoyalty(false);
    }
  };

  if (!serviceId) return null;

  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <div className="container max-w-xl mx-auto py-8 animate-fade-in">
        <button 
          onClick={() => step === 2 ? setStep(1) : router.back()}
          className="inline-flex items-center text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </button>

        <h1 className="text-2xl font-bold text-white mb-6">
          {step === 1 ? "Seus Dados" : step === 2 ? "Pagamento" : "Confirmar com plano"}
        </h1>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardContent className="p-4 bg-zinc-950 border-b border-zinc-800 rounded-t-lg">
            <div className="flex justify-between items-center mb-2 gap-2">
              <span className="font-medium text-white">{serviceName}</span>
              <span className="font-bold text-emerald-400 shrink-0 text-right">
                {step === 3 && isLoyalty ? (
                  <>
                    R$ 0,00
                    <span className="block text-[10px] font-normal text-zinc-500">
                      Plano · ref. R$ {servicePrice?.toFixed(2)}
                    </span>
                  </>
                ) : (
                  `R$ ${servicePrice?.toFixed(2)}`
                )}
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              {date && time ? `${format(new Date(date), "dd 'de' MMMM", { locale: ptBR })} às ${time}` : ''}
            </p>
          </CardContent>
          <CardContent className="p-6">
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Seu Nome</Label>
                  <Input 
                    required placeholder="João da Silva" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={clientName} onChange={(e) => setClientDetails(e.target.value, clientEmail, clientPhone, clientId)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">WhatsApp</Label>
                  <Input 
                    required
                    placeholder="(11) 9 9999-9999"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={clientPhone}
                    onChange={(e) =>
                      setClientDetails(clientName, clientEmail, formatBrazilPhone(e.target.value), clientId)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">E-mail (Opcional)</Label>
                  <Input 
                    type="email" placeholder="joao@exemplo.com" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={clientEmail} onChange={(e) => setClientDetails(clientName, e.target.value, clientPhone, clientId)}
                  />
                  <p className="text-xs text-zinc-500 mt-1">Para receber o recibo da transação.</p>
                </div>

                <Button 
                  type="submit" 
                  disabled={loadingIntent}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 text-lg mt-6"
                >
                  {loadingIntent ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ir para o Pagamento"}
                </Button>
              </form>
            ) : step === 2 ? (
              clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "night",
                      variables: {
                        colorPrimary: "#f59e0b",
                        colorBackground: "#18181b",
                        colorText: "#ffffff",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, sans-serif",
                        spacingUnit: "4px",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <CheckoutForm clientSecret={clientSecret} tenantId={tenantId} appointmentId={appointmentId} />
                </Elements>
              )
            ) : (
              <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                 <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-500/20">
                    <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-2">Usar meu Plano</h3>
                    <p className="text-zinc-400 text-sm">
                      Identificamos que seu plano cobre este serviço. <br />
                      Nenhum pagamento adicional é necessário.
                    </p>
                 </div>
                 
                 <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-left space-y-2">
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Resumo do Plano</p>
                    <div className="flex items-center gap-2 text-white">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-sm">Assinatura Ativa</span>
                    </div>
                 </div>

                 <Button 
                   onClick={handleLoyaltyConfirm}
                   disabled={isProcessingLoyalty}
                   className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 text-lg"
                 >
                   {isProcessingLoyalty ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Star className="w-6 h-6 mr-2" />}
                   Confirmar com meu Plano
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
