import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { useSelector } from 'react-redux';
import Layout from '../layout/Layout';
import type { RootState } from '../store/store';
import ProductDetailPage from '../pages/ProductDetailPage';

const AppRoutes: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const isAuthenticated = !!auth?.accessToken;

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/products" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/products" replace /> : <RegisterPage />}
      />
      <Route
        path="/products"
        element={isAuthenticated ? <Layout><ProductsPage /></Layout> : <Navigate to="/login" replace />}
      />

      <Route
        path="/products/:id"
        element={
          isAuthenticated ? (
            <Layout>
              <ProductDetailPage />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;
