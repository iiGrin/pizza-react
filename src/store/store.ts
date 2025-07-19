import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filtersSlice';
import cart from './slices/cartSlice'
import { pizzasApi } from './slices/pizzasApi';

export const store = configureStore({
  reducer: {
    filters,
    cart,
    [pizzasApi.reducerPath]: pizzasApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pizzasApi.middleware),
  devTools: true
});


