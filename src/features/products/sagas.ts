import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "./api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./slice";
import { GetProductsParams, ProductsResponse } from "./types";

function* fetchProducts(action: PayloadAction<GetProductsParams>) {
  try {
    const response: ProductsResponse = yield call(
      productsApi.getProducts,
      action.payload
    );
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchProductsFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
  }
}



export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
