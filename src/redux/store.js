import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from './slices/paymentSlice';
import logReducer from './slices/logSlice'

export const store = configureStore({
    reducer: {
        payment: paymentReducer,
        logs: logReducer
    },
});