import GaugeChart from "./Chart";
import CustomLoading from "../loading/CustomLoading";
import { AnalysisDataResult } from "@/types/buffettAgentTypes";
import { calculationsData } from "@/data/calculationsData";

type CalculationsProps = {
    data: AnalysisDataResult | null;
    stockId: string;
};

export default function Calculations({ data, stockId }: CalculationsProps) {
    const descriptions = calculationsData["buffett"];
    if (!descriptions) {
        return (
            <div className="container min-h-[500px]">
                <CustomLoading />
            </div>
        );
    }

    if (!data?.[stockId]?.signal) {
        return (
            <div className="bg-image container min-h-[530px] flex-center">
                <h1>
                    This instrument isn&apos;t supported. Try searching for a
                    different one.
                </h1>
            </div>
        );
    }

    return (
        <div className="container max-md:!p-5 min-h-[500px]">
            <div className="flex justify-center md:justify-between items-center mb-8">
                <h1 className="text-[1.5rem] font-semibold">Final result:</h1>
            </div>
            <p className="border-l pl-3 md:pl-6">
                {descriptions.mainDescription}
            </p>

            <div className="flex max-md:flex-col justify-between mt-6">
                <div className="flex flex-1 flex-col items-center">
                    <h1>Signal:</h1>
                    <div className="flex flex-1 items-center">
                        <span className="text-[2rem] font-bold">
                            {data[stockId].signal}
                        </span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-center max-md:mt-6">
                    <h1>Margin of Safety:</h1>
                    <div className="flex flex-1 items-center">
                        <span className="text-[2rem] font-bold">
                            {data[stockId].marginOfSafety
                                ? (data[stockId].marginOfSafety * 100).toFixed(
                                      2
                                  ) + "%"
                                : "No value"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 justify-center">
                    <h1 className="text-center">Score:</h1>
                    <GaugeChart
                        value={data[stockId].score}
                        total={data[stockId].maxScore}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-6">
                <h1 className="text-[1.5rem] font-semibold max-md:text-center">
                    Margin of safety:
                </h1>
                <p className="border-l pl-3 md:pl-6">
                    {descriptions.sections.marginOfSafetyDetailed.description}
                </p>
                <div className="flex flex-1 flex-col items-center gap-4 mt-6">
                    <h1>The formula is:</h1>
                    <div className="flex flex-1 items-center">
                        <span className="text-[1.5rem] font-bold">
                            {
                                descriptions.sections.marginOfSafetyDetailed
                                    .formula
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-16">
                <h1 className="text-[1.5rem] font-semibold max-md:text-center">
                    Fundamentals:
                </h1>
                <p className="border-l pl-3 md:pl-6">
                    {descriptions.sections.fundamentals.description}
                </p>
                <div className="flex max-md:flex-col justify-between mt-6">
                    <div className="flex flex-1 gap-4 flex-col items-center">
                        <h1>Report:</h1>
                        <ul className="flex flex-col gap-2">
                            {data[stockId].fundamentalAnalysis.details.map(
                                (item, i) => (
                                    <li className="font-semibold" key={i}>
                                        &bull;{item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 justify-center">
                        <h1 className="text-center">Score:</h1>
                        <GaugeChart
                            value={data[stockId].fundamentalAnalysis.score}
                            total={data[stockId].fundamentalAnalysis.maxScore}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-16">
                <h1 className="text-[1.5rem] font-semibold max-md:text-center">
                    Consistency Analysis:
                </h1>
                <p className="border-l pl-3 md:pl-6">
                    {descriptions.sections.consistency.description}
                </p>
                <div className="flex max-md:flex-col justify-between mt-6">
                    <div className="flex flex-1 gap-4 flex-col items-center">
                        <h1>Report:</h1>
                        <ul className="flex flex-col gap-2">
                            {data[stockId].consistencyAnalysis.details.map(
                                (item, i) => (
                                    <li className="font-semibold" key={i}>
                                        &bull;{item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 justify-center">
                        <h1 className="text-center">Score:</h1>
                        <GaugeChart
                            value={data[stockId].consistencyAnalysis.score}
                            total={data[stockId].consistencyAnalysis.maxScore}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-16">
                <h1 className="text-[1.5rem] font-semibold max-md:text-center">
                    MOAT Analysis:
                </h1>
                <p className="border-l pl-3 md:pl-6">
                    {descriptions.sections.moat.description}
                </p>
                <div className="flex max-md:flex-col justify-between mt-6">
                    <div className="flex flex-1 gap-4 flex-col items-center">
                        <h1>Report:</h1>
                        <ul className="flex flex-col gap-2">
                            {data[stockId].moatAnalysis.details.map(
                                (item, i) => (
                                    <li className="font-semibold" key={i}>
                                        &bull;{item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 justify-center">
                        <h1 className="text-center">Score:</h1>
                        <GaugeChart
                            value={data[stockId].moatAnalysis.score}
                            total={data[stockId].moatAnalysis.maxScore}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-16">
                <h1 className="text-[1.5rem] font-semibold max-md:text-center">
                    Management Analysis:
                </h1>
                <p className="border-l pl-3 md:pl-6">
                    {descriptions.sections.management.description}
                </p>
                <div className="flex max-md:flex-col justify-between mt-6">
                    <div className="flex flex-1 gap-4 flex-col items-center">
                        <h1>Report:</h1>
                        <ul className="flex flex-col gap-2">
                            {data[stockId].managementAnalysis.details.map(
                                (item, i) => (
                                    <li className="font-semibold" key={i}>
                                        &bull;{item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 justify-center">
                        <h1 className="text-center">Score:</h1>
                        <GaugeChart
                            value={data[stockId].managementAnalysis.score}
                            total={data[stockId].managementAnalysis.maxScore}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
