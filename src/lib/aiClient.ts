// src/lib/aiClient.ts

export async function generateAnswer(question: string): Promise<string> {
  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        {
          role: "user",
          content: `Answer the following interview question briefly:\n${question}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 300,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Failed to generate answer");
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "No answer generated.";
}
