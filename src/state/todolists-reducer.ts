import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

type TodoActionType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof changeFilterAC>

// export const todoList1 = v1()
// export const todoList2 = v1()

const initState: Array<TodoListType> = [
    // {id: todoList1, title: 'What to learn', filter: 'all'},
    // {id: todoList2, title: 'What to buy', filter: 'all'},
]

export const todoListReducer = (state: Array<TodoListType> = initState, action: TodoActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.payload.ID, title: action.payload.title, filter: 'all'}
            return [newTodoList, ...state]
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.filter} : el)
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload)
        case "CHANGE-TITLE-TODOLIST":
            return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.title} : el)
        default:
            return state
    }
}

export const addTodoListAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {title, ID: v1()}
    } as const
}

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: todoListID
    } as const
}

export const changeTitleTodoListAC = (todoListID: string, title: string) => {
    return {
        type: "CHANGE-TITLE-TODOLIST",
        payload: {todoListID, title}
    } as const
}

export const changeFilterAC = (todoListID: string, filter: FilterType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todoListID, filter
        }
    } as const
}
