import { SYSTEM_PROMPT } from "./prompt";

export async function getDecodeResponse(userQuery: string): Promise<string> {
  const response = await fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.1:8b",
      stream: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userQuery },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.message?.content;

  if (!text) throw new Error("Empty response from Ollama");
  return text;
}