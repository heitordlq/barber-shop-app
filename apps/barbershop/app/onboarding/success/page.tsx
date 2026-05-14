"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const { updateTenant } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get("/payments/onboarding/status");
        if (res.data.complete) {
          updateTenant({ stripeOnboardingComplete: true });
          setTimeout(() => router.push("/dashboard"), 3000);
        } else {
          router.push("/onboarding?retry=true");
        }
      } catch {
        router.push("/onboarding");
      }
    };
    verify();
  }, [router, updateTenant]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Tudo pronto!</h1>
      <p className="text-zinc-400 mb-8 text-center max-w-sm">
        Sua conta de pagamentos foi configurada com sucesso. Você será redirecionado para o seu painel...
      </p>
      <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
    </div>
  );
}
