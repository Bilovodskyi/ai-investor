import { db } from "@/drizzle/db";
import { ListItemTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const {
            stockName,
            reasoning,
            confidence,
            signal,
            calculationData,
            investor,
        } = data;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        if (
            !stockName ||
            !reasoning ||
            confidence === undefined ||
            !signal ||
            !calculationData
        ) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const reportId = uuidv4();

        await db.insert(ListItemTable).values({
            id: reportId,
            userId,
            stockName,
            reasoning,
            confidence,
            signal,
            calculationData,
            investor,
        });

        return NextResponse.json(
            { success: "Report has been saved!", reportId },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error saving report:", error);
        return NextResponse.json(
            { error: "Server error! Try again later" },
            { status: 500 }
        );
    }
}
