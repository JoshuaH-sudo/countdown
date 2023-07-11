// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Countdown_goal,
  New_countdown_goal,
  Serialized_countdown_goal,
} from "../../common";
import { Root_state } from "../store";
import { storage_name } from "./database_slice";
import { v4 } from "uuid";

export const set_store_countdown_goals = createAsyncThunk(
  "database/set_store_countdown_goals",
  async () => {
  //   // const countdown_goal_store = await AsyncStorage.getItem(storage_name);
  //   if (!countdown_goal_store) {
  //     console.debug("No goals in storage");
  //     return [];
  //   }

  //   const retrieved_countdown_goals: Serialized_countdown_goal[] =
  //     JSON.parse(countdown_goal_store);

  //   const parsed_goals = retrieved_countdown_goals.map((goal) => {
  //     return {
  //       ...goal,
  //     };
  //   });

  //   return parsed_goals;
  return []
  }
);

export const add_countdown_goal = createAsyncThunk(
  "database/add_countdown_goal",
  async (new_goal: New_countdown_goal, { dispatch, getState }) => {
    const state = getState() as Root_state;
    const countdown_goal: Serialized_countdown_goal = {
      id: v4(),
      ...new_goal,
      end_date: new_goal.end_date.toString(),
      start_date: new_goal.start_date.toString(),
    };

    const updated_goals = [...state.database.countdown_goals, countdown_goal];

    // await AsyncStorage.setItem(storage_name, JSON.stringify(updated_goals));
    await dispatch(set_store_countdown_goals());
  }
);

export const remove_countdown_goal = createAsyncThunk(
  "database/remove_countdown_goal",
  async (remove_goal_id: string, { dispatch, getState }) => {
    const state = getState() as Root_state;
    const { countdown_goals } = state.database;

    const updated_goals = countdown_goals.filter(
      (goal) => goal.id !== remove_goal_id
    );

    // await AsyncStorage.setItem(storage_name, JSON.stringify(updated_goals));
    await dispatch(set_store_countdown_goals());
  }
);

export const set_countdown_goals = createAsyncThunk(
  "database/set_countdown_goal",
  async (updated_goals: Serialized_countdown_goal[], { dispatch }) => {
    // await AsyncStorage.setItem(storage_name, JSON.stringify(updated_goals));
    await dispatch(set_store_countdown_goals());
  }
);

export const edit_countdown_goal = createAsyncThunk(
  "database/edit_countdown_goal",
  async (edit_goal: Serialized_countdown_goal, { dispatch }) => {
    //Extract and parse the local storage
    // // const goal_storage = await AsyncStorage.getItem(storage_name);
    // if (!goal_storage) throw "Storage returned empty";
    // const goals = JSON.parse(goal_storage) as Serialized_countdown_goal[];

    // //Find the index of the goal
    // const index = goals.findIndex((goal) => goal.id === edit_goal.id);
    // if (index === -1) throw "Goal to update not found"
    // goals[index] = { ...edit_goal };

    // //Update the storage
    // await AsyncStorage.setItem(storage_name, JSON.stringify(goals));
    await dispatch(set_store_countdown_goals());
  }
);
