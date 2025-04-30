// src/features/products/productSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './api';

export const addProductDetails = createAsyncThunk(
  'products/addProductDetails',
  async ({ formDataObject }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Send productDetails as a JSON blob
      const jsonBlob = new Blob(
        [JSON.stringify(formDataObject.productDetails)],
        { type: 'application/json' }
      );

      formData.append('productDetails', jsonBlob);
      formData.append('imagea', formDataObject.imagea);
      formData.append('imageb', formDataObject.imageb);
      formData.append('imagec', formDataObject.imagec);

      const response = await axios.post(
        `${API_BASE_URL}/api/ProductDetails/save`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(addProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
