import React from "react";
import {Button, TableCell, TableRow} from "@mui/material";
import {useContext} from "react";
import {ProjectsDataContext} from "../ViewModel/ProjectsDataContext";
import { redirect } from "react-router-dom";

export interface Require {
    id: number,
    name: string,
}

const TableRows = () => {

    const projects = useContext(ProjectsDataContext)?.projects;
    if (projects === undefined) return <></>;
    if (projects.data === undefined) return <></>;

    const handleClick = (id: number) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            redirect(`/project/${id}/cameras`);
        }
    }

    return(
        <>
            {
                projects.data.map((project) => {
                    return(
                        <TableRow>
                            <TableCell align="right">{project.id}</TableCell>
                            <TableCell align="right">{project.name}</TableCell>
                            <TableCell align="right">
                                <Button onClick={handleClick(project.id)}>
                                    Cameras
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