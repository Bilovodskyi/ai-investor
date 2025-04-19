export type AiResponseType = {
    reasoning: string;
    confidence: "bullish" | "bearish" | "neutral";
    signal: string;
};

export type BuffettAiReport = {
    [stockName: string]: AiResponseType;
};
