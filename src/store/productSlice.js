// store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { API_BASE_URL } from './api';  // Assuming this is the Axios instance

// Async thunk to add product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('productId', productData.productId);
      formData.append('name', productData.name);
      formData.append('category', productData.category);
      formData.append('regularPrice', productData.regularPrice);
      formData.append('specialPrice', productData.specialPrice);
      formData.append('tax', productData.tax);
      formData.append('slug', productData.slug);
      formData.append('details', productData.details);
      formData.append('specification', productData.specification);
      formData.append('quantity', productData.quantity);
      formData.append('mainImage', productData.mainImage);

      productData.additionalImages.forEach((image, index) => {
        formData.append(`additionalImages[${index}]`, image);
      });

      productData.customFields.forEach((field, index) => {
        formData.append(`customFields[${index}][title]`, field.title);
        formData.append(`customFields[${index}][value]`, field.value);
      });

      const response = await api.post(`${API_BASE_URL}/api/ProductDetails/save`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the response data
    } catch (error) {
      return rejectWithValue(error.response.data);  // Return error
    }
  }
);

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
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);  // Add new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Set error message
      });
  },
});

export default productSlice.reducer;
