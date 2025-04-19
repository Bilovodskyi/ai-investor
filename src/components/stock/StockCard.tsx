"use client";

import { useAppSelector } from "@/redux/store";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { formatMarketCap } from "@/utils/helperFunctions";
import StockCardSkeleton from "../loading/StockCardSkeleton";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { AnalysisDataResult } from "@/types/buffettAgentTypes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StockCard() {
    const { stockDataForUi } = useAppSelector((state) => state.stockData);
    const calculationData: AnalysisDataResult | null = useAppSelector(
        (state) => state.stockData.stockDataForBuffettCalc
    );
    const ticker = stockDataForUi?.[0]?.symbol;

    const [liked, setLiked] = useState(false);
    const [reportReady, setReportReady] = useState(false);

    useEffect(() => {
        if (!ticker) {
            setReportReady(false);
            return;
        }

        const data = getReportFromSessionStorage(ticker);
        setReportReady(!!data);
    }, [ticker]);

    const getReportFromSessionStorage = (id: string) => {
        try {
            const reportsJSON = sessionStorage.getItem("buffettAiReports");
            if (!reportsJSON) return null;

            const reports = JSON.parse(reportsJSON);
            return reports[id] || null;
        } catch (error) {
            console.error("Error reading from sessionStorage:", error);
            return null;
        }
    };

    const saveReportToTheServer = async () => {
        if (!stockDataForUi || !ticker) {
            toast.error("No stock data available");
            setLiked(false);
            return false;
        }

        const data = getReportFromSessionStorage(ticker);

        if (
            !data ||
            !data.reasoning ||
            data.confidence === undefined ||
            !data.signal
        ) {
            toast.error("Missing report data");
            return false;
        }

        if (!calculationData) {
            toast.error("Missing calculation data");
            return false;
        }

        try {
            const response = await fetch("/api/reports/save-report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stockName: stockDataForUi[0].companyName,
                    reasoning: data.reasoning,
                    confidence: data.confidence,
                    signal: data.signal,
                    calculationData: calculationData,
                    investor: "Buffett",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || "Failed to save report";
                throw new Error(errorMessage);
            }

            const parsedData = await response.json();
            console.log(parsedData);
            return true;
        } catch (error) {
            setLiked(false);

            if (error instanceof Error) {
                toast.error(error.message);
                console.error("Save report error:", error.message);
            } else {
                toast.error("Unexpected server error. Try again later!");
                console.error("Unexpected save report error:", error);
            }
            return false;
        }
    };

    const handleLikeReport = async () => {
        setLiked(true);
        toast.success("Report has been saved!", {
            description: "You can find it on your My List page.",
        });

        const saveSuccessful = await saveReportToTheServer();
        if (!saveSuccessful) {
            toast.dismiss();
        }
    };

    const stockCardRef = useRef(null);
    const sectionToHideRef = useRef(null);
    const sectionToShowRef = useRef(null);
    const sectionToShowMobileRef = useRef(null);

    useGSAP(
        () => {
            if (!stockCardRef.current) return;

            const mainTimeLine = gsap.timeline({
                scrollTrigger: {
                    start: 10,
                    scrub: false,
                    toggleActions: "play none none reverse",
                },
            });

            const windowWidth = window.innerWidth;
            const parentPadding = 224;
            const parentPaddingMobile = 20;
            const targetWidth = windowWidth - parentPadding;
            const targetWidthMobile = windowWidth - parentPaddingMobile;

            const mm = gsap.matchMedia();

            mm.add("(max-width: 768px)", () => {
                mainTimeLine.to(
                    stockCardRef.current,
                    {
                        width: targetWidthMobile + "px",
                        position: "fixed",
                        height: "80px",
                        marginTop: 0,
                        padding: "4px",
                        flexDirection: "row",
                        top: "8px",
                        duration: 0.35,
                        ease: "power2.out",
                    },
                    0
                );
                mainTimeLine.to(
                    sectionToHideRef.current,
                    {
                        display: "none",
                        opacity: 0,
                        duration: 0,
                    },
                    0
                );
                mainTimeLine.to(
                    sectionToShowMobileRef.current,
                    {
                        display: "flex",
                        flexDirection: "column",
                        duration: 0,
                        opacity: 1,
                        delay: 0.35,
                    },
                    0
                );
            });

            mm.add("(min-width: 769px)", () => {
                mainTimeLine.to(
                    stockCardRef.current,
                    {
                        width: targetWidth + "px",
                        position: "fixed",
                        height: "80px",

                        padding: "4px 12px",
                        flexDirection: "row",
                        top: "68px",
                        zIndex: 20,
                        duration: 0.35,
                        ease: "power2.out",
                    },
                    0
                );
                mainTimeLine.to(
                    sectionToHideRef.current,
                    {
                        display: "none",
                        opacity: 0,
                        duration: 0,
                    },
                    0
                );
                mainTimeLine.to(
                    sectionToShowRef.current,
                    {
                        display: "flex",
                        gap: "46px",
                        duration: 0,
                        opacity: 1,
                        delay: 0.35,
                    },
                    0
                );
            });
        },
        { dependencies: [stockDataForUi] }
    );

    if (
        !stockDataForUi ||
        !Array.isArray(stockDataForUi) ||
        stockDataForUi.length === 0
    ) {
        return <StockCardSkeleton />;
    }

    return (
        <>
            <div
                ref={stockCardRef}
                className="bg-custom-purple! container w-full md:w-[360px] h-svh md:h-[580px] flex flex-col gap-8 items-center max-md:!p-5 shrink-0 mt-12 md:mt-0 z-50">
                <div className="w-full flex items-center justify-between">
                    <div className="bg-container p-3 rounded-2xl">
                        <Image
                            src={stockDataForUi[0].image}
                            alt="logo"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div
                        ref={sectionToShowMobileRef}
                        className="hidden flex-1 opacity-0 items-center">
                        <div className="flex gap-2">
                            <h1
                                className={`${
                                    stockDataForUi[0].companyName.length > 15
                                        ? "text-md"
                                        : "text-sm"
                                } font-semibold`}>
                                {stockDataForUi[0].companyName}
                            </h1>
                        </div>
                        <div className="flex gap-6 items-center">
                            <h2 className="text-md">
                                {stockDataForUi[0].symbol}
                            </h2>
                            <h2 className="font-medium text-lg">
                                {stockDataForUi[0].price}
                            </h2>
                        </div>
                    </div>
                    <div
                        ref={sectionToShowRef}
                        className="hidden flex-1 justify-between px-36 opacity-0">
                        <div className="flex gap-2 items-center">
                            <h1
                                className={`${
                                    stockDataForUi[0].companyName.length > 15
                                        ? "text-lg"
                                        : "text-3xl"
                                } font-semibold`}>
                                {stockDataForUi[0].companyName}
                            </h1>
                            <span className="text-3xl">|</span>
                            <h2 className="text-2xl">
                                {stockDataForUi[0].symbol}
                            </h2>
                        </div>
                        <span className="font-medium text-[2rem] text-center">
                            {stockDataForUi[0].price}
                        </span>
                        <div className="flex flex-col">
                            <span>Capitalization</span>
                            <span className="font-medium">
                                {formatMarketCap(stockDataForUi[0].marketCap)}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span>Sector</span>
                            <span className="font-medium">
                                {stockDataForUi[0].industry}
                            </span>
                        </div>
                    </div>
                    <div className="h-[56px] w-[56px] rounded-full bg-black flex-center">
                        <Heart
                            size={26}
                            style={{
                                stroke: "var(--green)",
                                fill: "transparent",
                            }}
                            className={`heart ${
                                liked ? "is-active" : ""
                            } overflow-hidden cursor-pointer`}
                            onClick={
                                liked === false || reportReady
                                    ? handleLikeReport
                                    : undefined
                            }
                        />
                    </div>
                </div>

                <div
                    ref={sectionToHideRef}
                    className="flex flex-col w-full gap-4">
                    <div className="flex flex-col gap-2">
                        <h1
                            className={`${
                                stockDataForUi[0].companyName.length > 15
                                    ? "text-lg"
                                    : "text-3xl"
                            } font-semibold`}>
                            {stockDataForUi[0].companyName}
                        </h1>
                        <h2 className="text-[1rem]">
                            {stockDataForUi[0].symbol}
                        </h2>
                    </div>

                    <span className="font-medium text-[3rem] text-center">
                        {stockDataForUi[0].price}
                    </span>

                    <div className="flex flex-col">
                        <span>Capitalization</span>
                        <span className="font-medium">
                            {formatMarketCap(stockDataForUi[0].marketCap)}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>Sector</span>
                        <span className="font-medium">
                            {stockDataForUi[0].industry}
                        </span>
                    </div>
                    <Image
                        src="/curve-line-2.png"
                        alt="curve line"
                        width={340}
                        height={32}
                    />
                </div>
            </div>
        </>
    );
}
