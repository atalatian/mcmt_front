import {Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TableRows from "./TableRows";

const Table = () => {
    return(
        <TableContainer component={Paper}>
            <MuiTable aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Channel</TableCell>
                        <TableCell align="left">Model</TableCell>
                        <TableCell align="left">URI</TableCell>
                        <TableCell align="left">Is Calibrated</TableCell>
                        <TableCell align="left">Tracking</TableCell>
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