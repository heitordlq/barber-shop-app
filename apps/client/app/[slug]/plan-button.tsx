"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClientPlanButton({ 
  tenantName, planId, planName, planPrice, whatsapp 
}: { 
  tenantName: string, planId: string, planName: string, planPrice: number, whatsapp: string 
}) {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const handleSubscribe = () => {
    router.push(`/${slug}/assinatura?planId=${planId}`);
  };

  return (
    <Button 
      onClick={handleSubscribe}
      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-10 mt-4"
    >
      Assinar
    </Button>
  );
}
