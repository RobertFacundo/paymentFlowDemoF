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

        try {
            thunkAPI.dispatch(addLog({
                type: 'front',
                message: 'Sending request to backend to create Mercado Pago preference...'
            }));

            const response = await createMercadoPagoPreference(payload);

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: `Backend returned preferenceId: ${response.preferenceId} and checkoutUrl`
            }));

            return response;
        } catch (error) {
            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: `❌ Error creating Mercado Pago preference: ${error.message}`
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