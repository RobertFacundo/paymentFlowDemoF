import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentRequest } from '../../services/stripeService';
import { addLog, clearLogs } from './logSlice';

export const startStripePaymentIntent = createAsyncThunk(
    "payment/startStripePaymentIntent",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(clearLogs());

        const state = thunkAPI.getState();

        if (state.payment.clientSecret) {
            thunkAPI.dispatch(setClientSecret(null))
        }

        thunkAPI.dispatch(addLog({
            type: 'front',
            message: "Sending PaymentIntent request to backend (amount, currency, description)."
        }))
        try {
            const response = await createPaymentIntentRequest();

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: "Request received. Validating data and preparing Stripe PaymentIntent."
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
                message: "Received the clientSecret. This value will be used by Stripe Elements to handle card details securely."
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: "ℹ️ Use test card 4242 4242 4242 4242 (MM/YY in future, any CVC) for testing."
            }))

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
        paymentStatus: 'idle',
        log: [],
    },
    reducers: {
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        setClientSecret: (state, action) => {
            state.clientSecret = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(startStripePaymentIntent.pending, (state) => {
                state.provider = 'stripe';
                state.status = "pending";
                // Resetear clientSecret y logs
                state.clientSecret = null;
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

export const { setPaymentStatus, setClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;