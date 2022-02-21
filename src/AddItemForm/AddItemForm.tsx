import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void
}
export const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    console.log('AddItemForm rendered')
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = useCallback(() => {
        if (inputValue.trim()) {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is required!')
        }
    }, [inputValue, addItem])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.trim()) {
                addItem(inputValue.trim())
                setInputValue('')
            } else {
                setError('Title is required!')
            }
        }
    },[inputValue, addItem])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    },[])


    return (
        <div>
            <TextField label={error ? error : "Add Title"}
                       variant={'outlined'}
                       size={'small'}
                // className={error ? "error" : ''}
                // color={error ? "error" : 'primary'}
                       value={inputValue}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
            {/*<Button size={"small"}*/}
            {/*        variant={"outlined"}*/}
            {/*        color={"primary"}*/}
            {/*        onClick={onClickHandler}>*/}
            {/*    <Add/>*/}
            {/*</Button>*/}
            <IconButton color={"primary"}
                        onClick={onClickHandler}><Add/></IconButton>
            {/*{error && <div className={"errorMessage"}>Title is required!</div>}*/}
        </div>

    )
})