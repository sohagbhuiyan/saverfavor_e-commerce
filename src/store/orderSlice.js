import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./api";

// Place Order
export const placeOrder = createAsyncThunk(
  "order/place",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const profile = state.auth.profile;
      const user = state.auth.user;

      if (!token || !profile?.email || !user?.id) {
        return rejectWithValue("User not authenticated. Please log in.");
      }

      // Construct user object for the order
      const userData = {
        id: user.id,
        name: profile.name || "Guest",
        email: profile.email,
        phoneNo: profile.phoneNo || "Not provided",
      };

      // Calculate price (use specialprice if available, else regularprice)
      const price = orderData.quantity * (orderData.productDetails.specialprice || orderData.productDetails.regularprice);

      // Construct order payload
      const orderWithUser = {
        ...orderData,
        user: userData,
        price,
      };

      console.log("Order payload:", orderWithUser);

      const response = await axios.post(
        `${API_BASE_URL}/api/orders/save`,
        orderWithUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Order response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Order error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Order failed");
    }
  }
);

// Fetch All Orders (for admin)
export const fetchOrders = createAsyncThunk(
  "order/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const role = state.auth.role;

      if (role !== "admin") {
        return rejectWithValue("Admin access required.");
      }

      const response = await axios.get(`${API_BASE_URL}/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Fetched all orders:", response.data);

      return response.data;
    } catch (error) {
      console.error("Fetch orders error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Fetch User-Specific Orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const email = state.auth.profile?.email;

      if (!token || !email) {
        return rejectWithValue("User not authenticated. Please log in.");
      }

      const response = await axios.get(`${API_BASE_URL}/api/orders/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { email }
      });

      console.log("Fetched user orders:", response.data);

      return response.data;
    } catch (error) {
      console.error("Fetch user orders error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user orders");
    }
  }
);

// Order Slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    userOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
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
        state.userOrders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to place order";
      })

      // Fetch All Orders
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
        state.error = action.payload;
      })

      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
