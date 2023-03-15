import { createSlice } from "@reduxjs/toolkit";
import { Serialized_countdown_goal } from "../../common";
import { add_countdown_goal, set_database } from "./database_actions";

export const storage_name = "countdown-goals";

interface Database_state {
  countdown_goals: Serialized_countdown_goal[];
  user: any;
}

export type Database_items = keyof Database_state

const initial_state: Database_state = {
  countdown_goals: [],
  user: 'josh'
};
export const database_slice = createSlice({
  name: "counter",
  initialState: initial_state,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(add_countdown_goal.pending, (state, action) => {
      console.debug("adding goal", state, action);
    }),
    builder.addCase(add_countdown_goal.fulfilled, (state, action) => {
      console.debug("goal added", state, action);
    }),
    builder.addCase(add_countdown_goal.rejected, (state, action) => {
      console.error("add countdown goal failed", action.error.message);
    }),
    builder.addCase(set_database.fulfilled, (state, action) => {
      console.debug("set database completed", state, action);
      if (action.payload) {
        state.countdown_goals = action.payload;
      }
      return state;
    }),
    builder.addCase(set_database.rejected, (state, action) => {
      console.debug("set database failed", state, action);
    });
  },
});

export default database_slice.reducer;
