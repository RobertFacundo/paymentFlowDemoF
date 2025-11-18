import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: 'logs',
    initialState: {
        steps: []
    },
    reducers: {
        addLog: (state, action) => {
            const { type, message } = action.payload;

            state.steps.push({
                type,
                message,
                time: new Date().toLocaleDateString()
            });
        },
        clearLogs: (state) => {
            state.steps = [];
        }
    }
});

export const { addLog, clearLogs } = logSlice.actions;
export default logSlice.reducer;