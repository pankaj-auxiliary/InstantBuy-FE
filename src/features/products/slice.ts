import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product, GetProductsParams } from "./types";

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Fetch products
    fetchProductsRequest: (state, action: PayloadAction<GetProductsParams>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsByCategoryRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsByCategorySuccess: (
      state,
      action: PayloadAction<Product[]>
    ) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsByCategoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchProductByIdRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Select product
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    // Reset state
    resetProducts: () => initialState,
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsByCategoryFailure,
  fetchProductsByCategoryRequest,
  fetchProductsByCategorySuccess,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  selectProduct,
  clearSelectedProduct,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
