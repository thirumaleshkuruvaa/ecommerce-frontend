import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// GET SELLER ORDERS
export const getSellerOrders = createAsyncThunk(
  "sellerOrder/getSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.get("/api/sellers/orders", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller orders",
      );
    }
  },
);

// UPDATE STATUS
export const updateOrderStatus = createAsyncThunk(
  "sellerOrder/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.put(
        `/api/sellers/orders/${orderId}/status/${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      //  refresh orders after update
      dispatch(getSellerOrders());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order");
    }
  },
);
