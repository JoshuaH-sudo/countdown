import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { set_store_countdown_goals } from "./database/database_actions";
import database from "./database/database_slice";

const store = configureStore(
  {
    reducer: {
      database,
    },
  },
);

store.dispatch(set_store_countdown_goals())

// Infer the `RootState` and `AppDispatch` types from the store itself
export type Root_state = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type App_dispatch = typeof store.dispatch

export default store;