import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
} from "./slice";
import { User, UserRole } from "../user/types";
import { loginApi, signUpApi } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import { toastService } from "../../services/ToastServices";
import { localStorageService } from "../../services/LocalStorageService";
import { history } from "../../app/store";
import { toast } from "react-toastify";

function* loginSaga(action: PayloadAction<Partial<User>>): any {
  try {
    // Simulate API call
    const response: any = yield call(loginApi.login, action.payload);
    localStorageService.setAuthToken(
      response?.token?.token || response?.mfa_token
    );
    yield call(
      history.push,
      response?.data?.role === UserRole.BUYER
        ? "/buyer"
        : response?.data?.role === UserRole.SELLER
        ? "/seller"
        : "/deliver"
    );
    yield put(loginSuccess(response));
    toast.success("Login successful");
  } catch (error: any) {
    yield put(
      loginFailure(error instanceof Error ? error.message : "Login failed")
    );
    toast.error(error?.message);
  }
}

function* signupSaga(action: PayloadAction<User>) {
  try {
    // Simulate API call
    const response: User = yield call(signUpApi.signUp, action.payload);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(
      loginFailure(error instanceof Error ? error.message : "Signup failed")
    );
    console.log("Error", error.message);
    toast.error(error?.message);
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(signupRequest.type, signupSaga);
}
