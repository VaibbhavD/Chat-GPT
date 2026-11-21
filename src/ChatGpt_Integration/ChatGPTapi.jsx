
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing.");
}

const genAI = new GoogleGenAI({ apiKey });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

// Delay helper
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Check whether the error is temporary
function isRetryableError(error) {
  const status = Number(
    error?.status || error?.code || error?.error?.code
  );

  // Retry temporary HTTP errors
  if ([408, 429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  // Retry network errors without an HTTP status
  if (!status) {
    return true;
  }

  return false;
}

// Sanitize response
function sanitizeText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

// Main Gemini function with automatic retry
export async function run(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Please enter a valid message.");
  }

  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-3.8-flash",
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

      return sanitizeText(result.text || "");

    } catch (error) {
      lastError = error;

      console.error(
        `Gemini API attempt ${attempt + 1} failed:`,
        error
      );

      // Stop if this is a permanent error
      if (!isRetryableError(error)) {
        break;
      }

      // Stop after maximum retries
      if (attempt === MAX_RETRIES) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = INITIAL_DELAY * Math.pow(2, attempt);

      console.log(`Retrying Gemini API in ${delay / 1000}s...`);

      await sleep(delay);
    }
  }

  throw new Error(
    lastError?.message ||
      "Gemini API is temporarily unavailable. Please try again."
  );
}
