// src/components/experience/ExperienceFeed.tsx
import { useEffect, useState } from "react";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import {
  useExperienceFeed,
  type Filters,               // ← exported from hook
} from "@/hooks/useExperienceFeed";

interface Props {
  filters: Filters;
}

export default function ExperienceFeed({ filters }: Props) {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  
  useEffect(() => setPage(0), [JSON.stringify(filters)]);

  const { data, loading, error } = useExperienceFeed(page, pageSize, filters);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (!data || data.content.length === 0)
    return <p>No experiences found.</p>;

  return (
    <section className="space-y-6">
      {data.content.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      <div className="flex justify-center gap-3 pt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-2 py-1 rounded disabled:opacity-50"
        >
          ← Prev
        </button>
        <span>
          Page{data.number + 1}/{data.totalPages}
        </span>
        <button
          disabled={page + 1 >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
