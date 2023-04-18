import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table as MuiTable} from "@mui/material";
import TableRows from "./TableRows";

const Table = () => {
    return(
        <TableContainer component={Paper}>
            <MuiTable aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">URL</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Cameras List</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRows/>
                </TableBody>
            </MuiTable>
        </TableContainer>
    )
}

export default Table;