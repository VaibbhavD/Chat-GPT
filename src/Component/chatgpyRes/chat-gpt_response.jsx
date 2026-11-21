
export async function run(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Please enter a valid message.");
  }

  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Gemini API request: Attempt ${attempt + 1}`);

      const result = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
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
        httpOptions: {
          timeout: 30000,
        },
      });

      return sanitizeText(result.text || "");

    } catch (error) {
      lastError = error;

      console.error(
        `Gemini API attempt ${attempt + 1} failed:`,
        error
      );

      if (!isRetryableError(error)) {
        break;
      }

      if (attempt === MAX_RETRIES) {
        break;
      }

      const delay = INITIAL_DELAY * Math.pow(2, attempt);

      console.log(`Retrying in ${delay / 1000} seconds...`);

      await sleep(delay);
    }
  }

  throw new Error(
    lastError?.message ||
      "Request timed out. Please try again."
  );
}
