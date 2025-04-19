import { db } from "@/drizzle/db";
import { ListItemTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const report = await db
            .select({
                created: ListItemTable.createdAt,
                name: ListItemTable.stockName,
                investor: ListItemTable.investor,
                signal: ListItemTable.signal,
                reasoning: ListItemTable.reasoning,
                calcData: ListItemTable.calculationData,
                confidence: ListItemTable.confidence,
            })
            .from(ListItemTable)
            .where(eq(ListItemTable.id, id));

        return NextResponse.json({ success: true, report }, { status: 200 });
    } catch (err) {
        console.error("Error fetching reports:", err);
        return NextResponse.json(
            { error: "Server error! Try again later" },
            { status: 500 }
        );
    }
}
