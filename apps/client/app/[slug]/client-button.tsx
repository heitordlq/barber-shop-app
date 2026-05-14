"use client";

import { useBookingStore } from "@/store/booking.store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClientBookingButton({ 
  tenantSlug, serviceId, serviceName, servicePrice 
}: { 
  tenantSlug: string, serviceId: string, serviceName: string, servicePrice: number 
}) {
  const { setService } = useBookingStore();
  const router = useRouter();

  const handleBook = () => {
    setService(serviceId, serviceName, servicePrice);
    router.push(`/${tenantSlug}/agendar`);
  };

  return (
    <Button 
      onClick={handleBook}
      className="bg-zinc-100 hover:bg-white text-zinc-900 border-0"
      size="sm"
    >
      Agendar
    </Button>
  );
}
