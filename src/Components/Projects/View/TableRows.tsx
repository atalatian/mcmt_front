import {TableCell, TableRow} from "@mui/material";
import { Require as CameraRequire } from "../../Cameras/View/TableRows";

export interface Require {
    id: number,
    name: string,
}

const TableRows = () => {


    return(
        <>
            {
                [].map((item) => {
                    return(
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRows;