import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "./api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsByCategoryRequest,
  fetchProductsByCategorySuccess,
  fetchProductsByCategoryFailure,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  fetchProductByIdRequest,
} from "./slice";
import { GetProductsParams, Product, ProductsResponse } from "./types";
import { toast } from "react-toastify";

function* fetchProducts(action: PayloadAction<GetProductsParams>) {
  try {
    const response: ProductsResponse = yield call(
      productsApi.getProducts,
      action.payload
    );
    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchProductsFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
    toast.error(error?.message);
  }
}

function* fetchProductsByCategory(action: PayloadAction<string>) {
  try {
    const response: { data: ProductsResponse } = yield call(
      productsApi.getProductsByCategory,
      action.payload
    );
    yield put(fetchProductsByCategorySuccess(response.data.data));
  } catch (error: any) {
    yield put(
      fetchProductsByCategoryFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
    toast.error(error?.message);
  }
}

function* fetchProductById(action: PayloadAction<number>) {
  try {
    const product: { data: any } = yield call(
      productsApi.getProduct,
      action.payload
    );

    yield put(fetchProductByIdSuccess(product.data.data));
  } catch (error) {
    yield put(
      fetchProductByIdFailure(
        error instanceof Error ? error.message : "Failed to fetch product"
      )
    );
  }
}

export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
  yield takeLatest(
    fetchProductsByCategoryRequest.type,
    fetchProductsByCategory
  );
  yield takeLatest(fetchProductByIdRequest.type, fetchProductById);
}
