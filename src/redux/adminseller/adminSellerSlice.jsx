import { createSlice } from "@reduxjs/toolkit";
import { fetchAllSellers, updateSellerStatus } from "./adminSellerThunk";

const initialState = {
  sellers: [],
  loading: false,
  error: null,
  statusUpdatingId: null,
};

const adminSellerSlice = createSlice({
  name: "adminSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL SELLERS
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload || [];
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE SELLER STATUS
      .addCase(updateSellerStatus.pending, (state, action) => {
        state.error = null;
        state.statusUpdatingId = action.meta.arg.sellerId;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.statusUpdatingId = null;

        const updatedSeller = action.payload;

        state.sellers = state.sellers.map((seller) =>
          seller.id === updatedSeller.id ? updatedSeller : seller,
        );
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.statusUpdatingId = null;
        state.error = action.payload;
      });
  },
});

export default adminSellerSlice.reducer;
