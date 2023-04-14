import {Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TableRows from "./TableRows";

const Table = () => {
    return(
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Channel</TableCell>
                        <TableCell align="right">Model</TableCell>
                        <TableCell align="right">Project</TableCell>
                        <TableCell align="right">URI</TableCell>
                        <TableCell align="right">Config</TableCell>
                        <TableCell align="right">Is calibrated?</TableCell>
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