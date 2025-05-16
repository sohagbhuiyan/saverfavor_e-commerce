import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './api';

// Helper functions for local storage
const getUserEmail = (state) => {
  return state.auth.profile?.email || 'guest';
};

const getCartForUser = (state) => {
  const email = getUserEmail(state);
  const cart = JSON.parse(localStorage.getItem(`cart_${email}`));
  return cart || [];
};

const saveCartForUser = (state, items) => {
  const email = getUserEmail(state);
  localStorage.setItem(`cart_${email}`, JSON.stringify(items));
};

const removeCartForUser = (state) => {
  const email = getUserEmail(state);
  localStorage.removeItem(`cart_${email}`);
};

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productDetailsId, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    const profile = state.auth.profile;
    const user = state.auth.user;
    
    if (!token || !profile?.email || !user?.id) {
      // For guest users, just return the item without API call
      return { productDetailsId, quantity, isGuest: true };
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/productdetails/AddTocart/save?userId=${user.id}&productDetailsId=${productDetailsId}&quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add to cart');
    }
  }
);

// Async thunk for fetching cart items from API
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    const user = state.auth.user;
    
    if (!token || !user?.id) {
      return getCartForUser(state); // Return local cart for guests
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/productdetails/cart/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart items');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize empty; populated on first access
    count: 0,
    status: 'idle', // for async thunk status
    error: null,
  },
  reducers: {
    initializeCart: (state, action) => {
      state.items = getCartForUser(action.payload);
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      saveCartForUser(state, state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      saveCartForUser(state, state.items);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
        saveCartForUser(state, state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      removeCartForUser(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Handle guest user or API response
        const newItem = action.payload;
        const isGuest = newItem.isGuest;
        
        // Format item for local storage
        const localItem = {
          productId: newItem.productDetailsId || newItem.productId,
          name: newItem.name || action.meta.arg.name || 'Unknown Product',
          price: newItem.price || action.meta.arg.price || 0,
          quantity: newItem.quantity || action.meta.arg.quantity || 1,
          imagea: newItem.imagea || action.meta.arg.imagea || '',
        };
        
        const existingItem = state.items.find((item) => item.productId === localItem.productId);

        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          state.items.push(localItem);
        }

        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
        
        // Only save to local storage for guest users
        if (isGuest) {
          saveCartForUser(state, state.items);
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        
        // Fallback to local cart
        const newItem = action.meta.arg;
        const localItem = {
          productId: newItem.productDetailsId,
          name: newItem.name || 'Unknown Product',
          price: newItem.price || 0,
          quantity: newItem.quantity,
          imagea: newItem.imagea || '',
        };
        
        const existingItem = state.items.find((item) => item.productId === localItem.productId);

        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          state.items.push(localItem);
        }

        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
        saveCartForUser(state, state.items);
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Fallback to local storage
        state.items = getCartForUser(state);
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      });
  },
});

export const { initializeCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
