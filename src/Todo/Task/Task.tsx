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
export const Task = React.memo((props: TaskProps) => {
    console.log('Tasks rendered')
    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.checkboxOnChangeHandler(props.taskID, e)
    }, [props.checkboxOnChangeHandler])
    const changeTitle = useCallback((title) => {
        props.changeTaskTitle(props.taskID, title)
    }, [props.changeTaskTitle, props.taskID])
    const onClickHandler = useCallback(() => {
        props.onClickRemoveTask(props.taskID)
    }, [props.onClickRemoveTask, props.taskID])

    return (
        <div className={props.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" checked={t.isDone}*/}
            {/*       onChange={(e) => checkboxOnChangeHandler(t.id,e)}/>*/}
            <Checkbox color={'success'}
                      size={'small'}
                      checked={props.isDone}
                      onChange={onChangeCheckboxHandler}/>
            <EditableSpan title={props.title} changeTitle={changeTitle}/>
            <IconButton size={"small"} arial-label="delete" onClick={onClickHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </div>
    )
})