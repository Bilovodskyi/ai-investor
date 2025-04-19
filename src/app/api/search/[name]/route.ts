import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ name: string }> }
) {
    const { name: stockName } = await params;

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
        console.log(error);
        return NextResponse.json(
            { error: "An error occurred while searching stock" },
            { status: 500 }
        );
    }
}
