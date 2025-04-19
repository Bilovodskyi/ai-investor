import {
    AnalysisDataResult,
    BuffettFinancialData,
    FinancialLineItem,
    FinancialMetrics,
    SignalType,
} from "@/types/buffettAgentTypes";

// Define the Warren Buffett signal type

/**
 * Analyzes a stock using Buffett's principles
 * This function only requires the necessary financial data and performs the analysis
 */
export function analyzeWithBuffettPrinciples(
    data: BuffettFinancialData
): AnalysisDataResult {
    const { ticker, metrics, lineItems, marketCap } = data;

    // Analyze fundamentals
    const fundamentalAnalysis = analyzeFundamentals(metrics);

    // Analyze consistency
    const consistencyAnalysis = analyzeConsistency(lineItems);

    // Analyze moat
    const moatAnalysis = analyzeMoat(metrics);

    // Analyze management quality
    const managementAnalysis = analyzeManagementQuality(lineItems);

    // Calculate intrinsic value
    const intrinsicValueAnalysis = calculateIntrinsicValue(lineItems);

    // Calculate total score
    const totalScore =
        fundamentalAnalysis.score +
        consistencyAnalysis.score +
        moatAnalysis.score +
        managementAnalysis.score;
    const maxPossibleScore =
        10 + moatAnalysis.maxScore + managementAnalysis.maxScore;

    // Add margin of safety analysis if we have both intrinsic value and current price
    let marginOfSafety = null;
    const intrinsicValue = intrinsicValueAnalysis.intrinsicValue;

    if (intrinsicValue && marketCap) {
        marginOfSafety = (intrinsicValue - marketCap) / marketCap;
    }

    // Generate trading signal using a stricter margin-of-safety requirement
    let signal: SignalType;

    if (
        totalScore >= 0.7 * maxPossibleScore &&
        marginOfSafety &&
        marginOfSafety >= 0.3
    ) {
        signal = "bullish";
    } else if (
        totalScore <= 0.3 * maxPossibleScore ||
        (marginOfSafety !== null && marginOfSafety < -0.3)
    ) {
        signal = "bearish";
    } else {
        signal = "neutral";
    }

    // Combine all analysis results
    const analysisData = {
        [ticker]: {
            signal,
            score: totalScore,
            maxScore: maxPossibleScore,
            fundamentalAnalysis,
            consistencyAnalysis,
            moatAnalysis,
            managementAnalysis,
            intrinsicValueAnalysis,
            marketCap: marketCap,
            marginOfSafety,
        },
    };

    // Generate Warren Buffett analysis
    return analysisData;
}

/**
 * Analyze company fundamentals based on Buffett's criteria.
 */
