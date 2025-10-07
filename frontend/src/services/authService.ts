import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import api from './api';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  const response = await api.post('/auth/refresh', { refreshToken: token });
  return response.data;
};
