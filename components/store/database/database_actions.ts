import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Serialized_countdown_goal } from "../../common";
import { storage_name } from "./database_slice";

export const get_countdown_goals = async (): Promise<
  Serialized_countdown_goal[]
> => {
  const countdown_goal_store = await AsyncStorage.getItem(storage_name);
  if (!countdown_goal_store) {
    console.debug("no end date in storage");
    return [];
  }

  const retrieved_countdown_goals: Serialized_countdown_goal[] =
    JSON.parse(countdown_goal_store);

  const parsed_goals = retrieved_countdown_goals.map((goal) => {
    return {
      ...goal,
    };
  });

  return parsed_goals;
};

export const save_database_handler = async (countdown_goals: Serialized_countdown_goal[]) => {
  await AsyncStorage.setItem(storage_name, JSON.stringify(countdown_goals));
  set_database();
};

export const save_database = createAsyncThunk("database/save", save_database_handler)

export const set_database = createAsyncThunk(
  "database/set_database",
  get_countdown_goals
);
