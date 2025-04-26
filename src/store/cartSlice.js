import { createSlice } from '@reduxjs/toolkit';

// Helpers to manage cart based on logged-in user
const getUserEmail = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  return authUser?.email || "guest";
};

const getCartForUser = () => {
  const email = getUserEmail();
  const cart = JSON.parse(localStorage.getItem(`cart_${email}`));
  return cart || [];
};

const saveCartForUser = (items) => {
  const email = getUserEmail();
  localStorage.setItem(`cart_${email}`, JSON.stringify(items));
};

const removeCartForUser = () => {
  const email = getUserEmail();
  localStorage.removeItem(`cart_${email}`);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getCartForUser(),
    count: getCartForUser().reduce((acc, item) => acc + item.quantity, 0),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      saveCartForUser(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      state.count = state.items.reduce((acc, item) => acc + item.quantity, 0);
      saveCartForUser(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        saveCartToLocalStorage(state.cartItems);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      removeCartForUser();
    },
  },
});
const saveCartToLocalStorage = (cartItems) => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const userEmail = user?.email || "guest";
  localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
