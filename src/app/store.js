import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/features/Auth/userSlice';
import cartSlice from '@/features/Checkout/cartSlice';

const reducer = {
    user: userSlice.slice.reducer,
    cart: cartSlice.slice.reducer
};

const store = configureStore({ reducer });

export default store;
