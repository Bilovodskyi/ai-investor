import { InvestorStateType } from "@/app/private/[stockId]/page";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import React, { Dispatch, SetStateAction } from "react";

export default function NavLinksPage({
    setInvestor,
}: {
    setInvestor: Dispatch<SetStateAction<InvestorStateType>>;
}) {
    return (
        <nav className="flex gap-2">
            <div
                onClick={() => setInvestor("buffett")}
                className="green-button">
                Buffet Style
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="green-button">Graham Style</div>
                </PopoverTrigger>
                <PopoverContent className="bg-container border border-zinc-600">
                    <h1>Coming soon...</h1>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <div className="green-button">Burry Style</div>
                </PopoverTrigger>
                <PopoverContent className="bg-container border border-zinc-600">
                    <h1>Coming soon...</h1>
                </PopoverContent>
            </Popover>
            {/* <div onClick={() => setInvestor("graham")} className="green-button">
                Graham Style
            </div>
            <div onClick={() => setInvestor("burry")} className="green-button">
                Burry Style
            </div> */}
            {/* <div
                href={`/private/${stockId}/fair-price`}
                className="green-button">
                Fair price
            </div> */}
        </nav>
    );
}
