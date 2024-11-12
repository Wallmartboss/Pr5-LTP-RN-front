import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './user/slice';
import { authReducer } from './auth/slice';
import { columnsReducer } from './columns/slice.js';
import helpSliceReducer from './help/slice';
import { setAuthHeader } from './auth/operations';
import { boardsReducer } from './boards/slice.js';
import cardsReducer from './cards/cardsSlice';
import filtersReducer from './filters/filtersSlice.js';

import { sidebarReducer } from './sidebarSlice/slice.js';

// Persisting token field from auth slice to localstorage
const persistedToken = localStorage.getItem('token');
if (persistedToken) {
  setAuthHeader(persistedToken);
}
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['name', 'email', 'theme', 'avatar'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    columns: columnsReducer,
    filters: filtersReducer,
    help: helpSliceReducer,
    user: persistReducer(userPersistConfig, userReducer),
    boards: boardsReducer,
    cards: cardsReducer,
    sidebar: sidebarReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
