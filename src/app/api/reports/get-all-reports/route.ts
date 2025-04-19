import { db } from "@/drizzle/db";
import { ListItemTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const reports = await db
            .select({
                id: ListItemTable.id,
                created: ListItemTable.createdAt,
                name: ListItemTable.stockName,
                investor: ListItemTable.investor,
                signal: ListItemTable.signal,
            })
            .from(ListItemTable)
            .where(eq(ListItemTable.userId, userId))
            .orderBy(desc(ListItemTable.createdAt))
            .limit(50);

        return NextResponse.json({ success: true, reports }, { status: 200 });
    } catch (err) {
        console.error("Error fetching reports:", err);
        return NextResponse.json(
            { error: "Server error! Try again later" },
            { status: 500 }
        );
    }
}
