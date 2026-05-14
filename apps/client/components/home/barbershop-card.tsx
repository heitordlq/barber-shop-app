import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { getOpenStatus, formatOpenTimeShort } from "@/lib/open-status";
import { cn } from "@/lib/utils";

export interface PublicTenant {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  logoUrl?: string | null;
  photos: string[];
  workingHours: any;
  temporarilyClosed: boolean;
  serviceCategories: string[];
}

interface Props {
  tenant: PublicTenant;
}

const CATEGORY_LABELS: Record<string, string> = {
  corte: "Corte",
  barba: "Barba",
  sobrancelha: "Sobrancelha",
  combo: "Combo",
  progressiva: "Progressiva",
  coloracao: "Coloração",
  hidratacao: "Hidratação",
};

export function BarbershopCard({ tenant }: Props) {
  const cover = tenant.photos[0] ?? tenant.logoUrl ?? null;
  const { isOpen, reason, openTime, closeTime, todaySlot } = getOpenStatus(tenant);

  return (
    <Link
      href={`/${tenant.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20 transition-colors hover:border-zinc-700 active:scale-[0.98]"
    >
      <div className="relative h-36 w-full overflow-hidden bg-zinc-800">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={tenant.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-700">
            <span className="text-3xl font-bold text-white/25">
              {tenant.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-2 left-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm",
              isOpen
                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                : "border-zinc-600/80 bg-black/50 text-zinc-300"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isOpen ? "bg-emerald-400" : "bg-zinc-500"
              )}
            />
            {isOpen
              ? "Aberto agora"
              : reason === "closed_emergency"
                ? "Fechado temporariamente"
                : todaySlot === "after_close" && closeTime
                  ? `Fechou às ${formatOpenTimeShort(closeTime)}`
                  : todaySlot === "before_open" && openTime
                    ? `Abre às ${formatOpenTimeShort(openTime)}`
                    : "Fechado"}
          </span>
        </div>

        {tenant.logoUrl && cover !== tenant.logoUrl && (
          <div className="absolute right-2 top-2 h-9 w-9 overflow-hidden rounded-full border-2 border-zinc-950 bg-zinc-950 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tenant.logoUrl}
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="truncate text-base font-bold text-white">{tenant.name}</h3>

        {tenant.address && (
          <p className="flex items-start gap-1.5 text-xs text-zinc-400">
            <MapPin size={12} className="mt-0.5 shrink-0 text-zinc-500" />
            <span className="line-clamp-2">{tenant.address}</span>
          </p>
        )}

        {!isOpen && todaySlot === "before_open" && openTime && (
          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock size={12} className="shrink-0" />
            Abre hoje às {formatOpenTimeShort(openTime)}
          </p>
        )}
        {!isOpen && todaySlot === "after_close" && (
          <p className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock size={12} className="shrink-0" />
            Expediente de hoje encerrado
          </p>
        )}

        {tenant.serviceCategories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {tenant.serviceCategories.slice(0, 4).map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-zinc-700 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </span>
            ))}
            {tenant.serviceCategories.length > 4 && (
              <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                +{tenant.serviceCategories.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
