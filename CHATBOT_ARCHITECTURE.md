# Chatbot System Architecture

## Overview

The chatbot uses a **category-based response system** powered by Gemini AI for question categorization.

## How It Works

### 1. Question Categorization (`categorize.ts`)

- Uses Gemini AI to analyze user questions
- Categorizes into 8 predefined categories:
  - `skills` - Technical skills and technologies
  - `experience` - Work experience and jobs
  - `projects` - Portfolio projects
  - `achievements` - Awards and competitions
  - `github` - GitHub profile and repositories
  - `contact` - Contact information
  - `general` - General introduction
  - `unknown` - Unrecognized questions

### 2. Response Generation (`responses.ts`)

- Contains predefined responses for each category
- Dynamically fetches GitHub data for `github` category
- Provides context-aware responses based on original question
- Includes relevant links and images

### 3. Chat Handler (`chat.ts`)

- Orchestrates the categorization and response flow
- Returns structured response with metadata
- Handles errors gracefully

### 4. Frontend (`ChatbotSection.tsx`)

- Displays user questions and bot responses
- Shows GitHub profile cards when relevant
- Supports images for project showcases
- Responsive design for mobile and desktop

## Benefits

✅ **Fast Response Time** - Predefined responses load instantly
✅ **Consistent Answers** - Same category = same quality response
✅ **Easy to Maintain** - Update responses in one place
✅ **AI-Powered** - Smart categorization using Gemini
✅ **Scalable** - Easy to add new categories

## Adding New Categories

1. Add category to `QuestionCategory` type in `categorize.ts`
2. Update `CATEGORIZATION_PROMPT` with new category description
3. Add case handler in `responses.ts`
4. Response will automatically work in chat!

## Example Questions

**Skills:**

- "What skills do you have?"
- "Do you know React?"

**Projects:**

- "Show me your projects"
- "Tell me about Daunesia"

**GitHub:**

- "Show your GitHub profile"
- "How many repositories?"

**Experience:**

- "Tell me about your experience"
- "Where have you worked?"
