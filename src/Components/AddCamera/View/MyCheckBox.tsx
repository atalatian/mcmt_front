import {Checkbox as MuiCheckBox, FormControlLabel} from "@mui/material";
import {useState} from "react";
import React from "react";

export interface Provide {
    checked: boolean,
}

export interface Require {
    Controller: (props: Provide) => JSX.Element,
}

const MyCheckBox = (props: Require) => {

    const { Controller } = props;

    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return(
        <>
            <Controller checked={checked}/>
            <FormControlLabel control={
                <MuiCheckBox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            } label={`Is Calibrated`}/>
        </>
    )
}


export default MyCheckBox;