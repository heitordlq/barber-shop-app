const STORAGE_KEY = "barbearia-client-recent-slugs";

export type RecentBarbershop = {
  slug: string;
  name: string;
  visitedAt: string;
};

export function getRecentBarbershops(): RecentBarbershop[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as RecentBarbershop[];
    if (!Array.isArray(list)) return [];
    return list
      .filter((x) => x?.slug && typeof x.visitedAt === "string")
      .sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());
  } catch {
    return [];
  }
}

export function recordBarbershopVisit(slug: string, name: string) {
  if (typeof window === "undefined" || !slug) return;
  const prev = getRecentBarbershops().filter((x) => x.slug !== slug);
  const next: RecentBarbershop[] = [
    { slug, name: name || slug, visitedAt: new Date().toISOString() },
    ...prev,
  ].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function recentSlugsForQuery(): string {
  return getRecentBarbershops()
    .map((x) => x.slug)
    .join(",");
}