function analyzeFundamentals(metrics: FinancialMetrics[]): {
    score: number;
    maxScore: number;
    details: string[];
    metrics?: FinancialMetrics | undefined;
} {
    if (!metrics || metrics.length === 0) {
        return {
            score: 0,
            maxScore: 7,
            details: [
                "Insufficient fundamental data to perform a Buffett-style analysis",
            ],
        };
    }

    const latestMetrics = metrics[0];
    let score = 0;
    const reasoning: string[] = [];

    // Check ROE (Return on Equity)
    if (latestMetrics.returnOnEquity && latestMetrics.returnOnEquity > 0.15) {
        // 15% ROE threshold
        score += 2;
        reasoning.push(
            `Excellent Return on Equity of ${(
                latestMetrics.returnOnEquity * 100
            ).toFixed(
                1
            )}% exceeds Buffett's minimum threshold of 15%, indicating efficient use of shareholder capital`
        );
    } else if (latestMetrics.returnOnEquity) {
        reasoning.push(
            `Suboptimal Return on Equity of ${(
                latestMetrics.returnOnEquity * 100
            ).toFixed(
                1
            )}% falls below Buffett's preferred 15% threshold, suggesting inefficient use of capital`
        );
    } else {
        reasoning.push(
            "Return on Equity data not available for fundamental analysis"
        );
    }

    // Check Debt to Equity
    if (latestMetrics.debtToEquity && latestMetrics.debtToEquity < 0.5) {
        score += 2;
        reasoning.push(
            `Low debt-to-equity ratio of ${latestMetrics.debtToEquity.toFixed(
                2
            )} demonstrates conservative financial management and reduced financial risk, aligning with Buffett's preference for companies with minimal leverage`
        );
    } else if (latestMetrics.debtToEquity) {
        reasoning.push(
            `Concerning debt-to-equity ratio of ${latestMetrics.debtToEquity.toFixed(
                2
            )} indicates higher financial leverage than Buffett typically prefers, increasing vulnerability during economic downturns`
        );
    } else {
        reasoning.push(
            "Debt-to-equity ratio data not available for risk assessment"
        );
    }

    // Check Operating Margin
    if (latestMetrics.operatingMargin && latestMetrics.operatingMargin > 0.15) {
        score += 2;
        reasoning.push(
            `Superior operating margin of ${(
                latestMetrics.operatingMargin * 100
            ).toFixed(
                1
            )}% demonstrates pricing power and operational efficiency, key indicators of a competitive advantage that Buffett seeks`
        );
    } else if (latestMetrics.operatingMargin) {
        reasoning.push(
            `Mediocre operating margin of ${(
                latestMetrics.operatingMargin * 100
            ).toFixed(
                1
            )}% suggests limited pricing power and potential competitive weaknesses, falling short of Buffett's criteria for excellent businesses`
        );
    } else {
        reasoning.push(
            "Operating margin data not available to assess business efficiency"
        );
    }

    // Check Current Ratio
    if (latestMetrics.currentRatio && latestMetrics.currentRatio > 1.5) {
        score += 1;
        reasoning.push(
            `Strong liquidity position with a current ratio of ${latestMetrics.currentRatio.toFixed(
                2
            )} provides adequate financial flexibility to weather short-term challenges, an important consideration in Buffett's conservative approach`
        );
    } else if (latestMetrics.currentRatio) {
        reasoning.push(
            `Concerning liquidity position with a current ratio of ${latestMetrics.currentRatio.toFixed(
                2
            )} may indicate potential short-term financial constraints, creating additional risk not favored in Buffett's investment philosophy`
        );
    } else {
        reasoning.push(
            "Current ratio data not available to evaluate short-term liquidity"
        );
    }

    return {
        score,
        maxScore: 7,
        details: reasoning,
        metrics: latestMetrics,
    };
}

/**
 * Analyze earnings consistency and growth.
 */
function analyzeConsistency(financialLineItems: FinancialLineItem[]): {
    score: number;
    maxScore: number;
    details: string[];
} {
    if (!financialLineItems || financialLineItems.length < 4) {
        // Need at least 4 periods for trend analysis
        return {
            score: 0,
            maxScore: 3,
            details: [
                "Insufficient historical data to evaluate earnings consistency and predictability",
            ],
        };
    }

    let score = 0;
    const reasoning: string[] = [];

    // Check earnings growth trend
    const earningsValues = financialLineItems
        .map((item) => item.netIncome)
        .filter((income): income is number => income !== undefined);

    if (earningsValues.length >= 4) {
        // Simple check: is each period's earnings bigger than the next?
        const earningsGrowth = earningsValues.every(
            (value, index) =>
                index === earningsValues.length - 1 ||
                value > earningsValues[index + 1]
        );

        if (earningsGrowth) {
            score += 3;
            reasoning.push(
                "Consistent earnings growth across all analyzed periods demonstrates business predictability and management execution, qualities highly valued in Buffett's investment framework"
            );
        } else {
            reasoning.push(
                "Inconsistent or volatile earnings pattern indicates lower business predictability, making future performance more difficult to forecast and potentially less attractive to Buffett-style investors"
            );
        }

        // Calculate total growth rate from oldest to latest
        if (
            earningsValues.length >= 2 &&
            earningsValues[earningsValues.length - 1] !== 0
        ) {
            const growthRate =
                (earningsValues[0] -
                    earningsValues[earningsValues.length - 1]) /
                Math.abs(earningsValues[earningsValues.length - 1]);
            reasoning.push(
                `Long-term earnings growth of ${(growthRate * 100).toFixed(
                    1
                )}% over ${
                    earningsValues.length
                } reporting periods demonstrates the company's ability to compound shareholder value over time${
                    growthRate > 0.1
                        ? ", a critical factor in Buffett's investment approach"
                        : ", though at a rate that may not be compelling enough for a Buffett-style investment"
                }`
            );
        }
    } else {
        reasoning.push(
            "Limited earnings history makes it difficult to establish a reliable trend for long-term investment decisions"
        );
    }

    return {
        score,
        maxScore: 3,
        details: reasoning,
    };
}

