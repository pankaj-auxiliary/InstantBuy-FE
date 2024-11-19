import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "./types";

const initialState: UsersState = {
  items: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Fetch users
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Select User
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    // Reset state
    resetusers: () => initialState,
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  selectUser,
  clearSelectedUser,
  resetusers,
} = usersSlice.actions;

export default usersSlice.reducer;
