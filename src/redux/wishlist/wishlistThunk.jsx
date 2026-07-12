import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// GET WISHLIST
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch wishlist");
    }
  },
);

// ADD / REMOVE PRODUCT
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      );

      dispatch(getWishlist());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update wishlist");
    }
  },
);
