import {Shape} from "../ViewModel/CalibrationCanvasContext";
import {Camera} from "../ViewModel/CameraDataContext";
import {UseQueryResult} from "@tanstack/react-query";

const cameraDataDefault = {
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
                    } else if (Reflect.get(target, "data")?.config.top === undefined || Reflect.get(target, "data")?.config.fov === undefined ) {
                        return {...Reflect.get(target, "data"), config: {top: [], fov: []}};
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


export const CalibrationProxy = (shape: Shape, mode: "in" | "out" , width: number, height: number) => {
    const handler = {
        get(target: Shape, property: any) {
            switch (property) {
                case "points":
                    if (mode === "out"){
                        return Reflect.get(target, "points").map(point => [(point[0] + shape.x)/width, (point[1] + shape.y)/height])
                    } else {
                        return Reflect.get(target, "points").map((point) => [point[0] * width, point[1] * height])
                    }
                default:
                    return  Reflect.get(target, property);
            }
        }
    }

    return new Proxy(shape, handler)
}