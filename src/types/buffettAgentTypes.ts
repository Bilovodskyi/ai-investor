export interface RawFinancialData {
    data: {
        [key: string]: number;
    };
    date?: string;
    symbol?: string;
    fiscalYear?: number;
    period?: string;
}

// Define the metrics needed for the Buffett analysis
export interface FinancialMetrics {
    returnOnEquity: number;
    debtToEquity: number;
    operatingMargin: number;
    currentRatio: number;
}

// Define the line items needed for the Buffett analysis
export interface FinancialLineItem {
    netIncome: number;
    depreciationAndAmortization: number;
    capitalExpenditure: number;
    outstandingShares: number;
    totalAssets: number;
    totalLiabilities: number;
    dividendsAndOtherCashDistributions: number;
    issuanceOrPurchaseOfEquityShares: number;
}

// The output structure for the Buffett analysis
export interface BuffettFinancialData {
    ticker: string;
    metrics: FinancialMetrics[];
    lineItems: FinancialLineItem[];
    marketCap: number | null;
}

export type SignalType = "bullish" | "bearish" | "neutral";

export interface AnalysisDataResult {
    [x: string]: {
        signal: SignalType;
        score: number;
        maxScore: number;
        fundamentalAnalysis: {
            score: number;
            maxScore: number;
            details: string[];
            metrics?: FinancialMetrics;
        };
        consistencyAnalysis: {
            score: number;
            maxScore: number;
            details: string[];
        };
        moatAnalysis: {
            score: number;
            maxScore: number;
            details: string[];
        };
        managementAnalysis: {
            score: number;
            maxScore: number;
            details: string[];
        };
        intrinsicValueAnalysis: {
            intrinsicValue: number | null;
            ownerEarnings?: number;
            assumptions?: {
                growthRate: number;
                discountRate: number;
                terminalMultiple: number;
                projectionYears: number;
            };
            details: string[];
        };
        marketCap: number | null;
        marginOfSafety: number | null;
    };
}
