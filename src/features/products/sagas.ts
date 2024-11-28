import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "./api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./slice";
import { GetProductsParams, ProductsResponse } from "./types";
import { toastService } from "../../services/ToastServices";
import { toast } from "react-toastify";

function* fetchProducts(action: PayloadAction<GetProductsParams>) {
  try {
    const response: ProductsResponse = yield call(
      productsApi.getProducts,
      action.payload
    );
    console.log("response.data", response);
    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchProductsFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
    toastService.showError(error?.message);
  }
}

export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
