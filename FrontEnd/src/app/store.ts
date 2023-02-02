import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../features/auth/userSlice';
import signupSlice from '../features/signup/signupSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    signup: signupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
