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
<<<<<<< HEAD
import { contactsReducer } from './contacts/slice';
import { filtersReducer } from './filters/slice';
import { userReducer } from './user/slice';
=======
>>>>>>> main
import { authReducer } from './auth/slice';
import { boardsReducer } from './boards/slice';
import helpSliceReducer from './help/slice';
import { setAuthHeader } from './auth/operations';
// Persisting token field from auth slice to localstorage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
<<<<<<< HEAD

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['name', 'email', 'theme'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filtersReducer,
    user: persistReducer(userPersistConfig, userReducer),
=======
const persistedToken = localStorage.getItem('token');
if (persistedToken) {
  setAuthHeader(persistedToken);
}
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    boards: boardsReducer,
    help: helpSliceReducer,
>>>>>>> main
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
