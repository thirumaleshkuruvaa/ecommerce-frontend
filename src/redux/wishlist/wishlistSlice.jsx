import { createSlice } from "@reduxjs/toolkit";
import { getWishlist, toggleWishlist } from "./wishlistThunk";

const initialState = {
  wishlist: null,
  products: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET WISHLIST
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.wishlist = action.payload;
        state.products = action.payload.products || [];
      })

      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // TOGGLE WISHLIST
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleWishlist.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistError } = wishlistSlice.actions;

export default wishlistSlice.reducer;
