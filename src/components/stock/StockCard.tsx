"use client";

import { useAppSelector } from "@/redux/store";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

import { formatMarketCap } from "@/utils/helperFunctions";
import StockCardSkeleton from "../loading/StockCardSkeleton";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StockCard() {
    const { stockDataForUi } = useAppSelector((state) => state.stockData);

    const stockCardRef = useRef(null);
    const sectionToHideRef = useRef(null);
    const sectionToShowRef = useRef(null);

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
            const targetWidth = windowWidth - parentPadding;

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
                className="bg-custom-purple! container w-[360px] h-[550px] flex flex-col gap-8 items-center px-8 shrink-0">
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
                        <Heart size={26} color="var(--green)" />
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
