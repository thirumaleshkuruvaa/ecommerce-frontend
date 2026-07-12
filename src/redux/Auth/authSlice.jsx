import { createSlice } from "@reduxjs/toolkit";

import {
  sendSignupOtp,
  signup,
  sendLoginOtp,
  login,
  fetchUserProfile,
} from "./authThunk";

const initialState = {
  user: null,
  jwt: localStorage.getItem("jwt") || null,
  loading: false,
  error: null,
  successMessage: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("===== LOGOUT =====");

      localStorage.removeItem("jwt");

      state.user = null;
      state.jwt = null;
      state.role = null;
      state.error = null;
      state.successMessage = null;

      console.log("JWT REMOVED");
    },
  },

  extraReducers: (builder) => {
    builder

      // SEND SIGNUP OTP
      .addCase(sendSignupOtp.pending, (state) => {
        console.log("SIGNUP OTP PENDING");
        state.loading = true;
      })

      .addCase(sendSignupOtp.fulfilled, (state, action) => {
        console.log("SIGNUP OTP SUCCESS => ", action.payload);

        state.loading = false;
        state.successMessage = action.payload.messege;
        //  ==========
        state.error = null;
      })

      .addCase(sendSignupOtp.rejected, (state, action) => {
        console.log("SIGNUP OTP FAILED => ", action.payload);

        state.loading = false;
        state.error = action.payload;
      })
      // FETCH USER PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // SIGNUP
      .addCase(signup.pending, (state) => {
        console.log("SIGNUP PENDING");
        state.loading = true;
      })

      .addCase(signup.fulfilled, (state, action) => {
        console.log("SIGNUP SUCCESS => ", action.payload);

        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;

        //  ==========
        state.error = null;
      })

      .addCase(signup.rejected, (state, action) => {
        console.log("SIGNUP FAILED => ", action.payload);

        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN OTP
      .addCase(sendLoginOtp.pending, (state) => {
        console.log("LOGIN OTP PENDING");
        state.loading = true;
      })

      .addCase(sendLoginOtp.fulfilled, (state, action) => {
        console.log("LOGIN OTP SUCCESS => ", action.payload);

        state.loading = false;
        state.successMessage = action.payload.messege;

        //  ==========
        state.error = null;
      })

      .addCase(sendLoginOtp.rejected, (state, action) => {
        console.log("LOGIN OTP FAILED => ", action.payload);

        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        console.log("LOGIN PENDING");
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;

        state.error = null;
        state.successMessage = "Login Successful";
      })
      .addCase(login.rejected, (state, action) => {
        console.log("LOGIN FAILED => ", action.payload);

        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
