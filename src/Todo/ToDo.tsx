import React, {ChangeEvent, useCallback, useMemo} from "react";
import {FilterType, TasksType} from "../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../Redux/store";
import {AddTaskAC, ChangeTaskTitleAC, CheckboxSwitcherAC, RemoveTaskAC} from "../state/task-reducer";
import {Task} from "./Task/Task";

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
    changeTodoListTitleCallback: (todoListID: string, title: string) => void
}

export const ToDo = React.memo(({
                                    title,
                                    filter,
                                    todoListId,
                                    changeFilter,
                                    removeTodoList,
                                    changeTodoListTitleCallback
                                }: TodoPropsType) => {
    console.log(`TodoList Rendered ${title}`)
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[todoListId])

    let filteredTasks = useMemo(() => {
        return tasks
    }, [tasks])
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    } else if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }


    const addTask = useCallback((inputValue: string) => {
        dispatch(AddTaskAC(todoListId, inputValue))
    }, [dispatch, todoListId])

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        // dispatch(props.todoListId, taskID, title)
        dispatch(ChangeTaskTitleAC(todoListId, taskID, title))
    }, [dispatch, todoListId])
    const onClickRemoveTask = useCallback((taskID: string) => {
        // dispatch(props.todoListId, taskID)
        dispatch(RemoveTaskAC(todoListId, taskID))
    }, [dispatch, todoListId])
    const changeTodoListTitle = useCallback((title: string) => {
        changeTodoListTitleCallback(todoListId, title)
    }, [changeTodoListTitleCallback, todoListId])
    const removeTodoListOnCLick = useCallback(() => removeTodoList(todoListId), [removeTodoList, todoListId])
    const checkboxOnChangeHandler = useCallback((taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        // dispatch(props.todoListId, taskID, e.currentTarget.checked)
        dispatch(CheckboxSwitcherAC(todoListId, taskID, e.currentTarget.checked))
    }, [dispatch, todoListId])

    const onClickFilterAll = useCallback(() => changeFilter(todoListId, "all"), [changeFilter, todoListId]);
    const onClickFilterActive = useCallback(() => changeFilter(todoListId, "active"), [changeFilter, todoListId]);
    const onClickFilterCompleted = useCallback(() => changeFilter(todoListId, "completed"), [changeFilter, todoListId]);
    const classNameFilterAll = filter === "all" ? "contained" : "text";
    const classNameFilterActive = filter === "active" ? "contained" : "text";
    const classNameFilterCompleted = filter === "completed" ? "contained" : "text";

    return (
        <div>
            <h3><EditableSpan title={title} changeTitle={changeTodoListTitle}/>
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
                                 checkboxOnChangeHandler={checkboxOnChangeHandler}
                    />
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

