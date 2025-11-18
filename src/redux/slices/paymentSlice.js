import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentRequest } from '../../services/stripeService';
import { addLog } from './logSlice';

export const startStripePaymentIntent = createAsyncThunk(
    "payment/startStripePaymentIntent",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(addLog({
            type: 'front',
            message: "Frontend → Sending PaymentIntent request to backend (amount, currency, description)."
        }))
        try {
            const response = await createPaymentIntentRequest();

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: "Backend → Request received. Validating data and preparing Stripe PaymentIntent."
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: "Stripe API → PaymentIntent created successfully. This represents a secure placeholder for the future payment."
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: `Stripe → Returned clientSecret (${response.clientSecret}). The clientSecret allows the frontend to securely confirm the payment WITHOUT exposing secret API keys.`
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: "Frontend → Received the clientSecret. This value will be used by Stripe Elements to handle card details securely."
            }));

            return response;
        } catch (error) {
            thunkAPI.dispatch(addLog({
                type: "backend",
                message: `❌ Error → Stripe could not create the PaymentIntent. Reason: ${error.message}`
            }));
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        provider: null,
        status: 'idle',
        clientSecret: null,
        paymentStatus: null,
        log: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(startStripePaymentIntent.pending, (state) => {
                state.provider = 'stripe';
                state.status = "pending";
                console.log("⏳ [REDUX] PaymentIntent pending...");
            })
            .addCase(startStripePaymentIntent.fulfilled, (state, action) => {
                state.status = 'processing';
                state.clientSecret = action.payload.clientSecret;
                console.log("✅ [REDUX] PaymentIntent recibido:", action.payload.clientSecret)
            })
            .addCase(startStripePaymentIntent.rejected, (state, action) => {
                state.status = 'failure';
                console.log("❌ [REDUX] PaymentIntent FAILED:", action.payload);
            });
    }
});

export default paymentSlice.reducer;