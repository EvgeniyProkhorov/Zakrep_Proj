// import {addTodoListAC, removeTodoListAC, todoListReducer} from "./todolists-reducer";
// import {idForReducers, TodoListType} from "../App";
import {v1} from "uuid";
//
//
// test('correct todolist should be removed', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     const startState: Array<TodoListType> = [
//         {id: todoList1, title: 'What to learn', filter: 'all'},
//         {id: todoList2, title: 'What to buy', filter: 'all'},
//     ]
//
//     const endState = todoListReducer(startState, removeTodoListAC(todoList1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todoList2)
//
// })
//
// test('correct todolist should be added', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//     const newID = v1()
//
//     const startState: Array<TodoListType> = [
//         {id: todoList1, title: 'What to learn', filter: 'all'},
//         {id: todoList2, title: 'What to buy', filter: 'all'},
//     ]
//
//     const endState = todoListReducer(startState, addTodoListAC(newID, "New Todo"))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].id).toBe(idForReducers)
//     expect(endState[0].title).toBe("New Todo")
//
// })