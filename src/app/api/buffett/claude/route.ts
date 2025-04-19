import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

export async function POST(request: Request) {
    const data = await request.json();
    const { ticker, analysisData } = data;
    const { userId } = await auth();

    if (!userId) {
        return new Response(
            JSON.stringify({
                error: "Not authenticated",
            }),
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    const user = await db.query.UserTable.findFirst({
        where: eq(UserTable.id, userId),
    });

    if (user?.tokens === 0) {
        return new Response(
            JSON.stringify({
                error: "You don't have enough tokens for this operation.",
            }),
            {
                status: 402,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    if (user && user.tokens !== null && user.tokens !== undefined) {
        const updatedTokens = user.tokens - 1;

        await db
            .update(UserTable)
            .set({ tokens: updatedTokens })
            .where(eq(UserTable.id, user.id))
            .execute();
    }

    try {
        const res = await anthropic.messages.create({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 4000,
            temperature: 1,
            system: `You are a Warren Buffett AI agent. Decide on investment signals based on Warren Buffett's principles:
  - Circle of Competence: Only invest in businesses you understand
  - Margin of Safety (> 30%): Buy at a significant discount to intrinsic value
  - Economic Moat: Look for durable competitive advantages
  - Quality Management: Seek conservative, shareholder-oriented teams
  - Financial Strength: Favor low debt, strong returns on equity
  - Long-term Horizon: Invest in businesses, not just stocks
  - Sell only if fundamentals deteriorate or valuation far exceeds intrinsic value
  When providing your reasoning, be thorough and specific by:
  1. Explaining the key factors that influenced your decision the most (both positive and negative)
  2. Highlighting how the company aligns with or violates specific Buffett principles
  3. Providing quantitative evidence where relevant (e.g., specific margins, ROE values, debt levels)
  4. Concluding with a Buffett-style assessment of the investment opportunity
  5. Using Warren Buffett's voice and conversational style in your explanation
  For example, if bullish: "I'm particularly impressed with [specific strength], reminiscent of our early investment in See's Candies where we saw [similar attribute]..."
  For example, if bearish: "The declining returns on capital remind me of the textile operations at Berkshire that we eventually exited because..."
  Follow these guidelines strictly. If some data is missing (e.g., financial metrics, management details), use reasonable assumptions based on your knowledge or skip that part of the analysis.`,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Based on the following data, create the investment signal as Warren Buffett would:
  Analysis Data for ${ticker}:
  ${JSON.stringify(analysisData, null, 2)}
  IMPORTANT: You must return ONLY valid JSON with no markdown formatting, no backticks, no code block markers, and no additional text before or after the JSON object. The response should begin with { and end with } and contain nothing else:
  {
    "signal": "bullish" | "bearish" | "neutral",
    "confidence": float between 0 and 100,
    "reasoning": "string" (max 1500 characters)
  }`,
                        },
                    ],
                },
            ],
        });
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        console.error("Error processing request:", error);

        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return new Response(
            JSON.stringify({
                error: errorMessage,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
