import { createSlice } from "@reduxjs/toolkit";
import { getHomePageData } from "./homeThunk";

const initialState = {
  grid: [],
  shopByCategories: [],
  dealsOfTheDay: [],
  electricCategories: [],
  deals: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.grid = action.payload?.grid || [];
        state.shopByCategories = action.payload?.shopByCategories || [];
        state.dealsOfTheDay = action.payload?.dealsOfTheDay || [];
        state.electricCategories = action.payload?.electricCategories || [];
        state.deals = action.payload?.deals || [];
      })
      .addCase(getHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch home page";
      });
  },
});

export default homeSlice.reducer;
