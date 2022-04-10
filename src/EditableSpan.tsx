import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [inputValue, setInputValue] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setInputValue(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(inputValue)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return editMode
        ? <input
            value={inputValue}
            autoFocus
            onBlur={activateViewMode}
            onChange={onChangeHandler}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

};
