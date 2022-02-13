import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/task-reducer";
import {todoListReducer} from "../state/todolists-reducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
})


export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;