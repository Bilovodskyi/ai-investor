"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const stringsToType = [
    "Unlock Smarter Investments with the Power of AI.",
    "Combine the investment strategies of:",
    "• Warren Buffett",
    "• Benjamin Graham",
    "• Michael Burry",
    "to get magic results.",
];

const TypingAnimation = () => {
    const [text, setText] = useState<string[]>([]);
    const [stringIndex, setStringIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const typingSpeed = 30;

    useEffect(() => {
        if (stringIndex >= stringsToType.length) {
            setShowCursor(false);
            setIsTypingComplete(true);
            return;
        }

        const currentString = stringsToType[stringIndex];

        if (charIndex < currentString.length) {
            const timeout = window.setTimeout(() => {
                setText((prev) => {
                    const newText = [...prev];
                    newText[stringIndex] =
                        (newText[stringIndex] || "") + currentString[charIndex];
                    return newText;
                });
                setCharIndex((prev) => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        } else {
            const timeout = window.setTimeout(() => {
                setStringIndex((prev) => prev + 1);
                setCharIndex(0);
            }, typingSpeed * 2);

            return () => clearTimeout(timeout);
        }
    }, [stringIndex, charIndex]);

    useEffect(() => {
        const cursorInterval = window.setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="md:h-1/2 flex flex-col gap-4 mb-6 md:mb-0">
            <h1 className="text-4xl leading-12">
                {text[0] || ""}
                {stringIndex === 0 && showCursor ? (
                    <span>|</span>
                ) : (
                    <span style={{ opacity: 0 }}>|</span>
                )}
            </h1>
            <div className="flex flex-col gap-2 text-md md:text-lg leading-8">
                <span>
                    {text[1] || ""}
                    {stringIndex === 1 && showCursor ? (
                        <span>|</span>
                    ) : (
                        <span style={{ opacity: 0 }}>|</span>
                    )}
                </span>
                <span className="text-custom-green">
                    {text[2] || ""}
                    {stringIndex === 2 && showCursor ? (
                        <span>|</span>
                    ) : (
                        <span style={{ opacity: 0 }}>|</span>
                    )}
                </span>
                <span className="text-custom-green">
                    {text[3] || ""}
                    {stringIndex === 3 && showCursor ? (
                        <span>|</span>
                    ) : (
                        <span style={{ opacity: 0 }}>|</span>
                    )}
                </span>
                <span className="text-custom-green">
                    {text[4] || ""}
                    {stringIndex === 4 && showCursor ? (
                        <span>|</span>
                    ) : (
                        <span style={{ opacity: 0 }}>|</span>
                    )}
                </span>
                <span>
                    {text[5] || ""}
                    {stringIndex === 5 && showCursor ? (
                        <span>|</span>
                    ) : (
                        <span style={{ opacity: 0 }}>|</span>
                    )}
                </span>
            </div>
            <Link
                href="/sign-in"
                className={`relative group inline-block cursor-pointer w-fit mt-4 transition-transform duration-200 ease-in-out ${
                    isTypingComplete
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                }`}>
                <div className="flex gap-2 mb-1">
                    <h1 className="text-[1.3rem]">Start</h1>
                    <ArrowUpRight strokeWidth={1} size={30} />
                </div>
                <span className="absolute left-0 bottom-0 block h-[0.3px] w-full bg-white transition-all duration-300 group-hover:w-0"></span>
            </Link>
        </div>
    );
};

export default TypingAnimation;
