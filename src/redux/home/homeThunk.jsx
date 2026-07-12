import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const getHomePageData = createAsyncThunk(
  "home/getHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/home");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch home page data",
      );
    }
  },
);
