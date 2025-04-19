"use server";

import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const PLAN_TOKEN_MAP = {
    "5": 50,
    "10": 200,
    "20": 500,
} as const;

export async function updateTokens({
    plan,
    userId,
}: {
    plan: string;
    userId: string;
}): Promise<
    { success: true; message: string } | { success: false; message: string }
> {
    try {
        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.id, userId),
        });

        if (!user) {
            return { success: false, message: "User not found!" };
        }

        const updateTokensValue =
            PLAN_TOKEN_MAP[plan as keyof typeof PLAN_TOKEN_MAP];
        if (updateTokensValue === undefined) {
            return { success: false, message: "Invalid plan selected" };
        }

        await db
            .update(UserTable)
            .set({ tokens: Number(user.tokens) + updateTokensValue })
            .where(eq(UserTable.id, userId));

        return {
            success: true,
            message:
                "Thank you for your purchase! Tokens will be deposited into your account shortly.",
        };
    } catch (error) {
        console.error("Error checking tokens:", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}
