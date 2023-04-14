import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table as MuiTable} from "@mui/material";
import TableRows from "./TableRows";

const Table = () => {
    return(
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Plan</TableCell>
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