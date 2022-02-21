import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import React from "react";

export default {
    title: 'AddItemForm Component',
    component: Task
}

const changeTaskTitleCallback = action('Title changed')
const onClickRemoveTaskCallback = action('Task removed')
const checkboxOnChangeHandlerCallback = action('Checkbox changed')

export const TaskBaseExample = () => {
    return <>
        <Task
            taskID={'1'}
            isDone={true}
            title={'Test title'}
            changeTaskTitle={changeTaskTitleCallback}
            onClickRemoveTask={onClickRemoveTaskCallback}
            checkboxOnChangeHandler={checkboxOnChangeHandlerCallback}
        />
        <Task
            taskID={'2'}
            isDone={false}
            title={'Test title 2'}
            changeTaskTitle={changeTaskTitleCallback}
            onClickRemoveTask={onClickRemoveTaskCallback}
            checkboxOnChangeHandler={checkboxOnChangeHandlerCallback}
        />
    </>
}