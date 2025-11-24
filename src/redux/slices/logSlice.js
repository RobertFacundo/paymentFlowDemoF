import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: 'logs',
    initialState: {
        steps: []
    },
    reducers: {
        addLog: (state, action) => {
            const { type, message, tKey, params } = action.payload;

            state.steps.push({
                type,
                tKey: tKey || null,
                params: params || null,
                message: message || null,
                time: new Date().toLocaleTimeString()
            });
        },
        clearLogs: (state) => {
            state.steps = [];
        }
    }
});

export const { addLog, clearLogs } = logSlice.actions;
export default logSlice.reducer;