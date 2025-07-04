import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { Experience } from "@/components/experience/ExperienceCard";

export function useRecentPreview() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/experiences/recent", {
        params: { page: 0, size: 3 },
      })
      .then((res) => setData(res.data.content || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
