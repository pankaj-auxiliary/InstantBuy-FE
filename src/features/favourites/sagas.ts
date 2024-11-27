import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../shared/api/axios";
import {
  fetchFavoritesRequest,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
} from "./slice";

function* fetchFavorites(): any {
  try {
    const response = yield call(api.get, "/favorites");
    yield put(fetchFavoritesSuccess(response.data));
  } catch (error) {
    yield put(
      fetchFavoritesFailure(
        error instanceof Error ? error.message : "Failed to fetch favorites"
      )
    );
  }
}

export function* favoritesSaga() {
  yield takeLatest(fetchFavoritesRequest.type, fetchFavorites);
}
