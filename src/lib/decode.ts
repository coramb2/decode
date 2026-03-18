import { SYSTEM_PROMPT } from "./prompt";

export async function getDecodeResponse(userQuery: string): Promise<string> {
  const maxRetries = 3;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://decode.app",
        "X-Title": "Decode",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userQuery },
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;
      if (!text) throw new Error("Empty response from OpenRouter");
      return text;
    }

    if (response.status === 429 && attempt < maxRetries - 1) {
      await new Promise(res => setTimeout(res, 1500 * (attempt + 1)));
      continue;
    }

    const err = await response.text();
    throw new Error(`OpenRouter error: ${response.status} — ${err}`);
  }

  throw new Error("Max retries reached. OpenRouter is temporarily unavailable.");
}