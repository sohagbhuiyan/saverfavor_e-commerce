import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Place Order
export const placeOrder = createAsyncThunk("order/place", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://your-api.com/orders", orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Order failed");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
  },
});

export default orderSlice.reducer;
