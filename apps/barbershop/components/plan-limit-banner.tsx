"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Lock, TrendingUp } from "lucide-react";

interface LimitBarProps {
  label: string;
  used: number;
  max: number | null;
  atLimit: boolean;
  nearLimit: boolean;
}

function LimitBar({ label, used, max, atLimit, nearLimit }: LimitBarProps) {
  if (max == null) return null;

  const pct = Math.min((used / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className={cn("font-medium", atLimit ? "text-red-400" : nearLimit ? "text-amber-400" : "text-zinc-300")}>
          {label}
        </span>
        <span className={cn(atLimit ? "text-red-400" : nearLimit ? "text-amber-400" : "text-zinc-400")}>
          {used} / {max}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            atLimit ? "bg-red-500" : nearLimit ? "bg-amber-400" : "bg-emerald-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface PlanLimitBannerProps {
  planName: string | null;
  services?: { used: number; max: number | null; atLimit: boolean; nearLimit: boolean };
  team?:     { used: number; max: number | null; atLimit: boolean; nearLimit: boolean };
  className?: string;
}

export function PlanLimitBanner({ planName, services, team, className }: PlanLimitBannerProps) {
  const hasLimits = (services?.max != null) || (team?.max != null);
  if (!hasLimits && !planName) return null;

  const anyAtLimit   = services?.atLimit   || team?.atLimit;
  const anyNearLimit = services?.nearLimit || team?.nearLimit;

  return (
    <div
      className={cn(
        "rounded-xl border p-4 space-y-3",
        anyAtLimit
          ? "bg-red-500/5 border-red-500/20"
          : anyNearLimit
          ? "bg-amber-500/5 border-amber-500/20"
          : "bg-zinc-900 border-zinc-800",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {anyAtLimit ? (
          <Lock className="w-4 h-4 text-red-400 shrink-0" />
        ) : anyNearLimit ? (
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        ) : (
          <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <div>
          <p className="text-xs font-semibold text-white leading-none">
            {planName ?? "Plano ativo"}
          </p>
          {anyAtLimit && (
            <p className="text-[10px] text-red-400 mt-0.5">Limite atingido — contate o suporte</p>
          )}
          {!anyAtLimit && anyNearLimit && (
            <p className="text-[10px] text-amber-400 mt-0.5">Quase no limite do plano</p>
          )}
        </div>
      </div>

      {hasLimits && (
        <div className="space-y-2">
          {services?.max != null && (
            <LimitBar label="Serviços" {...services} />
          )}
          {team?.max != null && (
            <LimitBar label="Equipe" {...team} />
          )}
        </div>
      )}
    </div>
  );
}

interface PlanBlockedProps {
  resource: "serviço" | "membro de equipe";
  used: number;
  max: number;
  planName: string | null;
}

export function PlanBlockedBanner({ resource, used, max, planName }: PlanBlockedProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-red-400">
          Limite do plano atingido
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Seu plano <span className="text-white font-medium">{planName ?? "atual"}</span> permite até{" "}
          <span className="text-white font-medium">{max}</span> {resource}
          {max !== 1 ? "s" : ""} e você já tem <span className="text-white font-medium">{used}</span>.
          Entre em contato com o suporte para fazer um upgrade.
        </p>
      </div>
    </div>
  );
}
