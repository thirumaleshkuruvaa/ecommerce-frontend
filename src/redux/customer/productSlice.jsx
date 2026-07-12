import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getSimilarProducts,
} from "./productThunk";

const initialState = {
  product: null,
  products: [],
  similarProducts: [],
  totalPages: 1,
  loading: false,
  similarLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===================== ALL PRODUCTS =====================
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.content || [];
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===================== SEARCH PRODUCTS =====================
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
        state.totalPages = 1;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===================== PRODUCT DETAILS =====================
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===================== SIMILAR PRODUCTS =====================
      .addCase(getSimilarProducts.pending, (state) => {
        state.similarLoading = true;
      })
      .addCase(getSimilarProducts.fulfilled, (state, action) => {
        state.similarLoading = false;

        const currentProductId = action.payload.currentProductId;
        const products = action.payload.products || [];

        // remove current product and limit to 4
        state.similarProducts = products
          .filter((item) => item.id !== currentProductId)
          .slice(0, 4);
      })
      .addCase(getSimilarProducts.rejected, (state, action) => {
        state.similarLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
