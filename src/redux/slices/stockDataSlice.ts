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
};

const initialState: documentState = {
    stockDataForUi: null,
    stockDataForBuffettCalc: null,
    stockDataForBuffettAICall: null,
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
    },
});

export const {
    setStockDataForUi,
    setStockDataForBuffettCalc,
    setStockDataForBuffettAICall,
} = stockDataSlice.actions;

export default stockDataSlice.reducer;
