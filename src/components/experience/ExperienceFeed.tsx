// src/components/experience/ExperienceFeed.tsx
import { useState } from "react";
import { useRecentExperiences } from "@/hooks/useRecentExperiences";
import { ExperienceCard } from "./ExperienceCard";

interface Props {
  filters: {
    search?: string;
    position?: string;
    type?: string;
  };
}

export function ExperienceFeed({ filters }: Props) {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useRecentExperiences(page, 5, filters);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading experiences.</p>;
  if (data.content.length === 0) return <p>No experiences found.</p>;

  return (
    <div className="space-y-6">
      {data.content.map((exp:any) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      <div className="flex justify-between pt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="text-sm px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={page + 1 >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="text-sm px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
