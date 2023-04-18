import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";

export interface Provide {
    value: any,
}
export interface Require {
    MenuItems: {id: any, value: any, name: any }[],
    name: string,
    Controller: (props: Provide) => JSX.Element,
}
const MySelect = (props: Require) => {

    const { MenuItems = [], name, Controller } = props;

    const [value, setValue] = useState<any>("");

    const handleChange = (event: SelectChangeEvent<any>) => {
        setValue(event.target.value);
    }

    return(
        <>
            <Controller value={value}/>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={name}
                    onChange={handleChange}
                >
                    {
                        MenuItems.map((item) => <MenuItem key={item.id} value={item.value}>{item.name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default MySelect;