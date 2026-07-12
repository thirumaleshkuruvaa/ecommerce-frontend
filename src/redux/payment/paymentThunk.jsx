import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async ({ paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get(`/api/payment/${paymentId}`, {
        params: {
          paymentLinkId,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.messege ||
          error.response?.data?.message ||
          "Payment verification failed",
      );
    }
  },
);
