import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// GET REVIEWS
export const getReviewsByProductId = createAsyncThunk(
  "review/getReviewsByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/reviews/products/${productId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  },
);

// CREATE REVIEW
export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.post(
        `/api/reviews/products/${productId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create review");
    }
  },
);

// UPDATE REVIEW
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.patch(`/api/reviews/${reviewId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update review");
    }
  },
);

// DELETE REVIEW
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      await api.delete(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete review");
    }
  },
);
