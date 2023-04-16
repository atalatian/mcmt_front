import {Box, TableCell, TableRow} from "@mui/material";
import CheckBox from "./CheckBox";
import { Provide as CheckBoxProvide } from "./CheckBox";
import {useContext} from "react";
import {ProjectDataContext} from "../ViewModel/ProjectDataContext";

export interface Require {
    id: number,
    channel: string,
    model: string,
    uri: string,
    is_calibrated: boolean,
}
const TableRows = () => {

    const project = useContext(ProjectDataContext)?.project;
    if (project === undefined) return <></>;
    if (project.data === undefined) return <></>;

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

    const value: Require[] = project.data.cameras;

    return(
        <>
            {
                value.map((camera) => {
                    return(
                        <TableRow>
                            <TableCell align="right">{camera.id}</TableCell>
                            <TableCell align="right">{camera.channel}</TableCell>
                            <TableCell align="right">{camera.model}</TableCell>
                            <TableCell align="right">{camera.uri}</TableCell>
                            <TableCell align="right">
                                <CheckBox ClickListener={ClickListener} defaultValue={camera.is_calibrated}/>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRows;