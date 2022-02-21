import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";

type TaskProps = {
    isDone: boolean
    title: string
    taskID: string
    checkboxOnChangeHandler: (taskID: string, e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (taskID: string, title: string) => void
    onClickRemoveTask: (taskID: string) => void
}
export const Task = React.memo(({
                                    isDone,
                                    title,
                                    taskID,
                                    checkboxOnChangeHandler,
                                    changeTaskTitle,
                                    onClickRemoveTask
                                }: TaskProps) => {
    console.log('Tasks rendered')
    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        checkboxOnChangeHandler(taskID, e)
    }, [checkboxOnChangeHandler, taskID])

    const changeTitle = useCallback((title) => {
        changeTaskTitle(taskID, title)
    }, [changeTaskTitle, taskID])

    const onClickHandler = useCallback(() => {
        onClickRemoveTask(taskID)
    }, [onClickRemoveTask, taskID])

    return (
        <div className={isDone ? "is-done" : ""}>
            {/*<input type="checkbox" checked={t.isDone}*/}
            {/*       onChange={(e) => checkboxOnChangeHandler(t.id,e)}/>*/}
            <Checkbox color={'success'}
                      size={'small'}
                      checked={isDone}
                      onChange={onChangeCheckboxHandler}/>
            <EditableSpan title={title} changeTitle={changeTitle}/>
            <IconButton size={"small"} arial-label="delete" onClick={onClickHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </div>
    )
})