/**
 * Evaluate whether the company likely has a durable competitive advantage (moat).
 * For simplicity, we look at stability of ROE/operating margins over multiple periods
 * or high margin over the last few years. Higher stability => higher moat score.
 */
function analyzeMoat(metrics: FinancialMetrics[]): {
    score: number;
    maxScore: number;
    details: string[];
} {
    if (!metrics || metrics.length < 3) {
        return {
            score: 0,
            maxScore: 3,
            details: [
                "Insufficient historical data to evaluate the company's economic moat",
            ],
        };
    }

    const reasoning: string[] = [];
    let moatScore = 0;

    const historicalRoes: number[] = [];
    const historicalMargins: number[] = [];

    for (const m of metrics) {
        if (m.returnOnEquity !== undefined) {
            historicalRoes.push(m.returnOnEquity);
        }
        if (m.operatingMargin !== undefined) {
            historicalMargins.push(m.operatingMargin);
        }
    }

    // Check for stable or improving ROE
    if (historicalRoes.length >= 3) {
        const stableRoe = historicalRoes.every((r) => r > 0.15);
        if (stableRoe) {
            moatScore += 1;
            reasoning.push(
                "Consistently high Return on Equity above 15% across multiple periods strongly suggests a sustainable competitive advantage, allowing the company to earn superior returns despite competitive pressures"
            );
        } else {
            reasoning.push(
                "Fluctuating or below-average Return on Equity metrics suggest potential competitive vulnerabilities and an uncertain economic moat"
            );
        }
    }

    // Check for stable or improving operating margin
    if (historicalMargins.length >= 3) {
        const stableMargin = historicalMargins.every((m) => m > 0.15);
        if (stableMargin) {
            moatScore += 1;
            reasoning.push(
                "Sustained operating margins above 15% indicate pricing power and cost advantages that competitors have been unable to erode over time, a key characteristic of businesses with durable economic moats"
            );
        } else {
            reasoning.push(
                "Inconsistent or modest operating margins suggest limited pricing power and potential vulnerability to competitive pressures or cost fluctuations"
            );
        }
    }

    // If both are stable/improving, add an extra point
    if (moatScore === 2) {
        moatScore += 1;
        reasoning.push(
            "The combination of consistently high returns on equity and strong operating margins provides compelling evidence of a wide and durable economic moat, one of Buffett's most essential investment criteria"
        );
    }

    return {
        score: moatScore,
        maxScore: 3,
        details: reasoning,
    };
}

/**
 * Checks for share dilution or consistent buybacks, and some dividend track record.
 * A simplified approach:
 *   - if there's net share repurchase or stable share count, it suggests management
 *     might be shareholder-friendly.
 *   - if there's a big new issuance, it might be a negative sign (dilution).
 */
function analyzeManagementQuality(financialLineItems: FinancialLineItem[]): {
    score: number;
    maxScore: number;
    details: string[];
} {
    if (!financialLineItems || financialLineItems.length === 0) {
        return {
            score: 0,
            maxScore: 2,
            details: [
                "Insufficient data to evaluate management's capital allocation decisions",
            ],
        };
    }

    const reasoning: string[] = [];
    let managementScore = 0;
    const latest = financialLineItems[0];

    if (
        latest.issuanceOrPurchaseOfEquityShares !== undefined &&
        latest.issuanceOrPurchaseOfEquityShares < 0
    ) {
        // Negative means the company spent money on buybacks
        managementScore += 1;
        reasoning.push(
            "Management's decision to repurchase shares demonstrates shareholder-friendly capital allocation and may indicate management's belief that the stock is undervalued, a perspective aligned with Buffett's approach to capital deployment"
        );
    }

    if (
        latest.issuanceOrPurchaseOfEquityShares !== undefined &&
        latest.issuanceOrPurchaseOfEquityShares > 0
    ) {
        // Positive issuance means new shares => possible dilution
        reasoning.push(
            "Recent issuance of new shares dilutes existing shareholders and raises questions about management's commitment to per-share value creation, potentially suggesting poor capital allocation decisions"
        );
    } else {
        reasoning.push(
            "No significant stock dilution detected, indicating management is not pursuing growth at the expense of existing shareholders"
        );
    }

    // Check for any dividends
    if (
        latest.dividendsAndOtherCashDistributions !== undefined &&
        latest.dividendsAndOtherCashDistributions < 0
    ) {
        managementScore += 1;
        reasoning.push(
            "Consistent dividend payments demonstrate management's commitment to sharing profits with shareholders and signal confidence in the business's stable cash generation capabilities"
        );
    } else {
        reasoning.push(
            "Absence of meaningful dividends may indicate either growth-focused reinvestment or inadequate free cash flow generation, requiring further investigation into capital allocation priorities"
        );
    }

    return {
        score: managementScore,
        maxScore: 2,
        details: reasoning,
    };
}

