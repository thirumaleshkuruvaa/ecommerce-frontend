import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getOrderItemById,
  cancelOrder,
  archiveOrder,
  unArchiveOrder,
  getArchivedOrders,
} from "./orderThunk";

const initialState = {
  orders: [],
  archivedOrders: [],
  order: null,
  orderItem: null,
  paymentLink: null,
  loading: false,
  error: null,
  success: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    clearOrderMessage: (state) => {
      state.error = null;
      state.success = null;
    },

    clearOrderDetails: (state) => {
      state.order = null;
      state.orderItem = null;
    },

    clearPaymentLink: (state) => {
      state.paymentLink = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= CREATE ORDER ================= */

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentLink = action.payload;
        state.success = "Order created successfully";
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= USER ORDERS ================= */

      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })

      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ORDER DETAILS ================= */

      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ORDER ITEM ================= */

      .addCase(getOrderItemById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })

      .addCase(getOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CANCEL ORDER ================= */

      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.order = action.payload;

        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        );

        state.success = "Order cancelled successfully";
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ARCHIVE ORDER ================= */

      .addCase(archiveOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(archiveOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id,
        );

        state.archivedOrders.push(action.payload);

        state.success = "Order archived successfully";
      })

      .addCase(archiveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UNARCHIVE ORDER ================= */

      .addCase(unArchiveOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(unArchiveOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.archivedOrders = state.archivedOrders.filter(
          (order) => order.id !== action.payload.id,
        );

        state.orders.push(action.payload);

        state.success = "Order restored successfully";
      })

      .addCase(unArchiveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= GET ARCHIVED ORDERS ================= */

      .addCase(getArchivedOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getArchivedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.archivedOrders = action.payload;
      })

      .addCase(getArchivedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderMessage, clearOrderDetails, clearPaymentLink } =
  orderSlice.actions;

export default orderSlice.reducer;
