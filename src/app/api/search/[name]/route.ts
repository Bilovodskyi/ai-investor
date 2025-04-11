import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    const stockName = params.name;

    try {
        const response = await fetch(
            `https://financialmodelingprep.com/stable/search-name?query=${stockName}&exchange=NASDAQ,NYSE&apikey=${process.env.FMP_API_KEY}`
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to search" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while searching stock" },
            { status: 500 }
        );
    }
}
