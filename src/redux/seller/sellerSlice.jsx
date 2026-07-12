import { createSlice } from "@reduxjs/toolkit";
import {
  createSeller,
  sendSellerLoginOtp,
  sellerLogin,
  fetchSellerProfile,
  updateSellerProfile,
  fetchSellerReport,
  deleteSeller,
} from "./sellerThunk";

const initialState = {
  seller: null,
  report: null,
  jwt: localStorage.getItem("seller_jwt") || null,
  loading: false,
  error: null,
  success: null,
  otpSent: false,
  sellerCreated: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    sellerLogout: (state) => {
      state.seller = null;
      state.report = null;
      state.jwt = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.otpSent = false;
      state.sellerCreated = false;
      localStorage.removeItem("seller_jwt");
    },

    clearSellerMessage: (state) => {
      state.error = null;
      state.success = null;
    },

    resetSellerFlags: (state) => {
      state.otpSent = false;
      state.sellerCreated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // CREATE SELLER
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.sellerCreated = false;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success =
          "Seller account created successfully. Please wait for verification.";
        state.sellerCreated = true;
        state.seller = action.payload;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create seller";
      })

      // SEND OTP
      .addCase(sendSellerLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.otpSent = false;
      })
      .addCase(sendSellerLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = "OTP sent successfully to your email";
        state.otpSent = true;
      })
      .addCase(sendSellerLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send OTP";
        state.otpSent = false;
      })

      // LOGIN
      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.success = "Seller login successful";
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // PROFILE
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller profile";
      })

      // UPDATE PROFILE
      .addCase(updateSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
        state.success = "Seller profile updated successfully";
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })

      // REPORT
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch report";
      })

      // DELETE SELLER
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteSeller.fulfilled, (state) => {
        state.loading = false;
        state.seller = null;
        state.jwt = null;
        state.report = null;
        state.success = "Seller account deleted successfully";
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete seller";
      });
  },
});

export const { sellerLogout, clearSellerMessage, resetSellerFlags } =
  sellerSlice.actions;

export default sellerSlice.reducer;
