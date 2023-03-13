import { Countdown_goal } from "../../common";
import { useAppSelector, useAppDispatch } from "../hooks";
import { add_countdown_goal } from "./database_slice";

const use_database_store = () => {
    const database = useAppSelector(state => state.database)
    const dispatch = useAppDispatch();

    const add_goal = (new_goal: Countdown_goal) => {
        dispatch(add_countdown_goal(new_goal))
    }

    return { 
        database,
        add_goal
    }
}

export default use_database_store;