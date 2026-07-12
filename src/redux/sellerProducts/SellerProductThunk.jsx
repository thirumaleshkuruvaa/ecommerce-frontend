import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const createProduct = createAsyncThunk(
  "sellerProduct/createProduct",
  async ({ productData, jwt }, { rejectWithValue }) => {
    try {
      console.log("JWT RECEIVED => ", jwt);
      console.log("LOCAL STORAGE JWT => ", localStorage.getItem("seller_jwt"));

      const response = await api.post("/api/sellers/products", productData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response?.data);
    }
  },
);
// FETCH PRODUCTS
export const fetchSellerProducts = createAsyncThunk(
  "sellerProduct/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("seller_jwt");

      const response = await api.get("/api/sellers/products", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "sellerProduct/updateProduct",
  async ({ productId, productData, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/sellers/products/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Update Failed",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "sellerProduct/deleteProduct",
  async ({ productId, jwt }, { rejectWithValue }) => {
    console.log("productId =>", productId);
    console.log("typeof =>", typeof productId);

    try {
      await api.delete(`/api/sellers/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return productId;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to delete product",
      );
    }
  },
);
