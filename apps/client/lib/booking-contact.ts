/** Dados de contato guardados no fluxo de agendamento (localStorage). */

export function readBookingContact(): { email: string; phone: string } | null {
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
