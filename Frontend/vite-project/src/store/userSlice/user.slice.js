import { createSlice } from '@reduxjs/toolkit';
import { registerUser,loginUser,logoutUser,verifyToken } from './user.thunk';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: !!localStorage.getItem('token'), 
        loading: false, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = true; 
              })
              .addCase(verifyToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.loading = false; 
              })
              .addCase(verifyToken.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false; 
              });
    },
});

export default userSlice.reducer;
