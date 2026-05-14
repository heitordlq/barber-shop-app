"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { FiltersModal } from "./filters-modal";

function stripQueryKeys(sp: URLSearchParams, keys: string[]) {
  const n = new URLSearchParams(sp.toString());
  keys.forEach((k) => n.delete(k));
  return n;
}

export function FilterStrip() {
  const router = useRouter();
  const params = useSearchParams();
  const [moreOpen, setMoreOpen] = useState(false);

  const filter = params.get("filter") ?? "all";
  const services = params.get("services");
  const subscriberOnly = params.get("subscriberOnly");
  const visitedSlugs = params.get("visitedSlugs");

  const extraCount = useMemo(() => {
    let n = 0;
    if (services) n += services.split("|").filter(Boolean).length;
    if (subscriberOnly === "1") n += 1;
    if (visitedSlugs) n += 1;
    return n;
  }, [services, subscriberOnly, visitedSlugs]);

  const todosActive =
    (filter === "all" || !params.get("filter")) &&
    !services &&
    subscriberOnly !== "1" &&
    !visitedSlugs;

  const livreAgoraActive = filter === "slot_free_now";

  function goTodos() {
    const sp = stripQueryKeys(params, [
      "filter",
      "services",
      "subscriberOnly",
      "visitedSlugs",
      "page",
    ]);
    const q = sp.toString();
    router.replace(q ? `/?${q}` : "/", { scroll: false });
  }

  function goLivreAgora() {
    const sp = new URLSearchParams(params.toString());
    sp.set("filter", "slot_free_now");
    sp.delete("page");
    router.replace(`/?${sp.toString()}`, { scroll: false });
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={goTodos}
          className={cn(
            "min-h-10 flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition",
            todosActive
              ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
              : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
          )}
        >
          Todos
        </button>
        <button
          type="button"
          onClick={goLivreAgora}
          className={cn(
            "min-h-10 flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition",
            livreAgoraActive
              ? "border-amber-500/50 bg-amber-500/20 text-amber-400"
              : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
          )}
        >
          Horário livre agora
        </button>
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className={cn(
            "relative flex min-h-10 shrink-0 items-center gap-1 rounded-full border px-3 py-2 text-sm font-semibold transition",
            extraCount > 0
              ? "border-amber-500/50 bg-amber-500/15 text-amber-400"
              : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
          )}
        >
          Mais
          <ChevronRight className="h-4 w-4 opacity-70" />
          {extraCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
              {extraCount}
            </span>
          )}
        </button>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500">
        <Sparkles className="h-3 w-3 text-amber-500/60" />
        Filtros extras abrem clique em "Mais" para filtrar por serviços das barbearias
      </p>

      <FiltersModal open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}
