import TypingAnimation from "@/utils/typingText";
import React from "react";

export default function StartPage() {
    return (
        <div className="flex h-svh md:h-screen">
            <div className="md:w-1/3 p-3 md:p-12 flex items-end">
                <TypingAnimation />
            </div>

            <div className="circle-container">
                <div className="circle" id="circle1"></div>
                <div className="circle" id="circle2"></div>
                <div className="circle" id="circle3"></div>
            </div>
        </div>
    );
}
