import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../Redux/store";
import {TasksType} from "../../App";
import {ChangeTaskTitleAC, CheckboxSwitcherAC, RemoveTaskAC} from "../../state/task-reducer";

type TaskProps = {
    todoListID: string
    taskID: string
}
export const TaskWithUseSelector = React.memo(({
                                     todoListID,
                                     taskID,
                                 }: TaskProps) => {
    console.log('Tasks1 rendered')

    const dispatch = useDispatch();
    const task = useSelector<AppRootState, TasksType>(state => state.tasks[todoListID].filter(({id}) => id === taskID)[0])

    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(CheckboxSwitcherAC(todoListID, taskID, e.currentTarget.checked))
    }, [dispatch, taskID, todoListID])

    const changeTitle = useCallback((title) => {
        dispatch(ChangeTaskTitleAC(todoListID, taskID, title))
    }, [dispatch, taskID, todoListID])

    const onClickHandler = useCallback(() => {
        dispatch(RemoveTaskAC(todoListID, taskID))
    }, [dispatch, taskID, todoListID])


    return (
        <div className={task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" checked={t.isDone}*/}
            {/*       onChange={(e) => checkboxOnChangeHandler(t.id,e)}/>*/}
            <Checkbox color={'success'}
                      size={'small'}
                      checked={task.isDone}
                      onChange={onChangeCheckboxHandler}/>
            <EditableSpan title={task.title} changeTitle={changeTitle}/>
            <IconButton size={"small"} arial-label="delete" onClick={onClickHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </div>
    )
})