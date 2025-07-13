export async function generateAnswer(question: string): Promise<string> {
  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // use Llama-3 if you want Meta Llama, or keep your desired model
      messages: [
        {
          role: "user",
          content: `
You are an expert technical interviewer. 
Your task is to answer the following interview question in 2-4 concise, technically correct bullet points. 
Do NOT write a paragraph or theory explanation.
Each bullet point must be direct and specific, not generic.
If the question is about code or algorithms, provide steps or code logic in bullets.
Question: "${question}"

Format:
- Bullet point 1
- Bullet point 2
- ... (max 4)
`,
        },
      ],
      temperature: 0.4, // Lower for factual/technical, less creative
      max_tokens: 120, // Short, point-wise answers; adjust as needed
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Failed to generate answer");
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "No answer generated.";
}
