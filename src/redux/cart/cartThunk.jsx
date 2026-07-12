import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/cart", {
        headers: getAuthHeader(),
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch cart");
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (req, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/api/cart/add", req, {
        headers: getAuthHeader(),
      });

      await dispatch(getCart());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add item");
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put(`/api/cart/item/${cartItemId}`, data, {
        headers: getAuthHeader(),
      });

      await dispatch(getCart());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update item");
    }
  },
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.delete(`/api/cart/item/${cartItemId}`, {
        headers: getAuthHeader(),
      });

      await dispatch(getCart());

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete item");
    }
  },
);
