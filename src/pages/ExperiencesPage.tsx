import { DemoExperienceFeed } from "@/components/experience/ExperienceCard";
import {ShareExperienceDialog} from "@/components/experience/ShareExperienceDialog";

export default function ExperiencesPage() {
  return (
    <div className="flex justify-end mb-6">
       <DemoExperienceFeed />
      <ShareExperienceDialog />
      {/* …rest of page… */}
    </div>
  );
}