import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../interceptors/axiosInstance'; 


export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData); 
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials,);
        localStorage.setItem('token', response.data.token);  
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

export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const response = await axiosInstance.post('/auth/verify-token', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });