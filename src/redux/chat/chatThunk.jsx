import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",

  async (message, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/chat", {
        messege: message, // backend spelling
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  },
);
