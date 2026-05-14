"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchPopularServices } from "@/lib/search-barbershops";
import { readBookingContact } from "@/lib/booking-contact";
import { recentSlugsForQuery } from "@/lib/recent-barbershops";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Loader2, CreditCard, History } from "lucide-react";

function ToggleRow({
  label,
  description,
  active,
  onToggle,
  icon: Icon,
}: {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
  icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-left transition hover:border-zinc-700"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
        <Icon className="h-5 w-5 text-amber-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <div
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full border-2 transition",
          active ? "border-amber-500 bg-amber-500/20" : "border-zinc-600 bg-zinc-800"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
            active ? "left-5" : "left-0.5"
          )}
        />
      </div>
    </button>
  );
}

export function FiltersModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [subscriber, setSubscriber] = useState(false);
  const [recentOnly, setRecentOnly] = useState(false);

  const { data: popular, isLoading } = useQuery({
    queryKey: ["popular-services"],
    queryFn: fetchPopularServices,
    enabled: open,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!open) return;
    const s = params.get("services");
    if (s) {
      const parts = s.split("|").map((p) => {
        try {
          return decodeURIComponent(p.trim());
        } catch {
          return p.trim();
        }
      });
      setSelected(new Set(parts.filter(Boolean)));
    } else setSelected(new Set());
    setSubscriber(params.get("subscriberOnly") === "1");
    setRecentOnly(!!params.get("visitedSlugs"));
  }, [open, params]);

  function toggleService(name: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(name)) n.delete(name);
      else n.add(name);
      return n;
    });
  }

  function clearAll() {
    setSelected(new Set());
    setSubscriber(false);
    setRecentOnly(false);
  }

  function apply() {
    const sp = new URLSearchParams(params.toString());
    if (selected.size > 0) {
      sp.set("services", [...selected].map((x) => encodeURIComponent(x)).join("|"));
    } else {
      sp.delete("services");
    }
    if (subscriber) sp.set("subscriberOnly", "1");
    else sp.delete("subscriberOnly");
    if (recentOnly) {
      const slugs = recentSlugsForQuery();
      if (slugs) sp.set("visitedSlugs", slugs);
      else sp.delete("visitedSlugs");
    } else {
      sp.delete("visitedSlugs");
    }
    sp.delete("page");
    const q = sp.toString();
    router.replace(q ? `/?${q}` : "/", { scroll: false });
    onOpenChange(false);
  }

  const contact = typeof window !== "undefined" ? readBookingContact() : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[min(88dvh,620px)] w-[calc(100%-1rem)] max-w-lg gap-0 overflow-hidden border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl sm:max-w-lg"
      >
        <DialogHeader className="border-b border-zinc-800 px-4 py-4">
          <DialogTitle className="text-lg font-bold text-white">Filtros</DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            Combine serviços reais das barbearias e preferências.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(min(88dvh,620px)-8rem)] space-y-6 overflow-y-auto px-4 py-4">
          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              Serviços mais usados
            </h3>
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-20 animate-pulse rounded-full bg-zinc-800"
                  />
                ))}
              </div>
            ) : popular?.items?.length ? (
              <div className="flex flex-wrap gap-2">
                {popular.items.map(({ name, count }) => {
                  const on = selected.has(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleService(name)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-left text-xs font-medium transition",
                        on
                          ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                          : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-600"
                      )}
                    >
                      {name}
                      <span className="ml-1 text-[10px] text-zinc-500">({count})</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Ainda não há serviços cadastrados nas barbearias para sugerir aqui.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Sobre você
            </h3>
            <ToggleRow
              label="Que sou assinante"
              description={
                contact?.email || contact?.phone
                  ? "Mostrar só barbearias onde você tem plano ativo (mesmo e-mail/telefone do agendamento)."
                  : "Use o fluxo de agendamento uma vez com e-mail ou telefone para ativar este filtro."
              }
              active={subscriber}
              onToggle={() => setSubscriber((v) => !v)}
              icon={CreditCard}
            />
            <ToggleRow
              label="Últimos visitados"
              description="Prioriza barbearias que você abriu recentemente neste aparelho."
              active={recentOnly}
              onToggle={() => setRecentOnly((v) => !v)}
              icon={History}
            />
          </section>
        </div>

        <div className="flex gap-2 border-t border-zinc-800 bg-zinc-950/80 px-4 py-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900"
            onClick={() => {
              clearAll();
              const sp = new URLSearchParams(params.toString());
              ["services", "subscriberOnly", "visitedSlugs", "page"].forEach((k) =>
                sp.delete(k)
              );
              const q = sp.toString();
              router.replace(q ? `/?${q}` : "/", { scroll: false });
              onOpenChange(false);
            }}
          >
            Limpar
          </Button>
          <Button
            type="button"
            className="flex-1 bg-amber-500 font-bold text-black hover:bg-amber-400"
            onClick={apply}
          >
            {isLoading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Aplicar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
