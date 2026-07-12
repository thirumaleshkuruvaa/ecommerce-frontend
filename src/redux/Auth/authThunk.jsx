import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// ========================================
// SEND SIGNUP OTP
// ========================================

export const sendSignupOtp = createAsyncThunk(
  "auth/sendSignupOtp",
  async (email, { rejectWithValue }) => {
    try {
      console.log("===== SEND SIGNUP OTP =====");
      console.log("EMAIL => ", email);

      const response = await api.post("/api/auth/send/signup-otp", {
        email,
      });

      console.log("SIGNUP OTP RESPONSE => ", response.data);

      return response.data;
    } catch (error) {
      console.error("SIGNUP OTP ERROR => ", error.response?.data || error);

      return rejectWithValue(
        error.response?.data || "Failed to send signup OTP",
      );
    }
  },
);

// ========================================
// SIGNUP
// ========================================

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      console.log("===== SIGNUP =====");
      console.log("REQUEST DATA => ", signupData);

      const response = await api.post("/api/auth/signup", signupData);

      console.log("SIGNUP RESPONSE => ", response.data);

      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);

        console.log("JWT STORED => ", localStorage.getItem("jwt"));
      }

      return response.data;
    } catch (error) {
      console.error("SIGNUP ERROR => ", error.response?.data || error);

      return rejectWithValue(error.response?.data || "Signup Failed");
    }
  },
);

// ========================================
// SEND LOGIN OTP
// ========================================

export const sendLoginOtp = createAsyncThunk(
  "auth/sendLoginOtp",
  async ({ email, role }, { rejectWithValue }) => {
    try {
      console.log("===== SEND LOGIN OTP =====");
      console.log("EMAIL => ", email);
      console.log("ROLE => ", role);

      const response = await api.post("/api/auth/send/login-otp", {
        email,
        role,
      });

      console.log("LOGIN OTP RESPONSE => ", response.data);

      return response.data;
    } catch (error) {
      console.error("LOGIN OTP ERROR => ", error.response?.data || error);

      return rejectWithValue(
        error.response?.data || "Failed to send login OTP",
      );
    }
  },
);
// ========================================
// FETCH USER PROFILE
// ========================================
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch user profile",
      );
    }
  },
);
// ========================================
// LOGIN
// ========================================

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      console.log("===== LOGIN =====");
      console.log("EMAIL => ", email);
      console.log("OTP => ", otp);

      const response = await api.post("/api/auth/login", {
        email,
        otp,
      });

      console.log("LOGIN RESPONSE => ", response.data);

      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);

        console.log("JWT STORED => ", localStorage.getItem("jwt"));
      }

      return response.data;
    } catch (error) {
      console.error("LOGIN ERROR => ", error.response?.data || error);

      return rejectWithValue(error.response?.data || "Login Failed");
    }
  },
);
