import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; 

// Thunk for user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData); // Use axiosInstance
        console.log('Register Response:', response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for user login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials,); // Use axiosInstance
        console.log('Login Response:', response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
