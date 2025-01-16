import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; 


export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials,); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        const response = await axiosInstance.post('/auth/logout');
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout failed:', error);
    }
});