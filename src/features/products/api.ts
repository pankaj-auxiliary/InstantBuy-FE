import { Product, ProductsResponse, GetProductsParams } from "./types";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Fresh Organic Bananas",
    price: 2.99,
    description: "Fresh and organic bananas sourced directly from farmers",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800",
    category: "Fruits",
    stock: 50,
  },
  {
    id: 2,
    name: "Premium Whole Milk",
    price: 3.49,
    description: "Fresh whole milk from local dairy farms",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
    category: "Dairy",
    stock: 30,
  },
];

export const productsApi = {
  getProducts: async (params: GetProductsParams): Promise<ProductsResponse> => {
    // Simulate API call
    await delay(1000);
    return {
      data: mockProducts,
      total: mockProducts.length,
      page: params.page || 1,
      limit: params.limit || 10,
    };
  },

  getProduct: async (id: number): Promise<Product> => {
    await delay(500);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    await delay(1000);
    return { ...product, id: Math.random() };
  },

  updateProduct: async (
    id: number,
    product: Partial<Product>
  ): Promise<Product> => {
    await delay(1000);
    return { ...mockProducts[0], ...product, id };
  },

  deleteProduct: async (id: number): Promise<void> => {
    await delay(500);
  },
};
