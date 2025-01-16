import { createSlice } from '@reduxjs/toolkit';
import { registerUser,loginUser } from './user.thunk'; // Only import registerUser since login is now in reducers

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null, // Load token from localStorage if available
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user'); // Remove user from localStorage
            localStorage.removeItem('token'); // Remove token from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token); // Store token in localStorage
            })
            // Login
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token); // Store token in localStorage
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
