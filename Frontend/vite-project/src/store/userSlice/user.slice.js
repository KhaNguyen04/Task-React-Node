import { createSlice } from '@reduxjs/toolkit';
import { registerUser,loginUser,logoutUser } from './user.thunk';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated:  null, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token); 
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token); 
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token')
            })
    },
});

export default userSlice.reducer;
