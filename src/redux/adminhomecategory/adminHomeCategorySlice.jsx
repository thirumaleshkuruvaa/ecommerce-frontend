import { createSlice } from "@reduxjs/toolkit";
import {
  getAllHomeCategories,
  createHomeCategories,
  updateHomeCategory,
} from "./adminHomeCategoryThunk";

const initialState = {
  homeCategories: [],
  loading: false,
  error: null,
  successMessage: null,
};

const adminHomeCategorySlice = createSlice({
  name: "adminHomeCategory",
  initialState,
  reducers: {
    clearHomeCategoryMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ================= GET ALL =================
      .addCase(getAllHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload || [];
      })
      .addCase(getAllHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch home categories";
      })

      // ================= CREATE =================
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createHomeCategories.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Home categories created successfully";
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create home categories";
      })

      // ================= UPDATE =================
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Home category updated successfully";

        const updated = action.payload;
        const index = state.homeCategories.findIndex(
          (item) => item.id === updated.id,
        );

        if (index !== -1) {
          state.homeCategories[index] = updated;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update home category";
      });
  },
});

export const { clearHomeCategoryMessage } = adminHomeCategorySlice.actions;
export default adminHomeCategorySlice.reducer;
