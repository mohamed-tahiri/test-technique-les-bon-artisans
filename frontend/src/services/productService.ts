import type { PaginatedResponse, Product, ProductQueryParams } from '../types/product';
import api from './api';

export const getProducts = async (params: ProductQueryParams = {}): Promise<PaginatedResponse> => {
  const { data } = await api.get<PaginatedResponse>('/products', { params });
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export const createProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
  const { data } = await api.post<Product>('/products', product);
  return data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};