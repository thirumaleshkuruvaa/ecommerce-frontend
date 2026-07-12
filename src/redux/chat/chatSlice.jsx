import { createSlice } from "@reduxjs/toolkit";
import { sendChatMessage } from "./chatThunk";

const initialState = {
  messages: [
    {
      id: 1,
      sender: "bot",
      text: "👋 Hello!\n\nWelcome to Glomo.\n\nHow can I help you today?",
    },
  ],

  loading: false,

  error: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),

        sender: "user",

        text: action.payload,
      });
    },

    clearChat: (state) => {
      state.messages = [
        {
          id: 1,
          sender: "bot",
          text: "👋 Hello!\n\nWelcome to Glomo.\n\nHow can I help you today?",
        },
      ];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
      })

      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          id: Date.now(),

          sender: "bot",

          text: action.payload.reply,
        });
      })

      .addCase(sendChatMessage.rejected, (state) => {
        state.loading = false;

        state.messages.push({
          id: Date.now(),

          sender: "bot",

          text: "❌ Unable to connect to server.",
        });
      });
  },
});

export const {
  addUserMessage,

  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
