import { investorsPrinciples } from "@/data/investorsPrinciples";
import Image from "next/image";
import React from "react";

export default function Principles({ investor }: { investor: string }) {
    const data = investorsPrinciples[investor];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-rows-8 md:grid-rows-4 xl:grid-rows-2 gap-4">
            <div className="container !p-6 col-span-1 flex flex-col items-center justify-between">
                <h1 className="text-[1rem] text-center">{data.mainTitle}</h1>
                <Image
                    src={data.image.imageUrl}
                    alt={data.image.alt}
                    height={300}
                    width={300}
                />
            </div>
            {data.principles.map((principle, i) => (
                <div
                    key={i}
                    className="col-span-1 container !p-0 overflow-hidden">
                    <span className="flex gap-4 items-center justify-center text-[1rem] font-medium h-1/2 bg-background">
                        {/* <Quote /> */}
                        {i + 1}. {principle.principle}
                    </span>
                    <div className="p-4">
                        <span className="font-semibold mr-2">
                            Implementation:
                        </span>
                        {principle.implementation}
                    </div>
                </div>
            ))}
        </div>
    );
}
