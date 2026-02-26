import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  const { messages, prompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o";

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    return res.status(200).json(completion);
  } catch (error) {
    console.error("OpenAI API error:", error);
    const status = error?.status || 500;
    const message = error?.message || "Internal server error";
    return res.status(status).json({ error: message });
  }
}
