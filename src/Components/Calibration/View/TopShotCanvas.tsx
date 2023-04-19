import TopShot from "./TopShot";
import Canvas from "./Canvas";
import ContentCanvasBridgeContextProvider from "./ViewController/ContentCanvasBridgeContext";
import CalibrationCanvasContextProvider from "../ViewModel/CalibrationCanvasContext";
import {Box} from "@mui/material";
import TopCalibrationDataContextProvider from "../ViewModel/TopCalibrationDataContext";
import {TopCalibrationDataContext} from "../ViewModel/TopCalibrationDataContext";
import Controls from "./Controls";

const TopShotCanvas = () => {
    return(
        <>
            <ContentCanvasBridgeContextProvider>
                <Box position={`relative`}>
                    <Box width={700}>
                        <TopShot/>
                    </Box>
                    <TopCalibrationDataContextProvider>
                        <CalibrationCanvasContextProvider Context={TopCalibrationDataContext}>
                            <Box position={`absolute`} left={0} top={0} zIndex={1}>
                                <Canvas/>
                            </Box>
                            <Controls/>
                        </CalibrationCanvasContextProvider>
                    </TopCalibrationDataContextProvider>
                </Box>
            </ContentCanvasBridgeContextProvider>
        </>
    )
}

export default TopShotCanvas;