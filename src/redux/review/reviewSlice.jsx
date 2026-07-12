import { createSlice } from "@reduxjs/toolkit";

import {
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview,
} from "./reviewThunk";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  successMessage: null,
};

const reviewSlice = createSlice({
  name: "review",

  initialState,

  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },

    clearReviewMessage: (state) => {
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET REVIEWS
      .addCase(getReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getReviewsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })

      .addCase(getReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE REVIEW
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews.unshift(action.payload);

        state.successMessage = "Review Added Successfully";
      })

      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE REVIEW
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id,
        );

        if (index !== -1) {
          state.reviews[index] = action.payload;
        }

        state.successMessage = "Review Updated Successfully";
      })

      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE REVIEW
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload,
        );

        state.successMessage = "Review Deleted Successfully";
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError, clearReviewMessage } = reviewSlice.actions;

export default reviewSlice.reducer;
