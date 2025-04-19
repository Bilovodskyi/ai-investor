import BuyTokensCards from "@/components/tokens/BuyTokensCards";
import React from "react";

export default async function Page() {
    return (
        <div className="pt-12 pb-6 flex md:items-center justify-between flex-col h-[calc(100vh-56px)] relative">
            <h1 className="md:text-center text-[2rem] pl-4 py-4 md:py-0">
                Buy Tokens
            </h1>

            <BuyTokensCards />
            <p className="text-zinc-400 text-center max-md:py-6">
                If you have any issues. Please contact support:
                aiinvestor@gmail.com
            </p>
        </div>
    );
}
