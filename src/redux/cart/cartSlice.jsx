import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
} from "./cartThunk";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder;

    // ================= GET CART =================

    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;

      state.cart = action.payload;
      state.cartItems = action.payload.cartItems || [];
    });

    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ================= ADD TO CART =================

    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addToCart.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ================= UPDATE CART ITEM =================

    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateCartItem.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ================= DELETE CART ITEM =================

    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteCartItem.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearCartError } = cartSlice.actions;

export default cartSlice.reducer;
