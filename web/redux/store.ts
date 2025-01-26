import { configureStore } from "@reduxjs/toolkit";

import baseApi from "./base-api";
import { authReducer } from "./features/auth/slice";
import { notificationReducer } from "./features/notification/slice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({}).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
