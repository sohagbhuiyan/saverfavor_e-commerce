import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './api';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/productDetails/getall`);
      return response.data.map(product => ({
        ...product,
        regularprice: Number(product.regularprice),
        specialprice: Number(product.specialprice)
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to add product
export const addProductDetails = createAsyncThunk(
  'products/addProductDetails',
  async ({ formDataObject, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
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
          //  'Content-Type': 'multipart/form-data' ,
           Authorization: `Bearer ${token}`,
          } 
        }
        
      );
      return { 
        ...response.data,
        regularprice: Number(response.data.regularprice),
        specialprice: Number(response.data.specialprice)
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch single product
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/productDetails/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.map(product => ({
            ...product,
            imagea: product.imagea ? `${API_BASE_URL}/images/${product.imagea}` : '',
            imageb: product.imageb ? `${API_BASE_URL}/images/${product.imageb}` : '',
            imagec: product.imagec ? `${API_BASE_URL}/images/${product.imagec}` : '',
            regularprice: Number(product.regularprice),
            specialprice: Number(product.specialprice)
        }));
    })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Product
      .addCase(addProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
        state.products.push(action.payload);
      })
      .addCase(addProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch product by Id (single product)
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
  },
});

export default productSlice.reducer;
