import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { GetProductsParams, Product } from "./types";
import {
  fetchProductsRequest,
  selectProduct,
  clearSelectedProduct,
} from "./slice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { items, selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const fetchProducts = useCallback(
    (params: GetProductsParams) => {
      dispatch(fetchProductsRequest(params));
    },
    [dispatch]
  );

  const selectProductItem = useCallback(
    (product: Product) => {
      dispatch(selectProduct(product));
    },
    [dispatch]
  );

  const clearSelection = useCallback(() => {
    dispatch(clearSelectedProduct());
  }, [dispatch]);

  return {
    products: items,
    selectedProduct,
    loading,
    error,
    fetchProducts,
    selectProduct: selectProductItem,
    clearSelection,
  };
};
