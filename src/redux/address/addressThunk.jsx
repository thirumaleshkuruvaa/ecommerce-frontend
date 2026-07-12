import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// GET USER ADDRESSES
export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const res = await api.get("/api/addresses", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

// ADD ADDRESS
export const addUserAddress = createAsyncThunk(
  "address/addUserAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const res = await api.post("/api/addresses", addressData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add address",
      );
    }
  },
);

// UPDATE ADDRESS
export const updateUserAddress = createAsyncThunk(
  "address/updateUserAddress",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const res = await api.put(`/api/addresses/${id}`, addressData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address",
      );
    }
  },
);

// DELETE ADDRESS
export const deleteUserAddress = createAsyncThunk(
  "address/deleteUserAddress",
  async (id, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      await api.delete(`/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete address",
      );
    }
  },
);
