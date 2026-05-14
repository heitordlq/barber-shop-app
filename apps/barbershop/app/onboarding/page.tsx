"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, DollarSign, ExternalLink, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const { tenant } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await api.get("/payments/onboarding/status");
        if (res.data.complete) {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } catch {
        toast.error("Erro ao verificar status. Faça login novamente.");
        router.push("/login");
      }
    };
    checkStatus();
  }, [router]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const res = await api.post("/payments/onboarding");
      window.location.href = res.data.url;
    } catch {
      toast.error("Erro ao iniciar configuração financeira.");
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
            <DollarSign className="w-8 h-8 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">Configure seus recebimentos</CardTitle>
          <CardDescription className="text-zinc-400">
            Para ativar as reservas online na sua página pública, precisamos configurar sua conta para receber pagamentos de forma segura.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-800 border border-zinc-700">
              <ShieldCheck className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Repasse direto para sua conta</p>
                <p className="text-xs text-zinc-400">O dinheiro dos agendamentos cai diretamente na sua conta bancária atrelada ao seu CPF ou CNPJ de forma automática.</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleConnect} 
            disabled={connecting}
            className="w-full h-12 bg-[#635BFF] hover:bg-[#4B45FF] text-white font-medium text-base rounded-md"
          >
            {connecting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4 mr-2" />
            )}
            Conectar com Stripe
          </Button>

          <p className="text-center text-xs text-zinc-500 mt-4">
            Processamento de pagamentos seguro fornecido por Stripe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
