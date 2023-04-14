import {Checkbox as MuiCheckBox} from "@mui/material";
import {useState} from "react";
import React from "react";

export interface Provide {
    checked: boolean,
}

export interface Require {
    ClickListener: (props: Provide & { children: JSX.Element }) => JSX.Element,
    defaultValue?: boolean,
}

const CheckBox = (props: Require) => {

    const { ClickListener } = props;
    const { defaultValue = false } = props;

    const [checked, setChecked] = useState(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return(
        <ClickListener checked={checked}>
            <MuiCheckBox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </ClickListener>
    )
}


export default CheckBox;