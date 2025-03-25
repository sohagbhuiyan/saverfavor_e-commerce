import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    count: JSON.parse(localStorage.getItem('cart'))?.reduce((acc, item) => acc + item.quantity, 0) || 0
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateCartCount: (state) => {
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
    }
  }
});

export const { addToCart, removeFromCart, updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;
