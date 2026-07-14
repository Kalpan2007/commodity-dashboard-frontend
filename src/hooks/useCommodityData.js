import { useQuery } from "@tanstack/react-query";
import { fetchCommodityData } from "@/lib/api";

/**
 * React Query hook for fetching commodity data.
 * Automatically refetches when the interval changes.
 *
 * @param {"daily" | "monthly" | "yearly"} interval
 */
export function useCommodityData(interval = "monthly") {
  return useQuery({
    queryKey: ["commodities", interval],
    queryFn: () => fetchCommodityData(interval),
    select: (data) => ({
      name: data.name,
      interval: data.interval,
      unit: data.unit,
      dates: data.data.map((d) => d.date),
      values: data.data.map((d) => d.value),
    }),
  });
}
