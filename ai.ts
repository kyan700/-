export async function summarizeContent(
  content: string,
  apiKey: string
): Promise<string> {
  // Example: Using OpenAI API or external summarization endpoint
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "تلخيص النص التالي بالعربية باختصار" },
        { role: "user", content }
      ],
      max_tokens: 500
    }),
  });
  if (!response.ok) throw new Error("Failed to fetch summary");
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
