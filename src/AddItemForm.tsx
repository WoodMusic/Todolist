import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { on } from "events";
import { ControlPoint } from "@mui/icons-material";

type AddItemPropsType = {
    addItem: (title: string) => void
    lable: string
}

export function AddItemForm(props: AddItemPropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            if (title.trim() !== '') {
                addTask();
                setTitle('');
            } else {
                setError('Title is required!')
            }
        }
    }

    const addTask = () => {

        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required!')
        }
    }

    const onChangeErrorStatus = () => {
        setError(null);
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={props.lable}
                value={title}
                type="text"
                onChange={onNewTitleChangeHandler}
                onBlur={onChangeErrorStatus}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={addTask}
                color={'primary'}>
                <ControlPoint />
            </IconButton>
        </div>
    )
}