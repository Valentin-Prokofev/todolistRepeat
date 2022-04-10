import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [inputValue, setInputValue] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (inputValue.trim() !== "") {
            props.addItem(inputValue)
            setInputValue("")
        } else {
            setError("Input title is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

