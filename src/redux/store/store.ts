import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import agentReducer from '../slices/agentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;