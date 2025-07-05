// src/pages/experiences/ExperiencePage.tsx
import { useState } from "react";
// import {ExperienceFeed} from "@/components/experience/ExperienceFeed";
import { ShareExperienceDialog } from "@/components/experience/ShareExperienceDialog";
import ExperienceFeed from "@/components/experience/ExperienceFeed";

export default function ExperiencesPage() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Interview Experiences</h1>
        <ShareExperienceDialog />
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <input
          placeholder="Search title or summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-full sm:w-60"
        />
        <input
          placeholder="Filter by position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-full sm:w-44"
        />
        <label className="text-sm text-muted-foreground w-full sm:w-44">
        Filter by Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-full"
        >
          <option value="">All Types</option>
          <option value="TECHNICAL">Technical</option>
          <option value="HR">HR</option>
          <option value="MR">MR</option>
        </select>
      </label>

      </div>

      <ExperienceFeed filters={{ search, position, type }} />
    </div>
  );
}
