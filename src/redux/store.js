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
import { boardsReducer } from './boards/slice';
import helpSliceReducer from './help/slice';
import { setAuthHeader } from './auth/operations';
import cardsReducer from './slices/cardsSlice';
// Persisting token field from auth slice to localstorage
const persistedToken = localStorage.getItem('token');
if (persistedToken) {
  setAuthHeader(persistedToken);
}
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['name', 'email', 'theme', 'avatar'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    boards: boardsReducer,
    help: helpSliceReducer,
    user: persistReducer(userPersistConfig, userReducer),
    cards: cardsReducer,
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
