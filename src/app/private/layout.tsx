"use client";

import MobileNavigation from "@/components/MobileNavigation";
import { getPlural } from "@/lib/utils";
import { setTokens } from "@/redux/slices/tokensSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { ReactNode, useEffect, useState } from "react";

interface SuccessResponse {
    success: true;
    tokens: number;
}

export default function Layout({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    const tokens = useAppSelector((state) => state.tokens.tokens);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsMounted(true);

        const fetchData = async () => {
            try {
                const response = await fetch("/api/tokens");

                if (!response.ok) {
                    throw new Error("Failed to fetch stock data");
                }

                const parsedData: SuccessResponse = await response.json();
                dispatch(setTokens(parsedData.tokens));
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("Unexpected error occured!");
                }
            }
        };

        fetchData();
    }, []);

    const getUserDisplayName = () => {
        if (!user) return "";
        return (
            user.firstName ??
            (user.username ?? "").charAt(0).toLocaleUpperCase() +
                (user.username ?? "").slice(1)
        );
    };

    return (
        <div>
            <MobileNavigation tokens={tokens} />

            <div className="hidden md:flex w-full gap-8 items-center justify-between py-2 sticky top-0 z-50 bg-background/50 backdrop-blur-md border-b border-zinc-800 px-28">
                {pathname !== "/private/search" ? (
                    <div className="relative group inline-block cursor-pointer">
                        <Link
                            href="/private/search"
                            // onClick={() => router.back()}
                            className="flex gap-2 items-center mb-1">
                            <ArrowLeft size={16} /> <span>Search</span>
                        </Link>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </div>
                ) : (
                    <div className="opacity-0"></div>
                )}
                <div className="flex items-center gap-12">
                    <Link
                        className="relative group inline-block cursor-pointer"
                        href="/private/list">
                        <div className="mb-1">My list</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link
                        href="/private/tokens"
                        className="relative group inline-block cursor-pointer">
                        <div className="mb-1">Buy Tokens</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <a
                        href="https://www.tradejournal.one"
                        target="_blank"
                        className="relative group inline-block cursor-pointer">
                        <div className="mb-1">Trade Journal</div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <div className="rounded-md p-2 flex items-center mb-1 gap-1">
                        Balance:
                        {tokens !== null ? (
                            <div className="flex items-center gap-2">
                                <p>{tokens}</p>
                                <p>{getPlural(tokens, "token", "tokens")}</p>
                            </div>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                    <div className="flex items-center gap-4 mb-1">
                        {isMounted ? (
                            <>
                                Hi, {getUserDisplayName()}
                                <UserButton />
                            </>
                        ) : (
                            <>
                                <span className="opacity-0">User</span>
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-3 md:px-28">{children}</div>
        </div>
    );
}
