import React from "react";
import { Heart } from "lucide-react";

const StockCardSkeleton: React.FC = () => {
    return (
        <div className="!bg-custom-purple container w-full md:max-w-[360px] h-svh md:h-[580px] flex flex-col gap-8 items-center max-md:!p-5 mt-12 md:mt-0">
            <div className="w-full flex items-center justify-between">
                <div className="bg-container rounded-2xl animate-pulse w-14 h-14">
                    {/* <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div> */}
                </div>
                <div className="h-[56px] w-[56px] rounded-full bg-black flex items-center justify-center">
                    <Heart size={26} color="var(--green)" />
                </div>
            </div>

            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-2">
                    <div className="h-9 bg-text animate-pulse rounded-2xl w-3/4"></div>

                    <div className="h-6 bg-text animate-pulse rounded-2xl w-1/4"></div>
                </div>

                <div className="h-16 bg-text animate-pulse rounded-2xl w-1/2 mx-auto"></div>

                <div className="flex flex-col gap-1">
                    <div className="h-6 bg-text animate-pulse rounded-2xl w-2/3"></div>
                    <div className="h-6 bg-text animate-pulse rounded-2xl w-1/3"></div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="h-6 bg-text animate-pulse rounded-2xl w-1/3"></div>
                    <div className="h-6 bg-text animate-pulse rounded-2xl w-1/2"></div>
                </div>

                <div className="h-16 bg-text animate-pulse rounded-2xl w-full"></div>
            </div>
        </div>
    );
};

export default StockCardSkeleton;
