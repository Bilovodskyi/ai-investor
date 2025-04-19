"use client";

import { Check } from "lucide-react";
import React, { useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { checkoutCredits } from "@/server/actions/stripe";
import { useUser } from "@clerk/nextjs";

export default function BuyTokensCards() {
    const { user } = useUser();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_API_KEY!);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast.success("Order placed!");
        }

        if (query.get("canceled")) {
            toast.error("Order canceled!");
        }
    }, []);

    const handleGoToCheckout = async (plan: string) => {
        if (!user) {
            return;
        }
        const transaction = {
            plan,
            buyerId: user?.id,
        };

        await checkoutCredits(transaction);
    };
    return (
        <div className="md:min-h-[30rem] px-2 md:px-0 md:w-3/4 flex flex-col gap-6 md:flex-row md:gap-0">
            <div className="border border-zinc-300 bg-container md:h-[38rem] flex-1 flex flex-col gap-5 rounded-xl md:max-w-96 px-6 py-10 md:pb-6 md:mt-[1rem]">
                <div className="flex flex-col gap-3">
                    <p className="flex items-center text-2xl ">Stripe</p>
                    <div className="flex gap-1 items-baseline relative ml-4 mt-2">
                        <div className="absolute -left-4 top-0 text-xl text-zinc-500">
                            $
                        </div>
                        <div className="text-5xl">5</div>
                        <div className="relative text-zinc-500">
                            / 50 Tokens
                        </div>
                    </div>
                    <p className="text-[.9rem] mt-2 mr-2">
                        Perfect for testing
                    </p>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => handleGoToCheckout("5")}
                        className="bg-text text-background hover:opacity-90 duration-100 cursor-pointer font-normal py-[.75rem] px-[1rem] rounded-full text-[.9rem]">
                        Buy Tokens
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Check size={12} />
                        <p className="text-[.9rem]">Support the project</p>
                    </div>
                    <p className="ml-5">
                        (Your support will help us to make this project better
                        and add new features in the future)
                    </p>
                    <div className="flex gap-2 items-center">
                        <Check size={12} />
                        <p className="text-[.9rem]">50 tokens</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Check size={12} />
                        <p className="text-[.9rem]">
                            Access to latest Claude models
                        </p>
                    </div>
                </div>
            </div>
            <div className="border border-custom-green bg-custom-greenOpacity md:h-[40rem] flex-1 rounded-xl md:max-w-96 flex flex-col gap-6 px-6 py-10 md:pb-6">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <p className="flex items-center text-2xl">Stripe</p>
                        <span className="ml-1 rounded-md border border-text px-2 py-1 text-text">
                            Popular
                        </span>
                    </div>
                    <div className="flex gap-1 items-baseline relative ml-4 mt-2">
                        <div className="absolute -left-4 top-0 text-xl text-zinc-500">
                            $
                        </div>
                        <div className="text-5xl">10</div>
                        <div className="relative text-zinc-500">
                            / 200 Tokens
                        </div>
                    </div>
                    <p className="text-[.9rem] mt-2 mr-2">
                        200 Token Lead &ndash; Our Top Pick
                    </p>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => handleGoToCheckout("10")}
                        className="bg-custom-green hover:opacity-90 duration-100 cursor-pointer font-normal text-black py-[.75rem] px-[1rem] rounded-full text-[.9rem]">
                        Buy Tokens
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">
                            &bull; Support the project
                        </p>
                    </div>
                    <p className="ml-5">
                        (Your support will help us to make this project better
                        and add new features in the future)
                    </p>
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">&bull; 200 tokens</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">
                            &bull; Access to latest Claude models
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">
                            &bull; Become Premium user.
                        </p>
                    </div>
                    <p className="ml-5">
                        (Expand AI on all parts of website. Will use AI to get
                        financial data for stocks.)
                    </p>
                </div>
            </div>
            <div className="border border-zinc-300 bg-container md:h-[38rem] flex-1 flex flex-col gap-6 rounded-xl md:max-w-96 px-6 py-10 md:pb-6 md:mt-[1rem]">
                <div className="flex flex-col gap-3">
                    <p className="flex items-center text-2xl">Stripe</p>
                    <div className="flex gap-1 items-baseline relative ml-4 mt-2">
                        <div className="absolute -left-4 top-0 text-xl text-zinc-500">
                            $
                        </div>
                        <div className="text-5xl">20</div>
                        <div className="relative text-zinc-500">
                            / 500 Tokens
                        </div>
                    </div>
                    <p className="text-[.9rem] mt-2 mr-2">
                        500 Token &ndash; Endless Advantage
                    </p>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => handleGoToCheckout("20")}
                        className="bg-text hover:opacity-90 duration-100 cursor-pointer text-background font-normal py-[.75rem] px-[1rem] rounded-full text-[.9rem]">
                        Buy Tokens
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Check size={12} />
                        <p className="text-[.9rem]">Support the project</p>
                    </div>
                    <p className="ml-5">
                        (Your support will help us to make this project better
                        and add new features in the future)
                    </p>
                    <div className="flex gap-2 items-center">
                        <Check size={12} />
                        <p className="text-[.9rem]">500 tokens</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">
                            &bull; Access to latest Claude models
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-[.9rem]">
                            &bull; Become Premium user.
                        </p>
                    </div>
                    <p className="ml-5">
                        (Expand AI on all parts of website. Will use AI to get
                        financial data for stocks.)
                    </p>
                </div>
            </div>
        </div>
    );
}
