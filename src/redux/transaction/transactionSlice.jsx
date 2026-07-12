import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerTransactions } from "./transactionThunk";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload || [];
        state.error = null;
      })
      .addCase(fetchSellerTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch transactions";
      });
  },
});

export default transactionSlice.reducer;
