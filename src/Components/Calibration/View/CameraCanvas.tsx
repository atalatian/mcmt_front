import Camera from "./Camera";
import Canvas from "./Canvas";
import CalibrationCanvasContextProvider from "../ViewModel/CalibrationCanvasContext";
import ContentCanvasBridgeContextProvider from "./ViewController/ContentCanvasBridgeContext";
import {Box} from "@mui/material";
import FOVCalibrationDataContextProvider from "../ViewModel/FOVCalibrationDataContext";

const CameraCanvas = () => {
    return(
        <>
            <ContentCanvasBridgeContextProvider>
                <Box position={`relative`}>
                    <Box width={700}>
                        <Camera/>
                    </Box>
                    <FOVCalibrationDataContextProvider>
                        <CalibrationCanvasContextProvider context={"FOV"}>
                            <Box position={`absolute`} left={0} top={0} zIndex={1}>
                                <Canvas/>
                            </Box>
                        </CalibrationCanvasContextProvider>
                    </FOVCalibrationDataContextProvider>
                </Box>
            </ContentCanvasBridgeContextProvider>
        </>
    )
}

export default CameraCanvas;