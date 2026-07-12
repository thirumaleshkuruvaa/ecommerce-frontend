import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const getErrorMessage = (error, defaultMessage) => {
  if (error.response?.data) {
    const data = error.response.data;

    // if backend returns plain string
    if (typeof data === "string") return data;

    // if backend returns object like { message: "..."} or { error: "..."}
    if (data.message) return data.message;
    if (data.error) return data.error;

    // fallback: stringify object
    return JSON.stringify(data);
  }

  return error.message || defaultMessage;
};

/* =========================================================
   CREATE ORDER
 
========================================================= */
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ address, paymentMethod }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.post(
        `/api/orders?paymentMethod=${paymentMethod}`,
        address,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data; // PaymentLinkResponse
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to create order"));
    }
  },
);

/* =========================================================
   GET USER ORDER HISTORY
   GET /api/orders/user
========================================================= */
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/api/orders/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch orders"));
    }
  },
);

/* =========================================================
   GET ORDER BY ID
   GET /api/orders/{orderId}
========================================================= */
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch order details"),
      );
    }
  },
);

/* =========================================================
   GET ORDER ITEM BY ID
   GET /api/orders/item/{orderItemId}
========================================================= */
export const getOrderItemById = createAsyncThunk(
  "order/getOrderItemById",
  async (orderItemId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get(`/api/orders/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch order item"),
      );
    }
  },
);

/* =========================================================
   CANCEL ORDER
   PUT /api/orders/{orderId}/cancel
========================================================= */
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.put(
        `/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to cancel order"));
    }
  },
);
export const archiveOrder = createAsyncThunk(
  "order/archiveOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.put(
        `/api/orders/${orderId}/archive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to archive order"));
    }
  },
);
export const unArchiveOrder = createAsyncThunk(
  "order/unArchiveOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.put(
        `/api/orders/${orderId}/unarchive`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to unarchive order"),
      );
    }
  },
);
export const getArchivedOrders = createAsyncThunk(
  "order/getArchivedOrders",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await api.get("/api/orders/archive", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch archived orders"),
      );
    }
  },
);
