"use client";

import { analyzeWithBuffettPrinciples } from "@/agents/buffett";
import {
    setStockDataForBuffettAICall,
    setStockDataForBuffettCalc,
    setStockDataForUi,
} from "@/redux/slices/buffettStockDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { transformFinancialDataForBuffettAnalysis } from "@/utils/transformData";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import AiReport from "@/components/stock/AiReport";
import Calculations from "@/components/stock/Calculations";
import NavLinksPage from "@/components/stock/NavLinks";
import Principles from "@/components/stock/Principles";
import StockCard from "@/components/stock/StockCard";
import { useBuffettAiReport } from "@/hooks/useBuffettAiReport";
import { AnalysisDataResult } from "@/types/buffettAgentTypes";

export type InvestorStateType = "buffett" | "graham" | "burry";

export default function BuffettStylePage() {
    const [investor, setInvestor] = useState<InvestorStateType>("buffett");
    const { stockId } = useParams<{ stockId: string }>();
    const dispatch = useAppDispatch();

    const analysisData = useAppSelector(
        (s) => s.stockData.stockDataForBuffettAICall
    );
    const {
        data: report,
        isLoading: aiReportLoading,
        error: aiReportError,
    } = useBuffettAiReport(stockId, analysisData);

    const stockDataForBuffettCalc: AnalysisDataResult | null = useAppSelector(
        (state) => state.stockData.stockDataForBuffettCalc
    );
    console.log(analysisData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [stockResponse, financialsResponse] = await Promise.all([
                    fetch(`/api/stock/${stockId}`),
                    fetch(`/api/financials/${stockId}`),
                ]);

                if (!stockResponse.ok || !financialsResponse.ok) {
                    throw new Error("Failed to fetch stock data");
                }

                const stockData = await stockResponse.json();
                const financialsData = await financialsResponse.json();

                dispatch(setStockDataForUi(stockData));
                console.log(financialsData);

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

    return (
        <>
            <div className="flex max-md:flex-col gap-4 mt-6">
                <StockCard />

                <div className="max-md:mt-[150px] flex flex-col flex-1 gap-4 transition-all duration-200">
                    <NavLinksPage setInvestor={setInvestor} />
                    <AiReport
                        report={report}
                        error={aiReportError}
                        isLoading={aiReportLoading}
                        isSavedReport={false}
                    />
                </div>
            </div>
            <Principles investor={investor} />
            <Calculations stockId={stockId} data={stockDataForBuffettCalc} />
            <div className="mb-6">
                <p className="text-[.6rem] text-center">
                    The information and trading signals provided on this website
                    are for educational and informational purposes only and do
                    not constitute investment advice. We are not financial
                    advisors, and our analysis reflects general insights, not
                    personalized recommendations. Investing involves risks, and
                    you should consult a qualified professional before making
                    any financial decisions. Past performance is not indicative
                    of future results.
                </p>
            </div>
        </>
    );
}
