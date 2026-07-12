import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSavedCards,
  addSavedCard,
  deleteSavedCard,
} from "./savedCardThunk";

const initialState = {
  cards: [],
  loading: false,
  error: null,
  success: null,
};

const savedCardSlice = createSlice({
  name: "savedCard",
  initialState,
  reducers: {
    clearSavedCardMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSavedCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload || [];
      })
      .addCase(fetchSavedCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch saved cards";
      })

      // ADD
      .addCase(addSavedCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSavedCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
        state.success = "Card saved successfully";
      })
      .addCase(addSavedCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to save card";
      })

      // DELETE
      .addCase(deleteSavedCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSavedCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter((card) => card.id !== action.payload);
        state.success = "Card deleted successfully";
      })
      .addCase(deleteSavedCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete card";
      });
  },
});

export const { clearSavedCardMessage } = savedCardSlice.actions;
export default savedCardSlice.reducer;
