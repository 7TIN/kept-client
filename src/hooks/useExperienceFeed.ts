import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import type { Experience } from "@/components/experience/ExperienceCard";

export interface PageData {
  content: Experience[];
  number: number;
  totalPages: number;
}

export interface Filters {
  search?: string;
  position?: string;
  type?: string;
  company?: string;
}

export function useExperienceFeed(
  page: number,
  size = 5,
  rawFilters?: Filters
) {
  // const filters = useMemo(() => rawFilters ?? {}, [JSON.stringify(rawFilters ?? {})]);
  const filters = useMemo(() => rawFilters, [JSON.stringify(rawFilters)]);

  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get<PageData>("/experiences/recent", {
        params: { page, size, ...filters },
      })
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [page, size, filters]);

  return { data, loading, error };
}
