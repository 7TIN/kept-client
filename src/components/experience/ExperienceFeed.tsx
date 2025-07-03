import { useState } from "react";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { useRecentExperiences } from "@/hooks/useRecentExperiences";
import { Button } from "@/components/ui/button";

export default function ExperienceFeed() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useRecentExperiences(page, 5);

  if (loading) {
    return <p className="text-center py-12">Loading…</p>;
  }

  if (error) {
    return (
      <p className="text-center py-12 text-destructive">
        Error: {error}
      </p>
    );
  }

  if (!data || data.content.length === 0) {
    return <p className="text-center py-12">No experiences yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {data.content.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      {/*  -------- Pagination -------- */}
      <div className="flex justify-center items-center gap-4 pt-6">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </Button>

        <span className="text-sm">
          Page {data.number + 1} / {data.totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page + 1 >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
