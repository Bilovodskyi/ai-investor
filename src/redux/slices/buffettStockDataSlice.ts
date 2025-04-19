import {
    AnalysisDataResult,
    BuffettFinancialData,
} from "@/types/buffettAgentTypes";
import { StockProfile } from "@/types/stockResponseDataTypes";
import { createSlice } from "@reduxjs/toolkit";

type documentState = {
    stockDataForUi: StockProfile[] | null;
    stockDataForBuffettCalc: AnalysisDataResult | null;
    stockDataForBuffettAICall: BuffettFinancialData | null;
    // buffettAiReport: BuffettAiReport | null;
};

const initialState: documentState = {
    stockDataForUi: null,
    stockDataForBuffettCalc: null,
    stockDataForBuffettAICall: null,
    // buffettAiReport: null,
};

const stockDataSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {
        setStockDataForUi: (state, action) => {
            state.stockDataForUi = action.payload;
        },
        setStockDataForBuffettCalc: (state, action) => {
            state.stockDataForBuffettCalc = action.payload;
        },
        setStockDataForBuffettAICall: (state, action) => {
            state.stockDataForBuffettAICall = action.payload;
        },
        // updateBuffettAiReport(
        //     state,
        //     action: PayloadAction<{
        //         stock: string;
        //         report: AiResponseType;
        //     }>
        // ) {
        //     if (state.buffettAiReport === null) {
        //         state.buffettAiReport = {};
        //     }
        //     state.buffettAiReport[action.payload.stock] = action.payload.report;
        // },
    },
});

export const {
    setStockDataForUi,
    setStockDataForBuffettCalc,
    setStockDataForBuffettAICall,
    // updateBuffettAiReport,
} = stockDataSlice.actions;

export default stockDataSlice.reducer;
