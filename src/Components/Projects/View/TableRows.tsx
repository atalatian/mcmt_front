import {TableCell, TableRow} from "@mui/material";

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