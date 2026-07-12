import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const fetchSellerTransactions = createAsyncThunk(
  "transaction/fetchSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.get("/api/transactions/seller", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.messege ||
          error.response?.data?.message ||
          "Failed to fetch transactions",
      );
    }
  },
);
