import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

//  CREATE COUPON
export const createCoupon = createAsyncThunk(
  "adminCoupon/createCoupon",
  async (coupon, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      const res = await api.post("/api/coupons/admin/create", coupon, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          err.response?.data ||
          "Failed to create coupon",
      );
    }
  },
);

//  GET ALL COUPONS
export const getAllCoupons = createAsyncThunk(
  "adminCoupon/getAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      const res = await api.get("/api/coupons/admin/all", {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          err.response?.data ||
          "Failed to fetch coupons",
      );
    }
  },
);

// DELETE COUPON
export const deleteCoupon = createAsyncThunk(
  "adminCoupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const adminJwt = localStorage.getItem("admin_jwt");

      await api.delete(`/api/coupons/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${adminJwt}`,
        },
      });

      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data?.messege ||
          err.response?.data ||
          "Failed to delete coupon",
      );
    }
  },
);
