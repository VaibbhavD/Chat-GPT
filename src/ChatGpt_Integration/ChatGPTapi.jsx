
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
const REQUEST_TIMEOUT = 30000;

// Delay helper
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Check retryable errors
function isRetryableError(error) {
  const status = Number(
    error?.status ??
    error?.response?.status ??
    error?.error?.code
  );

  const message = String(error?.message || "").toLowerCase();
  const name = String(error?.name || "").toLowerCase();

  // Temporary HTTP errors
  if ([408, 429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  // Permanent client errors
  if (status >= 400 && status < 500) {
    return false;
  }

  // Timeout and network errors
  return (
    name.includes("timeout") ||
    name.includes("abort") ||
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("network") ||
    message.includes("fetch failed") ||
    message.includes("connection") ||
    message.includes("econnreset") ||
    message.includes("enotfound") ||
    !status
  );
}

// Sanitize response
function sanitizeText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

// Main Gemini function
export async function run(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Please enter a valid message.");
  }

  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `Gemini API: Attempt ${attempt + 1}/${MAX_RETRIES + 1}`
      );

      const result = await genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: input.trim(),

        config: {
          ...generationConfig,

          // Request timeout and SDK retry configuration
          httpOptions: {
            timeout: REQUEST_TIMEOUT,

            // Disable SDK retries because we handle retries below
            retryOptions: {
              attempts: 1,
            },
          },

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

      console.log("Gemini API response received.");

      return sanitizeText(result.text || "");

    } catch (error) {
      lastError = error;

      console.error(
        `Gemini API attempt ${attempt + 1} failed:`,
        error
      );

      if (!isRetryableError(error)) {
        console.error("Permanent error. Stopping retries.");
        break;
      }

      if (attempt === MAX_RETRIES) {
        console.error("Maximum retries reached.");
        break;
      }

      const delay = INITIAL_DELAY * Math.pow(2, attempt);

      console.log(
        `Retrying in ${delay / 1000} seconds...`
      );

      await sleep(delay);
    }
  }

  throw new Error(
    lastError?.message ||
      "Gemini API is unavailable. Please try again."
  );
}
