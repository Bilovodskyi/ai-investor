import TypingAnimation from "@/utils/typingText";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function StartPage() {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 p-12 flex items-end">
                {/* <div className="h-1/2 flex flex-col gap-4">
                    <h1 className="text-4xl leading-12">
                        Unlock Smarter Investments with the Power of AI.
                    </h1>
                   
                    <div className="flex flex-col gap-2 text-lg leading-8">
                        <span>Combine the investment strategies of:</span>
                        <span className="text-custom-green">
                            &bull;Warren Buffett
                        </span>
                        <span className="text-custom-green">
                            &bull;Benjamin Graham
                        </span>
                        <span className="text-custom-green">
                            &bull;Michael Burry
                        </span>
                        <span>to get magic results.</span>
                    </div>
                   
                    <div className="relative group inline-block cursor-pointer w-fit mt-4">
                        <div className="flex gap-2 mb-1">
                            <h1 className="text-[1.3rem]">Start</h1>
                            <ArrowUpRight strokeWidth={1} size={30} />
                        </div>
                        <span className="absolute left-0 bottom-0 block h-[0.3px] w-full bg-white transition-all duration-300 group-hover:w-0"></span>
                    </div>
                </div> */}
                <TypingAnimation />
            </div>
            <div className="w-2/3">
                <div className="circle-container">
                    <div className="circle" id="circle1"></div>
                    <div className="circle" id="circle2"></div>
                    <div className="circle" id="circle3"></div>
                </div>
            </div>
        </div>
    );
}
