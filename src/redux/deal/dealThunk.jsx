import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// ================= GET ALL DEALS =================
export const getAllDeals = createAsyncThunk(
  "deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/deals");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          "Failed to fetch deals",
      );
    }
  },
);

// ================= CREATE DEAL =================
export const createDeal = createAsyncThunk(
  "deal/createDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      const res = await api.post("/api/deals/admin/create", dealData, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          "Failed to create deal",
      );
    }
  },
);

// ================= UPDATE DEAL =================
export const updateDeal = createAsyncThunk(
  "deal/updateDeal",
  async ({ id, dealData }, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      const res = await api.patch(`/api/deals/admin/${id}`, dealData, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          "Failed to update deal",
      );
    }
  },
);

// ================= DELETE DEAL =================
export const deleteDeal = createAsyncThunk(
  "deal/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      await api.delete(`/api/deals/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          "Failed to delete deal",
      );
    }
  },
);
