import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { productsSaga } from "../../features/products/sagas";
import { authSaga } from "../../features/auth/sagas";
import productsReducer from "../../features/products/slice";
import authReducer from "../../features/auth/slice";
import usersReducer from "../../features/user/slice";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { usersSaga } from "../../features/user/saga";
import { createBrowserHistory } from "history";
import favoritesReducer from "../../features/favourites/slice";
import { favoritesSaga } from "../../features/favourites/sagas";

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Root saga that combines all feature sagas
function* rootSaga() {
  yield all([productsSaga(), authSaga(), usersSaga(), favoritesSaga()]);
}

export const history = createBrowserHistory();

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    users: usersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(errorMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
