import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",

  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/admin/login", data);

      localStorage.setItem("admin_jwt", res.data.jwt);
      localStorage.setItem("admin_role", res.data.role);
      localStorage.setItem("admin_email", data.email);

      return {
        ...res.data,
        email: data.email,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid Email or Password",
      );
    }
  },
);
