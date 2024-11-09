// import { createSelector } from '@reduxjs/toolkit';
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectToken = state => state.auth.token;

// export const selectUserId = createSelector(selectUser, user =>
//   user ? user._id : null
// );
export const selectUserId = state => state.auth.userId;
