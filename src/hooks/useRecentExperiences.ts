import type { Experience } from "@/components/experience/ExperienceCard";
import api from "@/lib/api";
import { useEffect, useState } from "react";
export interface PageData {
  content: Experience[];
  number: number;
  totalPages: number;
}
export interface Filters {
  search?: string;
  position?: string;
  type?: string;
}

export function useRecentExperiences(page: number, size = 5, filters: Filters = {}) {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  console.log("Sending request with filters:", filters); 
  api
    .get<PageData>("/experiences/recent", {
      params: { page, size, ...filters },
    })
    .then((res) => {
      console.log("Data received:", res.data); 
      setData(res.data);
    })
    .catch((err) => {
      console.error("Error fetching experiences:", err);
      setError(err.message || "Failed to load");
    })
    .finally(() => setLoading(false));
}, [page, size, filters]);
  return { data, loading, error };
}