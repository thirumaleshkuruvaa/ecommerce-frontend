import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./adminAuthThunk";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,

  admin: {
    email: localStorage.getItem("admin_email") || "",
    role: localStorage.getItem("admin_role") || "",
  },

  isAuthenticated:
    !!localStorage.getItem("admin_jwt") &&
    localStorage.getItem("admin_role") === "ROLE_ADMIN",
};

const adminAuthSlice = createSlice({
  name: "adminAuth",

  initialState,

  reducers: {
    clearAdminAuthState: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    adminLogout: (state) => {
      localStorage.removeItem("admin_jwt");
      localStorage.removeItem("admin_role");
      localStorage.removeItem("admin_email");

      state.admin = {
        email: "",
        role: "",
      };

      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.admin = {
          email: action.payload.email,
          role: action.payload.role,
        };

        state.successMessage = action.payload.messege;
        state.isAuthenticated = true;
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminAuthState, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
