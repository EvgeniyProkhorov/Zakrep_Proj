import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = React.memo(({title, changeTitle}: EditableSpanPropsType) => {
    console.log('EditableSpan Rendered')
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = useCallback(() => {
        setEditMode(true)
        setValue(title)
    },[title])

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        changeTitle(value)
    }, [changeTitle, value])

    const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' &&
        setEditMode(false)
        changeTitle(value)
    },[changeTitle, value])

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
        : <span onDoubleClick={activateEditMode}>{title}</span>
})