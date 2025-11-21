import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {
    resetAllPayments: () => {}
  }
});

export const { resetAllPayments } = appSlice.actions;
export default appSlice.reducer;