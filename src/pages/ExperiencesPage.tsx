import ExperienceFeed from "@/components/experience/ExperienceFeed";
import { ShareExperienceDialog } from "@/components/experience/ShareExperienceDialog";

export default function ExperiencesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* add‑experience button */}
      <div className="flex justify-end">
        <ShareExperienceDialog />
      </div>

      <ExperienceFeed />
    </div>
  );
}
