import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMercadoPagoPreference } from '../../services/mercadoPagoService';
import { addLog, clearLogs } from './logSlice';

export const startMercadoPagoFlow = createAsyncThunk(
    'mercadopago/startflow',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(clearLogs());
        thunkAPI.dispatch(addLog({ type: 'front', message: 'initializing Mercado Pago payment flow' }));

        const payload = {
            product: 'Payment Flow Demo',
            amount: 0.50,
            currency: 'ARS',
        };

        thunkAPI.dispatch(addLog({
            type: 'front',
            message: `📦 Preparing purchase data: product="${payload.product}", amount=$${payload.amount} ${payload.currency}`
        }));

        try {
            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '📡 Sending request to backend to create Mercado Pago preference...'
            }));

            const response = await createMercadoPagoPreference(payload);

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message:
                    '🟢 Backend received the request and contacted Mercado Pago servers to create the payment session.'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '🧩 The backend returned a preferenceId. This ID uniquely identifies the payment session and allows the Wallet component to render the Mercado Pago checkout.'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '💳 With this preferenceId, the Wallet component can securely redirect the user to Mercado Pago’s payment platform.'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '🪙 Rendering Mercado Pago Wallet. The user will be redirected to complete the payment...'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                message: '🔄 After redirection, logs will not be visible. Final payment status is notified by webhook.'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                message: '1️⃣ Webhook → backend receives Mercado Pago notification (approved, rejected, pending).'
            }));

            thunkAPI.dispatch(addLog({
                type: 'flow',
                message: '2️⃣ Polling → frontend can check payment status after returning from checkout.'
            }));

            return response;
        } catch (error) {
            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: `❌ Error creating Mercado Pago preference: ${error.message}`
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '⚠️ Possible causes: missing credentials, Mercado Pago test user issues, card verification required, or backend misconfiguration.'
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

export const { setPaymentStatus } = mercadoPagoSlice.actions;
export default mercadoPagoSlice.reducer;