import { createSlice, createAsyncThunk, type PayloadAction, } from '@reduxjs/toolkit';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import * as authService from '../services/authService';

interface AuthState {
  auth: AuthResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : null,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk('auth/login', async (data: LoginRequest) => {
  const res = await authService.login(data);
  localStorage.setItem('auth', JSON.stringify(res));
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;
});

export const register = createAsyncThunk('auth/register', async (data: RegisterRequest) => {
  const res = await authService.register(data);
  localStorage.setItem('auth', JSON.stringify(res));
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => { state.loading = false; state.auth = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Login failed'; })

      // Register
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => { state.loading = false; state.auth = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Register failed'; })

      // Logout
      .addCase(logout.fulfilled, (state) => { state.auth = null; });
  },
});

export default authSlice.reducer;
