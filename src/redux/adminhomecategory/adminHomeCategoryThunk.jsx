import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// ================= GET ALL HOME CATEGORIES =================
export const getAllHomeCategories = createAsyncThunk(
  "adminHomeCategory/getAllHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      console.log(" GET HOME CATEGORIES REQUEST");

      const token = localStorage.getItem("admin_jwt");

      const response = await api.get("/api/admin/home-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(" GET HOME CATEGORIES SUCCESS =>", response.data);

      return response.data;
    } catch (error) {
      console.log(" GET HOME CATEGORIES ERROR =>", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.messege ||
          "Failed to fetch home categories",
      );
    }
  },
);

// ================= CREATE HOME CATEGORIES =================
// backend expects LIST<HomeCategory>
export const createHomeCategories = createAsyncThunk(
  "adminHomeCategory/createHomeCategories",
  async (categories, { rejectWithValue }) => {
    try {
      console.log(" CREATE HOME CATEGORIES REQUEST =>", categories);

      const token = localStorage.getItem("admin_jwt");

      const response = await api.post("/api/home/categories", categories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(" CREATE HOME CATEGORIES SUCCESS =>", response.data);

      // backend returns Home object, but for UI we will refetch categories after success
      return response.data;
    } catch (error) {
      console.log(" CREATE HOME CATEGORIES ERROR =>", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.messege ||
          "Failed to create home categories",
      );
    }
  },
);

// ================= UPDATE HOME CATEGORY =================
export const updateHomeCategory = createAsyncThunk(
  "adminHomeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(" UPDATE HOME CATEGORY REQUEST =>", id, data);

      const token = localStorage.getItem("admin_jwt");

      const response = await api.patch(
        `/api/admin/home-categories/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(" UPDATE HOME CATEGORY SUCCESS =>", response.data);

      return response.data;
    } catch (error) {
      console.log(" UPDATE HOME CATEGORY ERROR =>", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.messege ||
          "Failed to update home category",
      );
    }
  },
);
