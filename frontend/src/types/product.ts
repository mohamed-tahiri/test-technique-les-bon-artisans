// Seul le type Product
export interface Product {
  _id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  warranty_years: number;
  available: boolean;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  type?: string;
  name?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Product[];
}
