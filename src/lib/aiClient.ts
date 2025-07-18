import api from "@/lib/api";
import { isAxiosError } from "axios"; 

export async function generateAnswer(question: string): Promise<string> {
  try {
    const response = await api.post("/ai/generate-answer", { question });

    const answer = response.data?.answer;
    return answer ?? "No answer generated.";
  } catch (err) { 
    let message = "Failed to generate answer";
    
    if (isAxiosError(err)) {
      
      message = err.response?.data?.error || message;
    }
    
    throw new Error(message);
  }
}