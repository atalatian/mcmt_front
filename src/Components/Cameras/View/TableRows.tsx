import {Box, Button, TableCell, TableRow} from "@mui/material";
import CheckBox from "./CheckBox";
import { Provide as CheckBoxProvide } from "./CheckBox";
import {useContext} from "react";
import {ProjectDataContext} from "../ViewModel/ProjectDataContext";
import React from "react";
import {useNavigate} from "react-router-dom";

export interface Require {
    id: number,
    channel: string,
    model: string,
    uri: string,
    is_calibrated: boolean,
}
const TableRows = () => {

    const project = useContext(ProjectDataContext)?.project;
    const navigate = useNavigate();
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

    const handleClick = (id: number) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        }
    }

    return(
        <>
            {
                project.data.cameras.map((camera) => {
                    return(
                        <TableRow>
                            <TableCell align="left">{camera.id}</TableCell>
                            <TableCell align="left">{camera.channel}</TableCell>
                            <TableCell align="left">{camera.model}</TableCell>
                            <TableCell align="left">{camera.uri}</TableCell>
                            <TableCell align="left">
                                <CheckBox ClickListener={ClickListener} defaultValue={camera.is_calibrated}/>
                            </TableCell>
                            <TableCell align="left">
                                <Button variant={`contained`} onClick={handleClick(camera.id)} disabled={!camera.is_calibrated}>
                                    Go
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRows;