import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPayPalOrder } from '../../services/paypalService';
import { addLog, clearLogs } from './logSlice'

export const startPayPalFlow = createAsyncThunk(
    'paypal/startflow',
    async (payload = { amount: 0.5 }, thunkAPI) => {
        thunkAPI.dispatch(clearLogs());
        thunkAPI.dispatch(addLog({
            type: 'front',
            tKey: 'logs.paypal.initializing'
        }));

        thunkAPI.dispatch(addLog({
            type: 'front',
            tKey: 'logs.paypal.preparing_data',
            params: { amount: payload.amount }
        }));

        try {

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.paypal.sending_request_backend'
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: 'logs.paypal.backend_processing'
            }));

            const order = await createPayPalOrder(payload);

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: 'logs.paypal.backend_created_order'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.paypal.frontend_received_orderId',
                params: { id: order.id }
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.paypal.rendering_button'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                tKey: 'logs.paypal.sandbox_card'
            }));

            return order;

        } catch (error) {

            thunkAPI.dispatch(addLog({
                type: 'backend',
                tKey: 'logs.paypal.error_creating_order',
                params: { error: error.message }
            }));

            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const paypalSlice = createSlice({
    name: 'paypal',
    initialState: {
        status: 'idle',
        orderId: null,
        paymentStatus: 'idle',
    },
    reducers: {
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        resetPayPalState: (state) => {
            state.orderId = null;
            state.paymentStatus = 'idle';
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startPayPalFlow.pending, (state) => {
                state.status = 'pending';
                state.orderId = null;
            })
            .addCase(startPayPalFlow.fulfilled, (state, action) => {
                state.status = 'processing';
                state.orderId = action.payload.id;
            })
            .addCase(startPayPalFlow.rejected, (state) => {
                state.status = 'failure';
            });
    }
});

export const { setPaymentStatus, resetPayPalState } = paypalSlice.actions;
export default paypalSlice.reducer;