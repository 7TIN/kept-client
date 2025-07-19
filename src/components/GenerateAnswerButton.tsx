import { useState } from "react";
import { generateAnswer } from "@/lib/aiClient";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function GenerateAnswerButton({ question }: { question: string }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const redirectUrl = location.pathname + location.search;
      navigate(`/login?message=login_required&redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    setLoading(true);
    setAnswer("");
    try {
      const result = await generateAnswer(question);
      setAnswer(result);
    } catch (err) {
      setAnswer("❌ Error generating answer." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleClick}
        disabled={loading}
        className="gap-2"
      >
        <Sparkles className="w-4 h-4 text-yellow-500" />
        {loading ? "Generating..." : "Generate Answer"}
      </Button>

      {/* Show shimmer loader when loading */}
      {loading && (
        <div className="space-y-2 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-4 shimmer" />
          ))}
        </div>
      )}

      {/* Render answer in formatted bullet points */}
      {answer && !loading && (
        <div className="bg-muted p-3 rounded-md border text-sm leading-relaxed space-y-1">
          {answer
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((line, idx) => (
              <p
                key={idx}
                className="text-justify before:content-['•_'] before:text-primary"
              >
                {line.replace(/^[-•]\s*/, "")}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
