"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./system-prompt";
import { getGitHubProfile } from "./github";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getGeminiResponse(message: string) {
  try {
    console.log("--- Gemini Action Triggered ---");

    if (!process.env.GEMINI_API_KEY) {
      console.error("API Key is missing");
      return {
        text: "I'm sorry, my brain is not connected right now (API Key missing). Please check the configuration.",
        links: [],
      };
    }

    // Check if the message is asking about GitHub
    const isGitHubQuery =
      /github|repository|repositories|repo|contribution|followers|profile/i.test(
        message
      );

    // Fetch GitHub data if relevant
    let githubContext = "";
    if (isGitHubQuery) {
      const githubData = await getGitHubProfile();
      if (githubData.success && githubData.data) {
        const data = githubData.data;
        githubContext = `\n\nGITHUB PROFILE DATA (Use this for GitHub-related questions):
- Name: ${data.name}
- Username: @${data.username}
- Bio: ${data.bio || "N/A"}
- Location: ${data.location || "N/A"}
- Website: ${data.blog || "N/A"}
- Company: ${data.company || "N/A"}
- Public Repositories: ${data.repos}
- Followers: ${data.followers}
- Following: ${data.following}
- Account Age: ${data.accountAge}+ years
- Last Contribution: ${data.lastContribution || "N/A"}
- Profile URL: ${data.profileUrl}
- Avatar Image: ${data.avatar}

IMPORTANT: When answering GitHub questions, you MUST include the "githubProfile" field in your JSON response with this exact structure:
{
  "text": "Your response text",
  "links": [...],
  "githubProfile": {
    "name": "${data.name}",
    "username": "${data.username}",
    "bio": "${data.bio || "N/A"}",
    "avatar": "${data.avatar}",
    "repos": ${data.repos},
    "followers": ${data.followers},
    "following": ${data.following},
    "accountAge": ${data.accountAge},
    "lastContribution": "${data.lastContribution || "N/A"}",
    "profileUrl": "${data.profileUrl}",
    "location": "${data.location || "N/A"}",
    "blog": "${data.blog || "N/A"}"
  }
}`;
      }
    }

    // Attempt to use the preferred model, fallback to others if necessary
    const modelsToTry = ["gemini-2.5-flash"];
    let responseText = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting to use model: ${modelName}`);
        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text:
                    SYSTEM_PROMPT +
                    githubContext +
                    "\nIMPORTANT: You MUST return raw JSON without Markdown formatting (no ```json code blocks).",
                },
              ],
            },
            {
              role: "model",
              parts: [
                {
                  text: '{"text": "Hello! I am ready to answer questions about Firman.", "links": [], "image": null}',
                },
              ],
            },
          ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        responseText = response.text();

        // Log token usage
        const usageMetadata = response.usageMetadata;
        if (usageMetadata) {
          console.log(`--- Token Usage (${modelName}) ---`);
          console.log(`  Input tokens:  ${usageMetadata.promptTokenCount}`);
          console.log(`  Output tokens: ${usageMetadata.candidatesTokenCount}`);
          console.log(`  Total tokens:  ${usageMetadata.totalTokenCount}`);
        }

        if (responseText) {
          console.log(`Success with model: ${modelName}`);
          break; // Success!
        }
      } catch (e) {
        console.error(
          `Failed with model ${modelName}:`,
          e instanceof Error ? e.message : String(e),
        );
        lastError = e;
        // Continue to next model
      }
    }

    if (!responseText) {
      throw lastError || new Error("All models failed to respond");
    }

    // Clean up potential markdown code blocks
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();
    console.log("Response text:", responseText.substring(0, 100) + "...");

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON response:", responseText);
      return {
        text: responseText,
        links: [],
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I'm having trouble connecting to my AI services right now. Please try again later.",
      links: [],
    };
  }
}
