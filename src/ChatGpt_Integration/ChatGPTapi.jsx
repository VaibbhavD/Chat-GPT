
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing.");
}

const genAI = new GoogleGenAI({ apiKey });

// Generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// Sanitize response without damaging Markdown,
// code snippets, emojis, or other languages.
function sanitizeText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

// Main Gemini function
export async function run(input) {
  try {
    if (typeof input !== "string" || !input.trim()) {
      throw new Error("Please enter a valid message.");
    }

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: input.trim(),
      config: {
        ...generationConfig,
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      },
    });

    const responseText = result.text || "";

    return sanitizeText(responseText);

  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error(
      error.message || "Something went wrong. Please try again."
    );
  }
}
