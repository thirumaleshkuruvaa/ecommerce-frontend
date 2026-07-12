import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

// =====================================================
// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters.category) params.category = filters.category;
      if (filters.brand) params.brand = filters.brand;
      if (filters.colors) params.colors = filters.colors;

      if (filters.minDiscount !== null && filters.minDiscount !== undefined) {
        params.minDiscount = filters.minDiscount;
      }

      if (filters.minPrice !== null && filters.minPrice !== undefined) {
        params.minPrice = filters.minPrice;
      }

      if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
        params.maxPrice = filters.maxPrice;
      }

      if (filters.sort) params.sort = filters.sort;

      params.pageNumber = filters.pageNumber ?? 0;

      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch products",
      );
    }
  },
);

// =====================================================
// GET PRODUCT BY ID
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch product",
      );
    }
  },
);

// =====================================================
// SEARCH PRODUCTS
export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/search", {
        params: { query },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Search failed",
      );
    }
  },
);

// =====================================================
// GET SIMILAR PRODUCTS
// Uses same /products API based on category / brand
export const getSimilarProducts = createAsyncThunk(
  "product/getSimilarProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = {};

      if (filters.category) params.category = filters.category;
      if (filters.brand) params.brand = filters.brand;
      if (filters.colors) params.colors = filters.colors;

      params.pageNumber = 0;

      const response = await api.get("/products", { params });

      return {
        products: response.data?.content || [],
        currentProductId: filters.currentProductId || null,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch similar products",
      );
    }
  },
);
