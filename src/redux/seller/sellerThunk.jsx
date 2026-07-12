import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// CREATE SELLER
export const createSeller = createAsyncThunk(
  "seller/createSeller",
  async (sellerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", sellerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to create seller account",
      );
    }
  },
);

// SEND SELLER LOGIN OTP
export const sendSellerLoginOtp = createAsyncThunk(
  "seller/sendSellerLoginOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/send-login-otp", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to send OTP",
      );
    }
  },
);

// SELLER LOGIN WITH OTP
export const sellerLogin = createAsyncThunk(
  "seller/sellerLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginData);

      if (response.data?.jwt) {
        localStorage.setItem("seller_jwt", response.data.jwt);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response?.data || "Login failed",
      );
    }
  },
);

// FETCH SELLER PROFILE
export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch seller profile",
      );
    }
  },
);

// UPDATE SELLER PROFILE
export const updateSellerProfile = createAsyncThunk(
  "seller/updateSellerProfile",
  async (sellerData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.patch("/sellers", sellerData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to update seller profile",
      );
    }
  },
);

// FETCH SELLER REPORT
export const fetchSellerReport = createAsyncThunk(
  "seller/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.get("/sellers/report", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch seller report",
      );
    }
  },
);

// DELETE SELLER
export const deleteSeller = createAsyncThunk(
  "seller/deleteSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      await api.delete(`/sellers/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      localStorage.removeItem("seller_jwt");
      return sellerId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to delete seller",
      );
    }
  },
);
