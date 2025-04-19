import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
    const { userId, sessionClaims } = await auth();

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

    const userEmail = sessionClaims?.email as string;

    try {
        const userInDb = await db.query.UserTable.findFirst({
            where: eq(UserTable.id, userId),
        });

        if (!userInDb) {
            await db
                .insert(UserTable)
                .values({ id: userId, tokens: 10, email: userEmail ?? "" });

            return new Response(JSON.stringify({ success: true, tokens: 10 }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(
                JSON.stringify({
                    success: true,
                    tokens: userInDb?.tokens,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "An error occurred while fetching tokens data" },
            { status: 500 }
        );
    }
}
