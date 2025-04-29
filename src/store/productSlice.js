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
      formData.append('categorys', productData.categorys);
      formData.append('quantity', String(productData.quantity));
      formData.append('regularprice', String(productData.regularprice));
      formData.append('specialprice', String(productData.specialprice));
      formData.append('tax', String(productData.tax));
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

      if (productData.catagoryId) {
        formData.append('catagory', JSON.stringify({ id: productData.catagoryId }));
      }

      if (productData.productIdNested) {
        formData.append('product', JSON.stringify({ id: productData.productIdNested }));
      }

      const response = await api.post(`${API_BASE_URL}/api/ProductDetails/save`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: 'Unknown error' });
    }
  }
);

// Slice setup
const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add product";
      });
  },
});

export default productSlice.reducer;
