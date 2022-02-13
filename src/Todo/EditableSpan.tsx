import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan Rendered')
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = useCallback(() => {
        setEditMode(true)
        setValue(props.title)
    },[props.title])

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        props.changeTitle(value)
    }, [props.changeTitle, value])

    const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' &&
        setEditMode(false)
        props.changeTitle(value)
    },[props.changeTitle, value])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    return editMode
        ? <TextField value={value}
                     variant={'standard'}
                     size={'small'}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPress}
                     onBlur={activateViewMode}
                     autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})