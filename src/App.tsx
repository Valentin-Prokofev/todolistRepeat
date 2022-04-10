import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = "all" | "active" | "completed"

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Oil", isDone: true},
            {id: v1(), title: "Gaz", isDone: true}
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]                      //Достаем нужный массив по todolistId
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)   //Перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом
        setTasks({...tasks})               //засетаем в стейт копию объекта чтобы реакт отреагировал перепиской
    }
    
    const changeTodolistTitle = (todolistId:string, newTitle:string) => {
      const todolist = todolists.find(tl=>tl.id === todolistId)   //находим нужный тудулист где нужно заменить тайтл
        if(todolist) {   //чтобы тайпскрипт не ругался, проверяем на андефайнд тудулист
            todolist.title = newTitle  //меняем ему тайтл
            setTodolists([...todolists]) //сетаем все тудулисты вместе с тем где изменили тайтл
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]  //Достаем нужный массив по todolistId
        tasks[todolistId] = [task, ...todolistTasks] //перезапишем в этом объекте массив для нужного тудулиста копией,добавив в начало новую таску
        setTasks({...tasks})               //засетаем в стейт копию объекта чтобы реакт отреагировал перепиской
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
        // setFilter(value)
    }

    const changeStatusCheckBox = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]                      //Достаем нужный массив по todolistId
        let task = todolistTasks.find(t => t.id === id)        //найдем нужную таску
        if (task) {
            task.isDone = isDone            //изменим таску если она нашлась
            setTasks({...tasks})      //засетаем в стейт копию объекта чтобы реакт отреагировал перепиской
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id)) //засунем в стейт список тудулистов, айди которых не равны тому который нужно выкинуть
        //удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id] //удаляем свойство из объекта...значением которого является сам массив тасок
        setTasks({...tasks}) //засетаем в стейт копию объекта чтобы рекакт отреагировал перепиской
    }

    const addTodolist = (title: string) => {
        let newTododlistId = v1()
        let newTodolist: TodolistType = {id: newTododlistId, title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, newTodolistId: []})  //копируем старые таски и отрисовываем новые в видепустого массива
    }

    const changeTaskTitle = (id:string, newValue:string, todolistId:string) => {
        let todolistTasks = tasks[todolistId]                      //Достаем нужный массив по todolistId
        let task = todolistTasks.find(t => t.id === id)        //найдем нужную таску
        if (task) {
            task.title = newValue           //изменим таску если она нашлась
            setTasks({...tasks})      //засетаем в стейт копию объекта чтобы реакт отреагировал перепиской
        }
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatusCheckBox={changeStatusCheckBox}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTitleHandler={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}


export default App;