/**
 * Calculate owner earnings (Buffett's preferred measure of true earnings power).
 * Owner Earnings = Net Income + Depreciation - Maintenance CapEx
 */
function calculateOwnerEarnings(financialLineItems: FinancialLineItem[]): {
    ownerEarnings: number | null;
    components?: {
        netIncome: number;
        depreciation: number;
        maintenanceCapex: number;
    };
    details: string[];
} {
    if (!financialLineItems || financialLineItems.length < 1) {
        return {
            ownerEarnings: null,
            details: [
                "Insufficient financial data to calculate owner earnings, a key metric in Buffett's valuation methodology",
            ],
        };
    }

    const latest = financialLineItems[0];
    const netIncome = latest.netIncome;
    const depreciation = latest.depreciationAndAmortization;
    const capex = latest.capitalExpenditure;

    if (!netIncome || !depreciation || !capex) {
        return {
            ownerEarnings: null,
            details: [
                "Missing essential components (net income, depreciation, or capital expenditures) required for an accurate owner earnings calculation",
            ],
        };
    }

    // Estimate maintenance capex (typically 70-80% of total capex)
    const maintenanceCapex = capex * 0.75;
    const ownerEarnings = netIncome + depreciation - maintenanceCapex;

    return {
        ownerEarnings,
        components: { netIncome, depreciation, maintenanceCapex },
        details: [
            "Owner earnings successfully calculated using Buffett's preferred formula: Net Income + Depreciation - Estimated Maintenance Capital Expenditures",
        ],
    };
}

/**
 * Calculate intrinsic value using DCF with owner earnings.
 */
function calculateIntrinsicValue(financialLineItems: FinancialLineItem[]): {
    intrinsicValue: number | null;
    ownerEarnings?: number;
    assumptions?: {
        growthRate: number;
        discountRate: number;
        terminalMultiple: number;
        projectionYears: number;
    };
    details: string[];
} {
    if (!financialLineItems || financialLineItems.length === 0) {
        return {
            intrinsicValue: null,
            details: [
                "Insufficient financial data to perform intrinsic value calculation",
            ],
        };
    }

    // Calculate owner earnings
    const earningsData = calculateOwnerEarnings(financialLineItems);
    if (!earningsData.ownerEarnings) {
        return { intrinsicValue: null, details: earningsData.details };
    }

    const ownerEarnings = earningsData.ownerEarnings;

    // Get current market data
    const latestFinancialLineItems = financialLineItems[0];
    const sharesOutstanding = latestFinancialLineItems.outstandingShares;

    if (!sharesOutstanding) {
        return {
            intrinsicValue: null,
            details: [
                "Missing shares outstanding data required for per-share valuation",
            ],
        };
    }

    // Buffett's DCF assumptions (conservative approach)
    const growthRate = 0.05; // Conservative 5% growth
    const discountRate = 0.09; // Typical ~9% discount rate
    const terminalMultiple = 12;
    const projectionYears = 10;

    // Sum of discounted future owner earnings
    let futureValue = 0;
    for (let year = 1; year <= projectionYears; year++) {
        const futureEarnings = ownerEarnings * Math.pow(1 + growthRate, year);
        const presentValue = futureEarnings / Math.pow(1 + discountRate, year);
        futureValue += presentValue;
    }

    // Terminal value
    const terminalValue =
        (ownerEarnings *
            Math.pow(1 + growthRate, projectionYears) *
            terminalMultiple) /
        Math.pow(1 + discountRate, projectionYears);

    const intrinsicValue = futureValue + terminalValue;

    return {
        intrinsicValue,
        ownerEarnings,
        assumptions: {
            growthRate,
            discountRate,
            terminalMultiple,
            projectionYears,
        },
        details: [
            "Intrinsic value calculated using a conservative discounted cash flow (DCF) model with Buffett's owner earnings approach, applying a 5% growth rate and 9% discount rate over a 10-year projection period",
        ],
    };
}
