import { formatBrazilPhone } from "@barbearia/phone-br";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  serviceId: string | null;
  serviceName: string | null;
  servicePrice: number | null;
  barberId: string | null;
  barberName: string | null;
  date: string | null; // yyyy-MM-dd
  time: string | null; // HH:mm
  isoStartTime: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientId: string | null;
  setService: (id: string, name: string, price: number) => void;
  setBarber: (id: string | null, name: string | null) => void;
  setDateTime: (date: string, time: string, isoStartTime: string) => void;
  setClientDetails: (name: string, email: string, phone: string, clientId?: string | null) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      serviceId: null,
      serviceName: null,
      servicePrice: null,
      barberId: null,
      barberName: null,
      date: null,
      time: null,
      isoStartTime: null,
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientId: null,
      
      setService: (serviceId, serviceName, servicePrice) => 
        set({ serviceId, serviceName, servicePrice }),

      setBarber: (barberId, barberName) =>
        set({ barberId, barberName }),
      
      setDateTime: (date, time, isoStartTime) => 
        set({ date, time, isoStartTime }),
        
      setClientDetails: (clientName, clientEmail, clientPhone, clientId = null) =>
        set({
          clientName,
          clientEmail,
          clientPhone: clientPhone ? formatBrazilPhone(clientPhone) : "",
          clientId,
        }),
        
      reset: () => set({
        serviceId: null, serviceName: null, servicePrice: null,
        barberId: null, barberName: null,
        date: null, time: null, isoStartTime: null,
        clientId: null,
      })
    }),
    {
      name: "booking-storage",
    }
  )
);
