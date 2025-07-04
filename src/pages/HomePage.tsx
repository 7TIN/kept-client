// src/pages/HomePage.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RecentPreview } from "@/components/RecentPreview";
import { FeatureHighlights } from "@/components/FeatureHighlights";


export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Interview Experience Sharing</h1>
        <p className="text-muted-foreground text-lg">
          Learn from real interview stories. Share your journey.
        </p>
        <Button size="lg" onClick={() => navigate("/experience")}>
          Get Started →
        </Button>
      </section>

      {/* Features */}
      <FeatureHighlights />

      {/* Recent Preview */}
      <RecentPreview />
    </div>
  );
}
