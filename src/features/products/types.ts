// Product-related types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// API response types
export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

// API request types
export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}