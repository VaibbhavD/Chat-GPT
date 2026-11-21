
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

// Extract HTTP status
function getErrorStatus(error) {
  return Number(
    error?.status ??
    error?.response?.status ??
    error?.error?.code ??
    0
  );
}

// Check retryable errors
function isRetryableError(error) {
  const status = getErrorStatus(error);

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

  // Network and timeout errors
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

// Get user-friendly error message
function getUserErrorMessage(error) {
  const status = getErrorStatus(error);

  if (status === 503 || status === 502 || status === 500) {
    return "Gemini is temporarily unavailable. Please try again later.";
  }

  if (status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }

  if (status === 401 || status === 403) {
    return "Gemini API authentication failed. Please check your API key.";
  }

  if (status === 400) {
    return "Invalid request. Please check your message and try again.";
  }

  const message = String(error?.message || "").toLowerCase();

  if (
    message.includes("timeout") ||
    message.includes("timed out") ||
    error?.name?.toLowerCase().includes("timeout")
  ) {
    return "Request timed out. Please try again.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch failed")
  ) {
    return "Network error. Please check your internet connection.";
  }

  return "Something went wrong. Please try again.";
}

// Main Gemini function with retry
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

          httpOptions: {
            timeout: REQUEST_TIMEOUT,
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

      const response = sanitizeText(result.text || "");

      if (!response) {
        throw new Error("Gemini returned an empty response.");
      }

      return response;

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

  // Throw user-friendly error after all retries
  throw new Error(getUserErrorMessage(lastError));
}
