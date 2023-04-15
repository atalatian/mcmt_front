import Camera from "./Camera";
import Canvas from "./Canvas";
import TrackingCanvasContextProvider from "../ViewModel/TrackingCanvasContext";
import ContentCanvasBridgeContextProvider from "./ViewController/ContentCanvasBridgeContext";
import video from "../../../assets/video4.mp4";
import {Box} from "@mui/material";

const CameraCanvas = () => {
    return(
        <>
            <ContentCanvasBridgeContextProvider>
                <Box position={`relative`}>
                    <Camera url={video}/>
                    <TrackingCanvasContextProvider>
                        <Box position={`absolute`} left={0} top={0} zIndex={1}>
                            <Canvas/>
                        </Box>
                    </TrackingCanvasContextProvider>
                </Box>
            </ContentCanvasBridgeContextProvider>
        </>
    )
}

export default CameraCanvas;