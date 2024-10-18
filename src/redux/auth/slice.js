import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, logIn, logout, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoadingAuth: false,
    isError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isError = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isError = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isError = action.payload;
      })
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logout.pending),
        (state) => {
          state.isLoadingAuth = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(register.fulfilled, logIn.fulfilled, logout.fulfilled),
        (state) => {
          state.isLoadingAuth = false;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected, logout.rejected),
        (state, action) => {
          state.isLoadingAuth = false;
          state.isError = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
