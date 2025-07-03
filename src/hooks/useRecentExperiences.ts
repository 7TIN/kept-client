import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { Experience } from "@/components/experience/ExperienceCard";

export interface PageData {
  content: Experience[];
  number: number;
  totalPages: number;
}

export function useRecentExperiences(page: number, size = 5) {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get<PageData>("/experiences/recent", { params: { page, size } })
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [page, size]);

  return { data, loading, error };
}
