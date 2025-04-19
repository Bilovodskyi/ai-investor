"use client";
import CustomLoading from "@/components/loading/CustomLoading";
import AiReport from "@/components/stock/AiReport";
import Calculations from "@/components/stock/Calculations";
import Principles from "@/components/stock/Principles";
import { AnalysisDataResult } from "@/types/buffettAgentTypes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type SavedReportType = {
    calcData: AnalysisDataResult;
    created: Date;
    name: string;
    investor: string;
    signal: string;
    reasoning: string;
    confidence: "bullish" | "bearish" | "neutral";
};

export default function ReportPage() {
    const [report, setReport] = useState<SavedReportType | undefined>();
    const { reportId } = useParams<{ reportId: string }>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/reports/get-report-by-id/${reportId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const parsedResponse = await response.json();
            setReport(parsedResponse.report[0]);
        };

        fetchData();
    }, [reportId]);

    if (report === undefined) {
        return (
            <div className="flex-center h-svh md:h-[calc(100vh-52px)]">
                <CustomLoading />
            </div>
        );
    }

    const tickers = Object.keys(report.calcData);
    const ticker = tickers[0];

    return (
        <>
            <div className="mt-12 md:mt-0">
                <div className="flex gap-4 p-4">
                    <div className="flex gap-4 items-center">
                        <span className="text-neutral-400 text-[.7rem]">
                            Company:
                        </span>
                        <span className="text-[.8rem]">{report.name}</span>
                    </div>

                    <div className="flex gap-4 items-center">
                        <span className="text-neutral-400 text-[.7rem]">
                            Generated on:
                        </span>
                        <span className="text-[.8rem]">
                            {new Date(report.created).toLocaleDateString(
                                "en-CA"
                            )}
                        </span>
                    </div>
                </div>
                <AiReport
                    report={{
                        reasoning: report.reasoning,
                        signal: report.signal,
                        confidence: report.confidence,
                    }}
                    error={undefined}
                    isLoading={false}
                    isSavedReport
                />
            </div>

            <Principles investor="buffett" />

            <Calculations stockId={ticker} data={report.calcData} />

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
