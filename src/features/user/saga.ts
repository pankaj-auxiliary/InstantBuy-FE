import { call, put, takeLatest } from "redux-saga/effects";
import { userApi } from "./api";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "./slice";
import { UsersResponse } from "./types";
import { toast } from "react-toastify";

function* fetchUsers() {
  try {
    const response: UsersResponse = yield call(userApi.getUsers);
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchUsersFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
    toast.error(error?.message);
  }
}

export function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
}
