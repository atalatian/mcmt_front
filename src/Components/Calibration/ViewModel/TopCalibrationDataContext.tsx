import {createContext, PropsWithChildren, useContext} from "react";
import {CameraDataContext} from "./CameraDataContext";
import {ContentCanvasBridgeContext} from "../View/ViewController/ContentCanvasBridgeContext";
import {CalibrationProxy} from "../Model/ObjectProxies";
import {Shape, shapeDefault} from "./CalibrationCanvasContext";


export interface Provide {
    shape: Shape,
    handleChange: (shape: Shape) => void,
}


export const TopCalibrationDataContext = createContext<Provide | undefined>(undefined);

const TopCalibrationDataContextProvider = (props: PropsWithChildren<{}>) => {

    const width = useContext(ContentCanvasBridgeContext)?.width;
    const height = useContext(ContentCanvasBridgeContext)?.height;
    const camera = useContext(CameraDataContext)?.camera;
    const changeTop = useContext(CameraDataContext)?.changeTop;

    if (camera === undefined) return <></>
    if (changeTop === undefined) return <></>
    if (width === undefined) return <></>
    if (height === undefined) return <></>

    const handleChange = (shape: Shape) => {
        const newShape = {...shape, points: shape.points.map(point =>
                [(point[0] + shape.x)/width, (point[1] + shape.y)/height])}
        changeTop(newShape.points)
    }

    const value = {
        shape: CalibrationProxy({...shapeDefault, points: camera.data!.config.top, id: 0}, width, height),
        handleChange,
    }

    return(
        <TopCalibrationDataContext.Provider value={value}>
            {props.children}
        </TopCalibrationDataContext.Provider>
    )
}

export default TopCalibrationDataContextProvider;