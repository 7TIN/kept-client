// src/lib/aiClient.ts
import api from "@/lib/api";

export async function generateAnswer(question: string): Promise<string> {
  try {
    const response = await api.post("/ai/generate-answer", { question });

    const answer = response.data?.answer;
    return answer ?? "No answer generated.";
  } catch (err: any) {
    const message = err.response?.data?.error ?? "Failed to generate answer";
    throw new Error(message);
  }
}
