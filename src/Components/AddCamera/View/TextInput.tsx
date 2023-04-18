import {TextField} from "@mui/material";
import {useState} from "react";
import React from "react";

export interface Provide {
    channel: number,
}

export interface Require {
    Controller: (props: Provide) => JSX.Element,
}
const TextInput = (props: Require) => {

    const { Controller } = props;
    const [channel, setChannel] = useState<number>(0);

    const handleChange = (event:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setChannel(parseInt(event.target.value));
    }

    return(
        <>
            <Controller channel={channel}/>
            <TextField fullWidth id="outlined-basic" label="Channel" variant="outlined" type={"number"} value={channel} onChange={handleChange}/>
        </>
    )
}

export default TextInput;