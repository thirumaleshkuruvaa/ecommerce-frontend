import { createSlice } from "@reduxjs/toolkit";
import { createCoupon, getAllCoupons, deleteCoupon } from "./adminCouponThunk";

const initialState = {
  coupons: [],
  loading: false,
  error: null,
  successMessage: null,
};

const adminCouponSlice = createSlice({
  name: "adminCoupon",
  initialState,
  reducers: {
    clearAdminCouponMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.unshift(action.payload);
        state.successMessage = "Coupon created successfully";
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload || [];
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload,
        );
        state.successMessage = "Coupon deleted successfully";
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminCouponMessage } = adminCouponSlice.actions;
export default adminCouponSlice.reducer;
