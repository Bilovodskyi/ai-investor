"use client";

import { getPlural } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { X, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SiClaude } from "react-icons/si";

export default function MobileNavigation({
    tokens,
}: {
    tokens: number | null;
}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overscrollBehaviorY = "none";

            const block = (e: TouchEvent) => e.preventDefault();
            document.addEventListener("touchmove", block, { passive: false });

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                document.body.style.overscrollBehaviorY = "";
                document.removeEventListener("touchmove", block);
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);
    return (
        <div className="md:hidden">
            <div
                onClick={() => setIsOpen(true)}
                className="absolute top-6 left-6 z-30">
                <span className="block w-6 h-0.5 bg-text my-1.5" />
                <span className="block w-6 h-0.5 bg-text my-1.5" />
                <span className="block w-6 h-0.5 bg-text my-1.5" />
            </div>
            <div
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                className={`${
                    !isOpen ? "hidden" : ""
                } fixed top-0 left-0 right-0 w-full z-60 h-full bg-background`}>
                <div className="flex justify-between p-[18px] items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/ai-investor-logo.png"
                            alt="logo"
                            height={32}
                            width={32}
                        />

                        <span>
                            <XIcon size={14} />
                        </span>
                        <SiClaude size={32} className="text-[#da7756]" />
                    </div>
                    <X onClick={() => setIsOpen(false)} />
                </div>
                <div
                    className="flex gap-1 mobile-nav-link items-center"
                    onClick={() => setIsOpen(false)}>
                    <Link href="/private/search" className="w-full py-4">
                        <p className="leading-none text-[1.5rem]">Search</p>
                    </Link>
                </div>
                <div
                    className="flex gap-1 mobile-nav-link items-center"
                    onClick={() => setIsOpen(false)}>
                    <Link href="/private/list" className="w-full py-4">
                        <p className="leading-none text-[1.5rem]">My list</p>
                    </Link>
                </div>
                <div
                    className="flex gap-1 mobile-nav-link items-center"
                    onClick={() => setIsOpen(false)}>
                    <Link href="/private/tokens" className="w-full py-4">
                        <p className="leading-none text-[1.5rem]">Tokens</p>
                    </Link>
                </div>

                <div
                    className="flex gap-1 mobile-nav-link items-center"
                    onClick={() => setIsOpen(false)}>
                    <a
                        href="https://www.tradejournal.one"
                        target="_blank"
                        className="leading-none text-[1.5rem] w-full py-4">
                        Trade Journal
                    </a>
                </div>
                <div
                    className="flex gap-1 mobile-nav-link items-center"
                    onClick={() => setIsOpen(false)}>
                    <div className="leading-none text-[1.5rem] w-full py-4 flex gap-1">
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
                </div>
                {/* <div
                    onClick={() => openUserProfile()}
                    className="flex items-center gap-4 mb-1 mobile-nav-link py-4">
                    <h1 className="leading-none text-[1.5rem]">My Account</h1>
                </div> */}
                <div className="leading-none text-[1.5rem] mobile-nav-link py-4">
                    <SignOutButton />
                </div>
            </div>
        </div>
    );
}
