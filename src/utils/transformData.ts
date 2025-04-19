import {
    BuffettFinancialData,
    FinancialLineItem,
    FinancialMetrics,
    RawFinancialData,
} from "@/types/buffettAgentTypes";

export function transformFinancialDataForBuffettAnalysis(
    rawData: RawFinancialData[],
    marketCap: number | null = null
): BuffettFinancialData {
    const sortedData = rawData.slice(0, 5);
    const ticker = sortedData[0]?.symbol || "UNKNOWN";

    const metrics: FinancialMetrics[] = sortedData.map((entry) => {
        const data = entry.data;

        // Calculate ROE
        const netIncome =
            data.netincomeloss || data.netIncomeFromContinuingOperations || 0;
        const equityComponents =
            (data.commonstocksincludingadditionalpaidincapital || 0) +
            (data.retainedearningsaccumulateddeficit || 0) +
            (data.accumulatedothercomprehensiveincomelossnetoftax || 0);
        const equity =
            data.stockholdersequity < 0 || !data.stockholdersequity
                ? equityComponents || data.totalEquity || 0
                : data.stockholdersequity || data.totalEquity || 0;
        const roe = equity !== 0 ? netIncome / equity : 0;

        // Calculate Debt to Equity
        const longTermDebt =
            data.longtermdebtnoncurrent ||
            data.longTermDebt ||
            data.longtermdebt ||
            0;
        const debtToEquity = equity !== 0 ? longTermDebt / equity : 0;

        // Calculate Operating Margin
        const operatingIncome =
            data.operatingincomeloss ||
            data.operatingIncome ||
            (data.revenuesnetofinterestexpense
                ? data.revenuesnetofinterestexpense -
                  (data.noninterestexpense || 0) -
                  (data.provisionforloanleaseandotherlosses || 0)
                : 0) ||
            0;
        const revenue =
            data.revenuefromcontractwithcustomerexcludingassessedtax ||
            data.revenue ||
            data.totalRevenue ||
            data.revenues ||
            data.revenuesnetofinterestexpense ||
            0;
        const opMargin = revenue !== 0 ? operatingIncome / revenue : 0;

        // Calculate Current Ratio
        const currentAssets = data.assetscurrent || data.currentAssets || 0;
        const currentLiabilities =
            data.liabilitiescurrent || data.currentLiabilities || 0;
        const currentRatio =
            currentLiabilities !== 0 ? currentAssets / currentLiabilities : 0;

        return {
            returnOnEquity: roe,
            debtToEquity: debtToEquity,
            operatingMargin: opMargin,
            currentRatio: currentRatio,
        };
    });

    const lineItems: FinancialLineItem[] = sortedData.map((entry) => {
        const data = entry.data;

        return {
            netIncome:
                data.netincomeloss ||
                data.netIncome ||
                data.netincomelossavailabletocommonstockholdersbasic || // Added for Target
                0,
            depreciationAndAmortization:
                data.depreciationamortizationandother ||
                data.depreciationdepletionandamortization ||
                data.depreciationAndAmortization ||
                data.depreciationandamortization ||
                data.depreciation ||
                data.depreciationandimpairmentondispositionofpropertyandequipment +
                    (data.amortizationandimpairmentofintangibleassets || 0) ||
                data.depreciationamortizationandaccretionnet ||
                0,
            capitalExpenditure:
                data.paymentstoacquirepropertyplantandequipment ||
                data.paymentstoacquireproductiveassets ||
                data.capitalExpenditures ||
                0,
            outstandingShares:
                data.weightedaveragenumberofdilutedsharesoutstanding ||
                data.weightedAverageShsOutDil ||
                0,
            totalAssets: data.assets || data.totalAssets || 0,
            totalLiabilities:
                data.liabilities ||
                data.totalLiabilities ||
                (data.liabilitiescurrent && data.liabilitiesnoncurrent // Added for Target
                    ? data.liabilitiescurrent + data.liabilitiesnoncurrent
                    : 0) ||
                (data.liabilitiesandstockholdersequity &&
                data.stockholdersequity // Alternative fallback
                    ? data.liabilitiesandstockholdersequity -
                      data.stockholdersequity
                    : 0) ||
                0,
            dividendsAndOtherCashDistributions: -(
                data.dividends ||
                data.dividendscommonstockcash ||
                data.cashDividendsPaid ||
                data.dividendscash ||
                data.paymentsofdividends ||
                data.dividendscommonstock ||
                0
            ),
            issuanceOrPurchaseOfEquityShares: -(
                data.stockrepurchasedduringperiodvalue ||
                data.stockrepurchasedandretiredduringperiodvalue ||
                data.purchaseOfStock ||
                data.paymentsforrepurchaseofcommonstock ||
                0
            ),
        };
    });

    return {
        ticker,
        metrics,
        lineItems,
        marketCap,
    };
}
