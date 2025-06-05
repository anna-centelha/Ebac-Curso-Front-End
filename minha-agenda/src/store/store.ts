// src/store.tsx
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../slices/contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer, // <--- O NOME AQUI ('contacts') É CRUCIAL!
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // <--- MUITO IMPORTANTE!
export type AppDispatch = typeof store.dispatch;

export default store;