import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import bookReducer from './BookSlice';
import userReducer from './UserSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    book: bookReducer,
    user: userReducer
  },
});