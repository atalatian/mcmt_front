import {Shape} from "../ViewModel/CalibrationCanvasContext";
import {Camera} from "../ViewModel/CameraDataContext";
import {UseQueryResult} from "@tanstack/react-query";

const cameraDataDefault: Camera = {
    is_calibrated: false,
    uri: "",
    config: {top: [], fov: []},
}

export const CameraDataProxy = (camera: UseQueryResult<Camera>) => {
    const handler = {
        get(target: UseQueryResult<Camera>, property: any){
            switch (property) {
                case "data":
                    if (Reflect.get(target, "data") === undefined){
                        return {...cameraDataDefault};
                    } else if (Reflect.get(target, "data")?.config === null){
                        return {...Reflect.get(target, "data"), config: {top: [], fov: []}};
                    } else if(Reflect.get(target, "data")?.config === undefined){
                        return {...Reflect.get(target, "data"), config: {top: [], fov: []}};
                    } else if (Reflect.get(target, "data")?.config.top === undefined || Reflect.get(target, "data")?.config.fov === undefined ) {
                        return {...Reflect.get(target, "data"), config: JSON.parse(Reflect.get(target, "data")?.config as unknown as string)};
                    } else {
                        return Reflect.get(target, "data");
                    }
                default:
                    return Reflect.get(target, property);
            }
        }
    }

    return new Proxy(camera, handler)
}


export const CalibrationProxy = (shape: Shape, width: number, height: number) => {
    const handler = {
        get(target: Shape, property: any) {
            switch (property) {
                case "points":
                    return Reflect.get(target, "points").map((point) => [point[0] * width, point[1] * height]);
                case "isFinished":
                    return Reflect.get(target, "points").length >= 3;
                case "isMouseOverStartPoint":
                    return Reflect.get(target, "points").length >= 3;
                default:
                    return  Reflect.get(target, property);
            }
        }
    }

    return new Proxy(shape, handler)
}