import React, {ChangeEvent, useCallback, useMemo} from "react";
import {FilterType, TasksType} from "../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from './Task/Task'
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../Redux/store";
import {AddTaskAC, ChangeTaskTitleAC, CheckboxSwitcherAC, RemoveTaskAC} from "../state/task-reducer";

type TodoPropsType = {
    // tasks: Array<TasksType>
    title: string
    filter: FilterType
    todoListId: string
    // removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterType) => void
    // addTask: (todoListID: string, inputValue: string) => void
    // checkBoxSwitcher: (todoListID: string, id: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    // changeTitle: (todoListID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const ToDo = React.memo((props: TodoPropsType) => {
    console.log(`TodoList Rendered ${props.title}`)
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.todoListId])

    let filteredTasks = useMemo(()=> {
        return tasks
    }, [tasks])
    if (props.filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    } else if (props.filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }


    const addTask = useCallback((inputValue: string) => {
        dispatch(AddTaskAC(props.todoListId, inputValue))
    }, [dispatch, props.todoListId])

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        // dispatch(props.todoListId, taskID, title)
        dispatch(ChangeTaskTitleAC(props.todoListId, taskID, title))
    }, [dispatch, props.todoListId])
    const onClickRemoveTask = useCallback((taskID: string) => {
        // dispatch(props.todoListId, taskID)
        dispatch(RemoveTaskAC(props.todoListId, taskID))
    }, [dispatch, props.todoListId])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }, [props.changeTodoListTitle, props.todoListId])
    const removeTodoListOnCLick = useCallback(() => props.removeTodoList(props.todoListId), [props.removeTodoList, props.todoListId])
    const checkboxOnChangeHandler = useCallback((taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(props.todoListId, taskID, e.currentTarget.checked)
        dispatch(CheckboxSwitcherAC(props.todoListId, taskID, e.currentTarget.checked))
    }, [dispatch, props.todoListId])

    const onClickFilterAll = useCallback(() => props.changeFilter(props.todoListId, "all"), [props.changeFilter, props.todoListId]);
    const onClickFilterActive = useCallback(() => props.changeFilter(props.todoListId, "active"), [props.changeFilter, props.todoListId]);
    const onClickFilterCompleted = useCallback(() => props.changeFilter(props.todoListId, "completed"), [props.changeFilter, props.todoListId]);
    const classNameFilterAll = props.filter === "all" ? "contained" : "text";
    const classNameFilterActive = props.filter === "active" ? "contained" : "text";
    const classNameFilterCompleted = props.filter === "completed" ? "contained" : "text";

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton size={"small"} arial-label="delete" onClick={removeTodoListOnCLick}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {filteredTasks.map(t => {
                        return <Task key={t.id}
                                     taskID={t.id}
                                     isDone={t.isDone}
                                     title={t.title}
                                     changeTaskTitle={changeTaskTitle}
                                     onClickRemoveTask={onClickRemoveTask}
                                     checkboxOnChangeHandler={checkboxOnChangeHandler}/>
                    })
                }
            </div>
            <div>
                <Button size={"small"}
                        color={"inherit"}
                        variant={classNameFilterAll}
                    // className={classNameFilterAll}
                        onClick={onClickFilterAll}>All
                </Button>
                <Button size={"small"}
                        color={"primary"}
                        variant={classNameFilterActive}
                    // className={classNameFilterActive}
                        onClick={onClickFilterActive}>Active
                </Button>
                <Button size={"small"}
                        color={"success"}
                        variant={classNameFilterCompleted}
                    // className={classNameFilterCompleted}
                        onClick={onClickFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
})

