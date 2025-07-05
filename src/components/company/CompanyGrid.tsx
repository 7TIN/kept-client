// src/components/company/CompanyList.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CompanyCard } from "./CompanyCard";
import { useCompanies } from "@/hooks/useCompanies";

type SortOption = "alphabetical" | "experienceCount";

export function CompanyList() {
  /* fetches companies (name, id, experienceCount) */
  const { companies, loading } = useCompanies();

  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");
  const navigate = useNavigate();

  /* -------- sorting -------- */
  const sorted = [...companies].sort((a, b) =>
    sortBy === "experienceCount"
      ? b.experienceCount - a.experienceCount
      : a.name.localeCompare(b.name)
  );

  /* -------- UI -------- */
  if (loading) return <p>Loading companies…</p>;

  return (
    <div className="space-y-6">
      {/* Header + sort selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Companies</h1>

        <select
          title="companies-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="alphabetical">A → Z</option>
          <option value="experienceCount">Most Experiences</option>
        </select>
      </div>

      {/* Grid of company cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sorted.map((c) => (
          <CompanyCard
            key={c.id}
            name={c.name}
            experienceCount={c.experienceCount}
            onClick={() => navigate(`/companies/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
