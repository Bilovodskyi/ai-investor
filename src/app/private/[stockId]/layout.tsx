"use client";

import { analyzeWithBuffettPrinciples } from "@/agents/buffett";
import {
    setStockDataForBuffettAICall,
    setStockDataForBuffettCalc,
    setStockDataForUi,
} from "@/redux/slices/stockDataSlice";
import { useAppDispatch } from "@/redux/store";
import { AnalysisDataResult } from "@/types/buffettAgentTypes";
import { transformFinancialDataForBuffettAnalysis } from "@/utils/transformData";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

export default function layout({ children }: { children: ReactNode }) {
    const { stockId } = useParams();
    const dispatch = useAppDispatch();

    // const [test, setTest] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stockResponse, financialsResponse] = await Promise.all([
                    fetch(`/api/stock/${stockId}`),
                    fetch(`/api/financials/${stockId}`),
                ]);

                if (!stockResponse.ok) {
                    throw new Error("Failed to fetch stock data");
                }

                const stockData = await stockResponse.json();
                const financialsData = await financialsResponse.json();

                dispatch(setStockDataForUi(stockData));

                const transformedData =
                    transformFinancialDataForBuffettAnalysis(
                        financialsData,
                        stockData[0].marketCap
                    );

                dispatch(setStockDataForBuffettAICall(transformedData));

                const buffettSignal =
                    analyzeWithBuffettPrinciples(transformedData);

                dispatch(setStockDataForBuffettCalc(buffettSignal));
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        if (stockId) {
            fetchData();
        }
    }, [stockId, dispatch]);

    // console.log(test);

    return (
        <div className="flex flex-col gap-4">
            {/* h-screen overflow-hidden  */}
            <div className="flex w-full gap-8 items-center justify-between py-4 sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-zinc-800 px-28">
                <div className="relative group inline-block cursor-pointer">
                    <Link
                        href="/private/search"
                        className="flex gap-2 items-center mb-1">
                        <ArrowLeft size={16} /> <span>Search</span>
                    </Link>
                    <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </div>
                <div className="flex items-center gap-12">
                    <div className="relative group inline-block cursor-pointer">
                        <div className="mb-1">My list</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </div>

                    <Link
                        href="/private/tokens"
                        className="relative group inline-block cursor-pointer">
                        <div className="mb-1">Buy Tokens</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <div className="relative group inline-block cursor-pointer">
                        <div className="mb-1">Trade Journal</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </div>
                    <div className="rounded-md p-2">Balance: 10 tokens</div>
                    <div className="flex items-center gap-4">
                        <h1>Hi, Pickachu</h1>
                        <div className="flex items-center justify-center bg-red-300 rounded-full h-[30px] w-[30px]">
                            P
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 px-28">{children}</div>
        </div>
    );
}
