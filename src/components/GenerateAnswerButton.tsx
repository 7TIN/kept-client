import { useState } from "react";
import { generateAnswer } from "@/lib/aiClient";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function GenerateAnswerButton({ question }: { question: string }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setAnswer(""); // Clear any previous answer
    try {
      const result = await generateAnswer(question);
      setAnswer(result);
    } catch (err) {
      setAnswer("❌ Error generating answer.");
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
