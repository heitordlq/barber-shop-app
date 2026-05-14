"use client";

import { useSearchBarbershops } from "@/lib/search-barbershops";
import { BarbershopCard } from "./barbershop-card";
import { Scissors } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20">
      <div className="h-36 w-full animate-pulse bg-zinc-800" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
        <div className="flex gap-1 pt-0.5">
          <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-800" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function BarbershopList() {
  const { data, isLoading, isError } = useSearchBarbershops();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-zinc-500">
        <Scissors size={32} className="text-amber-500/40" />
        <p className="text-sm text-zinc-400">Erro ao carregar barbearias. Tente novamente.</p>
      </div>
    );
  }

  const tenants = data?.data ?? [];

  if (tenants.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
        <Scissors size={36} className="text-amber-500/30" />
        <p className="text-sm font-semibold text-white">Nenhuma barbearia encontrada</p>
        <p className="max-w-xs text-xs text-zinc-500">
          Tente ajustar os filtros ou o termo de busca
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
        {data?.total}{" "}
        {data?.total === 1 ? "barbearia encontrada" : "barbearias encontradas"}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tenants.map((tenant) => (
          <BarbershopCard key={tenant.id} tenant={tenant} />
        ))}
      </div>
    </>
  );
}
