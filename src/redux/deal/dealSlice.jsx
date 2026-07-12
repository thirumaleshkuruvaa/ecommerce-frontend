import { createSlice } from "@reduxjs/toolkit";
import { getAllDeals, createDeal, updateDeal, deleteDeal } from "./dealThunk";

const initialState = {
  deals: [],
  loading: false,
  error: null,
  successMessage: null,
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    clearDealMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= GET =================
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload || [];
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.unshift(action.payload);
        state.successMessage = "Deal created successfully";
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = state.deals.map((deal) =>
          deal.id === action.payload.id ? action.payload : deal,
        );
        state.successMessage = "Deal updated successfully";
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
        state.successMessage = "Deal deleted successfully";
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDealMessage } = dealSlice.actions;
export default dealSlice.reducer;
