import {Box, TableCell, TableRow} from "@mui/material";
import CheckBox from "./CheckBox";
import { Provide as CheckBoxProvide } from "./CheckBox";

export interface Require {
    id: number,
    channel: string,
    model: string,
    uri: string,
    is_calibrated: boolean,
}
const TableRows = () => {

    const ClickListener = (props: CheckBoxProvide & { children: JSX.Element } ) => {

        const { checked } = props;

        const handleClick = () => {

        }

        return(
            <Box onClick={handleClick}>
                { props.children }
            </Box>
        )
    }

    return(
        <>
            {
                [].map((item) => {
                    return(
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">
                                <CheckBox ClickListener={ClickListener}/>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRows;