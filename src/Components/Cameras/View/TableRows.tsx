import {Box, Button, TableCell, TableRow} from "@mui/material";
import CheckBox from "./CheckBox";
import { Provide as CheckBoxProvide } from "./CheckBox";
import {useContext} from "react";
import {ProjectDataContext} from "../ViewModel/ProjectDataContext";
import React from "react";
import {useNavigate} from "react-router-dom";
import {CamerasFilterContext} from "../ViewModel/CamerasFilterContext";

export interface Require {
    channel: string,
    model: string,
    uri: string,
    is_calibrated: boolean,
}
const TableRows = () => {

    const cameras = useContext(CamerasFilterContext)?.cameras;
    const navigate = useNavigate();
    if (cameras === undefined) return <></>;

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
                cameras.data?.map((camera, index) => {
                    return(
                        <TableRow key={index}>
                            <TableCell align="left">{camera.channel}</TableCell>
                            <TableCell align="left">{camera.model}</TableCell>
                            <TableCell align="left">{camera.uri}</TableCell>
                            <TableCell align="left">
                                <CheckBox ClickListener={ClickListener} defaultValue={camera.is_calibrated}/>
                            </TableCell>
                            <TableCell align="left">
                                <Button variant={`contained`} disabled={!camera.is_calibrated}>
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