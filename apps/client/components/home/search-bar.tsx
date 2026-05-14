"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(() => params.get("q") ?? "");
  const paramsSnapshotRef = useRef(params.toString());
  paramsSnapshotRef.current = params.toString();

  useEffect(() => {
    const id = setTimeout(() => {
      const nextSp = new URLSearchParams(paramsSnapshotRef.current);
      const curQ = nextSp.get("q") ?? "";
      if (curQ === value) return;

      if (value) nextSp.set("q", value);
      else nextSp.delete("q");
      nextSp.delete("page");

      const next = nextSp.toString();
      if (next === paramsSnapshotRef.current) return;

      router.replace(next ? `/?${next}` : "/", { scroll: false });
    }, 300);

    return () => clearTimeout(id);
  }, [value, router]);

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Busque por barbearia ou bairro..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 py-3 pl-10 pr-10 text-sm text-white shadow-inner outline-none transition placeholder:text-zinc-500 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
