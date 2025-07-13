import { useState } from "react";
import { generateAnswer } from "@/lib/aiClient";
import { Button } from "@/components/ui/button";

export function GenerateAnswerButton({ question }: { question: string }) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await generateAnswer(question);
      setAnswer(result);
    } catch (err) {
      setAnswer("Error generating answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 space-y-1">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Answer"}
      </Button>
      {answer && <p className="text-sm mt-1 text-foreground">{answer}</p>}
    </div>
  );
}
