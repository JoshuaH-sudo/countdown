import { New_countdown_goal, Serialized_countdown_goal } from "../../common";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  add_countdown_goal,
  remove_countdown_goal,
  set_countdown_goals,
} from "./database_actions";

const use_database_store = () => {
  const database = useAppSelector((state) => state.database);
  const dispatch = useAppDispatch();

  const add_goal = (new_goal: New_countdown_goal) => {
    dispatch(add_countdown_goal(new_goal));
  };

  const remove_goal = (goal_id: string) => {
    dispatch(remove_countdown_goal(goal_id));
  };

  const set_goals = (goals: Serialized_countdown_goal[]) => {
    dispatch(set_countdown_goals(goals));
  };

  return {
    database,
    add_goal,
    remove_goal,
    set_goals
  };
};

export default use_database_store;
