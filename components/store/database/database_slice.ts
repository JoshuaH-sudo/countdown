import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Countdown_goal, Serialized_countdown_goal } from "../../common";
import { save_database, set_database } from "./database_actions";

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
    add_countdown_goal: (state, action: PayloadAction<Countdown_goal>) => {
      const new_goal = action.payload
      const serialized_goal: Serialized_countdown_goal = { ...new_goal, end_date: new_goal.end_date.toString() }
      const updated_goals = [...state.countdown_goals]

      updated_goals.push(serialized_goal);
      state.countdown_goals = updated_goals;
      
      //TODO Will need to save more than the countdown goals
      save_database(updated_goals)
      return state
    }
  },
  extraReducers(builder) {
    builder.addCase(set_database.fulfilled, (state, action) => {
      if (action.payload) {
        state.countdown_goals = action.payload;
      }
      return state;
    });
  },
});

export const { add_countdown_goal } = database_slice.actions;
export default database_slice.reducer;
