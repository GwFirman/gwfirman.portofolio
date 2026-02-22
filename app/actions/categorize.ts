"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export type QuestionCategory =
  | "skills"
  | "experience"
  | "projects"
  | "achievements"
  | "github"
  | "contact"
  | "general"
  | "unknown";

interface CategorizeResult {
  category: QuestionCategory;
  confidence: number;
}

const CATEGORIZATION_PROMPT = `
You are a question categorizer for Firman's portfolio website. 
Analyze the user's question and categorize it into ONE of these categories:

CATEGORIES:
1. "skills" - Questions about technical skills, technologies, programming languages, tools, frameworks
   Examples: "What skills do you have?", "Do you know React?", "What technologies?"

2. "experience" - Questions about work experience, jobs, internships, companies, positions
   Examples: "Tell me about your experience", "Where have you worked?", "What companies?"

3. "projects" - Questions about projects, portfolio work, applications built, specific project names
   Examples: "What projects?", "Tell me about Daunesia", "Show your work", "Best project?"

4. "achievements" - Questions about awards, competitions, accomplishments, recognition
   Examples: "What achievements?", "Any awards?", "Competition wins?"

5. "github" - Questions specifically about GitHub, repositories, contributions, GitHub profile
   Examples: "Show GitHub", "How many repos?", "GitHub profile?", "Contributions?"

6. "contact" - Questions about how to contact, reach out, social media, email
   Examples: "How to contact?", "Email?", "LinkedIn?", "Social media?"

7. "general" - General questions about Firman, introduction, who is he, background
   Examples: "Who are you?", "Tell me about yourself", "Introduction?"

8. "unknown" - Questions that don't fit any category or are off-topic

IMPORTANT: You MUST return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "category": "category_name",
  "confidence": 0.95
}

The confidence should be a number between 0 and 1 indicating how confident you are about the categorization.
`;

export async function categorizeQuestion(
  question: string,
): Promise<CategorizeResult> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("API Key is missing");
      return { category: "unknown", confidence: 0 };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      CATEGORIZATION_PROMPT + `\n\nUser Question: "${question}"`,
    );

    const response = result.response;
    let responseText = response.text().trim();

    // Log token usage
    const usageMetadata = response.usageMetadata;
    if (usageMetadata) {
      console.log("--- Gemini Token Usage (Categorization) ---");
      console.log(`  User Question: "${question}"`);
      console.log(`  Input tokens:  ${usageMetadata.promptTokenCount}`);
      console.log(`  Output tokens: ${usageMetadata.candidatesTokenCount}`);
      console.log(`  Total tokens:  ${usageMetadata.totalTokenCount}`);
      console.log("-------------------------------------------");
    }

    // Clean up potential markdown code blocks
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    console.log("Categorization response:", responseText);

    const parsed = JSON.parse(responseText);

    return {
      category: parsed.category as QuestionCategory,
      confidence: parsed.confidence || 0.8,
    };
  } catch (error) {
    console.error("Error categorizing question:", error);
    return { category: "unknown", confidence: 0 };
  }
}
