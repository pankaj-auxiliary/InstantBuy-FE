import { call, put, takeLatest } from "redux-saga/effects";
import { userApi } from "./api";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "./slice";
import { UsersResponse } from "./types";

function* fetchUsers() {
  try {
    const response: UsersResponse = yield call(userApi.getUsers);
    console.log("response", response);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(
      fetchUsersFailure(
        error instanceof Error ? error.message : "Failed to fetch products"
      )
    );
  }
}

export function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
}
