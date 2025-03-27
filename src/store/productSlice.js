import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("http://your-api.com/products");
  return response.data;
});

// Add Product
export const addProduct = createAsyncThunk("products/add", async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://your-api.com/products", productData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Adding product failed");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productSlice.reducer;
