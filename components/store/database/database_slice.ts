import { createSlice } from "@reduxjs/toolkit";
import { Serialized_countdown_goal } from "../../common";
import { set_database } from "./database_actions";

export const storage_name = "countdown-goals";

interface Database_state {
  countdown_goals: Serialized_countdown_goal[];
}

const initial_state: Database_state = {
  countdown_goals: [],
};
const database_slice = createSlice({
  name: "counter",
  initialState: initial_state,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(set_database.fulfilled, (state, action) => {
      if (action.payload) {
        state.countdown_goals = action.payload;
      }
      console.debug("thunk middle ware", action.payload);
      return state;
    });
  },
});

export default database_slice.reducer;
