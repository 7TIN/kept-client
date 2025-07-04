import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { useRecentPreview } from "@/hooks/useRecentPreview";

export function RecentPreview() {
  const { data, loading } = useRecentPreview();

  if (loading) return <p className="text-center">Loading…</p>;
  if (!data || data.length === 0)
    return <p className="text-center">No experiences yet.</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Experiences</h2>

      <div className="space-y-4">
        {data.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
