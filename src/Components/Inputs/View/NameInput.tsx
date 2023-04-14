import {TextField} from "@mui/material";
import {useState} from "react";
import React from "react";

export interface Provide {
    name: string,
}

export interface Require {
    Controller: (props: Provide) => JSX.Element;
}

const NameInput = (props: Require) => {

    const { Controller } = props;

    const [name, setName] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(event.target.value);
    }

    return(
        <>
            <Controller name={name}/>
            <TextField
                id="outlined-controlled"
                label="Name"
                value={name}
                onChange={handleChange}
            />
        </>

    )
}

export default NameInput;