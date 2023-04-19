import {Box, Button} from "@mui/material";
import {useContext} from "react";
import {CalibrationCanvasContext} from "../ViewModel/CalibrationCanvasContext";

const Controls = () => {

    const changePoints = useContext(CalibrationCanvasContext)?.changePoints;
    const changeIsFinished = useContext(CalibrationCanvasContext)?.changeIsFinished;
    const changeIsMouseOverStartPoint = useContext(CalibrationCanvasContext)?.changeIsMouseOverStartPoint;

    if (changePoints === undefined) return <></>;
    if (changeIsFinished === undefined) return <></>;
    if (changeIsMouseOverStartPoint === undefined) return <></>;

    const handleClick = () => {
        changePoints(0, []);
        changeIsFinished(0, false);
        changeIsMouseOverStartPoint(0, false);
    }

    return(
        <>
            <Box textAlign={`center`} mt={1}>
                <Button variant={`contained`} color={`error`} onClick={handleClick}>
                    Clear
                </Button>
            </Box>
        </>
    )
}

export default Controls;