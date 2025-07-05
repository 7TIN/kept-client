
import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { Company } from "@/lib/company";

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Company[]>("/companies/by-count")
       .then(res => setCompanies(res.data))
       .finally(() => setLoading(false));
  }, []);

  return { companies, loading };
}
