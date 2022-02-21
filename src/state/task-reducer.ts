import {v1} from "uuid";
import {TasksObjType} from "../App";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

type TasksActionType = ReturnType<typeof AddTaskAC>
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof CheckboxSwitcherAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>

const initState: TasksObjType = {

}


export const tasksReducer = (state: TasksObjType = initState, action: TasksActionType): TasksObjType => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.inputValue, isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        case "ADD-TODOLIST":
            return {...state, [action.payload.ID]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state, [action.payload]: [...state[action.payload]]}
            delete stateCopy[action.payload]
            return stateCopy
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)
            }
        case "CHECKBOX-SWITCHER":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        default:
            return state
    }
}

export const AddTaskAC = (todoListID: string, inputValue: string) => {
    return {
        type: "ADD-TASK",
        payload: {todoListID, inputValue}
    } as const
}

export const RemoveTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todoListID, taskID}
    } as const
}

export const CheckboxSwitcherAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHECKBOX-SWITCHER",
        payload: {todoListID, taskID, isDone}
    } as const
}

export const ChangeTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {todoListID, taskID, title}
    } as const
}
