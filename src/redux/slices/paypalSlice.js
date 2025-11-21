import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPayPalOrder } from '../../services/paypalService';
import { addLog, clearLogs } from './logSlice'

export const startPayPalFlow = createAsyncThunk(
    'paypal/startflow',
    async (payload = { amount: 0.5 }, thunkAPI) => {
        thunkAPI.dispatch(clearLogs());
        thunkAPI.dispatch(addLog({
            type: 'front',
            message: 'Initializing PayPal payment flow...'
        }));

        thunkAPI.dispatch(addLog({
            type: 'front',
            message: `📦 Preparing purchase data: amount=$${payload.amount} USD`
        }));

        try {

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '📡 Sending request to backend to create PayPal order...'
            }));

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: '🖥️ Backend processing request...'
            }));

            const order = await createPayPalOrder(payload);

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: '🟢 Backend created PayPal order successfully.'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: `🧩 Frontend received orderId from backend: ${order.id}. Ready to initialize PayPal widget.`
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: '🪟 Rendering PayPal checkout button...'
            }));

            thunkAPI.dispatch(addLog({
                type: 'front',
                message: `💳 Use this PayPal Sandbox Test Card:\n    • Card Number: 4299 1966 7020 9475\n    • Expiry: 11/2030\n    • CVC: Any 3 digits`
            }));

            return order;

        } catch (error) {

            thunkAPI.dispatch(addLog({
                type: 'backend',
                message: `❌ Error creating PayPal order: ${error.message}`
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

export const { setPaymentStatus } = paypalSlice.actions;
export default paypalSlice.reducer;