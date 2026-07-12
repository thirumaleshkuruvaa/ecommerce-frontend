import { createSlice } from "@reduxjs/toolkit";
import { verifyPayment } from "./paymentThunk";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },

  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success;
        state.data = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
