import {createContext, PropsWithChildren, useContext} from "react";
import {Shape, shapeDefault} from "./CalibrationCanvasContext";
import {ContentCanvasBridgeContext} from "../View/ViewController/ContentCanvasBridgeContext";
import {CameraDataContext} from "./CameraDataContext";
import {CalibrationProxy} from "../Model/ObjectProxies";

export interface Provide {
    shape: Shape,
    handleChange: (shape: Shape) => void,
}
export const FOVCalibrationDataContext = createContext<Provide | undefined>(undefined);

const FOVCalibrationDataContextProvider = (props: PropsWithChildren<{}>) => {

    const width = useContext(ContentCanvasBridgeContext)?.width;
    const height = useContext(ContentCanvasBridgeContext)?.height;
    const camera = useContext(CameraDataContext)?.camera;
    const changeFov = useContext(CameraDataContext)?.changeFov;

    if (camera === undefined) return <></>
    if (changeFov === undefined) return <></>
    if (width === undefined) return <></>
    if (height === undefined) return <></>

    const handleChange = (shape: Shape) => {
        const newShape = {...shape, points: shape.points.map(point =>
                [(point[0] + shape.x)/width, (point[1] + shape.y)/height])}
        changeFov(newShape.points);
    }

    const value = {
        shape: CalibrationProxy({...shapeDefault, points: camera.data!.config.fov, id: 0}, width, height),
        handleChange,
    }

    return(
        <FOVCalibrationDataContext.Provider value={value}>
            {props.children}
        </FOVCalibrationDataContext.Provider>
    )
}


export default FOVCalibrationDataContextProvider;