import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const stockId = params.id;

    try {
        const response = await fetch(
            `https://financialmodelingprep.com/stable/financial-statement-full-as-reported?symbol=${stockId}&limit=5&apikey=${process.env.FMP_API_KEY}`,
            {
                next: {
                    revalidate: 86400, // 1day
                    tags: [`stock-${stockId}`],
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch stock data" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "An error occurred while fetching stock data" },
            { status: 500 }
        );
    }
}
