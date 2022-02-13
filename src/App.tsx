import React, {useCallback} from 'react';
import './App.css';
import {ToDo} from "./Todo/ToDo";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeFilterAC,
    changeTitleTodoListAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksObjType = {
    [key: string]: Array<TasksType>
}

function App() {
    console.log('APP Rendered')

    const dispatch = useDispatch()
    const todoList = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootState, TasksObjType>(state => state.tasks)


    // const todoList1 = v1()
    // const todoList2 = v1()

    // const [todoList, setTodoList] = useState<TodoListType[]>([
    //     {id: todoList1, title: 'What to learn', filter: 'all'},
    //     {id: todoList2, title: 'What to buy', filter: 'all'},
    // ])

    // const [tasks, setTasks] = useState<TasksObjType>({
    //     [todoList1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JavaScript", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Angular", isDone: false},
    //         {id: v1(), title: "Vue", isDone: false},
    //     ],
    //     [todoList2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Bread", isDone: true},
    //         {id: v1(), title: "Coffee", isDone: false},
    //         {id: v1(), title: "Juice", isDone: false},
    //         {id: v1(), title: "React Book", isDone: false},
    //     ]
    // })


    // const addTask = (todoListID: string, inputValue: string) => {
    //     dispatch(AddTaskAC(todoListID, inputValue))
    // }
    // const removeTask = (todoListID: string, taskID: string) => {
    //     dispatch(RemoveTaskAC(todoListID, taskID))
    // }
    // const changeTitle = (todoListID: string, taskID: string, title: string) => {
    //     dispatch(ChangeTaskTitleAC(todoListID, taskID, title))
    // }
    // const checkBoxSwitcher = (todoListID: string, taskID: string, isDone: boolean) => {
    //     dispatch(CheckboxSwitcherAC(todoListID, taskID, isDone))
    // }


    const addTodoList = useCallback((title: string)=>{
        dispatch(addTodoListAC(title))
    },[dispatch])
    const changeFilter = useCallback((todoListID: string, value: FilterType) => {
        dispatch(changeFilterAC(todoListID, value))
    },[dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    },[dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTitleTodoListAC(todoListID, title))
    },[dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: '10px'}}
                      container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoList.map(tl => {
                        // let filteredTasks = tasks[tl.id]
                        // if (tl.filter === "completed") {
                        //     filteredTasks = tasks[tl.id].filter(t => t.isDone)
                        // } else if (tl.filter === "active") {
                        //     filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                        // }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}
                                   elevation={5}>
                                <ToDo key={tl.id}
                                      todoListId={tl.id}
                                      // tasks={filteredTasks}
                                      title={tl.title}
                                      // removeTask={removeTask}
                                      filter={tl.filter}
                                      changeFilter={changeFilter}
                                      // addTask={addTask}
                                      // checkBoxSwitcher={checkBoxSwitcher}
                                      removeTodoList={removeTodoList}
                                      // changeTitle={changeTitle}
                                      changeTodoListTitle={changeTodoListTitle}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

