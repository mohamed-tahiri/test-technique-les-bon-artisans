import { createContext, useContext, useState, type ReactNode } from 'react';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import * as authService from '../services/authService';

interface AuthContextProps {
  auth: AuthResponse | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthResponse | null>(() => {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (data: LoginRequest) => {
    const res = await authService.login(data);
    setAuth(res);
    localStorage.setItem('auth', JSON.stringify(res));
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  };

  const register = async (data: RegisterRequest) => {
    const res = await authService.register(data);
    setAuth(res);
    localStorage.setItem('auth', JSON.stringify(res));
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };


  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
