import React, { ReactNode } from "react";
import { SiClaude } from "react-icons/si";
import CustomLoading from "../loading/CustomLoading";
import TypingTextAnimation from "@/utils/aiReportTypingAnimation";
import { ConfidenceChart } from "./AiReportConfidenceChart";
import { IoIosPaw } from "react-icons/io";
import { GiBullHorns } from "react-icons/gi";
import { GoDash } from "react-icons/go";
import { AiResponseType } from "@/types/buffetAIReportTypes";

const SignalIcon: Record<string, ReactNode> = {
    bearish: <IoIosPaw size={42} />,
    bullish: <GiBullHorns size={42} />,
    neutral: <GoDash size={42} />,
};

type AiReportProps = {
    error: string | undefined;
    isLoading: boolean;
    report: AiResponseType | undefined;
    isSavedReport: boolean;
};

export default function AiReport({
    report,
    error,
    isLoading,
    isSavedReport,
}: AiReportProps) {
    if (error) {
        return (
            <div className="bg-image container max-md:!p-5 min-h-[530px] flex-center">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className="bg-image container max-md:!p-5 min-h-[530px]">
            <div className="flex max-md:flex-col justify-between items-center mb-8">
                <h1 className="text-[1.5rem] font-semibold">LLM Output:</h1>
                <div className="flex gap-2">
                    <SiClaude size={20} className="text-claude" /> Powered by
                    Claude 3.7 Sonnet
                </div>
            </div>
            {isLoading || !report?.reasoning ? (
                <div className="flex-center h-[240px]">
                    <CustomLoading />
                </div>
            ) : isSavedReport ? (
                <h1 className="mb-4">{report.reasoning}</h1>
            ) : (
                <TypingTextAnimation text={report.reasoning} />
            )}
            {report && (
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[1.25rem] font-semibold">
                            Signal:
                        </h1>
                        {report.signal && (
                            <div className="flex-center flex-col">
                                {SignalIcon[report.signal]}
                                <span className="text-[1rem]">
                                    {report.signal}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[1.25rem] font-semibold">
                            Confidence:
                        </h1>
                        {report.confidence && (
                            <span className="text-[1rem]">
                                <ConfidenceChart
                                    percentage={Number(report.confidence)}
                                />
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
