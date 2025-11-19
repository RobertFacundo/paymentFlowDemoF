import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from './slices/stripeSlice';
import mercadoPagoReducer from './slices/mercadoPagoSlice'
import logReducer from './slices/logSlice'

export const store = configureStore({
    reducer: {
        payment: paymentReducer,
        logs: logReducer,
        mercadoPago: mercadoPagoReducer
    },
});