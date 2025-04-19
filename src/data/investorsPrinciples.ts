import { InvestorsPrinciples } from "@/types/investorPrinciplesTypes";

export const investorsPrinciples: InvestorsPrinciples = {
    buffett: {
        mainTitle: "Buffett's investing principles",
        image: {
            imageUrl: "/buffett.png",
            alt: "buffett image",
        },
        principles: [
            {
                principle: "Circle of Competence",
                implementation:
                    "We stick to what we know, analyzing businesses using universal financial signals Buffett trusts—like profitability and debt levels—ensuring decisions stay grounded in clear, understandable data.",
            },
            {
                principle: "Margin of Safety",
                implementation:
                    "We only buy when a stock's true value exceeds its price by at least 30%, calculated by comparing our conservative intrinsic value estimate to the current market price.",
            },
            {
                principle: "Economic Moat",
                implementation:
                    "We hunt for companies with lasting advantages, scoring them higher when profits and margins stay strong and stable over long period of time, just like Buffett's favorites.",
            },
            {
                principle: "Quality Management",
                implementation:
                    "We favor teams that reward shareholders, giving points for share buybacks and dividends—signs of the prudent, owner-friendly leadership Buffett admires.",
            },
            {
                principle: "Financial Strength",
                implementation:
                    "We prioritize rock-solid balance sheets, rewarding low debt and high returns on equity with top scores to ensure a company can weather any storm.",
            },
            {
                principle: "Long-term Horizon",
                implementation:
                    "We look years ahead, valuing consistent earnings growth and projecting future cash flows conservatively to find businesses worth holding forever.",
            },
            {
                principle: "Sell Discipline",
                implementation:
                    "We turn bearish only when fundamentals weaken or prices soar far past value, keeping our focus on the long game rather than short-term swings.",
            },
        ],
    },
};
