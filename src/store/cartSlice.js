import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from './api';

// Helper functions for local storage
const getUserEmail = (state) => {
  return state.auth?.profile?.email || 'guest';
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

// Async thunk for fetching cart items
export const fetchCartItemsAsync = createAsyncThunk(
  'cart/fetchCartItemsAsync',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    const userId = state.auth.profile?.id;

    if (!userId || !token) {
      return rejectWithValue('User not authenticated');
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/addcart/user/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart items');
    }
  }
);

// Async thunk for adding to cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productDetailsId, quantity, name, price, imagea }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    const profile = state.auth.profile;
    const userId = profile?.id;

    if (!token || !profile?.email || !userId) {
      return { productDetailsId, quantity, name, price, imagea, isGuest: true };
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/productdetails/AddTocart/save?userId=${userId}&productDetailsId=${productDetailsId}&quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ...response.data, name, price, imagea };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add to cart');
    }
  }
);

// Async thunk for removing from cart
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async ({ cartId, productId }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');

    try {
      await axios.delete(
        `${API_BASE_URL}/api/addcart/remove/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove from cart');
    }
  }
);

export const placeOrderFromCartAsync = createAsyncThunk(
  'cart/placeOrderFromCartAsync',
  async (orderData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token || localStorage.getItem('authToken');
    const userId = state.auth.profile?.id;
    const cartItems = state.cart.items;

    if (!token || !userId) {
      return rejectWithValue('User not authenticated');
    }

    if (!cartItems || cartItems.length === 0) {
      return rejectWithValue('Cart is empty');
    }

    try {
      // API expects one item per request based on Postman params
      const orderPromises = cartItems.map(async (item) => {
        const response = await axios.post(
          `${API_BASE_URL}/api/orders/AddToCadrt/productdetails/save?userId=${userId}&addToCartId=${item.cartId}&productDetailsId=${item.productId}`,
          {
            ...orderData,
            quantity: item.quantity,
            productname: item.name,
            price: item.price * item.quantity,
            productDetails: {
              id: item.productId,
              name: item.name,
              regularprice: item.price,
              specialprice: item.price,
              imagea: item.imagea,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      });

      const results = await Promise.all(orderPromises);
      return results; // Array of order responses
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
    status: 'idle',
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
      console.log("3\n\n\n\n\n\n\n", state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map((item) => ({
          cartId: item.cartId,
          productId: item.productId || item.productDetailsId,
          name: item.name || 'Unknown Product',
          price: item.price || 0 ,
          quantity: item.quantity || 1,
          imagea: item.imagea || '',
        }));
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
        saveCartForUser(state, state.items);
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = getCartForUser(state);
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newItem = action.payload;
        const isGuest = newItem.isGuest;

        const localItem = {
          cartId: newItem.cartId,
          productId: newItem.productDetailsId || newItem.productId,
          name: newItem.name || 'Unknown Product',
          price: newItem.price || 0,
          quantity: newItem.quantity || 1,
          imagea: newItem.imagea || '',
        };

        const existingItem = state.items.find((item) => item.productId === localItem.productId);

        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          state.items.push(localItem);
        }

        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);

        if (isGuest) {
          saveCartForUser(state, state.items);
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

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
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const productId = action.payload;
        state.items = state.items.filter((item) => item.productId !== productId);
        state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
        saveCartForUser(state, state.items);
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(placeOrderFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrderFromCartAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.items = []; // Clear cart
        state.count = 0;
        removeCartForUser(state); // Clear local storage
      })
      .addCase(placeOrderFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { initializeCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
