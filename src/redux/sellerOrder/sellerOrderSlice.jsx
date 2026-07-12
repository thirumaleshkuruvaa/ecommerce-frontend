import { createSlice } from "@reduxjs/toolkit";
import { getSellerOrders, updateOrderStatus } from "./sellerOrderThunk";

const initialState = {
  orders: [],
  loading: false,
  updating: false,
  error: null,
};

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export default sellerOrderSlice.reducer;
