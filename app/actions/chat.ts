"use server";

import { categorizeQuestion } from "./categorize";
import { getResponseByCategory } from "./responses";

interface ChatResponse {
  text: string;
  links?: Array<{ label: string; url: string }>;
  image?: string;
  githubProfile?: any;
  category?: string;
  confidence?: number;
  showBusinessCard?: boolean;
  businessCard?: {
    name: string;
    role: string;
    email: string;
    location: string;
    socials: Array<{ label: string; url: string; icon?: string }>;
  };
}

export async function getChatResponse(message: string): Promise<ChatResponse> {
  try {
    console.log("===========================================");
    console.log("--- Chat Action Triggered ---");
    console.log("User message:", message);
    console.log("===========================================");

    // Step 1: Categorize the question
    const categorization = await categorizeQuestion(message);
    console.log("✓ Categorization complete");
    console.log("  Category:", categorization.category);
    console.log(
      "  Confidence:",
      (categorization.confidence * 100).toFixed(1) + "%",
    );

    // Step 2: Get response based on category
    const response = await getResponseByCategory(
      categorization.category,
      message,
    );
    console.log("✓ Response retrieved for category:", categorization.category);

    // Step 3: Return response with metadata
    console.log("===========================================");
    console.log("✓ Chat response completed successfully");
    console.log("===========================================");

    return {
      ...response,
      category: categorization.category,
      confidence: categorization.confidence,
    };
  } catch (error) {
    console.error("===========================================");
    console.error("✗ Error in chat response:", error);
    console.error("===========================================");
    return {
      text: "I'm having trouble processing your question right now. Please try again later.",
      links: [],
    };
  }
}
