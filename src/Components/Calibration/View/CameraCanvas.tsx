import Camera from "./Camera";
import Canvas from "./Canvas";
import CalibrationCanvasContextProvider from "../ViewModel/CalibrationCanvasContext";
import ContentCanvasBridgeContextProvider from "./ViewController/ContentCanvasBridgeContext";
import {Box} from "@mui/material";
import FOVCalibrationDataContextProvider from "../ViewModel/FOVCalibrationDataContext";
import {FOVCalibrationDataContext} from "../ViewModel/FOVCalibrationDataContext";
import Controls from "./Controls";

const CameraCanvas = () => {
    return(
        <>
            <ContentCanvasBridgeContextProvider>
                <Box position={`relative`}>
                    <Box width={700}>
                        <Camera/>
                    </Box>
                    <FOVCalibrationDataContextProvider>
                        <CalibrationCanvasContextProvider Context={FOVCalibrationDataContext}>
                            <Box position={`absolute`} left={0} top={0} zIndex={1}>
                                <Canvas/>
                            </Box>
                            <Controls/>
                        </CalibrationCanvasContextProvider>
                    </FOVCalibrationDataContextProvider>
                </Box>
            </ContentCanvasBridgeContextProvider>
        </>
    )
}

export default CameraCanvas;