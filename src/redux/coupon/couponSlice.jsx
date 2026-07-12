import { createSlice } from "@reduxjs/toolkit";
import { applyCoupon } from "./couponThunk";

const initialState = {
  cart: null,
  loading: false,
  error: null,
  successMessage: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCouponMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.successMessage = action.payload?.couponCode
          ? "Coupon applied successfully"
          : "Coupon removed successfully";
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCouponMessage } = couponSlice.actions;
export default couponSlice.reducer;
