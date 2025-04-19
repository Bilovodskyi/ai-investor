"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import { updateTokens } from "./tokens";
import { db } from "@/drizzle/db";
import { TransactionsTable } from "@/drizzle/schema";
import {
    CheckoutTransactionParams,
    CreateTransactionParams,
} from "@/types/stripeTypes";

const PLAN_TOKEN_MAP = {
    "20": 500,
    "10": 200,
    "5": 50,
} as const;

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!);

    const checkPlan =
        PLAN_TOKEN_MAP[transaction.plan as keyof typeof PLAN_TOKEN_MAP];
    if (!checkPlan) {
        return {
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }

    const amount = Number(transaction.plan) * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan,
                    },
                },
                quantity: 1,
            },
        ],
        metadata: {
            plan: transaction.plan,
            credits:
                PLAN_TOKEN_MAP[transaction.plan as keyof typeof PLAN_TOKEN_MAP],
            buyerId: transaction.buyerId,
        },
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/private/tokens`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/private/tokens`,
    });
    redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        const newTransaction = await db
            .insert(TransactionsTable)
            .values({ plan: transaction.plan, userId: transaction.buyerId });

        const response = await updateTokens({
            plan: transaction.plan,
            userId: transaction.buyerId,
        });

        console.log(response.message);

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}
