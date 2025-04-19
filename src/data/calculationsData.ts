import { CalculationsDataType } from "@/types/calculationDataTypes";

export const calculationsData: CalculationsDataType = {
    buffett: {
        mainDescription:
            'Our signals blend detailed analysis—fundamental strength, consistency, moat, and management—with a DCF-based intrinsic value rooted in owner earnings. We assess margin of safety against market cap, triggering "bullish" (score ≥ 70%, margin ≥ 30), "bearish" (score ≤ 30% or margin less then -30%), or "neutral" outcomes.',
        sections: {
            marginOfSafetyDetailed: {
                description:
                    "The margin of safety is our buffer against overpaying for a stock. We calculate it by comparing a stock's intrinsic value—derived from projected cash flows using a conservative Discounted Cash Flow (DCF) model—to its current market capitalization. A positive result (e.g., 20%) means the stock trades below its fair value, offering protection if our estimates are off; a negative result (e.g., -30%) signals potential overvaluation. It's a key measure to ensure we invest with room for error.",
                formula: "(intrinsic value - market cap.) / market cap.",
            },
            fundamentals: {
                description:
                    "Rooted in Buffett's principles, we score companies (max 7) on four metrics: Return on Equity (more then 15% for efficiency), Debt-to-Equity (less then 0.5 for low risk), Operating Margin (more then 15% for profitability), and Current Ratio (more then 1.5 for liquidity). High scores reflect strong fundamentals; detailed feedback highlights what matters.",
            },
            consistency: {
                description:
                    "We score earnings consistency (max 3) over four periods: 3 points if net income grows steadily each year. Using historical data, it's a Buffett-style test of predictable performance. Clear trends signal reliability; volatility flags risk.",
            },
            moat: {
                description:
                    "Using historical Return on Equity (more then 15%) and Operating Margin (more then 15%) over three years. Stable high ROE earns 1 point, strong margins another, and both together add a bonus point for a wide moat.",
            },
            management: {
                description:
                    "We score management (max 2) based on capital decisions: 1 point for share buybacks (showing shareholder focus) and 1 for dividends (reflecting cash confidence).",
            },
        },
    },
    graham: {
        mainDescription:
            'Our signals blend detailed analysis—fundamental strength, consistency, moat, and management—with a DCF-based intrinsic value rooted in owner earnings. We assess margin of safety against market cap, triggering "bullish" (score ≥ 70%, margin ≥ 30), "bearish" (score ≤ 30% or margin less then -30%), or "neutral" outcomes.',
        sections: {
            marginOfSafetyDetailed: {
                description:
                    "The margin of safety is our buffer against overpaying for a stock. We calculate it by comparing a stock's intrinsic value—derived from projected cash flows using a conservative Discounted Cash Flow (DCF) model—to its current market capitalization. A positive result (e.g., 20%) means the stock trades below its fair value, offering protection if our estimates are off; a negative result (e.g., -30%) signals potential overvaluation. It's a key measure to ensure we invest with room for error.",
                formula: "(intrinsic value - market cap.) / market cap.",
            },
            fundamentals: {
                description:
                    "Rooted in Buffett's principles, we score companies (max 7) on four metrics: Return on Equity (more then 15% for efficiency), Debt-to-Equity (less then 0.5 for low risk), Operating Margin (more then 15% for profitability), and Current Ratio (more then 1.5 for liquidity). High scores reflect strong fundamentals; detailed feedback highlights what matters.",
            },
            consistency: {
                description:
                    "We score earnings consistency (max 3) over four periods: 3 points if net income grows steadily each year. Using historical data, it's a Buffett-style test of predictable performance. Clear trends signal reliability; volatility flags risk.",
            },
            moat: {
                description:
                    "Using historical Return on Equity (more then 15%) and Operating Margin (more then 15%) over three years. Stable high ROE earns 1 point, strong margins another, and both together add a bonus point for a wide moat.",
            },
            management: {
                description:
                    "We score management (max 2) based on capital decisions: 1 point for share buybacks (showing shareholder focus) and 1 for dividends (reflecting cash confidence).",
            },
        },
    },
    burry: {
        mainDescription:
            'Our signals blend detailed analysis—fundamental strength, consistency, moat, and management—with a DCF-based intrinsic value rooted in owner earnings. We assess margin of safety against market cap, triggering "bullish" (score ≥ 70%, margin ≥ 30), "bearish" (score ≤ 30% or margin less then -30%), or "neutral" outcomes.',
        sections: {
            marginOfSafetyDetailed: {
                description:
                    "The margin of safety is our buffer against overpaying for a stock. We calculate it by comparing a stock's intrinsic value—derived from projected cash flows using a conservative Discounted Cash Flow (DCF) model—to its current market capitalization. A positive result (e.g., 20%) means the stock trades below its fair value, offering protection if our estimates are off; a negative result (e.g., -30%) signals potential overvaluation. It's a key measure to ensure we invest with room for error.",
                formula: "(intrinsic value - market cap.) / market cap.",
            },
            fundamentals: {
                description:
                    "Rooted in Buffett's principles, we score companies (max 7) on four metrics: Return on Equity (more then 15% for efficiency), Debt-to-Equity (less then 0.5 for low risk), Operating Margin (more then 15% for profitability), and Current Ratio (more then 1.5 for liquidity). High scores reflect strong fundamentals; detailed feedback highlights what matters.",
            },
            consistency: {
                description:
                    "We score earnings consistency (max 3) over four periods: 3 points if net income grows steadily each year. Using historical data, it's a Buffett-style test of predictable performance. Clear trends signal reliability; volatility flags risk.",
            },
            moat: {
                description:
                    "Using historical Return on Equity (more then 15%) and Operating Margin (more then 15%) over three years. Stable high ROE earns 1 point, strong margins another, and both together add a bonus point for a wide moat.",
            },
            management: {
                description:
                    "We score management (max 2) based on capital decisions: 1 point for share buybacks (showing shareholder focus) and 1 for dividends (reflecting cash confidence).",
            },
        },
    },
};
