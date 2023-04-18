import {Checkbox as MuiCheckBox, FormControlLabel} from "@mui/material";
import {useState} from "react";
import React from "react";

export interface Provide {
    checked: boolean,
}

export interface Require {
    ClickListener: (props: Provide & { children: JSX.Element }) => JSX.Element,
}

const MyCheckBox = (props: Require) => {

    const { ClickListener } = props;

    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return(
        <ClickListener checked={checked}>
            <FormControlLabel control={
                <MuiCheckBox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            } label={`Is Calibrated`}/>
        </ClickListener>
    )
}


export default MyCheckBox;