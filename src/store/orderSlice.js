import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./api";

// Place Order
export const placeOrder = createAsyncThunk(
  "order/place",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders/save`,
        orderData,
        {
          // headers: {
          //   Authorization: `Bearer ${getState().auth.token}`,
          // },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Order failed");
    }
  }
);

// Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { 
    orders: [], 
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      })
      
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
