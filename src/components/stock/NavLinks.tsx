"use client";

import { InvestorStateType } from "@/app/private/[stockId]/page";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

export default function NavLinksPage({
    setInvestor,
}: {
    setInvestor: Dispatch<SetStateAction<InvestorStateType>>;
}) {
    const { stockId } = useParams();

    return (
        <nav className="flex gap-2">
            <div
                onClick={() => setInvestor("buffett")}
                className="green-button">
                Buffet Style
            </div>
            <div onClick={() => setInvestor("graham")} className="green-button">
                Graham Style
            </div>
            <div onClick={() => setInvestor("burry")} className="green-button">
                Burry Style
            </div>
            {/* <div
                href={`/private/${stockId}/fair-price`}
                className="green-button">
                Fair price
            </div> */}
        </nav>
    );
}
