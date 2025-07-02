import {ShareExperienceDialog} from "@/components/experience/ShareExperienceDialog";

export default function ExperiencesPage() {
  return (
    <div className="flex justify-end mb-6">
      <ShareExperienceDialog />
      {/* …rest of page… */}
    </div>
  );
}