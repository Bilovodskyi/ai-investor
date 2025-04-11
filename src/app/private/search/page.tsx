"use client";
import { debounce } from "@/utils/helperFunctions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type StockInfo = {
    symbol: string;
    name: string;
    currency: string;
    exchangeFullName: string;
    exchange: string;
};

export default function SearchPage() {
    // const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<StockInfo[] | undefined>();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Use < 768 for mobile, adjust as needed
        };

        // Set initial value
        handleResize();

        // Add resize listener for dynamic updates
        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFetchDataOnValueChange = async (
        search: string
    ): Promise<void> => {
        try {
            if (!search || search.trim() === "") {
                setSearchResult(undefined);
                return;
            }

            const response = await fetch(
                `/api/search/${encodeURIComponent(search)}`
            );
            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            const parsedResponse = await response.json();
            setSearchResult(parsedResponse);
        } catch (error) {
            console.error("Error fetching search data:", error);
            setSearchResult(undefined);
        }
    };

    const debouncedHandleFetchDataOnValueChange = debounce(
        handleFetchDataOnValueChange,
        500
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedHandleFetchDataOnValueChange(value);
    };

    console.log(searchResult);
    return (
        <div className="h-svh md:h-screen relative flex justify-center items-center">
            <div className="relative w-[400px]">
                <input
                    type="text"
                    onChange={onInputChange}
                    className="outline-none w-full border-b-[0.5px] p-3 max-md:text-[16px] max-md:text-center"
                    placeholder={
                        isMobile
                            ? "Start typing here. (Only US stocks)"
                            : "Start typing company name here. (Only US stocks)"
                    }
                />
                {searchResult && searchResult.length > 0 && (
                    <ul className="absolute w-full mt-4 md:mt-2">
                        {searchResult.slice(0, 5).map((stock) => (
                            <li key={stock.symbol}>
                                <Link
                                    href={`/private/${stock.symbol}`}
                                    className="block p-4 md:p-2 hover:bg-white/5 cursor-pointer rounded-md duration-150 transition-all">
                                    {stock.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="circle-container">
                <div className="circle" id="circle1"></div>
                <div className="circle" id="circle2"></div>
                <div className="circle" id="circle3"></div>
            </div>
        </div>
    );
}
