import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import stockDataReducer from "./slices/buffettStockDataSlice";
import tokensReducer from "./slices/tokensSlice";

const store = configureStore({
    reducer: {
        stockData: stockDataReducer,
        tokens: tokensReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
