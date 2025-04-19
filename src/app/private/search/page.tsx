"use client";
import CircleLoader from "@/components/loading/CircleLoading";
// import CircleLoader from "@/components/loading/CircleLoading";
import { supportedCompanyNames } from "@/data/supportedTickers";
// import { debounce } from "@/utils/helperFunctions";
import Link from "next/link";
import React, { useState } from "react";

// export type StockInfo = {
//     symbol: string;
//     name: string;
//     currency: string;
//     exchangeFullName: string;
//     exchange: string;
// };

type SupportedCompanyNamesType = {
    companyName: string;
    ticker: string;
};

export default function SearchPage() {
    // const [searchResult, setSearchResult] = useState<StockInfo[] | undefined>();
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<
        SupportedCompanyNamesType[] | null
    >(null);

    // const handleFetchDataOnValueChange = async (
    //     search: string
    // ): Promise<void> => {
    //     try {
    //         if (!search || search.trim() === "") {
    //             setSearchResult(undefined);
    //             return;
    //         }

    //         const response = await fetch(
    //             `/api/search/${encodeURIComponent(search)}`
    //         );
    //         if (!response.ok) {
    //             throw new Error(
    //                 `API request failed with status ${response.status}`
    //             );
    //         }

    //         const parsedResponse = await response.json();
    //         setSearchResult(parsedResponse);
    //     } catch (error) {
    //         console.error("Error fetching search data:", error);
    //         setSearchResult(undefined);
    //     }
    // };

    // const debouncedHandleFetchDataOnValueChange = debounce(
    //     handleFetchDataOnValueChange,
    //     500
    // );

    // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     debouncedHandleFetchDataOnValueChange(value);
    // };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        const q = query.trim().toLowerCase();
        if (!q) {
            setSearchResult(null);
            return;
        }
        const filteredResult = supportedCompanyNames.filter(
            ({ companyName, ticker }) =>
                companyName.toLowerCase().includes(q) ||
                ticker.toLowerCase().includes(q)
        );

        setSearchResult(filteredResult);
    };

    return (
        <div className="h-svh md:h-[calc(100vh-56px)] relative flex justify-center items-center">
            <div className="relative w-[300px]">
                <input
                    type="text"
                    onChange={onInputChange}
                    className="outline-none w-full border-b-[0.5px] p-3 max-md:text-[16px]"
                    placeholder="Search."
                    autoFocus
                />
                {searchLoading ? (
                    <div className="absolute top-3 right-0">
                        <CircleLoader />
                    </div>
                ) : (
                    ""
                )}
                {/* {searchResult && searchResult.length > 0 && (
                    <ul className="absolute w-full mt-4 md:mt-2">
                        {searchResult.slice(0, 5).map((stock) => (
                            <li key={stock.symbol}>
                                <Link
                                    onClick={() => setSearchLoading(true)}
                                    href={`/private/${stock.symbol}`}
                                    className="block p-4 md:p-2 hover:bg-white/5 cursor-pointer rounded-md duration-150 transition-all">
                                    {stock.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )} */}
                {searchResult && (
                    <ul className="absolute w-full mt-4 md:mt-2">
                        {searchResult.slice(0, 5).map((stock, index) => (
                            <li key={index}>
                                <Link
                                    onClick={() => setSearchLoading(true)}
                                    href={`/private/${stock.ticker}`}
                                    className="flex justify-between items-center p-4 md:p-2 hover:bg-white/5 cursor-pointer rounded-md duration-150 transition-all">
                                    {stock.companyName}
                                    <p>{stock.ticker}</p>
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
