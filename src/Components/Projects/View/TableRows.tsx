import React from "react";
import {Button, TableCell, TableRow} from "@mui/material";
import {useContext} from "react";
import {ProjectsDataContext} from "../ViewModel/ProjectsDataContext";
import {useNavigate} from "react-router-dom";

export interface Require {
    name: string,
    url: string,
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

    const urlAdaptor = (url: string) => {
        const expression =
            "http?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}:[a-zA-Z0-9()]{1,6}/[a-zA-Z0-9()]*/\\b([-a-zA-Z0-9()@:%_?\\+.~#?&//=]*)/";
        const regex = new RegExp(expression);
        const result = regex.exec(url);
        const newResult = result!.filter((item) => !!parseInt(item)) as unknown[] as number[];
        return newResult[0];
    }

    return(
        <>
            {
                projects.data.map((project) => {
                    return(
                        <TableRow key={urlAdaptor(project.url)}>
                            <TableCell align="left">{urlAdaptor(project.url)}</TableCell>
                            <TableCell align="left">{project.name}</TableCell>
                            <TableCell align="left">
                                <Button variant={`contained`} onClick={handleClick(urlAdaptor(project.url))}>
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