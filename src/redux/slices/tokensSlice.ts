import { createSlice } from "@reduxjs/toolkit";

type documentState = {
    tokens: number | null;
};

const initialState: documentState = {
    tokens: null,
};

const stockDataSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.tokens = action.payload;
        },
        spentOneToken: (state) => {
            if (state.tokens && state.tokens > 0) {
                state.tokens -= 1;
            }
        },
    },
});

export const { setTokens, spentOneToken } = stockDataSlice.actions;

export default stockDataSlice.reducer;
