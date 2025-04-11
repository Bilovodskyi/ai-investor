"use client";

import AiReport from "@/components/stock/AiReport";
import Calculations from "@/components/stock/Calculations";
import NavLinksPage from "@/components/stock/NavLinks";
import Principles from "@/components/stock/Principles";
import StockCard from "@/components/stock/StockCard";
import { useState } from "react";

export type InvestorStateType = "buffett" | "graham" | "burry";

export default function BuffettStylePage() {
    const [investor, setInvestor] = useState<InvestorStateType>("buffett");
    return (
        <>
            <div className="flex gap-4">
                <StockCard />
                <div className="flex-1 flex flex-col gap-4 transition-all duration-200">
                    <NavLinksPage setInvestor={setInvestor} />
                    <AiReport investor={investor} />
                </div>
            </div>
            <Principles investor={investor} />
            <Calculations investor={investor} />
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
