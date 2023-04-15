import TopShot from "./TopShot";
import Canvas from "./Canvas";
import ContentCanvasBridgeContextProvider from "./ViewController/ContentCanvasBridgeContext";
import TrackingCanvasContextProvider from "../ViewModel/TrackingCanvasContext";
import image from "../../../assets/top_view.png";
import {Box} from "@mui/material";

const TopShotCanvas = () => {
    return(
        <>
            <ContentCanvasBridgeContextProvider>
                <Box position={`relative`}>
                    <TopShot src={image}/>
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

export default TopShotCanvas;