const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const summarizeTodos = async (todos) => {
  const pendingTexts = todos.map((t, i) => `${i + 1}. ${t.text}`).join("\n");

  //   const prompt = `Summarize the following pending todos into a concise, clear message:\n\n${pendingTexts} give data in paragraph format, rearrange the todos based on priority and type`;
  const prompt = `
You are an assistant that summarizes user todos into a short and clear update.
Summarize the following list of todos into a single paragraph — do NOT include numbered lists or bullet points.

Avoid repeating "Here’s a summary" or "Your tasks are", and write in a natural, conversational tone. Focus on what's most important.

Todos:${pendingTexts}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const summary = response.choices[0].message.content.trim();
    return summary;
  } catch (error) {
    console.error("LLM summarization failed:", error.message);
    return `Could not generate summary. ${error.message}`;
  }
};

module.exports = summarizeTodos;
