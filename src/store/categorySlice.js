// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { API_BASE_URL } from './api'; 

// Fetch Categories
export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const response = await api.get(`${API_BASE_URL}/api/catagories/get`); // Using the API instance
  return response.data;
});

// Add Category with token and role
export const addCategory = createAsyncThunk(
  'categories/add',
  async ({ name, token }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/api/catagories/save`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
        
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Adding category failed');
    }
  }
);


const categorySlice = createSlice({
  name: 'categories',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
