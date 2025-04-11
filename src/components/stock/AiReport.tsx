"use client";

import { InvestorStateType } from "@/app/private/[stockId]/page";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SiClaude } from "react-icons/si";

type AiResponseType = {
    reasoning: string;
    confidence: number;
    signal: string;
};

export default function AiReport({
    investor,
}: {
    investor: InvestorStateType;
}) {
    const [aiResponse, setAiResponse] = useState<AiResponseType | undefined>();
    const { stockId } = useParams();
    const data = useAppSelector(
        (state) => state.stockData.stockDataForBuffettAICall
    );
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/claude", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ticker: stockId,
                    analysisData: data,
                }),
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                throw new Error(errorMessage.error);
            }

            const parsedData = await res.json();
            const claudeReport = JSON.parse(parsedData.content[0].text);

            setAiResponse(claudeReport);
        };
        if (data) {
            fetchData();
        }
    }, [stockId, investor, data]);

    console.log(aiResponse);
    return (
        <div className="bg-image container min-h-[500px]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-[1.5rem] font-semibold">LLM Output:</h1>
                <div className="flex gap-2">
                    <SiClaude size={20} className="text-claude" /> Powered by
                    Claude 3.7 Sonnet
                </div>
            </div>
            <h1 className="text-[.9rem] mb-8">{aiResponse?.reasoning}</h1>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-[1.5rem] font-semibold">Signal:</h1>
                    <span className="text-[1rem]">{aiResponse?.signal}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-[1.5rem] font-semibold">Confidence:</h1>
                    <span className="text-[1rem]">
                        {aiResponse?.confidence}
                    </span>
                </div>
            </div>
        </div>
    );
}
