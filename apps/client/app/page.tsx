import { Suspense } from "react";
import { SearchBar } from "@/components/home/search-bar";
import { FilterStrip } from "@/components/home/filter-strip";
import { BarbershopList } from "@/components/home/barbershop-list";
import { Scissors } from "lucide-react";

export const metadata = {
  title: "Encontre sua Barbearia",
  description: "Busque barbearias perto de você e agende agora mesmo",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 pb-20">
      {/* Topo — mesmo idioma visual do banner do perfil /[slug] */}
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 pb-4 pt-safe-top">
          <div className="flex items-center gap-3 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-zinc-950 bg-zinc-950 shadow-lg">
              <Scissors className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Encontre sua barbearia
              </h1>
              <p className="text-sm text-zinc-400">Busque, filtre e agende em poucos toques</p>
            </div>
          </div>

          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <Suspense>
            <FilterStrip />
          </Suspense>
        </div>
      </div>

      <main className="mx-auto mt-6 w-full max-w-3xl flex-1 px-4">
        <Suspense fallback={<ListSkeleton />}>
          <BarbershopList />
        </Suspense>
      </main>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20"
        >
          <div className="h-36 w-full animate-pulse bg-zinc-800" />
          <div className="flex flex-col gap-2 p-3.5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
