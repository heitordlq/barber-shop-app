import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "./api";
import type { PublicTenant } from "@/components/home/barbershop-card";
import { readBookingContact } from "./booking-contact";

interface SearchResult {
  data: PublicTenant[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function buildSearchUrl(params: URLSearchParams): string {
  const q = params.get("q") ?? "";
  const filter = params.get("filter") ?? "all";
  const services = params.get("services") ?? "";
  const visitedSlugs = params.get("visitedSlugs") ?? "";
  const subscriberOnly = params.get("subscriberOnly") ?? "";
  const page = params.get("page") ?? "1";

  const searchParams = new URLSearchParams();
  if (q) searchParams.set("q", q);
  if (filter && filter !== "all") searchParams.set("filter", filter);
  if (services) searchParams.set("services", services);
  if (visitedSlugs) searchParams.set("visitedSlugs", visitedSlugs);
  if (subscriberOnly === "1") searchParams.set("subscriberOnly", "1");
  searchParams.set("page", page);

  return `/tenants/public/search?${searchParams.toString()}`;
}

async function fetchBarbershops(params: URLSearchParams): Promise<SearchResult> {
  const url = buildSearchUrl(params);
  const headers: Record<string, string> = {};
  if (params.get("subscriberOnly") === "1") {
    const c = readBookingContact();
    if (c?.email) headers["X-Client-Email"] = c.email;
    if (c?.phone) headers["X-Client-Phone"] = c.phone;
  }
  const { data } = await api.get<SearchResult>(url, { headers });
  return data;
}

export function useSearchBarbershops() {
  const params = useSearchParams();

  return useQuery({
    queryKey: [
      "barbershops",
      params.get("q"),
      params.get("filter"),
      params.get("services"),
      params.get("visitedSlugs"),
      params.get("subscriberOnly"),
      params.get("page"),
    ],
    queryFn: () => fetchBarbershops(params),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export type PopularServiceItem = { name: string; count: number };

export async function fetchPopularServices(): Promise<{ items: PopularServiceItem[] }> {
  const { data } = await api.get<{ items: PopularServiceItem[] }>(
    "/tenants/public/popular-services"
  );
  return data;
}
