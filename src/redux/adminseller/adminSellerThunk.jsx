import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// FETCH ALL SELLERS
export const fetchAllSellers = createAsyncThunk(
  "adminSeller/fetchAllSellers",
  async (accountStatus, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      const response = await api.get("/sellers", {
        params:
          accountStatus && accountStatus !== "ALL" ? { accountStatus } : {},
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.messege ||
          error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch sellers",
      );
    }
  },
);

// UPDATE SELLER STATUS
export const updateSellerStatus = createAsyncThunk(
  "adminSeller/updateSellerStatus",
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      // BACKEND API:
      // PATCH /api/admin/seller/{id}/status/{status}
      const response = await api.patch(
        `/api/admin/seller/${sellerId}/status/${status}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${adminJwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.messege ||
          error.response?.data?.message ||
          error.response?.data ||
          "Failed to update seller status",
      );
    }
  },
);
