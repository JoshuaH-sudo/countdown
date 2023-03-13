import { useAppSelector, useAppDispatch } from "../hooks";

const use_database_store = () => {
    const database = useAppSelector(state => state.database)
    const dispatch = useAppDispatch();

    return { 
        database
    }
}

export default use_database_store;