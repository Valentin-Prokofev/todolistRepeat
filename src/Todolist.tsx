import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusCheckBox: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (id: string) => void
    changeTitleHandler: (id:string, newValue:string, todolistId:string)=>void
    changeTodolistTitle:(id:string, newTitle:string)=>void
}

export const Todolist = (props: PropsType) => {

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const changeTodolistTitle = (newValue:string) => {
        props.changeTodolistTitle(props.id, newValue)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*{props.title}*/}
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(task.id, props.id)
                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusCheckBox(task.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTitleHandler(task.id, newValue, props.id)
                        }
                        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeCheckBoxHandler}
                            />
                            {/*<span>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};
