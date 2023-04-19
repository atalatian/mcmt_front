import React from "react";
import {Button, TableCell, TableRow} from "@mui/material";
import {useContext} from "react";
import {ProjectsDataContext} from "../ViewModel/ProjectsDataContext";
import {useNavigate} from "react-router-dom";
import MyDialog from "./MyDialog";

export interface Require {
    name: string,
    id: number,
    plan: string,
    heatmap: string,
    visual_map: string,
}

const TableRows = () => {

    const projects = useContext(ProjectsDataContext)?.projects;
    const navigate = useNavigate();
    if (projects === undefined) return <></>;
    if (projects.data === undefined) return <></>;


    const handleClick = (id: number) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            navigate(`/project/${id}/cameras`)
        }
    }

    return(
        <>
            {
                projects.data.map((project) => {
                    return(
                        <TableRow key={project.id}>
                            <TableCell align="left">{project.id}</TableCell>
                            <TableCell align="left">{project.name}</TableCell>
                            <TableCell align="left">
                                <Button variant={`contained`} onClick={handleClick(project.id)}>
                                    Cameras
                                </Button>
                            </TableCell>
                            <TableCell align="left">
                                <MyDialog src={project.plan} title={"Plan"}/>
                            </TableCell>
                            <TableCell align="left">
                                <MyDialog src={project.heatmap} title={"Heat Map"}/>
                            </TableCell>
                            <TableCell align="left">
                                <MyDialog src={project.visual_map} title={"Virtual Map"}/>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default TableRows;