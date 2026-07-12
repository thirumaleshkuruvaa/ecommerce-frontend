import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const res = await api.post("/api/coupons/apply", null, {
        params: {
          apply,
          code,
          orderValue,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          err.response?.data ||
          "Coupon apply failed",
      );
    }
  },
);
