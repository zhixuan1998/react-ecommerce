import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/features/Auth/userSlice';

const reducer = {
  user: userSlice.slice.reducer
};

const store = configureStore({ reducer });

export default store;
