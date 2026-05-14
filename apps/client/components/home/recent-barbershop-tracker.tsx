"use client";

import { useEffect } from "react";
import { recordBarbershopVisit } from "@/lib/recent-barbershops";

export function RecentBarbershopTracker({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    recordBarbershopVisit(slug, name);
  }, [slug, name]);
  return null;
}
