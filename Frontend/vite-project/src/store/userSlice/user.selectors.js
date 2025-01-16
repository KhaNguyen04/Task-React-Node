import { createSelector } from 'reselect';

const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  [selectUserState], 
  (userState) => userState.user 
);

export const selectIsAuthenticated = createSelector(
  [selectUserState], 
  (userState) => userState.isAuthenticated 
);
