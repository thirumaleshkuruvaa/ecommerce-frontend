import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "./addressThunk";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  success: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET =================
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD =================
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        state.success = "Address added successfully";
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateUserAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.addresses.findIndex(
          (a) => a.id === action.payload.id,
        );

        if (index !== -1) {
          state.addresses[index] = action.payload;
        }

        state.success = "Address updated successfully";
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteUserAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.filter(
          (a) => a.id !== action.payload,
        );

        state.success = "Address deleted successfully";
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressMessage } = addressSlice.actions;
export default addressSlice.reducer;
