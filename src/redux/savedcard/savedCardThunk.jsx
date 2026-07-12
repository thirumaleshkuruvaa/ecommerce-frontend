import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// FETCH SAVED CARDS
export const fetchSavedCards = createAsyncThunk(
  "savedCard/fetchSavedCards",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/api/users/saved-cards", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("FETCH SAVED CARDS ERROR =>", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.details ||
          "Failed to fetch saved cards",
      );
    }
  },
);

// ADD SAVED CARD
export const addSavedCard = createAsyncThunk(
  "savedCard/addSavedCard",
  async (cardData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.post("/api/users/saved-cards", cardData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("ADD SAVED CARD ERROR =>", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.details ||
          "Failed to save card",
      );
    }
  },
);

// DELETE SAVED CARD
export const deleteSavedCard = createAsyncThunk(
  "savedCard/deleteSavedCard",
  async (cardId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      await api.delete(`/api/users/saved-cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return cardId;
    } catch (error) {
      console.log("DELETE SAVED CARD ERROR =>", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.details ||
          "Failed to delete card",
      );
    }
  },
);
