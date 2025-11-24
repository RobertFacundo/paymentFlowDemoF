import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMercadoPagoPreference } from '../../services/mercadoPagoService';
import { addLog, clearLogs } from './logSlice';
import { resetPayPalState } from './paypalSlice';
import { resetStripeState } from './stripeSlice';

export const startMercadoPagoFlow = createAsyncThunk(
    'mercadopago/startflow',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(resetPayPalState());
        thunkAPI.dispatch(resetStripeState())
        thunkAPI.dispatch(clearLogs());
        thunkAPI.dispatch(addLog({ type: 'front', tKey: 'logs.mp.initializing' }));

        const payload = {
            product: 'Payment Flow Demo',
            amount: 0.50,
            currency: 'ARS',
        };

        thunkAPI.dispatch(addLog({
            type: 'front',
            tKey: 'logs.mp.preparing_data',
            params: payload
        }));

        try {
            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.mp.sending_request_backend',
            }));

            const response = await createMercadoPagoPreference(payload);

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey:
                    'logs.mp.backend_received_request'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.mp.backend_returned_preference'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.mp.wallet_explanation'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.mp.rendering_wallet'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                tKey: 'logs.mp.redirect_flow'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                tKey: 'logs.mp.webhook_step'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                tKey: 'logs.mp.polling_step'
            }));

            return response;
        } catch (error) {
            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: 'logs.mp.error_creating_preference',
                params: { error: error.message }
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.mp.error_possible_causes'
            }));

            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const mercadoPagoSlice = createSlice({
    name: 'mercadopago',
    initialState: {
        provider: 'mercadopago',
        status: 'idle',
        preferenceId: null,
        checkoutUrl: null,
        paymentStatus: 'idle'
    },
    reducers: {
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        resetMercadoPagoState: (state) => {
            state.status = 'idle';
            state.preferenceId = null;
            state.checkoutUrl = null;
            state.paymentStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startMercadoPagoFlow.pending, (state) => {
                state.status = 'pending';
                state.preferenceId = null;
                state.checkoutUrl = null;
                state.checkoutUrl = null;
                console.log("⏳ [REDUX] Mercado Pago flow pending...");
            })
            .addCase(startMercadoPagoFlow.fulfilled, (state, action) => {
                state.status = 'processing';
                state.preferenceId = action.payload.preferenceId;
                state.checkoutUrl = action.payload.checkoutUrl;
                console.log("✅ [REDUX] Mercado Pago preference received:", action.payload);
            })
            .addCase(startMercadoPagoFlow.rejected, (state, action) => {
                state.status = 'failure';
                console.log("❌ [REDUX] Mercado Pago flow failed:", action.payload);
            })
    }
});

export const { setPaymentStatus, resetMercadoPagoState } = mercadoPagoSlice.actions;
export default mercadoPagoSlice.reducer;