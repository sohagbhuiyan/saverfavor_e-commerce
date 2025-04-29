import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { API_BASE_URL } from "./api";

// Async thunk to add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('productid', String(productData.productid));
      formData.append('name', productData.name);  
      formData.append('quantity', String(productData.quantity));
      formData.append('regularprice', String(productData.regularprice));
      formData.append('specialprice', String(productData.specialprice));
      formData.append('title', productData.title);
      formData.append('details', productData.details);
      formData.append('specification', productData.specification);

      if (productData.imagea) {
        formData.append('imagea', productData.imagea);
      }

      if (productData.imageb) {
        formData.append('imageb', productData.imageb);
      }

      if (productData.imagec) {
        formData.append('imagec', productData.imagec);
      }

      if (productData.categoryId) {
        formData.append('catagory', JSON.stringify({ id: productData.categoryId }));
      }

      if (productData.productId) {
        formData.append('product', JSON.stringify({ id: productData.productId }));
      }

      const response = await api.post(`${API_BASE_URL}/api/ProductDetails/save`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      return rejectWithValue(error)
      }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

 
