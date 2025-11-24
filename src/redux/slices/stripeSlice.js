import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentRequest } from '../../services/stripeService';
import { addLog, clearLogs } from './logSlice';
import { resetPayPalState } from './paypalSlice';
import { resetMercadoPagoState } from './mercadoPagoSlice';

export const startStripePaymentIntent = createAsyncThunk(
    "payment/startStripePaymentIntent",
    async (_, thunkAPI) => {

        thunkAPI.dispatch(resetPayPalState())
        thunkAPI.dispatch(resetMercadoPagoState())
        thunkAPI.dispatch(clearLogs());

        thunkAPI.dispatch(addLog({
            type: 'front',
            tKey: "logs.stripe.initializing"
        }))

        const state = thunkAPI.getState();

        if (state.payment.clientSecret) {
            thunkAPI.dispatch(setClientSecret(null))
        }

        thunkAPI.dispatch(addLog({
            type: 'front',
            tKey: "logs.stripe.sending_paymentIntent"
        }))
        try {
            const response = await createPaymentIntentRequest();

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: "logs.stripe.request_received"
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: "logs.stripe.paymentIntent_created"
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: 'logs.stripe.client_secret',
                params: { clientSecret: response.clientSecret }
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: "logs.stripe.stripe_card"
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: "logs.stripe.mock_card"
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
        resetStripeState: (state) => {
            state.clientSecret = null;
            state.paymentStatus = 'idle';
            state.status = 'idle';
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

export const { setPaymentStatus, resetStripeState } = paymentSlice.actions;
export default paymentSlice.reducer;